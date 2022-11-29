let users = [
    new User("user1", NavPath_1, "red", $('#cr1'), $('#cr2'), $('#cr3'), $('#cr4')),
    new User("user2", NavPath_2, "green", $('#cg1'), $('#cg2'), $('#cg3'), $('#cg4')),
    new User("user3", NavPath_3, "yellow", $('#cy1'), $('#cy2'), $('#cy3'), $('#cy4')),
    new User("user4", NavPath_4, "blue", $('#cb1'), $('#cb2'), $('#cb3'), $('#cb4'))];

function User(name, navPath, coinColor, place1, place2, place3, place4) {
    this.name = name;
    let score = 0;
    let path = navPath;
    let color = coinColor;
    let cPlacement = [place1, place2, place3, place4];


    this.getScore = function () {
        return score;
    }

    this.setScore = function (scr) {
        score = scr;
    }

    this.getPath = function () {
        return path;
    }

    this.getCoinCount = function () {
        return cPlacement.length;
    }

    function unbindPathBlocks() {
        path.forEach((item, index) => {
            item.getBlock().children().each(function () {
                if ($(this).attr('class') == color && ((path.length - (index + 1)) >= random)) {
                    item.getBlock().unbind();
                    item.getBlock().css('animation', 'none');
                }
            });
        });
    }


    this.animateCoinsOnPath = function () {
        let count = 0;
        path.forEach((item, index) => {

            item.getBlock().children().each(function () {
                if (count == 0) {

                    if ($(this).attr('class') == color && (path.length - (index + 1)) >= random) {
                        item.getBlock().css('animation', 'none');
                        item.getBlock().css('animation', '.5s animateBorder infinite');

                        item.getBlock().click(function () {
                            unbindPathBlocks();
                            endCoinAnimation();
                            let navPath = path.slice(index, (index + random + 1));
                            let i = 0;
                            let inter = setInterval(function () {
                                if (i != navPath.length - 1) {
                                    let jump = new Audio("assets/audio/jump.wav")
                                    jump.play();
                                    navPath[i].removeCoin(color);
                                    navPath[i + 1].addCoin(color);

                                    if (path.indexOf(navPath[i + 1]) == (path.length - 1)) {
                                        alert("pocket");
                                        scores.push(this.name);
                                        turnCount = 0;
                                    }

                                    i++;
                                } else {
                                    if ((random != 6) && (turnCount != 0)) {
                                        switchUser();
                                    }
                                    clearInterval(inter);
                                    turn = true;
                                }
                            }, 250);

                        });
                        count++;
                    }
                }
            });

            count = 0;
        });
    }

    this.animateAvailableCoins = function () {
        cPlacement.forEach((item, index) => {
            let temp = document.getElementById($(item).attr('id'));
            temp.style.animation = 'none';
            setTimeout(function () {
                temp.style.animation = '.5s animateBorder infinite';
            }, 1);

            item.click(function () {
                endCoinAnimation();
                unbindPathBlocks();
                item.children().css('transform', 'scale(0)');
                item.children().remove();
                cPlacement.splice(cPlacement.indexOf(item), 1);
                path[0].addCoin(color);
                turn = true;
            });
        });
    }

    let endCoinAnimation = function () {
        cPlacement.forEach((item, index) => {
            let temp = document.getElementById($(item).attr('id'));
            temp.style.animation = 'none';
            item.unbind();
        });
    }
    this.endAnimation = endCoinAnimation();
}


function GetCurrentUser() {
    let userItr = [users[0], users[1], users[2], users[3]];

    this.getUser = function () {
        return userItr[0];
    }

    this.switchUser = function () {
        let tempUser = userItr.shift();
        userItr.push(tempUser);
    }
}

function retrieveCoin(cls) {
    console.log('In Class!',cls);
    switch (cls) {
        case 'red': {
            let count = 0;
            $('.redCoinSurface').children().children().each(function () {
                if (count == 0) {
                    let tempPlacement = $(this);
                    console.log(tempPlacement);
                    if ((tempPlacement.children().length) == 0) {
                        console.log('true');
                        tempPlacement.append(`<img class="${cls}" src="../assets/images/redCoin.png">`);
                        count++;
                        console.log('appended');
                    }

                }
            });
            break;
        }

        case 'green': {
            let count = 0;
            $('.greenCoinSurface').children().children().each(function () {
                if (count == 0) {
                    let tempPlacement = $(this);
                    console.log(tempPlacement);
                    if ((tempPlacement.children().length) == 0) {
                        tempPlacement.append(`<img class="${cls}" src="../assets/images/greenCoin.png">`);
                        count++;
                    }

                }
            });
            break;
        }
        case 'yellow': {
            let count = 0;
            $('.yellowCoinSurface').children().children().each(function () {
                if (count == 0) {
                    let tempPlacement = $(this);
                    if ((tempPlacement.children().length) == 0) {
                        tempPlacement.append(`<img class="${cls}" src="../assets/images/yellowCoin.png">`);
                        count++;
                    }

                }
            });
            break;
        }
        case 'blue': {
            let count = 0;
            $('.blueCoinSurface').children().children().each(function () {
                if (count == 0) {
                    let tempPlacement = $(this);
                    if ((tempPlacement.children().length) == 0) {
                        tempPlacement.append('<img class="' + cls + '" style="transform: scale(0)" src="../assets/images/blueCoin.png">');
                        count++;
                    }

                }
            });
            break;
        }
    }
}