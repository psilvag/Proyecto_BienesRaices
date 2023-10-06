import multer from 'multer'
import path from 'path'
import {generarId} from '../helpers/tokens.js'
// multer soporta diferentes formas de almacenar los archivos, por ejemplo si lo deployamos se almacena en el servidor

// diskstorage: dodne se guardara las imagenes
const storage=multer.diskStorage({
    // si se llega a llamar cb que es un callback significa que se subio BIEN LA IMAGEN
    destination: function(req,file,cb){
      cb(null,'./public/uploads')
    },
    filename:function(req,file,cb){
        // concatemos el nombre del archivo con un ID distinto ya que no puede existir archivos del mismo nombre  
        cb(null, generarId()+path.extname(file.originalname))  
    }
})
const upload=multer({storage})

export default upload