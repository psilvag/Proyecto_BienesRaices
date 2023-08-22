// dependencias
import  express  from "express"
// archivos creados
import { formularioLogin } from "../controllers/usuarioController.js"
import { formularioRegistro } from "../controllers/usuarioController.js"
import {formularioOvlidePassword} from "../controllers/usuarioController.js"
import { registrar } from "../controllers/usuarioController.js"
import { confirmar } from "../controllers/usuarioController.js"
import { resetPassword } from "../controllers/usuarioController.js"
import { comprobarToken } from "../controllers/usuarioController.js"
import { nuevoPassword } from "../controllers/usuarioController.js"
import { autenticar } from "../controllers/usuarioController.js"

const router=express.Router()

//Routing  express soporta los verbos HTTP get,delete,put,patch,post

router.get('/login',formularioLogin)
router.post('/login',autenticar)

router.get('/registro',formularioRegistro)
router.post('/registro',registrar)
router.get('/confirmar/:token',confirmar)


router.get('/olvidePassword',formularioOvlidePassword)

// Ruta enviamos el email del usuario y un email de confirmacion para recuperar cuenta
router.post('/olvidePassword',resetPassword)

// Ruta verificamos el token 
router.get('/olvidePassword/:token',comprobarToken)

// Ruta visita la pagina para crear un nuevo password*/ 
router.post('/olvidePassword/:token',nuevoPassword)


export default router

 