const infectedService = require('../services/infectedService');
const infectedController = require('../controllers/infectedController')

module.exports = (app) => {
    app.get('/api/reto1', infectedController.getOrderedInfecteds);
    app.get('/api/reto2/:gender?/:state?/:city?', infectedController.createInfected);
    app.post('/api/infected/create', infectedController.createInfected);
    app.get('*', (req, res) => res.status(200).send("Prueba express superpagos"));
 };