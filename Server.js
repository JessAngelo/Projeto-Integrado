const express = require ('express');
const expressEjsLayout = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const rotaLogin = require('./routes/rotaLogin');
const rotahome = require("./routes/rotaHome");
const app = express();
const porta = 5000;

app.set('views engine','ejs');
app.use(express.static("public"));
app.use(cookieParser());
app.set("layout", "./layout.ejs");
app.use(expressEjsLayout);
app.use(express.urlencoded({extended:true}));
app.use (express.json());

app.use("/", rotahome);
app.use("/login", rotaLogin);

app.listen(porta,function (){
    console.log("Servidor em execução");
});