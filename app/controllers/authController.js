let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");
let models = require("../../models/index");

async function login(req, res) {
  try {
    let result = await models.Customers.findOne({where:{email: req.body.email }
    });
    if (result.length < 1) {
      res.send("User not found");
    }
    let password = req.body.password;
    let match = await bcrypt.compare(password, result.password);
    if (!match) {
      res.send("Wrong email or password");
    }
    let payload = {
      id: result.id,
      name: result.name,
      email: result.email,
    };
    let token = jwt.sign(payload, "secret");

    res.json({ message: "Login success", access_token: token });
  } catch (error) {
    res.json(error);
    console.log(error)
  }
}

module.exports = {
  login,
};
