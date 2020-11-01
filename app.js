const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const http = require('http');
const infectedController = require('./controllers/infectedController');

/* Seting app */
const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* pass app to routes */
require('./routes')(app);

/* init server */
const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);

/* function that times the data record in the database with external data from a API */
const seedDb = () => {
    var minutes = 10
    var interval = minutes * 60 * 1000;
    infectedController.updateDb();
    setInterval(() => {
        infectedController.updateDb();
    }, interval);
}
seedDb();
module.exports = app;