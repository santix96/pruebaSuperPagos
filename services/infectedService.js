const axios = require('axios');
const Infected = require('../models').infected;
const Sequelize = require('sequelize');

const createInfected = async (newInfected) => {
  try {
    return await Infected.create(newInfected);
  } catch (error) {
    console.error("Error en el servicio de creacion", error);
    return error;
  }
}


/**
 * This method get all infecteds since the API
 */
const getLastInfected = async () => {
  try {
    return await Infected.max("id_de_caso");
  } catch (error) {
    console.error("Error en el servicio de creacion", error);
    return error;
  }
}

/**
 * This method get all infecteds since the API
 */
const getAllInfecteds = async () => {
  try {
    return await axios.get('https://www.datos.gov.co/resource/gt2j-8ykr.json');
  } catch (error) {
    console.error("Error en el servicio en la carga de infectados", error);
    return error;
  }
}



module.exports = {
  createInfected,
  getAllInfecteds,
  getLastInfected
}