//Import CommanJs ( c l'inverse de ES6 (EcmaScript Module 6))
//Importation d'express

const express = require('express');

//Creer l'application express
const app = express();

// choisi le port d'ecoute
const PORT = 3000;

//Middleware pour parser le json
app.use(express.json());

//Route de base
// GET http://localhost:3000/
//req c la requete , res c la reponse
app.get("/", (req, res) => {
    // res.status(200).send("Hello World");
    res.status(200).json({ message: "Hello World"}); 
})
// PST http://localhost:3000/
app.post("/", (req, res) => {
    console.log("req.body :" , req.body);
    res.end();
})
// cree une fonction de lisning du serveur 
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port http://localhost:${PORT}`);
})

