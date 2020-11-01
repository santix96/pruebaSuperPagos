'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class infected extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  infected.init({
    fecha_reporte_web: {
      allowNull: false,
      type: DataTypes.STRING
    },
    id_de_caso: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    fecha_de_notificaci_n: {
      allowNull: false,
      type: DataTypes.STRING
    },
    departamento: {
      allowNull: false,
      type: DataTypes.STRING
    },
    departamento_nom: {
      allowNull: false,
      type: DataTypes.STRING
    },
    ciudad_municipio: {
      allowNull: false,
      type: DataTypes.STRING
    },
    ciudad_municipio_nom: {
      allowNull: false,
      type: DataTypes.STRING
    },
    edad: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    unidad_medida: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    sexo: {
      allowNull: false,
      type: DataTypes.CHAR
    },
    fuente_tipo_contagio: {
      allowNull: false,
      type: DataTypes.STRING
    },
    ubicacion: {
      allowNull: false,
      type: DataTypes.STRING
    },
    estado: {
      allowNull: false,
      type: DataTypes.STRING
    },
    recuperado: {
      allowNull: false,
      type: DataTypes.STRING
    },
    fecha_inicio_sintomas: {
      allowNull: false,
      type: DataTypes.STRING
    },
    fecha_diagnostico: {
      allowNull: false,
      type: DataTypes.STRING
    },
    fecha_recuperado: {
      allowNull: false,
      type: DataTypes.STRING
    },
    tipo_recuperacion: {
      allowNull: false,
      type: DataTypes.STRING(10)
    },
    per_etn_: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: true,
    sequelize,
    modelName: 'infected',
  });
  return infected;
};