// Importar las dependencias necesarias para trabajar con Express y la base de datos
import { query } from "../../../config/db"; // Asegúrate de importar el método de consulta que estás utilizando

const handler = async (req, res) => {
    if (req.method === "PUT") {
        try {
            const { id } = req.query;
            const { student_name, course_id } = req.body;

            if (!student_name || !course_id) {
                return res.status(400).json({ error: "Los campos student_name y course_id son obligatorios." });
            }

            const updateQuery = "UPDATE user_courses SET user_name = ?, course_id = ? WHERE user_id = ?";
            await query(updateQuery, [student_name, course_id, id]);

            res.status(200).json({ message: "Estudiante actualizado exitosamente." });
        } catch (error) {
            console.error("Error al actualizar estudiante:", error);
            return res.status(500).json({ error: "Error interno del servidor al actualizar estudiante." });
        }
    } else {
        res.status(405).json({ error: "Método no permitido, utiliza PUT para actualizar estudiantes." });
    }
};

export default handler;
