//middleware permettant de gérer les fichiers entrants
//package permettant de gérer les fichiers entrants dans les requêtes http
const multer = require('multer');

//types de fichiers acceptés
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

//indique à multer où enregistrer les fichiers entrants
const storage = multer.diskStorage({
  //indique d'enregistrer les fichiers dans le dossier images
    destination: (req, file, callback) => {
    callback(null, 'images');
  },
  //indique d'utiliser le nom d'origine, de remplacer les espaces par des _, et d'ajouter un timestamp
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    //complète l'extension du fichier avec les types MIME
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

//constante storage ajoutée à multer et gestion uniquement des fichiers images
module.exports = multer({storage: storage}).single('image');