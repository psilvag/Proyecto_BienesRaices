// DEPENDENCIAS
import { check,validationResult } from "express-validator"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { generarJWT } from "../helpers/tokens.js"

// ARCHIVOS CREADOS
import Usuario from "../models/usuario.js"
import { generarId } from "../helpers/tokens.js"
import { emailRegistro } from "../helpers/emails.js"
import { emailOlvidePassword } from "../helpers/emails.js"


//====================================FUNCIONES========================================================

//===================================FUNCION REGISTRO==================================================

// Formulario para registrar usuario 
const formularioRegistro=(req,res)=>{
 
   res.render('auth/registro',{
       pagina:"Crear Cuenta",
       csrfToken:req.csrfToken()
   })
}
// Validamos datos
const registrar= async (req,res)=>{

   /*validaciones:
   los valores "nombre,email,password,repetir_password" viene del archivo registro.pug atributo name del input*/
    await check('nombre').notEmpty().withMessage('El nombre es obligatorio').run(req)
    await check('email').isEmail().withMessage('Debe ser un email').run(req)
    await check('password').isLength({min:6}).withMessage('Password debe ser minimo 6 caracteres').run(req)
    await check('repetir_password').equals(req.body.password).withMessage('Los password no son iguales').run(req)

   // Validationresults verifica las reglas definidas
   let resultado=validationResult(req)  

   //Verificar 
   /*En resultados.array() se encuentra el array de objetos de los errores que arroja validationResult*/
   /*Si existe errores le mandamos al  mismo sitio "registro" y para que los datos ingresados no se borren le pasamos 
   el objeto usuario con los valores nombre y email para que se use en los values de los inputs*/

   if(!resultado.isEmpty()){
      return res.render('auth/registro',{
         pagina:"Crear Cuenta",
         csrfToken:req.csrfToken(),
         errores:resultado.array(), 
         usuario:{
            nombre:req.body.nombre,
            email:req.body.email
         }
     })
    }

   //Verificamos si el usuario ya existe para no crear duplicados por email
   const {nombre,email,password}=req.body
   const existeUsuario= await Usuario.findOne({where:{email}}) 
   if(existeUsuario)
   {
      return res.render('auth/registro',{
         pagina:"Crear Cuenta",
         csrfToken:req.csrfToken(),
         errores:[{msg:'El usuario ya esta registrado'}],  
         usuario:{
            nombre:req.body.nombre,
            email:req.body.email
         }
     })
   }

   //Si no hay errores, hacemos el post a la base de datos
   const usuario= await Usuario.create({
      nombre:nombre,
      email:email,
      password:password,
      token:generarId()
   })
   
   //Enviamos el email de confirmacion
   /*Usamos la funcion emailRegistro creada en la carpeta helpers
   esta funcion crea una estructura para enviar un email*/ 
   emailRegistro({  
      nombre:usuario.nombre,
      email:usuario.email,
      token:usuario.token
   })
   
   // Renderizamos un mensaje para decirle al usuario que se creo la cuenta y se envio la confirmacion a su email
   res.render('templates/mensaje',{
      pagina:'Cuenta creada correctamente',
      mensaje:'Enviamos un email de confirmacion. Revisa tu email'
   })
}


   //Confirmar el usuario. Verificar si confirmo su cuenta en el email
   /*Obtenemos el token del parametro */
   const confirmar= async (req,res)=>{
   const token=req.params.token

   //Verificar si el token es valido
   const usuario= await Usuario.findOne({where:{token}})
    
   if(!usuario){
   return res.render('auth/confirmarCuenta',{
      pagina:'Error al confirmar cuenta',
      mensaje:'Hubo un error, al confirmar tu cuenta intenta de nuevo ',
      error:true
   })
   }

   //Confirmar la cuenta
   /*Si la cuenta esta confirmada eliminamos el token, y la propiedad confirmado pasa a true 
   y lo guardamos */
   usuario.token=null
   usuario.confirmado=true
   await usuario.save()
   res.render('auth/confirmarCuenta',{
      pagina:'Cuenta confirmada',
      mensaje:'La cuenta se confirmo correctamente '
      
   })
   
}



//=============================FUNCION LOGIN==================================

const formularioLogin=(req,res)=>{
   res.render('auth/login',{
      pagina:"Iniciar sesion",
      csrfToken:req.csrfToken()
   })
}

