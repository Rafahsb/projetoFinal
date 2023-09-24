"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("historicoKm", "id_viatura", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "viaturas", key: "id_viatura" },
      onDelete: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("historicoKm", "id_viatura");
  },
};