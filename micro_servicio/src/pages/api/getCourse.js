import { query } from "../../../config/db";
import jwt from "jsonwebtoken"; // Descomenta esta línea

//const secret = process.env.COOKIE_SECRET;

const handler = async (req, res) => {
    if (req.method === "GET") {
        // Procesar una solicitud POST

        try {
            // const COOKIE_TOKEN = req.cookies.COOKIE_TOKEN; // Obtener el token de la cookie
            // const userData = jwt.verify(COOKIE_TOKEN, secret);
            // const userId = userData.id; // Obtener el ID del usuario

            // if (userId == '') {
            //     return res.status(405).json({ error: "Debes iniciar sesión" });

            // }
            // Consultar la base de datos 

            const data = await query('SELECT c.id as course_id, c.name as course_name, u.id as user_id, u.name as user_name FROM Course c LEFT JOIN user_courses uc ON c.id = uc.course_id LEFT JOIN User u ON uc.user_id = u.id WHERE u.active = 1');
            res.status(200).json(data);
        } catch (error) {
            return res.status(405).json({ error: "Problemas para obtener los datos" });
        }
    } else {
        return res.status(401).json({ error: "Método no permitido" });
    }

};

export default handler;
