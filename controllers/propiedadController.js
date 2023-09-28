import Categoria from "../models/categoria.js"
import Precio from "../models/precio.js"

const admin=(req,res)=>{
    res.render('propiedades/admin',{
        pagina:'Mis propiedades',
        barra:true
    })
}

// Formulario para crear propiedad

const crear = async (req,res)=>{

    const [categorias,precios]= await Promise.all([
        Categoria.findAll(),
        Precio.findAll()
    ])

    res.render('propiedades/crear',{
        pagina:'Crear propiedad',
        barra:true,
        categorias,
        precios,
    })
}





export{
    admin,
    crear
}