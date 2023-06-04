class Activity {
    constructor(id, name, userId, description) {
        this.id = id;
        this.name = name;
        this.userId = userId;
        this.description = description
        this.achievements = [];
    }
}

module.exports = Activity;
