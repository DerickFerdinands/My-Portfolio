let users = [
    new User("user1", NavPath_1,"red", $('#cr1'), $('#cr2'), $('#cr3'), $('#cr4')),
    new User("user2", NavPath_2,"green", $('#cg1'), $('#cg2'), $('#cg3'), $('#cg4')),
    new User("user3", NavPath_3,"yellow", $('#cy1'), $('#cy2'), $('#cy3'), $('#cy4')),
    new User("user4", NavPath_4,"blue", $('#cb1'), $('#cb2'), $('#cb3'), $('#cb4'))];

function User(name, navPath, coinColor, place1, place2, place3, place4) {
    this.name = name;
    let score = 0;
    let path = navPath;
    let color = coinColor;
    let cPlacement = [place1,place2,place3,place4];


    this.getScore = function () {
        return score;
    }

    this.setScore = function (scr) {
        score = scr;
    }

    this.getPath = function () {
        return path;
    }

    this.animateAvailableCoins = function () {
    cPlacement.forEach((item,index) => {
        let temp = document.getElementById($(item).attr('id'));
        temp.style.animation = 'none';
        setTimeout(function () {
            temp.style.animation = '.5s animateBorder infinite';
        },1);

        item.click(function () {
            endCoinAnimation();
            item.children().remove();
            cPlacement.splice(cPlacement.indexOf(item));
            path[0].addCoin(color);

        });
    });
    }

    let endCoinAnimation= function () {
        cPlacement.forEach((item,index) => {
            let temp = document.getElementById($(item).attr('id'));
            temp.style.animation = 'none';
        });
    }
    this.endAnimation=endCoinAnimation()
}


function GetCurrentUser() {
    let userItr = [
        users[0],
        users[1],
        users[2],
        users[3]];

    this.getUser = function () {
        return userItr[0];
    }

    this.switchUser = function () {
        let tempUser = userItr.shift();
        userItr.push(tempUser);
    }
}