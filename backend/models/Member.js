const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const Member = sequelize.define('Member', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: DataTypes.STRING,
  apellido: DataTypes.STRING,
  titulacion: DataTypes.STRING,
  foto: DataTypes.STRING,
  presentacion: DataTypes.TEXT,
  tecnologias: DataTypes.TEXT,
  estudios: DataTypes.TEXT,
  idiomas: DataTypes.STRING,
}, { tableName: 'Members', timestamps: true });

module.exports = Member;
