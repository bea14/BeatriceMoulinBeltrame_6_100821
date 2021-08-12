//Création du routeur express
const express = require('express');
//On enregistre les routes dans le routeur puis dans l'appli
const userRouter = express.Router();

//importation du controller user
const userCtrl = require('../controllers/user');

// routes
//Création d'un nouvel utilisateur
userRouter.post('/signup', userCtrl.signup);
//Login d'un utilisateur existant
userRouter.post('/login', userCtrl.login);

module.exports = userRouter;