 import categorias from "./categorias.js"
 import Categoria from "../models/categoria.js"
 import db from "../config/DB.js"

 const importarDatos= async ()=>{
    try{
        // autenticar con la base de datos
        await db.authenticate()

        // generar las columnas
        await db.sync()

        // insertar datos
        await Categoria.bulkCreate(categorias)
        console.log("datos importados correctamente");
        exit() // cuando es 0, la funcion termino de forma correcta, si es exit (1) termino con error

    }catch(error){
        console.log(error)
        process.exit(1) // termina todos los procesos que aun no terminaron
    }
 }

 if (process.argv[2]=='-i'){
    importarDatos()
 }

