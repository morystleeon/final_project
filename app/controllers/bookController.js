let models = require("../../models/index");
let validator = require("validatorjs");

async function getBooks(req, res) {
  try {
    let result = await models.Books.findAll({
      attributes: ["id", "title", "isbn", "author", "publisher","year","page"],
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
async function getBooksById(req, res) {
  try {
    let result = await models.Books.findOne({ where: { id: req.params.id } });
    if (result.length < 1) {
      res.json({ message: "Data Not Available" });
    }
    res.json(result);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
}
async function createBooks(req, res) {
  try {
    let rules = {
      title: "required",
      isbn: "required|numeric",
      author: "required",
      publisher: "required",
      year:"required|numeric",
      page:"required|numeric",
      price: "required|numeric"
    };

    let validation = new validator(req.body, rules);

    if (validation.passes()) {
      let createBooks = await models.Books.create(req.body);
      res.json({ message: "Books Added" });
    } else {
      return res.json({ errors: validation.errors.all() });
    }
  } catch (error) {
    res.json(error);
    console.log(error);
  }
}
async function updateBooks(req, res) {
  try {
    let result = await models.Books.findOne({ where: { id: req.params.id } });
    if (result.length < 1) {
      res.json({ message: "Data Not Available" });
    }

    let updateBooks = await result.update(req.body);
    res.json(result);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
}
async function deleteBooks(req, res) {
  try {
    let deleteBooks = await models.Books.destroy({
      where: { id: req.params.id },
    });
    res.json({ message: "Books Deleted", id: req.params.id });
  } catch (error) {
    res.json(error);
    console.log(error);
  }
}
module.exports = {
  getBooks,
  getBooksById,
  createBooks,
  updateBooks,
  deleteBooks,
};