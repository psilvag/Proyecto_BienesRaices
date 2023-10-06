 import {Dropzone} from 'dropzone'

 Dropzone.options.imagen={
    dictDefaultMessage:"Sube tus imagenes aqui",
    acceptedFiles:".png,.jpg,.jpeg",
    maxFilesize:5,
    maxFiles:1,
    parallelUploads:1,
    autoProcessQueue:true,
    addRemoveLinks:true,
    dictRemoveFile:"Eliminar",
    dictMaxFilesExceeded:"Limite 1 archivo"
    
 }
