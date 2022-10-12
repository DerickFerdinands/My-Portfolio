const itemIdRegex = /^(I00-)[0-9]{1,3}$/;
const itemNameRegEx = /^[A-z ]{5,20}$/;
const itemDescriptionRegEx = /^[0-9/A-z. ,-]{7,}$/;
const itemBPRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;
const itemSPRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;
const itemQtyRegEx = /^[0-9]{1,}$/;


let itemValidation = [];
itemValidation.push({element: $("#txtItemCode"), pattern: itemIdRegex});
itemValidation.push({element: $("#txtItemName"), pattern: itemNameRegEx});
itemValidation.push({element: $("#txtItemDescription"), pattern: itemDescriptionRegEx});
itemValidation.push({element: $("#txtItemBP"), pattern:itemBPRegEx });
itemValidation.push({element: $("#txtItemSP"), pattern: itemSPRegEx});
itemValidation.push({element: $("#txtItemQty"), pattern: itemQtyRegEx});
checkValidity(itemValidation, $("#btnAddItem"));


function saveItem(code, name, description, BP, SP, Qty) {
    item = new Object({
        code : code,
        name: name,
        description: description,
        buyingPrice: BP,
        sellingPrice: SP,
        qty: Qty
    });

    items.push(item);
    loadItems();
    $('#itemModalTitle').text("Add Item");
    $('#btnAddItem').text("Save Item");

}

function updateItem(code, name, description, BP, SP, Qty) {
    let item = getItem(code);
    if (item != null) {
        if (confirm("No Take Backs, Wanna Proceed?")) {
            item.name = name;
            item.description = description;
            item.buyingPrice = BP;
            item.sellingPrice = SP;
            item.qty = Qty;
            loadItems();
            $('#itemModalTitle').text("Add Item");
            $('#btnAddItem').text("Save Item");
        }
    } else {
        // Item Not Found Alert
        alert("Item Not Found")
        // callAlert("alert","Error","Customer Not Found");
    }
}

function getItem(code) {
    for (item of items) {
        if (item.code == code) {
            return item;
        }
    }
    return null;
}

function deleteItem(code) {
    let item = getItem(code);
    if (item != null) {
        if (confirm("No Take Backs, Do You Want To Delete Item: "+code+" ?")) {
            items.splice(items.indexOf(item));
            loadItems();
        }
    } else {
        alert("Item Not Found!")
    }

}

function loadItems() {
    $("#tableItem>tbody").empty();
    let index = 1;
    for (let item of items) {
        var row = `<tr class="clickRows"><th scope="row">${index}</th><td>${item.code}</td><td>${item.name}</td><td>${item.description}</td><td>${item.buyingPrice}</td><td>${item.sellingPrice}</td><td>${item.qty}</td></tr> `;
        $("#tableItem>tbody").append(row);
        index++;
    }
    loadAllItemCodes();
}

$("#btnAddItem").click(function () {
    saveButton = $('#btnAddItem');
    if (String(saveButton.text()) === String("Save Item")) {
        saveItem($("#txtItemCode").val(), $("#txtItemName").val(), $("#txtItemDescription").val(), $("#txtItemBP").val(), $("#txtItemSP").val(), $("#txtItemQty").val());

    } else {
        updateItem($("#txtItemCode").val(), $("#txtItemName").val(), $("#txtItemDescription").val(), $("#txtItemBP").val(), $("#txtItemSP").val(), $("#txtItemQty").val());
    }
    clearItemFields();
});


$("#btnItemViewAll").click(function () {
    loadItems();
});
$('#tableItem').on('dblclick', '.clickRows', function () {
    let row = deleteItem($(this).children().eq(1).text());
});
$('#tableItem').on('click', '.clickRows', function () {
    let row = $(this).children();
    $("#lblItemCode").text(row.eq(1).text());
    $("#lblItemName").text(row.eq(2).text());
    $("#lblItemDescription").text(row.eq(3).text());
    $("#lblItemBP").text(row.eq(4).text());
    $("#lblItemSP").text(row.eq(5).text());
    $("#lblItemQty").text(row.eq(6).text());
    $("#txtItemSearch").val(row.eq(1).text());
});

$('#btnItemSearch').click(function () {
    let searchValue = $("#txtItemSearch").val();
    $('#tableItem>tbody').empty();
    let index = 1;
    for (let item of items) {
        if (String(item.code) === String(searchValue)) {
            $("#lblItemCode").text(item.code);
            $("#lblItemName").text(item.name);
            $("#lblItemDescription").text(item.description);
            $("#lblItemBP").text(item.buyingPrice);
            $("#lblItemSP").text(item.sellingPrice);
            $("#lblItemQty").text(item.qty);
        }

        if (item.code.includes(searchValue) || item.name.includes(searchValue) || item.description.includes(searchValue) || item.buyingPrice.includes(searchValue) || item.sellingPrice.includes(searchValue) || item.qty.includes(searchValue)) {
            var row = `<tr class="clickRows"><th scope="row">${index}</th><td>${item.code}</td><td>${item.name}</td><td>${item.description}</td><td>${item.buyingPrice}</td><td>${item.sellingPrice}</td><td>${item.qty}</td></tr> script`;
            $("#tableItem>tbody").append(row);
            index++;
        }
    }
});

$('#btnItemClear').click(function () {
    $("#txtItemSearch").val("");
    $("#lblItemCode").text("-");
    $("#lblItemName").text("-");
    $("#lblItemDescription").text("-");
    $("#lblItemBP").text("-");
    $("#lblItemSP").text("-");
    $("#lblItemQty").text("-");
    clearItemFields();
});

function clearItemFields() {
    $("#txtItemCode").val("");
    $("#txtItemName").val("");
    $("#txtItemDescription").val("");
    $("#txtItemBP").val("");
    $("#txtItemSP").val("");
    $("#txtItemQty").val("");
    $('#itemModalTitle').text("Add Item");
    $('#btnAddItem').text("Save Item");
    $("#txtItemCode").css('border', '1px solid grey');
    $("#txtItemName").css('border', '1px solid grey');
    $("#txtItemDescription").css('border', '1px solid grey');
    $("#txtItemBP").css('border', '1px solid grey');
    $("#txtItemSP").css('border', '1px solid grey');
    $("#txtItemQty").css('border', '1px solid grey');
}


$('#btnItemDelete').click(function () {
    deleteItem($("#txtItemSearch").val())
});


$('#btnItemClose').click(function () {
    $('#itemModalTitle').text("Add Item");
    $('#btnAddItem').text("Save Item");
});

$('#btnItemUpdate').click(function () {
    $('#itemModalTitle').text("Update Item");
    $('#btnAddItem').text("Update Item");
    let item = getItem($("#txtItemSearch").val());
    $("#txtItemCode").val(item.code);
    $("#txtItemName").val(item.name);
    $("#txtItemDescription").val(item.description);
    $("#txtItemBP").val(item.buyingPrice);
    $("#txtItemSP").val(item.sellingPrice);
    $("#txtItemQty").val(item.qty);
    $('#btnItemModal').click();

});


$('.modal div>h6').css('display', 'none');



