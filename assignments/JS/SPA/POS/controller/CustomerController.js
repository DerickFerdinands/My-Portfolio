function saveCustomer(code, name, nic, dob, address, salary) {
    customer.code = code;
    customer.name = name;
    customer.nic = nic;
    customer.dob = dob;
    customer.address = address;
    customer.salary = salary;
    customers.push(customer);
    loadCustomers();
    $('#modalTitle').text("Add Customer");
    saveButton.text("Save Customer");
}

function updateCustomer(code, name, nic, dob, address, salary) {
    let customer = getCustomer(code);
    if (customer != null) {
        if (confirm("No Take Backs, Wanna Proceed?")) {
            customer.name = name;
            customer.nic = nic;
            customer.dob = dob;
            customer.address = address;
            customer.salary = salary;
            loadCustomers();
            $('#modalTitle').text("Add Customer");
            saveButton.text("Save Customer");
        }
    } else {
        // Customer Not Found Alert
        alert("Customer Not Found")
        // callAlert("alert","Error","Customer Not Found");
    }
}

function getCustomer(code) {
    for (customer of customers) {
        if (customer.code === code) {
            return customer;
        }
    }
    return null;
}

function deleteCustomer(code) {
    let customer = getCustomer(code);
    if (customer != null) {
        if (confirm("No Take Backs, Wanna Proceed?")) {
            customers.splice(customers.indexOf(customer));
            loadCustomers();
        }
    } else {
        alert("Customer Not Found!")
    }

}

function loadCustomers() {
    $("#tableCustomer>tbody").empty();
    let index = 1;
    for (let customer of customers) {
        var row = `<tr class="clickRows"><th scope="row">${index}</th><td>${customer.code}</td><td>${customer.name}</td><td>${customer.nic}</td><td>${customer.dob}</td><td>${customer.address}</td><td>${customer.salary}</td></tr> `;
        $("#tableCustomer>tbody").append(row);
        index++;
    }
}

$("#btnAddCustomer").click(function () {
    saveButton = $('#btnAddCustomer');
    if (String(saveButton.text()) === String("Save Customer")) {
        saveCustomer($("#txtCustomerCode").val(), $("#txtCustomerName").val(), $("#txtCustomerNIC").val(), $("#txtCustomerDOB").val(), $("#txtCustomerAddress").val(), $("#txtCustomerSalary").val())

    } else {
        updateCustomer($("#txtCustomerCode").val(), $("#txtCustomerName").val(), $("#txtCustomerNIC").val(), $("#txtCustomerDOB").val(), $("#txtCustomerAddress").val(), $("#txtCustomerSalary").val())
    }

});


$("#btnViewAll").click(function () {
    loadCustomers();
});
$('#tableCustomer').on('dblclick', '.clickRows', function () {
    let row =
        deleteCustomer($(this).children().eq(1).text());
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
    deleteCustomer($("#floatingInput").val())
});

$('#btnUpdate').click(function () {
    $('#btnAdd').click();
    $('#modalTitle').text("Update Customer");
    $('#btnAddCustomer').text("Update Customer");
    updateCustomer($("#floatingInput").val());
});


$('.modal div>h6').css('display', 'none');

const cusIdRegex = /^(C00-)[0-9]{1,3}$/;
const cusNameRegEx = /^[A-z ]{5,20}$/;
const cusNICRegEx = /^[0-9]{10,15}(v)?$/;
const cusAddressRegEx = /^[0-9/A-z. ,]{7,}$/;
const cusSalaryRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/


let customerValidation = [];
customerValidation.push({
    element: $("#txtCustomerCode"),
    pattern: cusIdRegex,
    error: 'Invalid Customer ID Pattern : C00-001'
});

customerValidation.push({
    element:$("#txtCustomerName"),
    pattern: cusNameRegEx,
    error: 'Invalid Customer Name Pattern : A-z 5-20'
});

customerValidation.push({
    element:$("#txtCustomerNIC"),
    pattern: cusNICRegEx,
    error: 'Invalid Customer NIC Pattern : 2xxxxxxxxxxx || 2xxxxxxxxxv'
});

customerValidation.push({
    element:$("#txtCustomerAddress"),
    pattern: cusAddressRegEx,
    error:'Invalid Customer Address Pattern : A-z 0-9 ,/'
});

customerValidation.push({
    element:$("#txtCustomerSalary"),
    pattern: cusSalaryRegEx,
    error:'Invalid Customer Salary Pattern : 100 or 100.00'
});

checkValidity(customerValidation);

$("#exampleModal input").on('keyup', (function (event) {
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

