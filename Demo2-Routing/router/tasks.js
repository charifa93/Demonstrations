const router = require("express").Router();

const tasks = [
    {
        id: 1,
        title: "Faire la vaisselle ",
        completed: false
    },
    {
        id: 2,
        title: "nettoyer la litiere",
        completed: true
    },
    {
        id: 3,
        title: "faire le ménage",
        completed : false
    }
];
const taskId = tasks.length;
//GET http://localhost:3000/tasks/     //Get ALL
router.get("/", (req, res) => {
    res.status(200).json(tasks);
});

//GET http://localhost:3000/tasks/1
router.get("/:id", (req, res) => {
    //1. Extraire l'id de l'URL
    const{ id } = req.params;
    //2. Chercher l'element dans le tableau
    const task = tasks.find(t=>t.id === +id ); // le (+)pour convertir l'id en nombre
    //const task = tasks.find(t=>t.id === parseInt(id) );
    if (!task) res.send.status(404).json({
        code : 'à',
        error: "Not found",
        message: "Id non trouvé",
        targetId : id});

    res.status(200).json(task);
    

});

//POST : http://localhost:3000/tasks/
router.post("/", (req, res) => {
    const { title } = req.body;
    //verifier que la tache n'existe pas
    if(tasks.find(t=>t.title.toLowerCase() === title)){
        // return ca permet de 
        return res.status(400).json({
            code : 400,
            error : "Bad Request", 
            message : "Cette tache existe deja",
            origin : title});
    }
    const newTask = { id: ++taskId, title, completed: false };
    //ajouter la nouvelle tache au tableau
    tasks.push(newTask);
    res.status(201).json(newTask);
});

//PUT : http://localhost:3000/tasks/:id
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const {title, completed} = req.body;

    const task = tasks.find(t=>t.id === +id);
    // verifier si la tache existe par id 
    if (!task)
        return res.status(404).json({
        code : 404,
        error : "Not found",
        message : "Id non trouvé",
        targetId : id});
    // verifier si le titre est deja utilisé
    if(tasks.find(t=>t.title.toLowerCase() === title.toLowerCase() && t.id !== +id)){
        res.status(400).json({
            code : 400,
            error : "Bad Request", 
            message : "le titre est deja utilisé par une autre tache",
            origin : title});
    }
    task.title = title;
    task.completed = completed;
    res.status(200).json(task);

});

//DELETE : http://localhost:3000/tasks/:id
router.delete("/:id", (req, res) => {
    // recupere l'id de la tache a supprimer
    const { id } = req.params;
    // cherche la tache par id dans le tableau
    const taskId = tasks.findIndex(t=>t.id === +id);
    // si la tache n'existe pas
    if (taskId === -1) // -1 dans le cas qu"il n'est pas trouve
        return res.status(404).json({
            code : 404,
            error : "Not found",
            message : "Id non trouvé",
            targetId : id});
    // sinon supprime la tache
    tasks.splice(taskId, 1);
    res.status(200).json({message : "tache supprimée avec succès"});

});

module.exports = router;
