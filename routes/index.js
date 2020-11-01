const infectedController = require('../controllers/infectedController')

/**
 * Routes
 */
module.exports = (app) => {
    app.get('/api/reto1', infectedController.getOrderedInfecteds);
    app.get('/api/reto2/:sexo?/:estado?/:ciudad_municipio_nom?', infectedController.getInfectedsWithFilter);
    app.post('/api/infected/create', infectedController.createInfected);
    app.get('*', (req, res) => res.status(200).send("Prueba express superpagos"));
 };