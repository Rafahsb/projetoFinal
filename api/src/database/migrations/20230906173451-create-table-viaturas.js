"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("viaturas", {
      id_viatura: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      marca: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      modelo: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      chassi: {
        type: Sequelize.CHAR(17),
        allowNull: false,
        unique: true,
      },
      placa: {
        type: Sequelize.CHAR(8),
        allowNull: false,
        unique: true,
      },
      portas: {
        type: Sequelize.SMALLINT,
        allowNull: false,
      },
      bancos: {
        type: Sequelize.SMALLINT,
        allowNull: false,
      },
      cor: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      quilometragem: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      orgao_vinculado: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      piloto: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      status: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      lat: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      long: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("viaturas");
  },
};
