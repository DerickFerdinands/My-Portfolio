
function checkValidity(valArr, button) {
    let errArr = [];
    let btn;
    for( val of valArr){
        errArr.push(val.element);
    }
    console.log(errArr);
    btn=button;
    for (let i = 0; i < valArr.length; i++) {
        let tempElem = valArr[i].element;
        tempElem.on('keyup', function () {
            justifyFields(valArr[i < (valArr.length - 1) ? (i + 1) : i].element, tempElem, valArr[i].pattern);
            updateButtonStatus();
        });
    }



    function justifyFields(nextElem, tempElem, pattern) {
            if (check(tempElem, pattern)) {
                console.log(errArr);
                removeError(tempElem);
                removeFromErrArr(tempElem);
                focusOnNextField(tempElem, pattern, nextElem);
            } else {
                addError(tempElem);
                addToErrArr(tempElem);
            }

    }

    function focusOnNextField(tempElem, pattern, nextElem) {
        tempElem.on('keyup', function (event) {
            if (event.key === "Enter" && check(tempElem, pattern)) {
                if (tempElem===nextElem) {
                    console.log("One one")
                    btn.click();
                    valArr[0].element.focus();
                  /*  for( val of valArr){
                        errArr.push(val.element);
                    }*/
                } else {
                    nextElem.focus();
                    addToErrArr(nextElem);
                }
            }
        });
    }


    function addToErrArr(elem) {
        if (errArr.indexOf(elem) < 0) {
            errArr.push(elem);
        }
    }

    function removeFromErrArr(elem) {
        if (errArr.indexOf(elem) >= 0) {
            errArr.splice(errArr.indexOf(elem),1);

        }
    }

    function updateButtonStatus() {
        if (errArr.length > 0) {
            btn.attr('disabled', true);
        } else {
            btn.attr('disabled', false);
        }
    }

    function check(elem, pattern) {
        return pattern.test(elem.val());
    }

    function addError(element) {
        element.css('border', '2px solid red');
        element.parent().children('h6').css('display', 'block');
    }

    function removeError(element) {
        element.css('border', '2px solid green');
        element.parent().children('h6').css('display', 'none');
    }
}


