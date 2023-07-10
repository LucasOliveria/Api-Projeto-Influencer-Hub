const express = require('express');
const registerUserScheme = require('../schemes/registerUserScheme.js');
const loginScheme = require('../schemes/loginScheme');
const validateSchemes = require('../middlewares/validateSchemes.js');
const validateToken = require('../middlewares/validateToken.js');
const { registerUser, login, getProfile } = require('../controllers/users');
const { getCategories } = require('../controllers/categories.js');
const { registerInfluencer } = require('../controllers/influencers.js');
const registerInfluencerScheme = require('../schemes/registerInfluencerScheme.js');


const routes = express();

routes.post("/user", validateSchemes(registerUserScheme), registerUser);
routes.post("/login", validateSchemes(loginScheme), login);

routes.use(validateToken);

routes.get("/profile", getProfile);
routes.get("/categories", getCategories);
routes.post("/influencers", validateSchemes(registerInfluencerScheme), registerInfluencer);

module.exports = routes;