import  express  from 'express'
import csrf from 'csurf'
import cookieParser from 'cookie-parser'
import db from './config/DB.js'

import usuarioRoutes from './Routes/usuarioRoutes.js'
import propiedadesRoutes from './Routes/propiedades.Routes.js'

//CREAR LA APP
const app=express()
//Hacemos esto para cuando hagamos el deployment el hosting asigne un puerto, sino puerto 4000
const port= process.env.PORT || 4000  

//Habiliar lectura de datos de formularios para leer lo que contiene req.body
app.use(express.urlencoded({extended:true}))

//Habliitamos cookie parser, esto permite escribir en el req un COOKIE
app.use(cookieParser())
//Habilitar CSRF croos side request forgery
app.use(csrf({cookie:true}))

//CONEXION A LA BASE DATOS 
try{
 await db.authenticate()
 db.sync()     // Crea la tabla en caso que no este creada
 console.log('Conexion correcta a la base de datos');
}
catch(error){
 console.log(error);
}

//Routing
app.use('/auth',usuarioRoutes)
app.use('/',propiedadesRoutes)

//Habilitar pug template engines
app.set('view engine','pug')
app.set('views','./views')

//Carpeta publica le decimos la carpeta public es publica
app.use(express.static('public'))




//Escuchando puerto

app.listen(port,()=>{
    console.log(`SERVIDOR INICIADO POR EL  PUERTO: ${port}`);
})
