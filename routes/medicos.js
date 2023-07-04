var express = require('express');
var router = express.Router();
var {conexion} = require('../database/conexion')

/* GET home page. */
router.get('/', function(req, res, next) {
  
  conexion.query('SELECT * FROM medicos', (error, medicos) => {
    if(error){
        res.status(500).send('Ocurrio un error en la consulta')
    }else{
        res.status(200).render('medicos', {medicos, opcion: 'disabled', activo: true})
    }
  })
});

//enrutar el formulario de html
router.get('/agregar', (req,res)=>{
    res.status(200).sendFile('registro-medicos.html', {root: 'public'})
  })

router.post('/guardar-medico', (req,res)=> {
    const cedula=req.body.cedula;
    const nombre=req.body.nombres;
    const apellido=req.body.apellidos;
    const especialidad=req.body.especialidad;
    const consultorio=req.body.consultorio;
    const correo=req.body.correo;
    conexion.query(`INSERT INTO medicos (id, nombres, apellidos, especialidad, consultorio, correo) VALUES (${cedula}, '${nombre}', '${apellido}', '${especialidad}', '${consultorio}', '${correo}')`, (error,resultado)=>{
      if (error) {
        res.status(500).send('Ocurrio un error en la consulta' + error)
      }else{
        res.status(200).redirect('/medicos')
      }
    })
})

router.get('/eliminar/:cedula', (req,res)=>{
    const cedula = req.params.cedula
    conexion.query(`DELETE FROM medicos where id= ${cedula}`, (error, resultado) => {
      if(error){
        res.status(500).send('Ocurrio un error en la consulta' + error)
      }else{
        res.status(200).redirect('/medicos')
      }
    })
  })

  router.get('/activar', function(req, res, next) {
  conexion.query('SELECT * FROM medicos', (error, medicos) => {
    if(error){
      res.status(500).send('Ocurrio un error' + error)
    } else {
      res.status(200).render('medicos.hbs', {medicos, opcion: ''})
    }
  })
});

router.post('/actualizar/:cedula', (req,res)=>{
  const cedula = req.params.cedula
  const nombres = req.body.nombres
  const apellidos= req.body.apellidos
  const especialidad = req.body.especialidad
  const consultorio = req.body.consultorio
  const correo = req.body.correo
  conexion.query(`UPDATE medicos SET nombres= '${nombres}', apellidos= '${apellidos}', especialidad= '${especialidad}', consultorio= ${consultorio}, correo= '${correo}' WHERE id = ${cedula}`, (error,resultado)=>{
    if (error) {
      res.status(500).send('Ocurrio un error en la ejecución ' + error)
    } else {
      res.status(200).redirect('/medicos')
    }
  })
})



module.exports = router;