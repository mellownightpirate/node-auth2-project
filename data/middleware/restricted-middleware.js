const jwt = require("jsonwebtoken");

module.exports = { restrictedAdminAccess, restricted };

function restrictedAdminAccess(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(
      token,
      process.env.JWT_SECRET || "Secret",
      { audience: "1" },
      (err, decoded) => {
        if (err) {
          res.status(401).json({ message: "Bad Token" });
        } else {
          req.decodedToken = decoded;
          next();
        }
      }
    );
  } else {
    res.status(400).json({ message: "No Credentials Provided" });
  }
}

function restricted(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(
      token,
      process.env.JWT_SECRET || "Secret",
      (err, decoded) => {
        if (err) {
          res.status(401).json({ message: "Bad Token" });
        } else {
          req.decodedToken = decoded;
          next();
        }
      }
    );
  } else {
    res.status(400).json({ message: "No Credentials Provided" });
  }
}