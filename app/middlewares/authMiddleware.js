const jwt = require("jsonwebtoken");

function isAuthenticate(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const splitToken = req.headers.authorization.split(' ');
  if (splitToken.length !== 2 || splitToken[0] !== 'Bearer') {
    return res.status(400).json({ message: 'Wrong authorization format' });
  }

  jwt.verify(
    splitToken[1],
    "secret",
    { algorithms: ["HS256"] },
    async (err, payload) => {
      if (err && err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Expired Token" });
      } else if (err) {
        return res.status(401).json({ message: "Invalid Token" });
      } else {
        next();
      }
    }
  );
}

module.exports = {
  isAuthenticate,
};
