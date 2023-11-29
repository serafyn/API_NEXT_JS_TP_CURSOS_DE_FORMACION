import { query } from "../../../config/db";

const handler = async (req, res) => {
    if (req.method !== "DELETE") {
        return res.status(405).json({ error: "Método no permitido" });
    }

    try {
        const { id } = req.query; // Obtener el ID del curso a eliminar
        console.log(id)
        // Realizar la lógica para desactivar o borrar el curso con el ID proporcionado
        const queryString = "UPDATE user SET active = 0 WHERE id = ?";
        await query(queryString, [id]);

        res.status(200).json({ message: "Curso desactivado exitosamente" });
    } catch (error) {
        return res.status(500).json({ error: "Error al desactivar el curso" });
    }
};

export default handler;
