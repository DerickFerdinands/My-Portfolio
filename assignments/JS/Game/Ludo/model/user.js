let users = [
    new User("user1",NavPath_1),
    new User("user2",NavPath_2),
    new User("user3",NavPath_3),
    new User("user4",NavPath_4)];

function User(name, navPath) {
    this.name = name;
    let score = 0;
    let path = navPath;

    this.getScore = function () {
        return score;
    }

    this.setScore = function (scr) {
        score = scr;
    }

    this.getPath = function () {
        return path;
    }
}

function getCurrentUser() {
    let userItr = [
        users[0],
        users[1],
        users[2],
        users[3]];
}