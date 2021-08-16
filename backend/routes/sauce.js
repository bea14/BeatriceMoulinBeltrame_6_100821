//Création du routeur express
const express = require("express");
//On enregistre les routes dans le routeur puis dans l'appli
const router = express.Router();

//importation du controller sauce
const sauceCtrl = require("../controllers/sauce");
// importtaion authentification
const auth = require("../middleware/auth");
// importation multer pour le telechargement des images
const multer = require("../middleware/multer-config");

// routes
router.get("/", auth, sauceCtrl.getAllSauces);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.post("/", auth, multer, sauceCtrl.createSauce);
router.put("/:id", auth, multer, sauceCtrl.modifySauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);
router.post("/:id/like", auth, sauceCtrl.likeDislikeSauce);

module.exports = router;
