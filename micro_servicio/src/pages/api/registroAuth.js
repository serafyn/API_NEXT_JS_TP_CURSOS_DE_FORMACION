import bcrypt from 'bcryptjs';
import { query } from '../../../config/db';
import validator from 'validator';  // Importa el módulo validator para la validación del correo electrónico
import axios from "axios";

const registroHandler = async (req, res) => {
    if (req.method === 'POST') {
        const { name, nickname, sub } = req.body;
        const email = nickname + "@gmail.com";
        const password = sub;
        console.log(name)
        console.log(email)
        console.log(password)
        // Validar el formato del correo electrónico

        if (validator.isEmail(email)) {
            // Verificar si el correo electrónico ya existe en la base de datos
            const emailExistsQuery = 'SELECT * FROM user WHERE email = ?';
            const [existingUser] = await query(emailExistsQuery, [email]);
            if (existingUser) {
                // El correo electrónico ya está registrado, devolver un mensaje de error al cliente
                res.status(400).json({ message: 'El correo electrónico ya ha sido registrado.' });
                return;
            }
        } else {
            res.status(400).json({ message: 'Correo electrónico inválido.' });
            return;
        }



        // Generar el hash del password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Si los datos son válidos, puedes guardar el registro en la base de datos.
        const queryString = 'INSERT INTO user (name, email, password) VALUES (?, ?, ?);';
        await query(queryString, [name, email, hashedPassword]);


        const userData = {
            nickname,
            name,
            sub
        };
        axios.post('/api/auth/loginAuth', userData)
        return; // Agregar este retorno explícito para asegurar que la función se detenga después de la redirección
    }

    // Si la solicitud no es de tipo POST, devolvemos un error.
    res.status(405).json({ message: 'Método no permitido.' });
};

export default registroHandler;