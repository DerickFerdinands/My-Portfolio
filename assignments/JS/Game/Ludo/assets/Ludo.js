let random = 0;


$('#dice').click(function () {
    random = Math.floor((Math.random() * 6) + 1);
    console.log(random);
    var obj = this;
    let dice =$(this);
    this.style.animation = 'none';
    setTimeout(function() {
        obj.style.animation = '3s dice-animation 1';
    }, 10);

    setTimeout(function () {
        dice.css('transition','all .5s ease-out');
    switch (random) {
        case 1:dice.css('transform','rotateX(0deg) rotateY(0deg)');break;
        case 2:dice.css('transform','rotateX(180deg) rotateY(0deg)');break;
        case 3:dice.css('transform','rotateX(0deg) rotateY(90deg)');break;
        case 4:dice.css('transform','rotateX(0deg) rotateY(270deg)');break;
        case 5:dice.css('transform','rotateX(270deg) rotateY(0deg)');break;
        case 6:dice.css('transform','rotateX(90deg) rotateY(0deg)');break;

    }
    },3100);
});