const express = require('express');
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();

//Middleware
app.use(morgan(`Server Logger`));
app.use('/storage/avatar', express.static('storage/avatar'));
app.use('/storage/wallpaper', express.static('storage/wallpaper'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

//Routers
const API_VERSION = "/v1/";

const userRoutes = require('./api/routes/user1');
const clientRoutes = require('./api/routes/client');
const machineRoutes = require('./api/routes/machine');

// const questionRoutes = require('./api/routes/question');
// const answerRoutes = require('./api/routes/answer');

// const notificationRoutes = require('./api/routes/notification');

//Bind routers
app.use(API_VERSION + 'users', userRoutes);
app.use(API_VERSION + 'client', clientRoutes);
app.use(API_VERSION + 'machine', machineRoutes);
// app.use(API_VERSION + 'room', roomRoutes);

// app.use(API_VERSION + 'feeds', feedRoutes);
// app.use(API_VERSION + 'questions', questionRoutes);
// app.use(API_VERSION + 'answers', answerRoutes);
// app.use(API_VERSION + 'follows', followRoutes);
// app.use(API_VERSION + 'reacts', reactRoutes);
// app.use(API_VERSION + 'notifications', notificationRoutes);

//Errors handle
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    const status = error.status || 500;
    res.status(status);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;