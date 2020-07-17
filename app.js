const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require("sqlite3").verbose();

var app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

var puerto = 3000;
const formatoRespuesta = 'json';
const nombreBaseDatos = "InformacionUsuario.db";

app.get('/',function(solicitud, respuesta){
    respuesta.send("Hola mundo");
});

app.post('/GuardarInformacion',function(solicitud, respuesta){
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



function inicializarBaseDatos(){
    let db = new sqlite3.Database(nombreBaseDatos,sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,(Error)=>{
        if(Error){
            return console.error(Error.message);
        }
        console.log("Se ha conectado a la base de datos en memoria");
    });

    return db;
}

function cerrarBaseDatos(db){
    db.close((err)=>{
        if(err){
            console.error(err.message);
            return; 
        }
        console.log("Se ha cerrado la conexion a la base de datos");
    });
}

function guardarEnDBUsuario(solicitud,respuesta){
    var script = `insert or replace into usuario(nombre,cedula,direccion,ciudad,pais,celular,foto,altitud,longitud,bluetooth,wifi) values
	(
      "${solicitud.body.nombre}",
      "${solicitud.body.cedula}",
      "${solicitud.body.direccion}",
      "${solicitud.body.ciudad}",
      "${solicitud.body.pais}",
      "${solicitud.body.celular}",
      "${solicitud.body.foto}",
      "${solicitud.body.GPS.latitud}",
      "${solicitud.body.GPS.longitud}",
      "${solicitud.body.Bluetooth}",
      "${solicitud.body.Wifi}");`;

      let db = inicializarBaseDatos();
      db.run(script,(err)=>{
        if(err){
            console.error(err.message);
            let respuestajson = {
                codigo : "1",
                mensaje : "Surgio un problema durante la carga de datos"
            }
            respuesta.send(respuestajson);
            return;
        }

        let respuestajson = {
            codigo : "2",
            mensaje : "El usuario se ha almacenado correctamente"
        }
        respuesta.send(respuestajson);
      });
      cerrarBaseDatos(db);
    
}

function generarTabla(){
    var script = `CREATE TABLE IF NOT EXISTS usuario (
        idUsuario integer PRIMARY KEY AUTOINCREMENT,
          nombre text varchar(50) NOT NULL,
          cedula text varchar(50) NOT NULL,
          direccion text varchar(50) NOT NULL,
          ciudad text varchar(50) NOT NULL,
          pais text varchar(50) NOT NULL,
          celular text varchar(50) NOT NULL,
          foto text varchar(50) NOT NULL,
          altitud text varchar(50) NOT NULL,
          longitud text varchar(50) NOT NULL,
          bluetooth text varchar(50) NOT NULL,
          wifi text varchar(50) NOT NULL
    );`;
    var db = inicializarBaseDatos();
    db.run(script,(err)=>{
        if(err){
            console.log(err.message);
            return;
        }
        console.log("Se ha creado la tabla usuario");
    });
    cerrarBaseDatos(db);
}



app.listen(puerto,function(){
    generarTabla();
    console.log("El servidor esta funcionando");
});

