function loadAllCustomerCodes() {
    $('#cmbCustomers').empty();
    let count = 0;
    for (c of customers) {
        $('#cmbCustomers').append(`<option class="options" value="${count}">${c.code}</option>`);
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
    if ((+$('#cmbItems').val() >= 0) && (qty > 0)) {
        $('#btnAddToCart').attr('disabled', false);
    } else {
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
        qty += tempOD.qty;
        if (QtyOnHand >= qty) {
            tempOD.qty = qty;
            tempOD.cost = +(tempOD.qty) * +(tempOD.item.sellingPrice);
            loadCartItems();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Insufficient Qty On Hand!'
            });
        }
    }
});

let orderDetailList = new Array();

function getExistingOrderDetail(code) {
    for (od of orderDetailList) {
        if (od.item.code === code) {
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
    let count = 0;
    for (od of orderDetailList) {
        let row = `<tr>
                    <th scope="row">${count + 1}</th>
                    <td>${od.item.code}</td>
                    <td>${od.item.name}</td>
                    <td>${od.item.description}</td>
                    <td>${od.item.sellingPrice}</td>
                    <td>${od.qty}</td>
                    <td>${od.cost}</td>
                    <td>
                        <button type="button" class="btn btn-danger btnRemoveFromCart">Remove</button>
                    </td>`;

        itemTable.append(row);
        count++;
    }
    calculateTotal();
}

$('#txtCashAmount,#txtDiscount').keyup(function () {
    calculateTotal();
});


function calculateTotal() {
    let balance;
    let total = 0;
    for (od of orderDetailList) {
        total += od.cost;
    }
    $('#lblTotal').text(total);
    let discount = +($('#txtDiscount').val());
    let subTotal;
    if (discount >= 0) {
        subTotal = total - discount;
        $('#lblSubTotal').text(subTotal);
    } else {
        subTotal = total;
        $('#lblSubTotal').text(total);
    }
    let cash = +($('#txtCashAmount').val());
    if (cash > 0) {
        $('#lblBalance').text(cash - subTotal);
    } else {
        $('#lblBalance').text(0);
    }
    balance = cash - subTotal;

    return [total, subTotal, discount, cash, balance];
}

function checkOIDExists(OID) {
    for (o of orders) {
        if (o.code == OID) {
            return true;
        }
    }
    return false;
}

$('#btnPlaceOrder').click(function () {
    let OIDRegex = /^(OID-)[0-9]{1,3}$/
    let dateRegex = /^[0-9]{4}(.)[0-9]{2}(.)[0-9]{2}$/;
    if (orderDetailList.length > 0) {
        if (+$('#cmbCustomers').val() >= 0) {
            if (OIDRegex.test($('#txtOrderId').val())) {
                if (dateRegex.test($('#dtpckerODate').val())) {
                    if (!checkOIDExists($('#txtOrderId').val())) {
                        let values = calculateTotal();
                        alert(values[3] - values[1]);
                        if ((values[3] - values[1]) >= 0) {
                            order = new Object({
                                code: $('#txtOrderId').val(),
                                date: $('#dtpckerODate').val(),
                                customer: customers[+$('#cmbCustomers').val()],
                                orderDetail: orderDetailList,
                                total: values[0],
                                discount: values[2],
                                subTotal: values[1],
                                cash: values[3],
                                balance: values[4]
                            });

                            orders.push(order);

                            for (od of orderDetailList) {
                                od.item.qty -= od.qty;
                            }
                            orderDetailList= new Array();
                            Swal.fire({
                                icon: 'success',
                                title: 'Yayyy!',
                                text: 'Order Placed Successfully!!'
                            })
                            clearOrderFields();
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Insufficient Credit!'
                            });
                        }
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Order ID Already Exists!'
                        });
                    }
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Input Date!'
                    });
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Invalid Order Id!'
                });
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Select Customer!'
            });
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Cart Is Empty!'
        });
    }
});

function clearOrderFields() {
    $('#txtCashAmount,#txtDiscount,#txtOIName,#txtOIDesc,#txtOIUnitPrice,#txtOIQty,#txtOQty,#txtOrderId,#dtpckerODate,#txtOCName,#txtOCAddress').val("");
    $('#lblTotal,#lblSubTotal,#lblBalance').text("");
    $('#orderTable>tbody').empty();
}

$('#txtOrderId').keyup(function (event) {
    if (event.key === 'Enter') {
        for (o of orders) {
            if (o.code === $('#txtOrderId').val()) {
                clearOrderFields();
                $('#txtOrderId').val(o.code);
                $('#cmbCustomers').val(o.customer.code);
                $('#dtpckerODate').val(o.date);
                $('#lblTotal').text(o.total);
                $('#lblSubTotal').text(o.subTotal);
                $("#lblBalance").text(o.balance);
                $('#txtCashAmount').val(o.cash);
                $('#txtDiscount').val(o.discount);
                let itemTable = $('#orderTable>tbody');
                itemTable.empty();
                let count = 0;
                for (od of o.orderDetail) {
                    let row = `<tr>
                    <th scope="row">${count + 1}</th>
                    <td>${od.item.code}</td>
                    <td>${od.item.name}</td>
                    <td>${od.item.description}</td>
                    <td>${od.item.sellingPrice}</td>
                    <td>${od.qty}</td>
                    <td>${od.cost}</td>
                    <td>
                        <button type="button" class="btn btn-danger btnRemoveFromCart">Remove</button>
                    </td>`;

                    itemTable.append(row);
                    count++;

                }
            }
        }
    }
});

