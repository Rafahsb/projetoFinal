"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("historicoKm", {
      id_historico_km: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      quilometragem: {
          type: Sequelize.INTEGER,
          allowNull: false,
      },
      data: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("historicoKm");
  },
};
