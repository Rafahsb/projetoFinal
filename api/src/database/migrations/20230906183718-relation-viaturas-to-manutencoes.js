"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("manutencoes", "id_viatura", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "viaturas", key: "id_viatura" },
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("manutencoes", "id_viatura");
  },
};
