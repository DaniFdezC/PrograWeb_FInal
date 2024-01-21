const User = require("../models/user.model");

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const existingUserByUsername = await User.findOne({ username: req.body.username });
    const existingUserByEmail = await User.findOne({ email: req.body.email });

    if (existingUserByUsername) {
      return res.status(400).send({ message: "El usuario ya está en uso" });
    }

    if (existingUserByEmail) {
      return res.status(400).send({ message: "El email ya está en uso" });
    }

    next();
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    const validRoles = ["user", "admin", "moderator"];

    for (let i = 0; i < req.body.roles.length; i++) {
      if (!validRoles.includes(req.body.roles[i])) {
        return res.status(400).send({ message: "El rol introducido no existe -> " + req.body.roles[i] });
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;
