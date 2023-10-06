 import {Dropzone} from 'dropzone'
 
 // Obtenemos el token de 
 const token=document.querySelector('meta[name="csrf-token"]').getAttribute('content')


 Dropzone.options.imagen={
    dictDefaultMessage:"Sube tus imagenes aqui",
    acceptedFiles:".png,.jpg,.jpeg",
    maxFilesize:5,
    maxFiles:1,
    parallelUploads:1,
    autoProcessQueue:false,
    addRemoveLinks:true,
    dictRemoveFile:"Eliminar",
    dictMaxFilesExceeded:"Limite 1 archivo",
    headers:{
        'CSRF-Token':token
    },
    paramName:'imagen',
    init: function(){
       const dropzone=this
       const btnpublicarImagen=document.querySelector('#publicar')
       btnpublicarImagen.addEventListener('click',function(){
        dropzone.processQueue()
       })
       // dropzone.on() significa que es un evento de dropzone
       // el evento quequecomlete se llama cuando ya se subio los archivos por parte de processqueue
       // getActiveFiles : verifica cuantos archivos hay en la cola
       dropzone.on('queuecomplete',function(){
            if(dropzone.getActiveFiles().length==0){
                window.location.href='/mispropiedades'  // lo redireccionamos a mis propiedades
            }
       })
    }
    
 }
