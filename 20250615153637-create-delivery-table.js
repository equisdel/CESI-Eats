'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Deliveries', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      driverName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      driverPhone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      deliveryAddress: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      estimatedDeliveryTime: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      actualDeliveryTime: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Deliveries');
  },
};