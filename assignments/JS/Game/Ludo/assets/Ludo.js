let random = 6;
let scores = [];
let turn = true;
$(window).on('load', function () {
    $('section, aside, div').css('display', '');
    $('main>img').css('display', 'none');
    $('body').css('background', '');

    $('#playerForm').modal('show');
});

$('#submitPlayers').click(function () {
    let user01 = "";
    let user02 = "";
    let user03 = "";
    let user04 = "";
    if($('#player1').val().length>0){
        user01=$('#player1').val();
        $('#player1').css('border','2px solid grey');
    }else{
        $('#player1').css('border','2px solid red');
    }
    if($('#player2').val().length>0){
        user02=$('#player2').val();
         $('#player2').css('border','2px solid grey');
    }else{
        $('#player2').css('border','2px solid red');
    }
    if($('#player3').val().length>0){
        user03=$('#player3').val();
        $('#player3').css('border','2px solid grey');
    }else{
        $('#player3').css('border','2px solid red');
    }
    if($('#player4').val().length>0){
        user04=$('#player4').val();
         $('#player4').css('border','2px solid grey');
    }else{
        $('#player4').css('border','2px solid red');
    }

    if((user01.length>0)&&(user02.length>0)&&(user03.length>0)&&(user04.length>0)){
        $('#txtUser01').text(user01);
        $('#txtUser02').text(user02);
        $('#txtUser03').text(user03);
        $('#txtUser04').text(user04);
        $('#playerForm').modal('hide');
    }

    $('#txtUser01').text();
});

$('document').ready(function () {
    $('section, aside, div').css('display', 'none');
    $('body').css('background', '#F0EEF0');
});
$('#dice').click(function () {
    if (turn) {
        turn = false;
        random = Math.floor((Math.random() * 6) + 1);
        console.log(random);
        var obj = this;
        let dice = $(this);
        this.style.animation = 'none';
        setTimeout(function () {
            obj.style.animation = '.5s dice-animation linear 1';
        }, 1);

        setTimeout(function () {
            dice.css('transition', 'all .5s ease-out');
            switch (random) {
                case 1:
                    dice.css('transform', 'rotateX(0deg) rotateY(0deg)');
                    break;
                case 2:
                    dice.css('transform', 'rotateX(180deg) rotateY(0deg)');
                    break;
                case 3:
                    dice.css('transform', 'rotateX(0deg) rotateY(90deg)');
                    break;
                case 4:
                    dice.css('transform', 'rotateX(0deg) rotateY(270deg)');
                    break;
                case 5:
                    dice.css('transform', 'rotateX(270deg) rotateY(0deg)');
                    break;
                case 6:
                    dice.css('transform', 'rotateX(90deg) rotateY(0deg)');
                    break;

            }
        }, 500);

        setTimeout(checkUserTurn(), 4000);
    }
});
let user = null;
let UserItr = new GetCurrentUser();

function checkUserQualification() {
    return false;
}


let turnCount = 0;

function checkUserTurn() {
    user = UserItr.getUser();
    if (random == 6) {
        user.animateAvailableCoins();
        turnCount = 0;
        user.animateCoinsOnPath();

    } else if ((user.getCoinCount() < 4) && (turnCount == 0)) {
        user.animateCoinsOnPath();
        turnCount++;
    } else {
        setTimeout(switchUser,1200);
        turn = true;
    }
}

function switchUser() {
    UserItr.switchUser();
    let boardAngle = getCurrentRotation(".board");
    let imgAngle = getCurrentRotation('.coinPlacement');
    $('main>section').css('transform', 'rotate(' + (boardAngle - 90) + 'deg)');
    $('.coinPlacement').css('transform', 'rotate(' + (imgAngle + 90) + 'deg)');
    turnCount = 0;
}

function getCurrentRotation(elid) {
    var el = document.querySelectorAll(elid)[0];
    var st = window.getComputedStyle(el, null);
    var tr = st.getPropertyValue("-webkit-transform") ||
        st.getPropertyValue("-moz-transform") ||
        st.getPropertyValue("-ms-transform") ||
        st.getPropertyValue("-o-transform") ||
        st.getPropertyValue("transform") ||
        "fail...";

    if (tr !== "none") {
        var values = tr.split('(')[1];
        values = values.split(')')[0];
        values = values.split(',');
        var a = values[0];
        var b = values[1];
        var c = values[2];
        var d = values[3];

        var scale = Math.sqrt(a * a + b * b);

        var radians = Math.atan2(b, a);
        var angle = Math.round(radians * (180 / Math.PI));
        return angle;

    } else {
        var angle = 0;
        return angle;
    }
}
