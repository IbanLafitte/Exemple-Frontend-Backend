const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const port = 3000;

const app = express();
app.use(express.static(__dirname));
app.use(express.urlencoded({extended: true}));

mongoose.connect('mongodb+srv://Cluster98792:ThisIsATest@cluster0.watpj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
const db = mongoose.connection;
db.once('open', () => {
    console.log('Connexion à la base de données réussie !');
});

const userSchema = new mongoose.Schema({
    prenom: String,
    nom: String,
    poste: String,
    aide: String,
    demande: String,
});

const Users = mongoose.model('datas', userSchema);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/post', async (req, res) => {
    const {prenom, nom, poste, aide, demande} = req.body;
    const user = new Users({
        prenom,
        nom,
        poste,
        aide,
        demande,
    });
    await user.save();
    console.log(user);
    res.send('Envoie du ticket dans la base de données réussie !');
});

app.listen(port, () => {
    console.log(`Le serveur tourne sur http://localhost:${port}`);
});