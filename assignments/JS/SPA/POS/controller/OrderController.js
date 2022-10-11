function loadAllCustomerCodes() {
    $('#cmbCustomers').empty();
    let count = 0;
    for (customer of customers) {
        $('#cmbCustomers').append(`<option class="options" value="${count}">${customer.code}</option>`);
        count++;
    }
}

function loadAllItemCodes() {
    $('#cmbItems').empty();
    let count = 0;
    for (item of items) {
        $('#cmbItems').append(`<option class="options" value="${count}">${item.code}</option>`);
        count++;
    }
}

$('#cmbCustomers').change(function () {
    let customer = customers[this.value];
    $('#txtOCName').val(customer.name);
    $('#txtOCAddress').val(customer.address);

});

$('#cmbItems').change(function () {
    let item = items[this.value];
    $('#txtOIName').val(item.name);
    $('#txtOIDesc').val(item.description);
    $('#txtOIUnitPrice').val(item.sellingPrice);
    $('#txtOIQty').val(item.qty);
});
$('#txtOQty').keyup(function (event) {
    let qty = +$('#txtOQty').val();
    if((+$('#cmbItems').val()>=0)&& (qty>0)){
        $('#btnAddToCart').attr('disabled', false);
    }else{
        $('#btnAddToCart').attr('disabled', true);
    }
});
$('#btnAddToCart').click(function () {
    let QtyOnHand = +$('#txtOIQty').val();
    let qty = +$('#txtOQty').val();
    let tempOD = getExistingOrderDetail(items[+$('#cmbItems').val()].code);
    if (tempOD == null) {
        if (QtyOnHand >= qty) {
            addToCart($('#cmbItems').val(), qty)
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Insufficient Qty On Hand!'
            })
        }
    } else {
        qty+=tempOD.qty;
        if (QtyOnHand >= qty) {
            tempOD.qty=qty;
            tempOD.cost=+(tempOD.qty)*+(tempOD.item.sellingPrice);
            loadCartItems();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Insufficient Qty On Hand!'
            })
        }
    }
});

let orderDetailList = [];

function getExistingOrderDetail(code) {
    for (od of orderDetailList) {
        if (od.item.code == code) {
            return od;
        }
    }
    return null;
}

function addToCart(index, qty) {
    orderDetail = new Object({
        item: items[index],
        qty: +qty,
        cost: +(items[index].sellingPrice) * +(qty)
    });

    orderDetailList.push(orderDetail);
    loadCartItems();
}

function loadCartItems() {
    let itemTable = $('#orderTable>tbody');
    itemTable.empty();
    let count=0;
    for (od of orderDetailList) {
        console.log(od);
        let row = `<tr>
                    <th scope="row">${count}</th>
                    <td>${od.item.code}</td>
                    <td>${od.item.name}</td>
                    <td>${od.item.description}</td>
                    <td>${od.item.sellingPrice}</td>
                    <td>${od.qty}</td>
                    <td>${od.cost}</td>
                    <td>
                        <button class="btnRemoveFromCart" type="button" class="btn btn-danger">Remove</button>
                    </td>`;

        itemTable.append(row);
        count++;
    }
    calculateTotal();
}

function calculateTotal() {
    let total=0;
    for (od of orderDetailList){
        total+=+od.cost;
    }
    $('lblTotal').text(total);
    let discount = +($('#txtDiscount').val());
    let subTotal;
    if(discount>=0){
        subTotal=total-discount;
        $('#lblSubTotal').text(subTotal);
    }else{
        subTotal=total;
        $('#lblSubTotal').text(total);
    }
    let cash = +($('#txtCashAmount').val());
    if(cash>0){
        $('#lblBalance').text(cash-subTotal);
    }else{
        $('#lblBalance').text(0);
    }
}

