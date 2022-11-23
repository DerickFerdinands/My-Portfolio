let users = [new User("user1"), new User("user2"), new User("user3"), new User("user4")];

function User(name) {
    this.name = name;
    let score = 0;

    this.getScore = function () {
        return score;
    }

    this.setScore = function (scr) {
        score = scr;
    }
}

function getCurrentUser() {
    let userItr=[users[0],users[1],users[2],users[3]];
}