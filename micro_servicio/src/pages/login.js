import React, { useState } from 'react';
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from 'react-toastify';
import Recaptcha from '../../components/Recaptcha';


const Login = () => {
    const containerStyle = {
        minHeight: '100vh',
        background: 'rgb(243, 246, 249)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    const cardStyle = {
        borderRadius: '1rem',
        backgroundColor: '#ffffff',
    };

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const router = useRouter();

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!captchaValido) {
            toast.error('Por favor, resuelve el captcha', { autoClose: 2000 });
            return;
        }

        try {
            const captchaToken = captchaValue; // Obtener el token del reCAPTCHA desde el estado
            const response = await axios.post("/api/auth/login", { ...credentials, captchaToken });
            if (response.status === 200) {
                router.push("/inicio");
            }

        } catch (error) {
            if (error.response && error.response.status === 401) {
                toast.error('Credenciales inválidas o usuario no registrado', { autoClose: 2000 });
            } else {
                console.log(error)
                toast.error('Ocurrió un error al iniciar sesión', { autoClose: 2000 });
            }
        }
    };

    // Estado del captcha y función para manejar cambios en el captcha
    const [captchaValue, setCaptchaValue] = useState(null); // Estado para almacenar el valor del token del reCAPTCHA
    const [captchaValido, setCaptchaValido] = useState(false);
    const handleCaptchaChange = (valido, captchaValue) => {
        setCaptchaValido(valido);
        setCaptchaValue(captchaValue); // Actualizar el valor del token del captcha en el estado
    };

    // function getCookieValue(name) {
    //     const cookieName = `${name}=`;
    //     const decodedCookie = decodeURIComponent(document.cookie);
    //     const cookieArray = decodedCookie.split(';');
    //     for (let i = 0; i < cookieArray.length; i++) {
    //         let cookie = cookieArray[i];
    //         while (cookie.charAt(0) === ' ') {
    //             cookie = cookie.substring(1);
    //         }
    //         if (cookie.indexOf(cookieName) === 0) {
    //             return cookie.substring(cookieName.length, cookie.length);
    //         }
    //     }
    //     return "";
    // }


    return (
        <div style={containerStyle}>
            <div className="container py-5">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card " style={cardStyle}>
                            <div className="card-body p-5 text-center">
                                <div className="mb-md-5 mt-md-4 pb-5">
                                    <h2 className="fw-bold mb-2 text-uppercase">Iniciar sesión</h2>
                                    <p className="-50 mb-5">Por favor introduzca sus datos para iniciar sesión!</p>
                                    <form onSubmit={handleSubmit} method='POST'>
                                        <div className="form-outline form-white mb-4">
                                            <input type="email" id="typeEmailX" name="email" className="form-control form-control-lg" required onChange={(e) =>
                                                setCredentials({
                                                    ...credentials,
                                                    email: e.target.value,
                                                })
                                            } />
                                            <label className="form-label" htmlFor="typeEmailX">Correo Electrónico</label>
                                        </div>
                                        <div className="form-outline form-white mb-4">
                                            <input type="password" id="typePasswordX" name="password" className="form-control form-control-lg" required onChange={(e) =>
                                                setCredentials({
                                                    ...credentials,
                                                    password: e.target.value,
                                                })
                                            } />
                                            <label className="form-label" htmlFor="typePasswordX">Contraseña</label>
                                        </div>
                                        {/* <Link className="-50 fw-bold" href="recuperarPass">
                                            ¿Olvidaste tu contraseña?
                                        </Link> */}
                                        <div className="form-outline form-white mb-4">
                                            <div className="d-flex justify-content-center">
                                                <Recaptcha setCaptchaValido={setCaptchaValido} onChange={handleCaptchaChange} />
                                            </div>
                                        </div>
                                        <button className="btn btn-lg btn-outline-secondary px-5 mx-1 my-1" type="submit">Iniciar</button>
                                    </form>
                                    <Link href='/'>
                                        <button className="btn btn-lg btn-outline-secondary px-5 mx-1 my-1" type="button">Volver</button>
                                    </Link>

                                    {/* <div className="d-flex justify-content-center text-center mt-4 pt-1">
                                        <Link className="" href="#!">
                                            <i className="fab fa-facebook-f fa-lg"></i>
                                        </Link>
                                        <Link className="" href="#!">
                                            <i className="fab fa-twitter fa-lg mx-4 px-2"></i>
                                        </Link>
                                        <Link className="" href="#!">
                                            <i className="fab fa-google fa-lg"></i>
                                        </Link>
                                    </div> */}
                                </div>
                                <div>
                                    <p className="mb-1">¿No tienes cuenta?
                                        <Link className="-50 fw-bold" href="registroForm">
                                            ¡Regístrate!
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
