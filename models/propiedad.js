import { DataTypes } from "sequelize";
import db from "../config/DB";

const Propiedad= db.define("propiedades",{
    id:{
        type:DataTypes.UUID,
        allowNull:false,
        unique:true,
        primaryKey:true,
        defaultValue:DataTypes.UUIDV4

    },
    titulo:{
        type:DataTypes.STRING(100),
        allowNull:false
    },
    descripcion:{
        type:DataTypes.STRING
    },
    habitaciones:{
       type:DataTypes.INTEGER,   
       allowNull:false
    },
    estacionamientos:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    wc:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    calle:{
        type:DataTypes.STRING(60),
        allowNull:false
    },
    lat:{
        type:DataTypes.STRING,
        allowNull:false
    },
    lng:{
        type:DataTypes.STRING,
        allowNull:false
    },
    imagen:{
        type:DataTypes.STRING,
        allowNull:false
    },
    publicado:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
    }
    
    
    
    


    
})
export default Propiedad;