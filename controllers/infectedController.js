const InfectedService = require('../services/infectedService');

/**
 * This function takes the max case_id record in the database,
 * to have a starting point to add new data, sort new data from all infected and aggregate this.
 * @param {} request 
 * @param {} response 
 */
const updateDb = async (_, response) => {
    try {
        /* Get all infecteds */
        let allInfecteds = await InfectedService.getAllNewInfecteds();
        allInfecteds = allInfecteds.data;

        /* Get max id_de_caso in the data base */
        let maxInfected = await InfectedService.getLastInfected() || 0;

        /* Order all infecteds by id_de_caso */
        allInfecteds.sort(compare);

        /* Create a new infected */
        for (let index = maxInfected; index < allInfecteds.length; index++) {
            const newInfected = buildInfected(allInfecteds[index]);
            await InfectedService.createInfected(newInfected);
        }
    } catch (error) {
        console.error(error);
        return response.status(400).send(error);
    }

}

/**
 * This function filters  in the same order in which the parameters are entered in the url
 * and return data estructure object
 * @param {*} request 
 * @param {*} response 
 */

const getInfectedsWithFilter = async (request, response) => {
    try {

        const allInfecteds = await InfectedService.getAllInfecteds();
        const newDataFilter = {};
        let filter = Object.keys(request.query);
        allInfecteds.forEach(infected => {
            addInfected(infected, filter, newDataFilter, filter.length)
        });

        return response.status(200).send(newDataFilter);
    } catch (error) {
        console.log(error);
        return response.status(400).send(error);
    }

}


/**
 * Recursive function that allow add new infecteds in the data estructure, 
 * if the key in the main estructure not exist, this create a new estructure
 * 
 * @param {*} infected infected will be add
 * @param {*} filter arrays with possible keys for add a new infected
 * @param {*} estructura current estruture data
 * 
 * scape condition: when the keys account is only one, if the key already
 * exist in the estructure, this add a new infected else create array estructure 
 * and add new infected
 */

const addInfected = (infected, filter, estructura) => {
    let accountFilter = filter.length;
    let infectedKey = infected[filter[0]];
    let newEstructure = {};
    if (accountFilter == 1) {
        if (infectedKey in estructura) {
            estructura[infectedKey].push(infected.id_de_caso);
        } else {
            estructura[infectedKey] = [];
            estructura[infectedKey].push(infected.id_de_caso);
        }
        return estructura;
    };

    if (!(infectedKey in estructura)) {
        estructura[infectedKey] = {};
    };

    newEstructure = {
        ...estructura,
        ...addInfected(infected, filter.slice(1), estructura[infectedKey])
    }
    return newEstructure;
}

/**
 * This function create a new infected in the dataBase
 * @param {*} request 
 * @param {*} response 
 */
const createInfected = async (request, response) => {
    const newInfected = buildInfected(request.body);
    try {
        const infected = await InfectedService.createInfected(newInfected);
        return response.status(200).send(infected);
    } catch (error) {
        return response.status(400).send(error);
    }

}



/**
 * this function get an return all infecteds ordered by age and gender
 * @param {} request 
 * @param {} response 
 */
const getOrderedInfecteds = async (request, response) => {
    try {
        const allInfecteds = await InfectedService.getAllNewInfecteds();
        const orederedInfecteds = orderDataByAgeAndGender(allInfecteds.data);
        return response.status(200).send(orederedInfecteds);
    } catch (error) {
        console.log(error);
        return response.status(400).send(error);
    }

}

/**
 * this function ordered data structure by age and gender 
 * @param {} data data that will be oredered 
 * @returns Json object
 */
const orderDataByAgeAndGender = (data) => {
    var dataByAge = {
        'M': {
            '0-20': [],
            '21-40': [],
            '41-mas': []
        },
        'F': {
            '0-20': [],
            '21-40': [],
            '41-mas': []
        }
    }
    var infectedGender;
    data.forEach(infected => {
        infectedGender = infected.sexo.toUpperCase();
        if (infected.edad <= 20) {
            dataByAge[infectedGender]['0-20'].push(infected);
        } else if (infected.edad > 20 && infected.edad <= 40) {
            dataByAge[infectedGender]['21-40'].push(infected);
        } else {
            dataByAge[infectedGender]['41-mas'].push(infected);
        }
    });

    return dataByAge;

}

/**
 * Basic constructor to get a infected
 * @param {*} infectedData Data with infected information
 */
const buildInfected = (infectedData) => {
    return {
        fecha_reporte_web: infectedData.fecha_reporte_web,
        id_de_caso: parseInt(infectedData.id_de_caso),
        fecha_de_notificaci_n: infectedData.fecha_de_notificaci_n,
        departamento: infectedData.departamento,
        departamento_nom: infectedData.departamento_nom,
        ciudad_municipio: infectedData.ciudad_municipio,
        ciudad_municipio_nom: infectedData.ciudad_municipio_nom,
        edad: infectedData.edad,
        unidad_medida: infectedData.unidad_medida,
        sexo: infectedData.sexo,
        fuente_tipo_contagio: infectedData.fuente_tipo_contagio,
        ubicacion: infectedData.ubicacion,
        estado: infectedData.estado,
        recuperado: infectedData.recuperado,
        fecha_inicio_sintomas: infectedData.fecha_inicio_sintomas,
        fecha_diagnostico: infectedData.fecha_diagnostico,
        fecha_recuperado: infectedData.fecha_recuperado,
        fecha_muerte: infectedData.fecha_muerte,
        tipo_recuperacion: infectedData.tipo_recuperacion,
        per_etn_: infectedData.per_etn_
    }
}

/**
 * This function compare two objects and return 0, 1 or -1 dependig on which is greater
 * @param {} object1 
 * @param {} object2 
 */
const compare = (object1, object2) => {
    const idCase1 = parseInt(object1.id_de_caso);
    const idCase2 = parseInt(object2.id_de_caso);

    let comparison = 0;
    if (idCase1 > idCase2) {
        comparison = 1;
    } else if (idCase1 < idCase2) {
        comparison = -1;
    }
    return comparison;

}

module.exports = {
    createInfected,
    getOrderedInfecteds,
    updateDb,
    getInfectedsWithFilter
}