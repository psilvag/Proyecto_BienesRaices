 
 import  express from "express"
 const router=express.Router()
 import {admin,crear, guardar,agregarImagen} from '../controllers/propiedadController.js'
 import {body} from 'express-validator'
 import protegerRuta from '../middleware/protegerRuta.js'

 router.get('/mispropiedades',protegerRuta,admin)
 router.get('/propiedades/crear',protegerRuta,crear)

 // Hacemos la validacion del campo Titulo en el routing usando body
 router.post('/propiedades/crear',
    protegerRuta,
    body('titulo').notEmpty().withMessage('El titulo es obligatorio'),
    body('descripcion')
         .notEmpty().withMessage('La descripcion es obligatoria')
         .isLength({max:150}).withMessage('La descripcion es muy larga, 150 caracteres max'),
    body('categoria').isNumeric().withMessage('Categoria obligatoria'),
    body('precio').isNumeric().withMessage('Selecciona el rango de precios'),
    body('habitaciones').isNumeric().withMessage('Selecciona el numero de habitaciones'),
    body('estacionamientos').isNumeric().withMessage('Selecciona la cantidad de estacionamientos'),
    body('wc').isNumeric().withMessage('Selecciona la cantidad de baños'),
    body('lat').notEmpty().withMessage('Selecciona la ubicacion en el mapa'),
    body('lng').notEmpty().withMessage('Selecciona la ubicacion en el mapa'),
    guardar)
   
    router.get('/propiedades/agregar-imagen/:id',protegerRuta,agregarImagen)
    router.post()
 export default router