//Para validar requerimos email y password
const autenticar=async (req,res)=>{

await check('email').isEmail().withMessage('Debe ser un email').run(req)
await check('password').notEmpty().withMessage('Password obligatorio').run(req)

   let resultado=validationResult(req)
   if(!resultado.isEmpty()){
   return res.render('auth/login',{
      pagina:"Iniciar sesion",
      csrfToken:req.csrfToken(),
      errores:resultado.array()
         
      })
   }

   //Comprobar si el usuario existe, buscamos por email
   const {email,password}=req.body
   const usuario= await Usuario.findOne({where:{email}})
   if(!usuario){
      return res.render('auth/login',{
         pagina:"Iniciar sesion",
         csrfToken:req.csrfToken(),
         errores:[{msg:'El usuario no existe'}]
            
         })
   }

   //Comprobar si el usuario esta CONFIRMADO (confirmo su correo)
   if(!usuario.confirmado){
      return res.render('auth/login',{
         pagina:"Iniciar sesion",
         csrfToken:req.csrfToken(),
         errores:[{msg:'Tu cuenta no esta confirmada'}]
         })
   }
 
   /*Revisar el password
   usuario.verificarPassword devuelve un false o un true
   si es false retornamos mensaje de error*/
   if(!usuario.verificarPassword(password)){
   return res.render('auth/login',{
      pagina:"Iniciar sesion",
      csrfToken:req.csrfToken(),
      errores:[{msg:'El password es incorrecto'}]
         
      })
   }

   const token=generarJWT({id:usuario.id,nombre:usuario.nombre})

   //Almacenar token en un COOKIE
   return res.cookie('_token',token,{ 
      httpOnly:true,   // esto evita que no sea accesible desde la api de javascript
      //secure:true,   // si es que tenemos un certificado SSL
      //sameSite:true  // si es que tenemos un certificado SSL
   }).redirect('/mispropiedades') 
}



//=================FUNCION RECUPERAR CUENTA============================

   const formularioOvlidePassword=(req,res)=>{
   res.render('auth/olvidePassword',{
       pagina:"Recupera tu acceso a bienes raices",
       csrfToken:req.csrfToken()
   })

   }
 
   const resetPassword= async(req,res)=>{
   // Verificar que sea un email 
      await check('email').isEmail().withMessage('Debe ser un email').run(req)
      let resultado=validationResult(req)  
   
      if(!resultado.isEmpty()){
       return res.render('auth/olvidePassword',{
          pagina:"Recupera tu aceeso a Bienes Raices",
          csrfToken:req.csrfToken(),
          errores:resultado.array()  
          
      })
     }
   
   // Buscar el usuario para recuperar su cuenta
   const {email}=req.body
   const usuario= await Usuario.findOne({where:{email}})
   if(!usuario){
      return res.render('auth/olvidePassword',{
         pagina:"Recupera tu aceeso a Bienes Raices",
         csrfToken:req.csrfToken(),
         errores:[{msg:'Ese email no pertenece a ningun usuario'}] 
         
     })
   }

   //Si el email es valido generar el token y enviar el email
     usuario.token=generarId()
     await usuario.save()

   // Funcion enviar email para recuperar la cuenta
   emailOlvidePassword({
     email:usuario.email,
     nombre:usuario.nombre,
     token:usuario.token
   })

   //Renderizar un mensaje
     res.render('templates/mensaje',{
     pagina:'Restablece tu password',
     mensaje:'Enviamos un email con  las instrucciones. Revisa tu email'
   })
   }
 
   const comprobarToken=async(req,res)=>{
    const token=req.params.token 
    const usuario=await Usuario.findOne({where:{token}})
  
   if(!usuario){
   return res.render('auth/confirmarCuenta',{
      pagina:'Restablece tu password',
      mensaje:'Hubo un error, al confirmar tu password, intenta de nuevo',
      error:true
   })
   } 
   // En caso que si es valido el token mostramos un formulario para su password
   res.render('auth/resetPassword',{
      pagina:'Restablece password',
      csrfToken:req.csrfToken()
   })
   
   }
  
   const nuevoPassword= async(req,res)=>{
   
   //Validar password
   await check('password').isLength(6).withMessage('Debe ser almenos 6 caracteres').run(req)
   await check('password').notEmpty().withMessage('Introduce el password').run(req)
   let resultado=validationResult(req)
   
   if(!resultado.isEmpty()){
     return res.render('auth/resetPassword',{
        pagina:"Restablece tu password",
        csrfToken:req.csrfToken(),
        errores:resultado.array()  
     })
   }

   //Verificar quien hace el cambio
   const token=req.params.token
   const {password}=req.body 

   //Traemos nuevamente al usuario para reescribir el password
   const usuario=await Usuario.findOne({where:{token}})
   
   //Hashear el password
   const salt= await bcrypt.genSalt(10) 
   usuario.password= await bcrypt.hash(password,salt)
   usuario.token=null
   await usuario.save()
   
   //Renderizar un mensaje de exito
   res.render('auth/confirmarCuenta',{
      pagina:'Restablece tu password',
      mensaje:'El password se restablecio correctamente'
   })
   }
 
 

export {
 
   formularioRegistro,
   registrar,
   confirmar,
   formularioLogin,
   autenticar,
   formularioOvlidePassword,
   resetPassword,
   comprobarToken,
   nuevoPassword
}

