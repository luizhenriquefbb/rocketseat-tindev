const express = require('express');
const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');
const DislikeController = require('./controllers/DislikeController');

const routes = new express.Router();

// hello word
routes.get('/', (req, res) => {
    return res.json({ok : "adasd"});
} )

// Dev routes
routes.post('/new_dev', DevController.store );
routes.get('/devs', DevController.index );


// Like routes
routes.post('/like/:userId', LikeController.store ); // access via req.params.userId
routes.post('/dislike/:userId', DislikeController.store ); // access via req.params.userId


module.exports = routes;
