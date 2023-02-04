'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Customers,{
        as: 'customers',
        foreignKey: 'customer_id'
      })
    }
  }
  Book.init({
    customer_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    isbn: DataTypes.INTEGER,
    author: DataTypes.STRING,
    publisher: DataTypes.STRING,
    year: DataTypes.INTEGER,
    page: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Books',
    tableName: 'books'
  });
  return Book;
};