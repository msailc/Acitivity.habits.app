class User {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.activities = [];
    }
}

module.exports = User;
