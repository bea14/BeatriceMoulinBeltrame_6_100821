// Ajout du framework express au projet
const express = require('express');
//ajout de body-parser au projet : permet extraction d'objet JSON
const bodyParser = require('body-parser');
//ajout de mongoose au projet : gestion de la DB
const mongoose = require('mongoose');
//Ajout de Helmet pour sécuriser les entêtes
const helmet = require ('helmet');
//Importe mongo-sanitize qui sert à empêcher l'injection de code dans les champs utilisateurs
const mongoSanitize = require('express-mongo-sanitize');
// Plugin qui sert dans l'upload des images et permet de travailler avec les répertoires et chemin de fichier.
const path = require('path');
//Permet de créer un environnement de variables
require('dotenv').config();

//importation des fichiers routes
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

//connexion à la DB
mongoose.connect(process.env.MONGODB_URI,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

// ajout d'un middleware, qui sera le premier à être executé par le server, il sera appliqué à toutes les routes, toutes les requêtes envoyées à notre server.
// correction des erreurs de CORS
app.use((req, res, next) => {
  // Permet l'accès à l'API depuis n'importe quelle origine
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader(
    // Authorisation d'utiliser certains en-tête dans l'objet requête
    'Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  ); 
  res.setHeader(
    //Permet l'utilisation des méthodes définies ci-dessous
    'Access-Control-Allow-Methods', 
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  ); 
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  next(); // pour passer au middleware qui suit
});

//Applique les sous-plugins de helmet
app.use(helmet());

//Permet de récupérer le corps de la requête au format json
app.use(express.json());

//Nettoie les champs utilisateurs des tentatives d'injection de code commençant par "$" ou "."
app.use(mongoSanitize());

//routes
//express doit gérer la ressource image de manière statique
app.use('/images', express.static(path.join(__dirname, 'images')));
//Sert les routes concernant les sauces pour toute demande vers le endpoint /api/sauce
app.use('/api/auth', userRoutes);
//Sert les routes concernant les utilisateurs pour toute demande vers le endpoint /api/auth
app.use('/api/sauces', sauceRoutes);


module.exports = app;