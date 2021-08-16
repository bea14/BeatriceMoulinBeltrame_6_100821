# openclassrooms-dw-projet-6
Code source du Projet 6 de la formation Développeur Web d'OpenClassrooms, intitulé "Construisez une API sécurisée pour une application d’avis gastronomiques"

## Compétences évaluées :
- Implémenter un modèle logique de données conformément à la réglementation
- Stocker des données de manière sécurisée
- Mettre en œuvre des opérations CRUD de manière sécurisée

## Le projet
Vous avez passé la dernière année en tant que développeur back-end indépendant et vous avez travaillé sur plusieurs projets de tailles et de difficultés variées.
La semaine dernière, vous avez reçu un message sur votre plateforme de freelance vous demandant de l'aide pour un nouveau projet. Les sauces piquantes sont de plus en plus populaires, en grande partie grâce à la série YouTube « Hot Ones » . C’est pourquoi ce nouveau client, la marque de condiments à base de piment Piiquante, veut développer une application web de critique des sauces piquantes appelée « Hot Takes » .
Si la responsable produit de Piiquante souhaite à terme transformer l'application d'évaluation en une boutique en ligne, elle souhaite que la première version soit une « galerie de sauces » permettant aux utilisateurs de télécharger leurs sauces piquantes préférées et de liker ou disliker les sauces que d'autres partagent. Le front-end de l'application a été développé à l'aide d'Angular et a été précompilé après des tests internes, mais Piiquante a besoin d'un développeur back-end pour construire l'API.

## Modalités
Les données des utilisateurs doivent parfaitement protégées.
Pour cela, l’API utilisée devra impérativement respecter des pratiques de code sécurisé.

L’API doit respecter le RGPD et les standards OWASP :
- le mot de passe des utilisateurs doit être haché ;
- L'authentification doit être renforcée sur toutes les routes sauce requises;
- Les adresses électroniques dans la base de données sont uniques et un plugin Mongoose approprié est utilisé pour garantir leur unicité et signaler les erreurs;
- La sécurité de la base de données MongoDB (à partir d'un service tel que MongoDB Atlas) ne doit pas empêcher l'application de se lancer sur la machine d'un utilisateur;
- Un plugin Mongoose doit assurer la remontée des erreurs issues de la base de données;
- Les versions les plus récentes des logiciels sont utilisées avec des correctifs de sécurité actualisés;
- Le contenu du dossier images ne doit pas être téléchargé sur GitHub

## Environnement
* framework : Express ;
* serveur : NodeJS ;
* base de données : MongoDB ;
Toutes les opérations de la base de données doivent utiliser le pack Mongoose avec des schémas de données stricts.

## Frontend
Récupérer le fichier du frontend (développé par OpenClassrooms), le dézipper dans le dossier de votre projet
Installer les dépendances : 
```
npm install
```
Lancer :
```
npm start
```
 L'écoute se fait sur le port 4200 (ouvrir la page http://localhost:4200 dans le navigateur internet)

## Back-end
Cloner le backend dans le dossier de votre projet.
Installer les dépendances : 
```
npm install
```
Copier le fichier .env.example en le renommant .env et en complétant les informations manquantes représentées entre balise <> par les informations qui vous ont été fournies
Lancer :
```
npm start
```
L'écoute se fait sur le port 3000 et la connexion à MongoDB est établie

