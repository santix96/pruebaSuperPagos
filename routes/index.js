const UserService = require('../services/userService')
module.exports = (app) => {
    app.get('/api/reto1', UserService.getOrderUsers);
    app.get('/api/reto2/:gender?/:state?/:city?', UserService.getOrderUsers);
    app.get('*', (req, res) => res.status(200).send("Prueba express superpagos"));
 };