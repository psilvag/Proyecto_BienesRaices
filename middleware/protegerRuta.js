import jwt from 'jsonwebtoken'
import  {Usuario}  from '../models/index.js'


const protegerRuta=async(req,res,next)=>{

    // verificar si existe un token
    const {_token}= req.cookies
    console.log(req.cookies);
     if(!_token){
        return res.redirect('/auth/login')
     }
    // validar ese token
     try{ 
       const decoded=jwt.verify(_token,process.env.JWT_SECRET)
       console.log(decoded);
       const usuario= await Usuario.scope('eliminarDatosdePayload').findByPk(decoded.id)
       if(usuario){
            req.usuario=usuario
       }else{
        return res.redirect('/auth/login')
       }
       return next()
     }
     catch(error){
      return res.clearCookie('_token').redirect('/auth/login')
     }

 
}
export default protegerRuta