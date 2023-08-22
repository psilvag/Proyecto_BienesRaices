import { Sequelize } from "sequelize"
import dotenv from 'dotenv'

dotenv.config({
      path:'.env'
   }
   ) // la ruta la archivo .env

// CREANDO LA BASE DE DATOS
const db= new Sequelize(process.env.BD_NOMBRE,process.env.BD_USER,process.env.BD_PASS ?? '', {

   host:process.env.BD_HOST,
   port:3306,
   dialect:'mysql',  // sequelize soporta varias bases de datos entre ellas mysql, postgreSQL, mariaDB, microsoft DB etc
   define:{
    timestamps:true  // timestamps crea dos columnas nuevas en la tabla users cada vez que se registra un usuario:
                    // la primera cuando se registro el usuario y cuando se actualizo
   },

   // lo que trata de hacer sequelize es mantener o reutilizar conexiones vivas
   pool:{// en caso que haya una conexion viva se use esa y no cree una nueva pool de conexiones
    max:5, // hara maximo 5 conexiones por persona
    min:0, // cuando no haya actividad desconectara todas para liberar recursos
    acquire:30000, // 30 milisec 30 segundos => tiempo que espera antes de marcar error
    idle:10000 // 10 sec tiempo que debe pasar para finalizar una conexion a la base de datos
   },
   operatorsAliases:false
})

export default db