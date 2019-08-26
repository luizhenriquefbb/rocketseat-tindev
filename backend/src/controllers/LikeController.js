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
            console.log('>> TODO: handle match');
        }


        // update database
        await loggedDev.save();


        return res.json({ loggedDev });

    },
};
