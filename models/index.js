import Propiedad from "./propiedad.js"
import Precio from "./precio.js"
import Categoria from "./categoria.js"
import Usuario from "./usuario.js"

// relacion precio-propiedad uno a uno
Propiedad.belongsTo(Precio,{foreignKey:'precioId'})
// Relacion propiedad con categorias uno-muchos
Propiedad.belongsTo(Categoria,{foreignKey:'categoriaId'})
// Relacion propiedad con usuario  uno-muchos
Propiedad.belongsTo(Usuario,{foreignKey:'usuarioId'})

export{
Categoria,
Precio,
Propiedad,
Usuario
}