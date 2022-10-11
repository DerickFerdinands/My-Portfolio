function loadAllCustomerCodes(){
    let count=0;
    for (customer of customers){
        $('#cmbCustomers').append(`<option value="${count}">${customer.code}</option>`);
        count++;
    }
}

function loadAllItemCodes(){
    let count=0;
    for (item of items){
        $('#cmbItems').append(`<option value="${count}">${item.code}</option>`);
        count++;
    }
}