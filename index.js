import  Express  from "express";
import cors from "cors"
import bodyParser from "body-parser"
import { sequelize } from "./dao/index.js";

import { Medico, Especialidad, Paciente, Atencion, Diagnostico, Interaccion } from "./dao/index.js";

const app = Express()
const port= process.env.PORT || 5000

app.use(bodyParser.json())

app.use(cors())

//MEDICO

app.get("/medico", async(req,res)=>{
    
    
    let medicos= await Medico.findAll()
    let medicosespe=[]

    for(let masc of medicos){
        const especialidad= await Especialidad.findByPk(masc.idEspecialidad)
        medicosespe.push({
               id:masc.id,
               nombre:masc.nombre,
               correo: masc.correo,
               contrasena: masc.contrasena,
               tipo: especialidad,
                virtual_precio:masc.virtual_precio,
                presencial_precio:masc.presencial_precio,
                link:masc.link,
                horario:masc.horario,
                numero:masc.numero,
                dias_atencion:masc.dias_atencion,
                pres_inicio_h:masc.pres_inicio_h,
                virtual_inicio_h:masc.virtual_inicio_h,
                pres_fin_h:masc.pres_fin_h,
                virtual_fin_h:masc.virtual_fin_h,


        }) 

    }

    res.send(JSON.stringify(medicosespe))
})

app.post("/medico" , async (req,res)=>{
    const medico = req.body

    await Medico.create({

        correo: medico.correo,
        contrasena: medico.contrasena,
        nombre: medico.nombre,
        idEspecialidad:medico.idEspecialidad
        
    })
    res.send("OK")    
})

app.put("/medicos" , async (req,res)=>{
    const medico =req.body

    await Medico.update(medico, {
        where: {
            id: medico.id
        }


    })
    res.send("OK") 
})

app.delete("/medicos/:id" , async (req,res)=>{
    const idMedico =req.params.id
    const filasDestruidas = await Medico.destroy({
        where: {
            id: idMedico
        }
    })
    if(filasDestruidas>0){
        res.send("OK")

    }else{
        res.status(400).send("ERROR:no existe ")
    }

})
//get by correo
app.get("/medicos/:correo/:password", async(req,res)=>{
    const correoMedico = req.query.correo

    const medico =await Medico.findByPk
    let especialidades= await Especialidad.findAll()
    
    res.send(JSON.stringify(especialidades))
})

//ESPECIALIDAD
app.get("/especialidad", async(req,res)=>{

    let especialidades= await Especialidad.findAll()
    
    res.send(JSON.stringify(especialidades))
})
app.post("/especialidad" , async (req,res)=>{
    const especialidad = req.body

    await Especialidad.create({
        nombre: especialidad.nombre,
        activo: especialidad.activo   
    })
    res.send("OK")    
})


//DIAGNOSTICO
app.get("/diagnostico", async(req,res)=>{

    let diagnosticos= await Diagnostico.findAll()
    
    res.send(JSON.stringify(diagnosticos))
})
app.post("/diagnostico" , async (req,res)=>{
    const diagnostico = req.body

    await Diagnostico.create({

        medicina: diagnostico.correo,
        intervalo_toma: diagnostico.contrasena,
        dias_tomado: diagnostico.nombre,
        sig_cita:diagnostico.sig_cita,
        fecha_sigcita:diagnostico.fecha_sigcita,
        envio:diagnostico.envio,
        dignostico:diagnostico.diagnostico,
        
    })
    res.send("OK")    
})
app.put("/diagnostico" , async (req,res)=>{
    const diagnostico =req.body

    await Diagnostico.update(diagnostico, {
        where: {
            id: diagnostico.id
        }


    })
    res.send("OK") 
})
//ATENCION
app.get("/atencion", async(req,res)=>{

    let atenciones= await Atencion.findAll()
    
    res.send(JSON.stringify(atenciones))
})
app.post("/atencion" , async (req,res)=>{
    const atencion = req.body

    await Atencion.create({
        virtual_precio:atencion.virtual_precio,
        presencial_precio:atencion.presencial_precio,
        nombre_medico:atencion.nombre_medico,
        tipo_consulta:atencion.tipo_consulta,
        inicio_hora:atencion.inicio_hora,
        fin_hora:atencion.fin_hora,
        dia_atencion:atencion.dia_atencion,
        especialidad_medico:atencion.especialidad_medico,
        direccion:atencion.direccion,
        puntuacion:atencion.puntuacion,
        comentario:atencion.comentario,

    })
    res.send("OK")    
})
app.put("/atencion" , async (req,res)=>{
    const atencion =req.body

    await Atencion.update(atencion, {
        where: {
            id: atencion.id
        }


    })
    res.send("OK") 
})
app.delete("/atencion/:id" , async (req,res)=>{
    const idAtencion =req.params.id
    const filasDestruidas = await Atencion.destroy({
        where: {
            id: idAtencion
        }
    })
    if(filasDestruidas>0){
        res.send("OK")

    }else{
        res.status(400).send("ERROR:no existe")
    }

})

//PACIENTE
app.get("/paciente", async(req,res)=>{

    let pacientes= await Paciente.findAll()
    
    res.send(JSON.stringify(pacientes))
})
app.post("/paciente" , async (req,res)=>{
    const paciente = req.body

    await Paciente.create({

        correo: paciente.correo,
        contrasena: paciente.contrasena,
        nombre: paciente.nombre    
    })
    res.send("OK")    
})
app.put("/paciente" , async (req,res)=>{
    const paciente =req.body

    await Paciente.update(paciente, {
        where: {
            id: paciente.id
        }


    })
    res.send("OK") 
})
app.delete("/paciente/:id" , async (req,res)=>{
    const idPaciente =req.params.id
    const filasDestruidas = await Paciente.destroy({
        where: {
            id: idPaciente
        }
    })
    if(filasDestruidas>0){
        res.send("OK")

    }else{
        res.status(400).send("ERROR:no existe")
    }

})

//INTERACCION
app.get("/interaccion", async(req,res)=>{

    let interacciones= await Interaccion.findAll()
    
    res.send(JSON.stringify(interacciones))
})
app.post("/interaccion" , async (req,res)=>{
    const interaccion = req.body

    await Interaccion.create({

        tipo_pregunta: interaccion.tipo_pregunta,
        comentarios: interaccion.comentarios, 
        calificacion: interaccion.calificacion, 
    })
    res.send("OK")    
})
app.put("/interaccion" , async (req,res)=>{
    const interaccion =req.body

    await Interaccion.update(interaccion, {
        where: {
            id: interaccion.id
        }


    })
    res.send("OK") 
})
app.delete("/interaccion/:id" , async (req,res)=>{
    const idInteraccion=req.params.id
    const filasDestruidas = await Interaccion.destroy({
        where: {
            id: idInteraccion
        }
    })
    if(filasDestruidas>0){
        res.send("OK")

    }else{
        res.status(400).send("ERROR:no existe")
    }

})




app.listen(port, ()=>{
    console.log("SERVIDOR INICIADO EN PUERTO"+ port)

})
sequelize.sync({force:true})