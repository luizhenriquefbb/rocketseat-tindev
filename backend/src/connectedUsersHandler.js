// bad way to handle a map. Do not use node memory to store data.
// But because this is only a toy problem and it is for academics proposes, I will ignore that.

// This class will store a map between logged developers and sockets ids
class ConnectedUsersHandler {
    constructor() {
        this.connectedUsers = {};
    }

    new_user(user_id, socket_id){
        this.connectedUsers[user_id] = socket_id;
    }

    getSocketIdByUserId(user_id){
        return this.connectedUsers[user_id];
    }


}


module.exports = new ConnectedUsersHandler();