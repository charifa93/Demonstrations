const express = require('express');
const router = require('./router/tasks');


const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
   res.send("Page d'accueil");
})

// permet de rediriger vers la page d'accueil
app.get("/home", (req, res) => {
    res.redirect("/");
 })

 // Caplture les routes :
 // - http://localhost:3000/language
 // - http://localhost:3000/languges
 // - http://localhost:3000/lang
 app.get("lang(uges?)?", (req, res) => {
    res.send("Page des langues");
 })

//Capture les routes :
// - http://localhost:3000/contact
// - http://localhost:3000/about
app.get(["/contact", "/about"], (req, res) => {
    res.send("Page contact & about"); //soit contact ou about
 });

 //segement dynamique 
 //Capture les routes :
 // - http://localhost:3000/route/1
 // - http://localhost:3000/route/Qentien
 app.get("/route/:id([0-9]+)", (req, res) => { //([0-9]+) plus de 1 chiffre , ([0-9]{2,6}) entre 2 et 6 chiffres

    const id = req.params.id;
    res.send(`Page de la route  id : ${id}`);
 });

 //Capture la route : http://localhost:3000/personne/znifech/charifa
 app.get("/personne/:nom/:prenom", (req, res) => {
    const {nom, prenom}= req.params; //destructuration 
    res.send("Nom : " + nom + " Prenom : " + prenom);
 });

 //utilisation de router des taches
app.use(router);










app.listen(PORT, () => {
    console.log(`Serveur demarré sur le port http://localhost:${PORT}`);
    
})