const axios = require('axios');
const Infected = require('../models').infected;

/**
 * Create a new infected and add this in the database
 * @param {*} newInfected 
 */
const createInfected = async (newInfected) => {
  try {
    return await Infected.create(newInfected);
  } catch (error) {
    console.error("Error en el servicio de creacion", error, "idInfectado: ", newInfected.id_de_caso);
    return error;
  }
}


/**
 * This method brings the last id_de_caso entered in the database
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
 * This method get all infecteds register in the Data base
 */
const getAllInfecteds = async () => {
  try {
    return await Infected.findAll({});
  } catch (error) {
    console.error("Error en el servicio de buscar todos los infectados", error);
    return error;
  }
}

/**
 * This method get all infecteds since the external API
 */
const getAllNewInfecteds = async () => {
  try {
    return await axios.get('https://www.datos.gov.co/resource/gt2j-8ykr.json');
  } catch (error) {
    console.error("Error en el servicio en la carga de infectados", error);
    return error;
  }
}



module.exports = {
  createInfected,
  getAllNewInfecteds,
  getLastInfected,
  getAllInfecteds
}