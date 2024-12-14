import pkg from 'pg'; 
const { Pool } = pkg;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'root',
    database: 'likeme',
    port: 5432,
    allowExitOnIdle: true
});

const agregarPost = async (titulo, img, descripcion, likes) => {
    try {
        const consulta = "INSERT INTO posts VALUES (DEFAULT, $1, $2, $3, $4)";
        const values = [titulo, img, descripcion, likes];
        await pool.query(consulta, values);
        console.log("Se agregó correctamente");
    } catch (error) {
        console.error("Error al agregar el post:", error.message);
        throw error;
    }
};


const obtenerPost = async () => {
    try {
        const { rows } = await pool.query("SELECT * FROM posts");
        return rows;
    } catch (error) {
        console.error("Error al obtener los posts:", error.message);
        throw error;
    }
};


const actualizarPost = async (id, titulo, img, descripcion, likes) => {
    try {
        const consulta = `
            UPDATE posts 
            SET titulo = $1, img = $2, descripcion = $3, likes = $4 
            WHERE id = $5
        `;
        const values = [titulo, img, descripcion, likes, id];
        const result = await pool.query(consulta, values);
        
        if (result.rowCount === 0) {
            throw new Error(`No se encontró el post con ID: ${id}`);
        }

        console.log(`Post con ID ${id} actualizado correctamente.`);
    } catch (error) {
        console.error("Error al actualizar el post:", error.message);
        throw error;
    }
};

const eliminarPost = async (id) => {
    try {
        const consulta = "DELETE FROM posts WHERE id = $1";
        const values = [id];
        const result = await pool.query(consulta, values);

        if (result.rowCount === 0) {
            throw new Error(`No se encontró el post con ID: ${id}`);
        }

        console.log(`Post con ID ${id} eliminado correctamente.`);
    } catch (error) {
        console.error("Error al eliminar el post:", error.message);
        throw error;
    }
};
export {agregarPost, obtenerPost, actualizarPost, eliminarPost}