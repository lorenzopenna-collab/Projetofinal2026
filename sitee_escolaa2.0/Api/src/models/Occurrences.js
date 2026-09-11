const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/connection");

const Occurrence = sequelize.define(
  "Occurrence",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    alunoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    turmaId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    professorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    tipo: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    descricao: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    data: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "occurrences",
    timestamps: true,
  }
);

module.exports = Occurrence;