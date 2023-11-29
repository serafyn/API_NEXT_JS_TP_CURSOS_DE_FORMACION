import { serialize } from "cookie";
import { query } from "../../../../config/db";
import jwt from "jsonwebtoken";

export default async function logoutHandler(req, res) {
    const { COOKIE_TOKEN } = req.cookies;

    if (!COOKIE_TOKEN) {
        // Si no hay token de sesión, devuelve un error 401 (No autorizado)
        return res.status(401).json({ error: "No hay sesión iniciada" });
    }

    const secret = process.env.COOKIE_SECRET;

    try {
        // Verificar el token para obtener el ID del usuario
        const userData = jwt.verify(COOKIE_TOKEN, secret);
        const userId = userData.id; // Obtener el ID del usuario desde el token

        // Obtener información sobre el dispositivo y el navegador del usuario
        const userAgent = req.headers["user-agent"];
        const userIpAddress = req.connection.remoteAddress;

        // Iniciar una transacción SQL
        const transaction = await query("START TRANSACTION");

        try {
            const tipoLogout = 'Cierre de sesión manual';

            // Actualizar la tabla eventos_logout con el nuevo registro de cierre de sesión
            // await query(
            //     "INSERT INTO eventos_logout (u_id, tipo_logout, ip_usuario, user_agent) VALUES (?, ?, ?, ?)",
            //     [userId, tipoLogout, userIpAddress, userAgent]
            // );

            // Eliminar la cookie para cerrar la sesión
            const serialized = serialize("COOKIE_TOKEN", null, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                expires: new Date(0), // Establecer la fecha de expiración en el pasado para eliminar la cookie
                path: "/",
            });

            // Confirmar la transacción
            await query("COMMIT");

            // Enviar la cookie de sesión eliminada al cliente
            res.setHeader("Set-Cookie", serialized);
            // Redireccionar a la página de inicio
            res.writeHead(302, { Location: "/" });
            res.end();
        } catch (error) {
            // Si ocurre un error, hacer rollback de la transacción
            await query("ROLLBACK");
            // console.error("Error al cerrar sesión:", error);
            res.status(500).json({ error: "Error al cerrar sesión" });
        }
    } catch (error) {
        // console.error("Error al verificar el token:", error);
        // Si hay un error al verificar el token, devuelve un error 401 (No autorizado)
        res.status(401).json({ error: "No hay sesión iniciada" });
    }
}
