var express = require('express');
var app = express();

var puerto = 3000;

app.post('/',function(solicitud, respuesta){
    respuesta.send("Hola mundo");
});

app.get('/',function(solicitud, respuesta){
    respuesta.send("Hola mundo");
});

app.listen(puerto,function(){
    console.log("El servidor esta funcionando");
});