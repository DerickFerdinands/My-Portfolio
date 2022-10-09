function saveCustomer(code, name, nic, dob, address, salary) {
    customer.code = code;
    customer.name = name;
    customer.nic = nic;
    customer.dob = dob;
    customer.address = address;
    customer.salary = salary;
}

function updateCustomer(code, name, nic, dob, address, salary) {
    let customer =getCustomer(code);
    if(customer!=null){
        customer.name=name;
        customer.nic=nic;
        customer.dob=dob;
        customer.address=address;
        customer.salary=salary;
    }else{
    //    Customer Not Found Alert
    }
}

function getCustomer(code) {
    for (customer of customers){
        if(customer.code===code){
            return customer;
        }
    }
    return null;
}
$("#btnAddCustomer").click(function () {
     saveButton = $('#btnAddCustomer');
    if (String(saveButton.text()) === String("Save Customer")) {
        saveCustomer($("#txtCustomerCode").val(),$("#txtCustomerName").val(),$("#txtCustomerNIC").val(),$("#txtCustomerDOB").val(),$("#txtCustomerAddress").val(),$("#txtCustomerSalary").val())
        customers.push(customer);
    } else {
        for (customer of customers) {
            if (String(customer.code) === String(cCode)){
                customer.name = cName;
                customer.nic = cNIC;
                customer.dob = cDOB;
                customer.address = cAddress;
                customer.salary = cSalary;
            }
        }
    }
    loadCustomers();
    $('#modalTitle').text("Add Customer");
    saveButton.text("Save Customer");
});

function loadCustomers() {
    $("#tableCustomer>tbody").empty();
    let index = 1;
    for (let customer of customers) {
        var row = `<tr class="clickRows"><th scope="row">${index}</th><td>${customer.code}</td><td>${customer.name}</td><td>${customer.nic}</td><td>${customer.dob}</td><td>${customer.address}</td><td>${customer.salary}</td></tr> `;

        $("#tableCustomer>tbody").append(row);
        index++;
    }
}

$("#btnViewAll").click(function () {
    loadCustomers();
});
$('#tableCustomer').on('dblclick', '.clickRows', function () {
    this.remove();
});
$('#tableCustomer').on('click', '.clickRows', function () {
    let row = $(this).children();
    console.log(row.eq(1).text(), row.eq(2).text(), row.eq(3).text(), row.eq(4).text(), row.eq(5).text(), row.eq(6).text());
    // let details = row.split("\t");

    $("#lblCode").text(row.eq(1).text());
    $("#lblName").text(row.eq(2).text());
    $("#lblNIC").text(row.eq(3).text());
    $("#lblDOB").text(row.eq(4).text());
    $("#lblAddress").text(row.eq(5).text());
    $("#lblSalary").text(row.eq(6).text());
    $("#floatingInput").val(row.eq(1).text());
});

$('#btnSearch').click(function () {
    let searchValue = $("#floatingInput").val();
    $('#tableCustomer>tbody').empty();
    let index = 1;
    for (let customer of customers) {
        if (String(customer.code) === String(searchValue)) {
            $("#lblCode").text(customer.code);
            $("#lblName").text(customer.name);
            $("#lblNIC").text(customer.nic);
            $("#lblDOB").text(customer.dob);
            $("#lblAddress").text(customer.address);
            $("#lblSalary").text(customer.salary);
        }

        if (customer.code.includes(searchValue) || customer.name.includes(searchValue) || customer.nic.includes(searchValue) || customer.dob.includes(searchValue) || customer.address.includes(searchValue) || customer.salary.includes(searchValue)) {
            var row = `<tr class="clickRows"><th scope="row">${index}</th><td>${customer.code}</td><td>${customer.name}</td><td>${customer.nic}</td><td>${customer.dob}</td><td>${customer.address}</td><td>${customer.salary}</td></tr> script`;
            $("#tableCustomer>tbody").append(row);
            index++;
        }
    }
});

$('#btnClear').click(function () {
    $("#floatingInput").val("");
    $("#lblCode").text("-");
    $("#lblName").text("-");
    $("#lblNIC").text("-");
    $("#lblDOB").text("-");
    $("#lblAddress").text("-");
    $("#lblSalary").text("-");
    $('#tableCustomer>tbody').empty();
    clearFields();
});

