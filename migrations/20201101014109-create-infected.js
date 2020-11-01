'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('infecteds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fecha_reporte_web: {
        type: Sequelize.STRING
      },
      id_de_caso: {
        type: Sequelize.INTEGER
      },
      fecha_de_notificaci_n: {
        type: Sequelize.STRING
      },
      departamento: {
        type: Sequelize.STRING
      },
      departamento_nom: {
        type: Sequelize.STRING
      },
      ciudad_municipio: {
        type: Sequelize.STRING
      },
      ciudad_municipio_nom: {
        type: Sequelize.STRING
      },
      edad: {
        type: Sequelize.INTEGER
      },
      unidad_medida: {
        type: Sequelize.INTEGER
      },
      sexo: {
        type: Sequelize.CHAR
      },
      fuente_tipo_contagio: {
        type: Sequelize.STRING
      },
      ubicacion: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.STRING
      },
      recuperado: {
        type: Sequelize.STRING
      },
      fecha_inicio_sintomas: {
        type: Sequelize.STRING
      },
      fecha_diagnostico: {
        type: Sequelize.STRING
      },
      fecha_recuperado: {
        type: Sequelize.STRING
      },
      tipo_recuperacion: {
        type: Sequelize.STRING(10)
      },
      per_etn_: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('infecteds');
  }
};