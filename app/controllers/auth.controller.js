const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

const Role = require("../models/role.model");
const User = require("../models/user.model");

exports.signup = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;

    const role = await Role.findOne({ name: roles[0] });

    if (!role) {
      return res.status(400).send({ message: "El rol especificado no existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      roles: [role._id]
    });

    res.status(200).send({
      redirectURL: "/",
      success: true
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


exports.signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).populate("roles"); 

    if (!user) {
      return res.status(404).send({ message: "No se ha encontrado el usuario" });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Contraseña incorrecta"
      });
    }

    const roles = user.roles.map(role => role.name) || ["user"];

    const token = jwt.sign(
      { id: user._id, roles },
      config.secret,
      {
        algorithm: 'HS256',
        expiresIn: 86400
      }
    );

    const authorities = roles.map(role => "ROLE_" + role.toUpperCase());

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token,
      redirectURL: "/dashboard",
      success: true
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
