const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path")
const cors = require('cors');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Acces-Control-Allow-Methods", 'GET');
    res.header("Acces-Control-Allow-Methods", 'POST');
    app.use(cors());
    next();
});

app.set('view engine', 'ejs');

var data = new Date();
var dia = String(data.getDate()).padStart(2, '0');
var mes = String(data.getMonth() + 1).padStart(2, '0');
var ano = data.getFullYear();
dataAtual = dia + mes + ano;
console.log(dataAtual);

const storage = multer.diskStorage({
    destination: function(req, res, cb){
        cb(null, "uploads/")
    },
    filename: function(req, file, cb){
        cb(null, (file.originalname).split('\\').pop().split('.').shift() + ' - ' + dataAtual + path.extname(file.originalname));
    }
})

const upload = multer({storage});

app.get("/",(req, res) => {
    res.render("index");
})

app.post("/upload",upload.single("file"),(req, res) =>{
    res.render("recebido");
    console.log("Arquivo Recebido Pelo Servidor");
    console.log("Realizando Upload na nuvem OneDrive");
})

app.listen(3002,() => {
    console.log("Servidor iniciado na porta 3002: http://192.168.2.134:3002/");
})