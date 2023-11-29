// Importar las dependencias necesarias para trabajar con Express y la base de datos
import { query } from "../../../config/db"; // Asegúrate de importar el método de consulta que estás utilizando

const handler = async (req, res) => {
    if (req.method === "POST") {
        try {
            const { course_id, student_name } = req.body;

            if (!course_id || !student_name) {
                return res.status(400).json({ error: "Los campos course_id y student_name son obligatorios." });
            }

            // Primero, insertar al estudiante en la tabla User
            const insertUserQuery = "INSERT INTO User (name) VALUES (?)";
            const userInsertResult = await query(insertUserQuery, [student_name]);

            // Obtener el ID del estudiante recién insertado
            const user_id = userInsertResult.insertId;

            // Insertar al estudiante en el curso en la tabla user_courses
            const insertUserCourseQuery = "INSERT INTO user_courses (course_id, user_id) VALUES (?, ?)";
            const userCourseInsertResult = await query(insertUserCourseQuery, [course_id, user_id]);

            res.status(201).json({ message: "Estudiante agregado al curso exitosamente.", userCourseInsertResult });
        } catch (error) {
            console.error("Error al agregar estudiante:", error);
            return res.status(500).json({ error: "Error interno del servidor al agregar estudiante." });
        }
    } else {
        res.status(405).json({ error: "Método no permitido, utiliza POST para agregar estudiantes." });
    }
};

export default handler;
