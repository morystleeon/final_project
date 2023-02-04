let bcrypt = require("bcrypt");
let models = require("../../models/index");
let validator = require("validatorjs");

async function getCustomers(req, res) {
  try {
    let result = await models.Customers.findAll({
      attributes: ["id", "email", "name", "address", "phone_number"],
      include: {
        association: "books",
        attributes: [
          "id",
          "title",
          "isbn",
          "author",
          "publisher",
          "year",
          "page",
          "price"
        ],
      },
    });
    if (result.length < 1) {
      res.json({ message: "Data Not Available" });
    }
    res.json(result);
  } catch (error) {
    console.log(error);
  }
}
async function getCustomersById(req, res) {
  try {
    let result = await models.Customers.findOne({
      where: { id: req.params.id },
    });
    if (result.length < 1) {
      res.json({ message: "Data Not Available" });
    }
    res.json(result);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
}
async function createCustomers(req, res) {
  try {
    let rules = {
      email: "required|email|min:10",
      name: "required|min:2|max:50",
      address: "required",
      phone_number: "required|numeric",
      password: "required|min:6",
    };

    let validation = new validator(req.body, rules);

    if (validation.passes()) {
      let salt = bcrypt.genSaltSync(10);
      let password = bcrypt.hashSync(req.body.password, salt);
      req.body.password = password;

      let createCustomers = await models.Customers.create(req.body);
      res.json({ message: "Account Successfully Created" });
    } else {
      return res.json({ errors: validation.errors.all() });
    }
  } catch (error) {
    res.json(error);
    console.log(error);
  }
}
async function updateCustomers(req, res) {
  try {
    let result = await models.Customers.findOne({
      where: { id: req.params.id },
    });
    if (result.length < 1) {
      res.json({ message: "Data Not Available" });
    }

    let updateCustomers = await result.update(req.body);
    res.json(result);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
}
async function deleteCustomers(req, res) {
  try {
    let deleteCustomers = await models.Customers.destroy({
      where: { id: req.params.id },
    });
    res.json({ message: "Account Deleted", id: req.params.id });
  } catch (error) {
    res.json(error);
    console.log(error);
  }
}
module.exports = {
  getCustomers,
  getCustomersById,
  createCustomers,
  updateCustomers,
  deleteCustomers,
};
