const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');
const Member = require('./Member');

const Project = sequelize.define('Project', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  titulo: DataTypes.STRING,
  descripcion: DataTypes.TEXT,
  tecnologias: DataTypes.STRING,
  empresa: DataTypes.STRING,
  tipo: DataTypes.ENUM('individual', 'grupo'),
  url: DataTypes.STRING,
}, { tableName: 'proyectos', timestamps: false });

Project.belongsToMany(Member, { through: 'member_proyectos', foreignKey: 'proyecto_id', otherKey: 'miembro_id' });
module.exports = Project;
