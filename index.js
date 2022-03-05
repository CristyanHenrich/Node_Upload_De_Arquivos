 const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path")

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
})

app.listen(8080,() => {
    console.log("Sevidor Rodando!");
})