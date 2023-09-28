 import {exit} from "node:process"
 import categorias from "./categorias.js"
 import precios from "./precios.js"
 import db from "../config/DB.js"
//  import Categoria from "../models/categoria.js"
//  import Precio from "../models/precio.js"
 import {Categoria,Precio} from "../models/index.js" // importamos los modelos con sus relaciones

 const importarDatos= async ()=>{
    try{
        // autenticar con la base de datos
        await db.authenticate()
        // generar las columnas
        await db.sync()
        // insertar datos
        await Promise.all([ 
            Categoria.bulkCreate(categorias),
            Precio.bulkCreate(precios)    
        ])// Promise.all recibe un array de promesas y devuelve VALIDO si todas las promesas se cumplen
        console.log("datos importados correctamente");
        exit() // cuando es 0, la funcion termino de forma correcta, si es exit (1) termino con error
    }catch(error){
        console.log(error)
        exit(1) // termina todos los procesos que aun no terminaron
    }
}
const eliminarDatos=async()=>{
    // truncate elimina todos los registros y comienza desde el id=1
    try{
        await Promise.all([
            Categoria.destroy({where:{},truncate:true}), 
            Precio.destroy({where:{},truncate:true})
        ])
        console.log("Datos eliminados correctamente");
        exit()
        // OTRA OPCION DE ELIMINAR LA BASE DATOS
        //await db.sync({force:true})
    }catch(error){
        console.log(error);
        exit(1)
    }
}

 if (process.argv[2]=='-i'){
    importarDatos()
  
 }
 if(process.argv[2]=='-e'){
    eliminarDatos()
 }

