const express = require('express');

const registerUserScheme = require('../schemes/registerUserScheme.js');
const loginScheme = require('../schemes/loginScheme');
const influencerScheme = require('../schemes/influencerScheme.js');

const validateSchemes = require('../middlewares/validateSchemes.js');
const validateToken = require('../middlewares/validateToken.js');

const { registerUser, login, getProfile } = require('../controllers/users');
const { getCategories } = require('../controllers/categories.js');
const { registerInfluencer, getInfluencers, updateInfluencer, deleteInfluencer, getAInfluencer } = require('../controllers/influencers.js');

const routes = express();

routes.post("/user",
  validateSchemes(registerUserScheme),
  registerUser
);
routes.post("/login", validateSchemes(loginScheme), login);

routes.use(validateToken);

routes.get("/profile", getProfile);
routes.get("/categories", getCategories);

routes.post("/influencers",
  validateSchemes(influencerScheme),
  registerInfluencer
);
routes.get("/influencers", getInfluencers);
routes.get("/influencers/:idInfluencer", getAInfluencer);
routes.put("/influencers/:idInfluencer",
  validateSchemes(influencerScheme),
  updateInfluencer
);
routes.delete("/influencers/:idInfluencer", deleteInfluencer);

module.exports = routes;