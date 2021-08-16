require("dotenv").config();
//utilisation de bcrypt pour hashage du mot de passe
const bcrypt = require("bcrypt");
//création des token d'identification pour la session
const jwt = require("jsonwebtoken");
//importation du model User
const User = require("../models/user");
//Package crypto-js
const cryptoJS = require("crypto-js");

//Crypto-js
// Secret key pour l'email
var key = cryptoJS.enc.Hex.parse(process.env.EMAIL_SECRET_TOKEN);
// Initialisation vecteur
var iv = cryptoJS.enc.Hex.parse(process.env.iv);
//Encrypt email
const encryptEmail = (string) => {
  const enc = cryptoJS.AES.encrypt(string, key, { iv: iv }).toString();
  return enc;
};

//inscription user
exports.signup = (req, res, next) => {
  //hashage du mot de passe
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      //creation user et enregistrement dans la base de données
      const user = new User({
        //email: req.body.email,
        email: encryptEmail(req.body.email),
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Connexion user
exports.login = (req, res, next) => {
  //cherche l'adresse mail dans la bdd
  User.findOne({
    //email: req.body.email,
    email: encryptEmail(req.body.email),
  })
    .then((user) => {
      //si le user n'est pas dans la bdd
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      //si le user est trouvé alors vérification du mot de passe crypté
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          //si le mot de passe ne correspond pas
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          //si le mot de passe correspond alors création d'un token d'identification
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              //id utilisateur
              { userId: user._id },
              //chaîne secrète pour encoder le token
              process.env.JWT_SECRET_TOKEN,
              //durée de validité du token
              { expiresIn: "24h" }
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
