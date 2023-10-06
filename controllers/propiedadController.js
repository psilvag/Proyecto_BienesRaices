import { validationResult } from "express-validator"
import {Precio,Categoria,Propiedad} from "../models/index.js"




const admin=(req,res)=>{
    res.render('propiedades/admin',{
        pagina:'Mis propiedades'
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
        csrfToken:req.csrfToken(),
        categorias,
        precios,
        datos:{}
    })
}

const guardar=async(req,res)=>{

    let resultado= validationResult(req)
    if(!resultado.isEmpty()){
        const [categorias,precios]=await Promise.all([
              Categoria.findAll(),
              Precio.findAll()
        ])
        return res.render('propiedades/crear',{
            pagina:'Crear propiedad',
            csrfToken:req.csrfToken(),
            categorias,
            precios,
            errores:resultado.array(),
            datos:req.body
        })


    }
    //Crear un registro
    const {titulo,descripcion,habitaciones,estacionamientos,wc,calle,lat,lng,precio: precioId, categoria: categoriaId}=req.body
    const {id:usuarioId}=req.usuario
    try{
      const propiedadGuardada= await Propiedad.create({
        titulo,
        descripcion,
        habitaciones,
        estacionamientos,
        wc,
        calle,
        lat,
        lng,
        precioId,
        categoriaId,
        usuarioId,
        imagen:''
      })
     
      const {id}=propiedadGuardada.id
      res.redirect(`/propiedades/agregar-imagen/${id}`)

    }catch(error){
        console.log(error);
    }
}

const agregarImagen=async(req,res)=>{

    // validar que la propiedad existe
    const {id}= req.params
    const propiedad= await Propiedad.findByPk(id)
    if(!propiedad){
        res.redirect('/mispropiedades')
    } 
    // validar que la propiedad no este publicada
    if(propiedad.publicado){
        res.redirect('/mispropiedades')
    }
    // validar que la propiedad le corresponda al usuario logueado
    if(propiedad.usuarioId.toString()!==req.usuario.id.toString()){
      res.redirect('/mispropiedades')
    }
    res.render('propiedades/agregar-imagen',{
       pagina:`Agregar imagen: ${propiedad.titulo}`,
       propiedad,
       csrfToken:req.csrfToken()
    })
 }

 const almacenarImagen=async (req,res,next)=>{

    const {id}= req.params
    const propiedad= await Propiedad.findByPk(id)
    if(!propiedad){
        res.redirect('/mispropiedades')
    } 
    if(propiedad.publicado){
        res.redirect('/mispropiedades')
    }
    if(propiedad.usuarioId.toString()!==req.usuario.id.toString()){
      res.redirect('/mispropiedades')
    }
    try {
        propiedad.imagen=req.file.filename
        propiedad.publicado=1
        await propiedad.save()
        next()

    } catch (error) {
        console.log(error);
    }


 }

export{
    admin,
    crear,
    guardar,
    agregarImagen,
    almacenarImagen
}