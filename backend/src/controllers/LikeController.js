const Devs = require("../models/Devs")
module.exports = {
    async store(req, res) {
        const receiving_id = req.params.userId;
        const user = req.headers.user;

        console.log('user', user);
        console.log('receiving', receiving_id);

        const loggedDev = await Devs.findById(user);
        const targetDev = await Devs.findById(receiving_id);

        // handle wrong input
        if (!targetDev) {
            res.status(400).json({ reason: "dev not exists " }); // (bad request)
        }

        // already liked
        if (loggedDev.likes.includes(receiving_id)){
            return res.json({ loggedDev });
        }

        loggedDev.likes.push(receiving_id);

        // check for match
        if (targetDev.likes.includes(user)){
            const receiving_id_socket = req.connectedUsersHandler.getSocketIdByUserId(receiving_id);
            const user_socket = req.connectedUsersHandler.getSocketIdByUserId(user);

            // we should save this match to send a notification to the user if he is offline at the moment.
            // for now he only will receive the match if he is online
            if (receiving_id_socket) {
                req.io.to(receiving_id_socket).emit("match", { other_dev: loggedDev });
            }
            if (user_socket) {
                req.io.to(user_socket).emit("match", { other_dev: targetDev });
            }
        }


        // update database
        await loggedDev.save();


        return res.json({ loggedDev });

    },
};
