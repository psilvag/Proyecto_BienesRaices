
import nodemailer from 'nodemailer'


//===========Tendremos 2 emails uno para crear la cuenta y otro para recuperar la cuenta=======


//==============EMAIL PARA CREAR CUENTA============================
/*Funcion que crea las credenciales para entrar a los servicios de MAILTRAP*/
const emailRegistro= async(datos)=>{
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      })

/*Desestructuramos el objeto datos que se recibe como parametro en transport*/ 
      const {nombre,email,token}=datos
   
/*Uno de los servicios de MAILTRAP es sendMail pero requerimos las credenciales creado en "transport"
Esta funcion crea la estructura del email para enviarlo al usuario*/
await transport.sendMail({
        from:'Bienesraices.com',
        to:email,
        subject:'Confirma tu cuenta en Bienesraices.com',
        text:'Confirma tu cuenta en bienesraices.com',
        html:`
           <p>Hola ${nombre} confirma tu cuenta en bienesraices.com</p>
           <p>Tu cuenta ya esta lista, solo debes confirmar tu cuenta en
           el siguiente enlace <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 4000}/auth/confirmar/${token}">
           Confirmar cuenta</a></p> 
           <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
        `
    }) 
/*En href le pasamos la  URL de nuestro backend, https://localhost:4000/auth/confirmar/token y no solo auth/confirmar
para ello creamos en el archivo .env las variables de entorno BACKEND_URL
EN EL EMAIL DE CONFIRMACION LE ENVIAMOS UN ENLACE QUE CONTIENE EL TOKEN CREADO AL MOMENTO DE HACER POST*/

}


//==========================EMAIL PARA RECUPERAR CUENTA========================
  const emailOlvidePassword=async (datos) =>{
    
  const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })
    
  const {nombre,email,token}=datos

      await transport.sendMail({
      from:'Bienesraices.com',
      to:email,
      subject:'Restablece tu cuenta en Bienesraices.com',
      text:'Restablece tu cuenta en bienesraices.com',
      html:`
         <p>Hola ${nombre} solicitaste restaurar tu cuenta en bienesraices.com</p>
         <p>Sigue el siguiente enlace para restaurar tu cuenta
         <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 4000}/auth/olvidePassword/${token}">
         Restablecer password</a></p> 
         <p>Si tu no solicitaste el cambio de password, puedes ignorar este mensaje</p>
      `
  })
}
/*En href le pasamos la  URL de nuestro backend, https://localhost:4000/auth/confirmar/token y no solo auth/confirmar
para ello creamos en el archivo .env las variables de entorno BACKEND_URL
EN EL EMAIL DE CONFIRMACION LE ENVIAMOS UN ENLACE QUE CONTIENE EL TOKEN CREADO AL MOMENTO DE HACER POST*/

export {
    emailRegistro,
    emailOlvidePassword
}