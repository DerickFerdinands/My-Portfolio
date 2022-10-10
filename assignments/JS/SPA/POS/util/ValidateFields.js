function checkValidity(valArr) {
    let empty=0;
    for (obj of valArr) {
        let tempElem = obj.element;
        tempElem.on('keyup', function () {
            if (tempElem.val().length <= 0) {
                if (check(tempElem, obj.pattern)) {
                    removeError(tempElem);
                }else{
                    addError(tempElem)
                }
            }

        });
    }
}

function check(elem, pattern) {
    return pattern.text(elem.val()) ? true : false;
}

function addError(element) {
    element.css('border', '3px solid red');
    element.parent().children('h6').css('display', 'block');
}

function removeError(element) {
    element.css('border', '3px solid green');
    element.parent().children('h6').css('display', 'none');
}
