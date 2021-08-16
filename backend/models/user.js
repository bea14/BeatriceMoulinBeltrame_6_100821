const mongoose = require("mongoose");

//On s'assure qu'aucun des utilisateurs ne peut partager la même adresse e-mail
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

//Application d'un uniqueValidator au schema
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
