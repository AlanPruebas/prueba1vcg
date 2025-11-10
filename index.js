import express from "express";
import { check, validationResult } from "express-validator";

const app = express();
app.use(express.json());

app.use(express.json());

app.post(
    '/insercion',
    [
        check('nombre', 'El nombre no puede ir vacio').notEmpty(),
        check('email','Eso no parece un email').isEmail(),
        check('password', 'El password no debe tener menos de 6 caracteres').isLength({min:6})
    ], (req, res) => {
        let resultado = validationResult(req);
        if(!resultado.isEmpty()){
            return res.json({
                ok:false,
                errores: resultado.array()
            })
        }
        res.json({
            ok: true,
            msg: 'Registro Insertado'
        });
    }
);

app.get('/empleado', (req, res) => {
    res.send('Obteniendo Empleados');});

/*app.post('/insercion', (req, res) => {
    res.send(req.body);});*/

app.put('/actualiza', (req, res) => {
    res.send('Actualizando Empleados (put)');});

app.patch('/Actualizacion', (req,res) => {
    res.send('Actualizando Empleado (patch)');});

app.delete('/elimina', (req, res) => {
    res.send('Eliminando Empleados');
});

const puerto = 3001;
app.listen(puerto,
    () => { console.log(`Servidor en http://localhost:${puerto}`)
});