'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Books,{
        as:'books',
        foreignKey: 'customer_id'
      })
    }
  }
  Customer.init({
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone_number: DataTypes.INTEGER,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Customers',
    tableName: 'customers'
  });
  return Customer;
};