const cusIdRegex = /^(C00-)[0-9]{1,3}$/;
const cusNameRegEx = /^[A-z ]{5,20}$/;
const cusNICRegEx = /^[0-9]{10,15}(v)?$/;
const cusDOBRegex = /^[0-9]{4}(-)[0-9]{2}(-)[0-9]{2}$/;
const cusAddressRegEx = /^[0-9/A-z. ,]{7,}$/;
const cusSalaryRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;


let customerValidation = [];
customerValidation.push({element: $("#txtCustomerCode"), pattern: cusIdRegex});
customerValidation.push({element: $("#txtCustomerName"), pattern: cusNameRegEx});
customerValidation.push({element: $("#txtCustomerNIC"), pattern: cusNICRegEx});
customerValidation.push({element: $("#txtCustomerDOB"), pattern:cusDOBRegex });
customerValidation.push({element: $("#txtCustomerAddress"), pattern: cusAddressRegEx});
customerValidation.push({element: $("#txtCustomerSalary"), pattern: cusSalaryRegEx});
checkValidity(customerValidation, $("#btnAddCustomer"));


function saveCustomer(code, name, nic, dob, address, salary) {
    customer = new Object({
        code : code,
        name: name,
        nic: nic,
        dob: dob,
        address: address,
        salary: salary
    });
    console.log('saveCustomer Ran Once');
    customers.push(customer);
    loadCustomers();
    $('#modalTitle').text("Add Customer");
    $('#btnAddCustomer').text("Save Customer");

    // swal("Success!", "Customer Added Successfully", "success");
/*    Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: '"Customer Added Successfully',
        showConfirmButton: false,
        timer: 1000
    });*/
    $("#txtCustomerCode").focus();
}

function updateCustomer(code, name, nic, dob, address, salary) {
    let customer = getCustomer(code);
    if (customer != null) {
        Swal.fire({
            title: 'Are you sure?',
            text: "No Take Backs, Wanna Proceed?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'continue'
        }).then((result) => {
            if (result.isConfirmed) {
                customer.name = name;
                customer.nic = nic;
                customer.dob = dob;
                customer.address = address;
                customer.salary = salary;
                loadCustomers();
                $('#modalTitle').text("Add Customer");
                saveButton.text("Save Customer");
                Swal.fire({
                    position: 'bottom-end',
                    icon: 'success',
                    title: '"Customer Updated Successfully',
                    showConfirmButton: false,
                    timer: 1000
                });
            }
        });

    } else {
        // Customer Not Found Alert
        // alert("Customer Not Found")
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Customer Not Found!'
        })
        // callAlert("alert","Error","Customer Not Found");
    }
}

function getCustomer(code) {
    for (c of customers) {
        if (c.code === code) {
            return c;
        }
    }
    return null;
}

function deleteCustomer(code) {
    let customer = getCustomer(code);
    if (customer != null) {
        Swal.fire({
            title: 'Are you sure?',
            text: "No Take Backs,Do You Want To Delete Customer: "+code+" ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'continue'
        }).then((result) => {
            if (result.isConfirmed) {
                customers.splice(customers.indexOf(customer),1);
                loadCustomers();
                Swal.fire({
                    position: 'bottom-end',
                    icon: 'success',
                    title: '"Customer Deleted Successfully',
                    showConfirmButton: false,
                    timer: 1000
                });
            }
        });

    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Customer Not Found!'
        })
    }

}

function loadCustomers() {
    console.log("called once");
    $("#tableCustomer>tbody").empty();
    let index = 1;
    for ( customer of customers) {
        var row = `<tr class="clickRows"><th scope="row">${index}</th><td>${customer.code}</td><td>${customer.name}</td><td>${customer.nic}</td><td>${customer.dob}</td><td>${customer.address}</td><td>${customer.salary}</td></tr> `;
        $("#tableCustomer>tbody").append(row);
        index++;
    }
    loadAllCustomerCodes();
}

$("#btnAddCustomer").click(function () {
    saveButton = $('#btnAddCustomer');
    if (String(saveButton.text()) === String("Save Customer")) {
        saveCustomer($("#txtCustomerCode").val(), $("#txtCustomerName").val(), $("#txtCustomerNIC").val(), $("#txtCustomerDOB").val(), $("#txtCustomerAddress").val(), $("#txtCustomerSalary").val());

    } else {
        updateCustomer($("#txtCustomerCode").val(), $("#txtCustomerName").val(), $("#txtCustomerNIC").val(), $("#txtCustomerDOB").val(), $("#txtCustomerAddress").val(), $("#txtCustomerSalary").val());
    }
    clearFields();
});


$("#btnViewAll").click(function () {
    loadCustomers();
});
$('#tableCustomer').on('dblclick', '.clickRows', function () {
    let row = deleteCustomer($(this).children().eq(1).text());
});
$('#tableCustomer').on('click', '.clickRows', function () {
    let row = $(this).children();
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
    for ( customer of customers) {
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


$('#cModalCloseBtn').click(function () {
    $('#modalTitle').text("Add Customer");
    $('#btnAddCustomer').text("Save Customer");
});

$('#btnUpdate').click(function () {
    $('#modalTitle').text("Update Customer");
    $('#btnAddCustomer').text("Update Customer");
    let cus = getCustomer($("#floatingInput").val());
    $("#txtCustomerCode").val(cus.code);
    $("#txtCustomerName").val(cus.name);
    $("#txtCustomerNIC").val(cus.nic);
    $("#txtCustomerDOB").val(cus.dob);
    $("#txtCustomerAddress").val(cus.address);
    $("#txtCustomerSalary").val(cus.salary);
    $('#btnAdd').click();

});


$('.modal div>h6').css('display', 'none');



