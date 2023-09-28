 
 import  express from "express"
 const router=express.Router()
 import {admin,crear, guardar} from '../controllers/propiedadController.js'
 import {body} from 'express-validator'
 

 router.get('/mispropiedades',admin)
 router.get('/propiedades/crear',crear)

 // Hacemos la validacion del campo Titulo en el routing usando body
 router.post('/propiedades/crear',
    body('titulo').notEmpty().withMessage('El titulo es obligatorio'),
    guardar)
 
 
 export default router

