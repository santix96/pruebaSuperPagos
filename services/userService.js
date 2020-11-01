const axios = require('axios');

/**
 * This method get all users since the API
 */
const getOrderUsers = async (request, response) => {
  try {
    var apiResponse = await axios.get('https://www.datos.gov.co/resource/gt2j-8ykr.json');
    var dataByAge = orderData(apiResponse.data);
    return response.status(200).send(dataByAge);

  } catch (err) {
    console.error(err);
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
  var userGender;
  data.forEach(user => {
    userGender = user.sexo.toUpperCase();
    if (user.edad <= 20) {
      dataByAge[userGender]['0-20'].push(user);
    } else if (user.edad > 20 && user.edad <= 40) {
      dataByAge[userGender]['21-40'].push(user);
    } else {
      dataByAge[userGender]['41-mas'].push(user);
    }
  });
  
  return dataByAge;

}

module.exports = {
  getOrderUsers
}