function clearFields() {
    $("#txtCustomerCode").val("");
    $("#txtCustomerName").val("");
    $("#txtCustomerNIC").val("");
    $("#txtCustomerDOB").val("");
    $("#txtCustomerAddress").val("");
    $("#txtCustomerSalary").val("");
    $('#modalTitle').text("Add Customer");
    $('#btnAddCustomer').text("Save Customer");
    $("#txtCustomerCode").css('border', '1px solid grey');
    $("#txtCustomerName").css('border', '1px solid grey');
    $("#txtCustomerNIC").css('border', '1px solid grey');
    $("#txtCustomerDOB").css('border', '1px solid grey');
    $("#txtCustomerAddress").css('border', '1px solid grey');
    $("#txtCustomerSalary").css('border', '1px solid grey');
}


$('#btnDelete').click(function () {
    for (customer of customers) {
        if (String(customer.code) === String($("#floatingInput").val())) {
            let index = customers.indexOf(customer);
            customers.splice(index, 1);
        }
    }
    $("#floatingInput").val("");
    loadCustomers();
});


$('#btnUpdate').click(function () {
    $('#btnAdd').click();
    $('#modalTitle').text("Update Customer");
    $('#btnAddCustomer').text("Update Customer");

    for (customer of customers) {
        if (String(customer.code) === String($("#floatingInput").val())) {
            $("#txtCustomerCode").val(customer.code);
            $("#txtCustomerName").val(customer.name);
            $("#txtCustomerNIC").val(customer.nic);
            $("#txtCustomerDOB").val(customer.dob);
            $("#txtCustomerAddress").val(customer.address);
            $("#txtCustomerSalary").val(customer.salary);
        }
    }
    loadCustomers();
});

function addError(element) {
    element.css('border', '3px solid red');
    element.parent().children('h6').css('display', 'block');
}

function removeError(element) {
    element.css('border', '3px solid green');
    element.parent().children('h6').css('display', 'none');
}
$('.modal div>h6').css('display', 'none');

let list = [$("#txtCustomerCode"), $("#txtCustomerName"), $("#txtCustomerNIC"), $("#txtCustomerDOB"), $("#txtCustomerAddress"), $("#txtCustomerSalary")];
$("#exampleModal input").on('keyup', (function (event) {
    console.log(event.key);
    if (event.key === "Tab") {
        event.preventDefault();
    }
    let txtId = event.currentTarget.id;
    switch (txtId) {
        case "txtCustomerCode": {
            let regex = /^(C00-)[0-9]{3}$/;
            if ($("#txtCustomerCode").val().match(regex)) {
                removeError($('#txtCustomerCode'));
                if (event.keyCode === 13) {
                    $("#txtCustomerName").focus();
                }
            } else {
                addError($('#txtCustomerCode'));
            }
            break;
        }
        case "txtCustomerName": {
            let regex = /^[A-z ]{5,20}$/;
            if ($("#txtCustomerName").val().match(regex)) {
                removeError($("#txtCustomerName"));
                if (event.keyCode === 13) {
                    $("#txtCustomerNIC").focus();
                }
            } else {
                addError($("#txtCustomerName"));
            }
            break;
        }
        case "txtCustomerNIC": {
            let regex = /^[0-9]{10,15}(v)?$/;
            if ($("#txtCustomerNIC").val().match(regex)) {
                removeError($("#txtCustomerNIC"));
                if (event.keyCode === 13) {
                    // $("#txtCustomerDOB").datepicker();
                    $("#txtCustomerDOB").focus();
                }
            } else {
                addError($("#txtCustomerNIC"));
            }
            break;
        }
        case "txtCustomerDOB": {
            if (event.keyCode === 13) {
                $("#txtCustomerAddress").focus();
            }
            break;
        }
        case "txtCustomerAddress": {
            let regex = /^[A-z0-9, /.]+$/;
            if ($("#txtCustomerAddress").val().match(regex)) {
                removeError($("#txtCustomerAddress"));
                if (event.keyCode === 13) {
                    $("#txtCustomerSalary").focus();
                }
            } else {
                addError($("#txtCustomerAddress"));
            }
            break;
        }
        case "txtCustomerSalary": {
            let regex = /^[0-9]+$/;
            if ($("#txtCustomerSalary").val().match(regex)) {
                removeError($("#txtCustomerSalary"));
                if (event.keyCode === 13) {
                    $("#btnAddCustomer").click();
                    clearFields();
                    $("#txtCustomerCode").focus();
                }
            } else {
                addError($("#txtCustomerSalary"));
            }
            break;

        }
    }
}));


/*    $(window).mousemove(function (event) {
         $("#heading").css('position','absolute');
        $("#heading").css('width','max-content');
        $("#heading").css('left',event.pageX-350);
        $("#heading").css('top',event.pageY-50);
        console.log(event);
    });*/
