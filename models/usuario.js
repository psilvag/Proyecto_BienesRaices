
import { DataTypes } from "sequelize" // tambien funciona si ponemos import sequelize from "sequelize"
import db from '../config/DB.js'
import bcrypt from 'bcrypt'

    // CREANDO LA TABLA USUARIO CON SUS COLUMNAS, DENTRO DE LA BASE DE DATOS
    const Usuario=db.define('usuarios',{    
    // Si es import sequelize from "sequelize" el type seria: type:sequelize.STRING

    nombre:{                  //se puede definir la cantidad de caracteres STRING(255)
    type:DataTypes.STRING,    // el tipo de dato es varchar pero sequelize ya detecta con STRING varchar(255 o 1234)
    allowNull:false           // significa no puede ir vacio
    },
    email:{
    type:DataTypes.STRING,
    allowNull:false           
    },
    password:{
    type:DataTypes.STRING,    
    allowNull:false 
    },
    token:DataTypes.STRING,        // cuando no tiene muchos atributos no usar {} y eliminar type
    confirmado:DataTypes.BOOLEAN  
    
    
    },
    {  
    // Cuando damos al boton crear cuenta el "usuario" pasa por esta funcion y hashea el password
    hooks:{
        beforeCreate:async function(usuario){
    // El valor 10 significa 10 rondas, rondas de hasheo cuanto mas grande mejor pero consume recursos
    // gensalt generar saltos
        const salt= await bcrypt.genSalt(10) 
        usuario.password= await bcrypt.hash(usuario.password,salt)
        }
      }
    })

    /*bcrypt tiene librerias que permite comparar un TEXTO PLANO con uno que esta HASHEADO
    para ello realizamos funciones personalizadas SEQUELIZE PERMITE METODOS PERSONALIZADOS*/

    /*Dentro del prototype del Objeto Usuarios registramos la funcion verificarPassword
    this.password se  usa solo con function()*/
    Usuario.prototype.verificarPassword=function(password){ 
       return bcrypt.compareSync(password,this.password) // compara el password ingresado con el hasheado
    }  



export default Usuario








