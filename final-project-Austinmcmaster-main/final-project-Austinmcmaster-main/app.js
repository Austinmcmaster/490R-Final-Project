const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');
const passport = require('passport')
const cors = require("cors");
require('dotenv/config');

require('./config/passport')(passport)

const corsOptions = {
	origin: "http://localhost:3000"
};

mongoose.connect(process.env.DB_connection, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        const app = express();
        //middleware
        app.use(cors (corsOptions));
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json());
        app.use('/api/auth', routes.auth);
        app.use('/api/users',passport.authenticate('jwt',{session:false}), routes.user);
        app.use('/api/events', passport.authenticate('jwt', {session: false}), routes.events);
        // Listening
        app.listen(5000, () => {
            console.log("Server has started on local host 5000!")});

        app.get('/', (req,res) => {
            res.send("We home baby!")});
    })
    
    .catch((error) => {
        console.log("Mongo Connection Error", error); 
        process.exit();
    });
    


