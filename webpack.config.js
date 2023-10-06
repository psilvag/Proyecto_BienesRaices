import path from 'path' // usamos los paquetes internos de node, importando path para crear una RUTA ABSOLUTA

export default {
    mode:'development',
    entry:{    // la entrada del archivo original
        mapa:'./src/js/mapa.js',
        agregarImagen:'./src/js/agregarImagen.js'
    },
    output:{   // donde se guardara el archivo compilado
    filename:'[name].js',
    path:path.resolve('public/js') // aqui usamos una ruta aboluta, para que dependiendo si este en mi PC o enel servidor  busca la carpeta y lo escribe
    }
}
