var _ = require('lodash');

class Users {
    constructor(){
        this.users = [];
    }
    addUser(id,name,room){
        var user = {id,name,room};
        this.users.push(user);
        return user;
    }

    removeUser(id){
        var user = _.remove(this.users, function(user){
            return user.id === id;
        });

        return user[0];
    }

    getUser(id){
        var user = this.users.filter((user)=> user.id === id)[0];

        return user;
    }

    getUserList(room){
        var users = this.users.filter((user)=> user.room === room);
        var namesArray = users.map((user)=> user.name);

        return namesArray;
    }
}

module.exports = {Users};