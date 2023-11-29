import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import { query } from "../../../../config/db";
import bcrypt from 'bcryptjs';
import axios from "axios";
import validator from 'validator';  // Importa el módulo validator para la validación del correo electrónico
//import csrfMiddleware from "../../../../src/csrf";

// Consulta SQL para obtener los datos del usuario y los retos asociados
const queryString = `
  SELECT *
  FROM user
  WHERE user.email = ? AND user.active = 1
`;

// Función asincrónica para verificar las credenciales del usuario
const verifyUser = async (email, password) => {
    const data = await query(queryString, [email]);
    if (data.length > 0) {
        const user = data[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            return user;
        } else {
            // // Insertar el evento de inicio de sesión fallido en la tabla eventos_login
            // const eventoLoginFallido = {
            //     user_id: user.u_id,
            //     tipo_evento: 'inicio_sesion_fallido'
            // };
            // await query("INSERT INTO eventos_login SET ?", eventoLoginFallido);
            // return null; // Contraseña incorrecta
        }
    } else {
        // Insertar el evento de intento de inicio de sesión para usuario no registrado
        // const eventoLoginUsuarioInexistente = {
        //     email: email,
        //     tipo_evento: 'intentar_inicio_sesion'
        // };
        // await query("INSERT INTO eventos_login SET ?", eventoLoginUsuarioInexistente);
        // return null; // Usuario no encontrado
    }
};

// Controlador para el endpoint "/login"
export default async function loginHandler(req, res) {

    const { email, password } = req.body;
    const secret = process.env.COOKIE_SECRET;

    try {
        // Validar el correo electrónico usando el módulo validator
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: "Correo electrónico inválido." });
        }

        // Verificar las credenciales del usuario
        const userData = await verifyUser(email, password);
        if (!userData) {
            // Usuario no encontrado o credenciales inválidas
            return res.status(401).json({ error: "Usuario no encontrado o credenciales inválidas" });
        }

        // Insertar el evento de inicio de sesión en la tabla eventos_login
        // const eventoLogin = {
        //     user_id: userData.u_id,
        //     tipo_evento: 'inicio_sesion_exitoso' // Puedes cambiar esto a 'intentos_fallidos' si es un intento fallido
        // };

        // // Insertar el evento de inicio de sesión en la tabla eventos_login
        // await query("INSERT INTO eventos_login SET ?", eventoLogin);

        // Generar un token de sesión usando JWT
        const token = sign(
            {
                // (Datos del usuario que deseas incluir en el token)
                id: userData.u_id,
                courseId: userData.course_id,
                name: userData.name,
                email: userData.email,
                active: userData.active,
            },
            new TextEncoder().encode(secret), // Convertir la clave a Uint8Array
            { algorithm: "HS256" } // Especificar el algoritmo de firma
        );

        // Serializar el token en una cookie y establecerla en la respuesta
        const serialized = serialize("COOKIE_TOKEN", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 86400, // Establecer en 86400 segundos (24 horas)
            path: "/",
        });

        res.setHeader("Set-Cookie", serialized);
        return res.status(200).json({
            success: true
        });
    } catch (error) {
        // En caso de error, manejar el error y enviar una respuesta adecuada
        // //console.error(error);
        return res.status(500).json({ error: "Ocurrió un error al procesar la solicitud." });
    }
}
