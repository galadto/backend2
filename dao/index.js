import { Sequelize,  DataTypes } from "sequelize";


//const CADENA_CONEXION = "postgres://tpg:tpg@localhost:5432/prograbd"
//export const sequelize = new Sequelize(CADENA_CONEXION)

//definir variables
export const sequelize = new Sequelize(process.env.DATABASE_URL,{
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      },
  }
}
)

const Paciente = sequelize.define("Paciente", {
    id:{
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4
        
    },
    nombre: DataTypes.STRING(100),
    nombre_usuario: DataTypes.STRING(100),
    contraseña: DataTypes.STRING(100),
    correo: DataTypes.STRING(100),
    telefono: DataTypes.STRING(100),
    num_tarjeta: DataTypes.STRING(100)
},{
    freezeTableName:true,
    timestamps: false
})

const Medico = sequelize.define("Medico", {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4
    },
    nombre: DataTypes.STRING(100),
    correo: DataTypes.STRING(50),
    virtual_precio: DataTypes.INTEGER,
    presencial_precio:DataTypes.INTEGER,
    link: DataTypes.STRING(50),
    horario: DataTypes.STRING(100),
    contrasena: DataTypes.STRING(50),
    numero: DataTypes.INTEGER,
    dias_atencion: DataTypes.STRING(100),
    pres_inicio_h:DataTypes.DATE,
    virtual_inicio_h: DataTypes.DATE,
    pres_fin_h: DataTypes.DATE,
    virtual_fin_h: DataTypes.DATE
},
{
    freezeTableName:true,
    timestamps: false


})


const Interaccion = sequelize.define("Interaccion", {
    id:{
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4
        
    },
    tipo_pregunta: DataTypes.STRING(50),
    comentarios: DataTypes.STRING(300),
    calificacion: DataTypes.INTEGER,
    idPaciente:{
        type:DataTypes.UUID,
        allowNull:false
    },
    idMedico:{
        type:DataTypes.UUID,
        allowNull:false
    }

},{
    freezeTableName:true,
    timestamps: false
})
const Diagnostico = sequelize.define("Diagnostico", {
    id:{
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4
        
    },
    medicina: DataTypes.STRING(100),
    intervalo_toma: DataTypes.INTEGER,
    dias_tomado: DataTypes.INTEGER,
    sig_cita:DataTypes.BOOLEAN,
    fecha_sigcita:DataTypes.DATE,
    envio:DataTypes.BOOLEAN,
    dignostico: DataTypes.STRING(500)
},{
    freezeTableName:true,
    timestamps: false
})

const Atencion = sequelize.define("Atencion", {
    id:{
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4
        
    },
    virtual_precio: DataTypes.INTEGER,
    presencial_precio: DataTypes.INTEGER,
    nombre_medico: DataTypes.STRING(100),
    tipo_consulta: DataTypes.STRING(100),
    inicio_hora: DataTypes.STRING(100),
    fin_hora: DataTypes.STRING(100),
    dia_atencion: DataTypes.DATE,
    especialidad_medico: DataTypes.STRING(100),
    direccion: DataTypes.STRING(100),
    puntuacion: DataTypes.INTEGER,
    comentario: DataTypes.STRING(500),
    idMedico:{
        type:DataTypes.UUID,
        allowNull:false
    },
    idPaciente:{
        type:DataTypes.UUID,
        allowNull:false
    },
    idDiagnostico:{
        type:DataTypes.UUID,
        allowNull:false
    }


},{
        freezeTableName:true,
        timestamps: false
})

const Especialidad = sequelize.define("Especialidad", {
    id:{
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4
        
    },
    nombre: DataTypes.STRING(100),
    activo:{
        type:DataTypes.BOOLEAN,
        allowNull : false
    }
    
    },{
        freezeTableName:true,
        timestamps: false
    })


Medico.belongsTo(Especialidad,{
    foreignKey:"idEspecialidad"
})
Especialidad.hasMany(Medico,{
    foreignKey:"id"
})



Atencion.belongsTo(Diagnostico,{
    foreignKey:"idDiagnostico"
})
Diagnostico.hasMany(Atencion,{
    foreignKey:"id"
})

Atencion.belongsTo(Paciente,{
    foreignKey:"idPaciente"
})
Paciente.hasMany(Atencion,{
    foreignKey:"id"
})


Interaccion.belongsTo(Medico,{
    foreignKey:"idMedico"
})
Medico.hasMany(Interaccion,{
    foreignKey:"id"
})



Interaccion.belongsTo(Paciente,{
    foreignKey:"idPaciente"
})
Paciente.hasMany(Interaccion,{
    foreignKey:"id"
})


Atencion.belongsTo(Medico,{
    foreignKey:"idMedico"
})
Medico.hasMany(Atencion,{
    foreignKey:"id"
})


export { Medico, Especialidad, Paciente, Atencion, Diagnostico, Interaccion }