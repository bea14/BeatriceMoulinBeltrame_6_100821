require("dotenv").config();
//importation du modèle Sauce
const Sauce = require("../models/sauce");
//importation module node fs (intéraction avec le système de fichier)
const fs = require("fs");
//importation module body-parser (permet d'extraire des objet JSON)
//const bodyParser = require("body-parser");

// Voir l'integralité des sauces
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(404).json({ error }));
};

//Voir une seule sauce avec son id
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

//Ajouter (Créer) une sauce
exports.createSauce = (req, res, next) => {
  // extraction de l'object JSON
  const sauceObject = JSON.parse(req.body.sauce);
  //retire l'id généré automatiquement par MongoDb
  delete sauceObject._id;
  const sauce = new Sauce({
    //Utilise l'opérateur spread pour copier les infos du corps de la requête
    ...sauceObject,
    //On génère l'url de l'image par rapport à son nom de fichier
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  sauce
    .save() //Sauvegarde la nouvelle sauce dans la collection
    .then(() => res.status(201).json({ message: "Sauce ajoutée !" }))
    .catch((error) => {
      console.log(error);
      return res.status(400).json({ error });
    });
};

// Modifier une sauce
exports.modifySauce = (req, res, next) => {
  //vérifie si req.file existe
  const sauceObject = req.file
    ? //oui : traitement de la nouvelle image
      {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
        //il n'existe pas : traitement de l'objet - entrant
      }
    : { ...req.body }; //non : traitement de l'objet - entrant
  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
    .catch((error) => res.status(400).json({ error }));
};

// Supprimer une sauce
exports.deleteSauce = (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).json({ message: "Bad request !" });
  }
  Sauce.findOne({ _id: req.params.id }) //Trouve la sauce correspondant à l'id
    .then((sauce) => {
      //récupération du nom de fichier
      const filename = sauce.imageUrl.split("/images/")[1];
      //supression du fichier du dossier images
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id }) //supprime la sauce de la collection
          .then(() =>
            res
              .status(200)
              .json({ message: `Votre sauce a bien été supprimée !` })
          )
          .catch((error) => res.status(500).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

//Like ou dislike une sauce
exports.likeDislikeSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      switch (req.body.like) {
        case -1: //clic sur dislike
          //on regarde si le userId est présent dans la tableau usersDisliked, si non on le push
          if (sauce.usersDisliked.indexOf(req.body.userId) === -1) {
            sauce.usersDisliked.push(req.body.userId);
          }
          break;

        case 1: //clic sur like
          //on regarde si le userId est présent dans la tableau usersLiked, si non on le push
          if (sauce.usersLiked.indexOf(req.body.userId) === -1) {
            sauce.usersLiked.push(req.body.userId);
          }
          break;
        case 0: //annule like ou dislike
          //on regarde si le userId est présent dans la tableau usersDisliked, si oui on le splice
          if (sauce.usersDisliked.indexOf(req.body.userId) !== -1) {
            sauce.usersDisliked.splice(
              sauce.usersDisliked.indexOf(req.body.userId, 1)
            );
          }
          //on regarde si le userId est présent dans la tableau usersLiked, si oui on le splice
          if (sauce.usersLiked.indexOf(req.body.userId) !== -1) {
            sauce.usersLiked.splice(
              sauce.usersLiked.indexOf(req.body.userId, 1)
            );
          }
          break;
        default:
          return res.status(400).json({ error: "Valeur de like invalide !" });
      }
      //Affichage  du nombre de loke et de dislike
      sauce.likes = sauce.usersLiked.length;
      sauce.dislikes = sauce.usersDisliked.length;
      sauce
        .save()
        .then(() =>
          res.status(200).json({ message: "Compteurs de likes mis à jour !" })
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};
