const mongoose = require("mongoose");

//création du schéma strict Sauce
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: false, default: 0 },
  dislikes: { type: Number, required: false, default: 0 },
  usersLiked: { type: [String], required: false, defaultValue: [] },
  usersDisliked: { type: [String], required: false, defaultValue: [] },
});

//export du schéma en tant que modèle Mongoose, le rendant disponible pour Express
module.exports = mongoose.model("Sauce", sauceSchema);
