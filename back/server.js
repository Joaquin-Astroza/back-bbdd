import express from 'express'; 
import cors from 'cors';
import { obtenerPost, agregarPost, actualizarPost, eliminarPost } from './consultas.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});



app.get('/posts', async (req, res) => {
    try {
        const posts = await obtenerPost();
        res.json(posts);
    } catch (error) {
        res.status(500).send("Error al obtener los posts");
    }
});

app.post('/posts', async (req, res) => {
    try {
        const { titulo, img, descripcion, likes } = req.body;
        await agregarPost(titulo, img, descripcion, likes);
        res.status(201).send("Post agregado con éxito");
    } catch (error) {
        res.status(500).send("Error al agregar el post");
    }
});

app.put('/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, img, descripcion, likes } = req.body;
        await actualizarPost(id, titulo, img, descripcion, likes);
        res.send(`Post con ID ${id} actualizado correctamente`);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

app.delete('/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await eliminarPost(id);
        res.send(`Post con ID ${id} eliminado correctamente`);
    } catch (error) {
        res.status(404).send(error.message);
    }
});