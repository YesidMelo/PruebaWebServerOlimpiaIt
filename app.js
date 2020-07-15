const express = require('express');
const bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

var puerto = 3000;
const formatoRespuesta = 'json';
app.post('/',function(solicitud, respuesta){
    respuesta.type(formatoRespuesta)
    if(!esValidoElUsuario(solicitud,respuesta)){ return; }
    guardarEnDBUsuario(solicitud,respuesta);
});

function esValidoElUsuario(solicitud,respuesta){
    
    if(solicitud.body.nombre == null || solicitud.body.nombre ==="" ){ 
        var jsonRespuesta = {
            codigo : 1,
            mensaje : "No ha ingresado Un nombre"
        }
        respuesta.send(jsonRespuesta);
        return false; 
    }

    if(solicitud.body.cedula == null || solicitud.body.cedula ==="" ){ 
        var jsonRespuesta = {
            codigo : 1,
            mensaje : "No ha ingresado una cedula"
        }
        respuesta.send(jsonRespuesta);
        return false; 
    }

    if(solicitud.body.direccion == null || solicitud.body.direccion ==="" ){ 
        var jsonRespuesta = {
            codigo : 1,
            mensaje : "No ha ingresado una direccion"
        }
        respuesta.send(jsonRespuesta);
        return false; 
    }

    if(solicitud.body.ciudad == null || solicitud.body.ciudad ==="" ){ 
        var jsonRespuesta = {
            codigo : 1,
            mensaje : "No ha ingresado una ciudad"
        }
        respuesta.send(jsonRespuesta);
        return false; 
    }

    if(solicitud.body.pais == null || solicitud.body.pais ==="" ){ 
        var jsonRespuesta = {
            codigo : 1,
            mensaje : "No ha ingresado un pais"
        }
        respuesta.send(jsonRespuesta);
        return false; 
    }

    if(solicitud.body.celular == null || solicitud.body.celular ==="" ){ 
        var jsonRespuesta = {
            codigo : 1,
            mensaje : "No ha ingresado un celular"
        }
        respuesta.send(jsonRespuesta);
        return false; 
    }

    if(solicitud.body.foto == null || solicitud.body.foto ==="" ){ 
        var jsonRespuesta = {
            codigo : 1,
            mensaje : "No ha ingresado un foto"
        }
        respuesta.send(jsonRespuesta);
        return false; 
    }

    if(solicitud.body.GPS == null ){ 
        var jsonRespuesta = {
            codigo : 1,
            mensaje : "No ha ingresado un posicion geografica"
        }
        respuesta.send(jsonRespuesta);
        return false; 
    }

    if(solicitud.body.Bluetooth == null || solicitud.body.Bluetooth ===  ""){ 
        var jsonRespuesta = {
            codigo : 1,
            mensaje : "No ha ingresado un estado de bluetooth"
        }
        respuesta.send(jsonRespuesta);
        return false; 
    }
    
    if(solicitud.body.Wifi == null || solicitud.body.Wifi ===  ""){ 
        var jsonRespuesta = {
            codigo : 1,
            mensaje : "No ha ingresado un estado de Wifi"
        }
        respuesta.send(jsonRespuesta);
        return false; 
    }

    return true;
}

function guardarEnDBUsuario(solicitud,respuesta){
    
}

app.get('/',function(solicitud, respuesta){
    respuesta.send("Hola mundo");
});

app.listen(puerto,function(){
    console.log("El servidor esta funcionando");
});