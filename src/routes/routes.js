const express = require('express');
const validateSchemes = require('../middlewares/validateSchemes.js');
const validateToken = require('../middlewares/validateToken.js');
const registerScheme = require('../schemes/registerScheme');
const loginScheme = require('../schemes/loginScheme');
const { registerUser, login, getProfile } = require('../controllers/users');
const { getCategories } = require('../controllers/categories.js');

const routes = express();

routes.post("/register", validateSchemes(registerScheme), registerUser);
routes.post("/login", validateSchemes(loginScheme), login);

routes.use(validateToken);

routes.get("/profile", getProfile);

routes.get("/categories", getCategories);

module.exports = routes;