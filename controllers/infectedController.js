const InfectedService = require('../services/infectedService');

const updateDb = async (request, response) => {
    try {
        let allInfecteds = await InfectedService.getAllInfecteds();
        let maxInfected = await InfectedService.getLastInfected() || 0;
        console.log("numero maximo", maxInfected);
        /*
        const newInfected = {
            fecha_reporte_web: "1/4/2020 0:00:00",
            id_de_caso: 1001,
            fecha_de_notificaci_n: "26/3/2020 0:00:00",
            departamento: "76",
            departamento_nom: "TANGAMANDAPIO",
            ciudad_municipio: "76001",
            ciudad_municipio_nom: "CALI",
            edad: "16",
            unidad_medida: "1",
            sexo: "F",
            fuente_tipo_contagio: "En estudio",
            ubicacion: "Casa",
            estado: "Leve",
            recuperado: "Recuperado",
            fecha_inicio_sintomas: "20/3/2020 0:00:00",
            fecha_diagnostico: "1/4/2020 0:00:00",
            fecha_recuperado: "5/5/2020 0:00:00",
            tipo_recuperacion: "PCR",
            per_etn_: "6"
        }
        console.log("new infectado ",newInfected);
        allInfecteds.data.push(newInfected);*/

        let newInfecteds = [];

        for (let index = maxInfected; index <= allInfecteds.data.length; index++) {
            newInfecteds.push(allInfecteds.data[index]);
        }
        
    
        newInfecteds.forEach(async (infected, index) => {
            setTimeout(function(){ console.log("INFECTED",infected, index); }, 2000);
            
            /*await InfectedService.createInfected(infected);*/
        });


    } catch (error) {
        console.error(error);
        return response.status(400).send(error);
    }

}

const createInfected = async (request, response) => {
    const newInfected = {
        fecha_reporte_web: request.body.fecha_reporte_web,
        id_de_caso: parseInt(request.body.id_de_caso),
        fecha_de_notificaci_n: request.body.fecha_de_notificaci_n,
        departamento: request.body.departamento,
        departamento_nom: request.body.departamento_nom,
        ciudad_municipio: request.body.ciudad_municipio,
        ciudad_municipio_nom: request.body.ciudad_municipio_nom,
        edad: request.body.edad,
        unidad_medida: request.body.unidad_medida,
        sexo: request.body.sexo,
        fuente_tipo_contagio: request.body.fuente_tipo_contagio,
        ubicacion: request.body.ubicacion,
        estado: request.body.estado,
        recuperado: request.body.recuperado,
        fecha_inicio_sintomas: request.body.fecha_inicio_sintomas,
        fecha_diagnostico: request.body.fecha_diagnostico,
        fecha_recuperado: request.body.fecha_recuperado,
        tipo_recuperacion: request.body.tipo_recuperacion,
        per_etn_: request.body.per_etn_
    }
    try {
        const infected = await InfectedService.createInfected(newInfected);
        return response.status(200).send(infected);
    } catch (error) {
        return response.status(400).send(error);
    }

}


const getOrderedInfecteds = async (request, response) => {
    try {
        const allInfecteds = await InfectedService.getAllInfecteds();
        const orederedInfecteds = orderData(allInfecteds.data);
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
const orderData = (data) => {
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

module.exports = {
    createInfected,
    getOrderedInfecteds,
    updateDb
}