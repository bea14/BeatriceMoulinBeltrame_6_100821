//middleware de protection des routes
//vérification de l'authentification du user avant l'autorisation de l'envoi des requêtes
const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    //extraction du token du header Authorization
    const token = req.headers.authorization.split(" ")[1];
    //verify : décode le token
    //const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    //userID extrait du Token
    const userId = decodedToken.userId;
    //comparaison entre l'ID du token et l'ID de la demande
    if (req.body.userId && req.body.userId !== userId) {
      //si invalide génère une erreur
      throw "Invalid user ID";
      //si valide alors la suite du code peut s'executer
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
