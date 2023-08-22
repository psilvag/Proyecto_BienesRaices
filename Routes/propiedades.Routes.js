 
 import  express from "express"
 const router=express.Router()


 import {admin,crear} from '../controllers/propiedadController.js'


 router.get('/mispropiedades',admin)
 router.get('/propiedades/crear',crear)
 //router.delete('/propiedades/:id',delete)
 
 export default router

