const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');


const http = require('http');
const infectedController = require('./controllers/infectedController');
const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./routes')(app);

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);

const seedDb = () => {
    var minutes = 1
    var interval = minutes * 4 * 1000;
    setInterval(() => {
        infectedController.updateDb();
    }, interval);
}
seedDb();
module.exports = app;