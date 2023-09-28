import jwt from 'jsonwebtoken'

//Le pasamos el objeto datos del usuario para que en el payload almacene esos datos
const generarJWT=datos=>{
jwt.sign(
   {id:datos.id,
    nombre:datos.nombre 
   },process.env.JWT_SECRET,{expiresIn:'1d'})
}
//Generamos un Id 
const generarId=()=>Math.random().toString(32).substring(2)+Date.now().toString(32)

export {
    generarId,
    generarJWT
}