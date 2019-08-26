const Devs = require("../models/Devs");
const axios = require("axios");
const { GITHUB_API } = require("../config/consts");

module.exports = {
    async store(req, res) {

        if (!req.body) {
            return res.json({ "ok": false, "reason": "req.body is undefined" });
        }

        const { username } = req.body;

        // first, check if user already exists
        const userExists = await Devs.findOne( {user : username });
        if (userExists){
            return res.json({ new_user: userExists });
        }

        // from username, get profile from github
        const response = await axios.get(`${GITHUB_API}${username}`)

        // deconstruct response.data and get what we want
        const {
            name,
            login : user,
            bio,
            avatar_url : avatar,
        } = response.data;

        // insert in DB
        const new_user = await Devs.create({
            name : name ? name : "-",
            user,
            bio,
            avatar,
        });


        return res.json({ new_user });

    },

    async index(req, res) {

        const user_id  = req.headers.user;

        // first, check if user already exists
        const user = await Devs.findById(user_id);

        // search in dev users neither liked neither disliked
        const users = await Devs.find({
            $and :[
                { _id: { $ne: user_id } }, // must be different from current user ($ne == 'not equal')
                { _id: { $nin: user.likes } }, // ($nin == 'not in')
                { _id: { $nin: user.dislikes } }, // ($nin == 'not in')
            ]
        });


        return res.json({users});

    },
};
