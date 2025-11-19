import express from 'express';
import { param } from 'express-validator';
import mysql from 'mysql2/promise';

const app = express();
app.use(express.json());

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'basededatos'
});


app.get('/', (req, res)=>{
    res.send('servidor funcionando correctamente...');
});

app.get('/productos', async (req, res) => {
    const [resultado] = await db.query('SELECT * FROM productos');
    res.status(200).json(resultado);
});

app.post('/productos/adi', async (req, res) => {
    const [nombre, precio] = [req.body.nombre, req.body.precio,];
    const resultado =await db.query('INSERT INTO productos (nombre, precio) VALUES (?,?)',[nombre, precio]);
    res.status(201).json(resultado);
});

app.put('/productos/:id', async (req, res) =>{
    const id = req.params.id;
    const {nombre, precio} = req.body;
    const resultado = await db.query('UPDATE productos SET nombre = ?, precio = ? WHERE id = ?', [nombre, precio, id]);
    res.status(200).json(resultado);
});

app.delete('/productos/:id', async (req,res) => {
    const id = req.params.id;
    const resultado = await db.query('DELETE from productos WHERE id = ?', [id]);
    res.resultado(200).json({message: 'Producto Eliminado correctamente'});
});

const puerto = 3001;
app.listen(puerto,
    () => { console.log(`Servidor en http://localhost:${puerto}`)
});