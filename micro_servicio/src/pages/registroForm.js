import React, { useState } from 'react';
import Link from "next/link";
import EmailConfirmation from '../../components/EmailConfirmation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DniInput from '../../components/DniInput';
import axios from 'axios';
import { useRouter } from 'next/router';
import PasswordValidationComponent from '../../components/PasswordValidationComponent';
import Recaptcha from '../../components/Recaptcha';
const Registro = () => {
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

    const [isFormValid, setIsFormValid] = useState(false);
    const router = useRouter();

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!isFormValid || !captchaValido) { // Verificar si el captcha es válido antes de enviar el formulario
            toast.warning('Verifique que los datos ingresados sean válidos y complete el captcha', { autoClose: 3000 });
            return;
        }

        try {
            const name = e.target.elements.name.value;
            const email = e.target.elements.email.value;
            const password = e.target.elements.password.value;


            const formData = {
                name,
                email,
                password,
            };
            const captchaToken = captchaValue; // Obtener el token del reCAPTCHA desde el estado

            const response = await axios.post('/api/registro', {
                ...formData,
                captchaToken: captchaToken
            });
            toast.success("Registro exitoso, seras redirigido en 3 seg al login para iniciar sesión", { autoClose: 3000 });

            // Esperar 3 segundos antes de redirigir al usuario al login
            setTimeout(() => {
                router.push('/login');
            }, 3000);
        } catch (error) {
            toast.warning(error.response.data.error, { autoClose: 4000 });
            toast.warning(error.response.data.message, { autoClose: 4000 });
            // //console.error(error);
        }
    };

    // Estado del captcha y función para manejar cambios en el captcha
    const [captchaValue, setCaptchaValue] = useState(null); // Estado para almacenar el valor del token del reCAPTCHA
    const [captchaValido, setCaptchaValido] = useState(false);
    const handleCaptchaChange = (valido, captchaValue) => {
        setCaptchaValido(valido);
        setCaptchaValue(captchaValue); // Actualizar el valor del token del captcha en el estado
    };

    return (
        <div style={containerStyle}>
            <div className="container py-5">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card" style={cardStyle}>
                            <div className="card-body p-5 text-center">
                                <div className="mb-md-5 mt-md-4 pb-5">
                                    <form onSubmit={handleFormSubmit} action="/api/registro" method="post">
                                        <h2 className="fw-bold mb-2 text-uppercase">Regístrate</h2>
                                        <p className="mb-5">Por favor introduzca sus datos para registrarse!</p>

                                        <div className="form-outline form-white mb-4">
                                            <input type="text" id="name" name="name" className="form-control form-control-lg" placeholder="Nombres" />
                                        </div>
                                        <EmailConfirmation setIsFormValid={setIsFormValid} />
                                        <PasswordValidationComponent setIsFormValid={setIsFormValid} />
                                        <div className="form-outline form-white mb-4">
                                            <div className="d-flex justify-content-center">
                                                <Recaptcha setCaptchaValido={setCaptchaValido} onChange={handleCaptchaChange} />
                                            </div>
                                        </div>
                                        <button className="btn btn-lg btn-outline-secondary px-5 mx-1 my-1" type="submit" disabled={!isFormValid || !captchaValido}>
                                            Enviar
                                        </button>
                                    </form>

                                    <Link href="/login">
                                        <button className="btn btn-lg btn-outline-secondary px-5 mx-1 my-1">Volver</button>
                                    </Link>

                                    <div className="d-flex justify-content-center text-center mt-4 pt-1">
                                        <Link className="text-white" href="#!">
                                            <i className="fab fa-facebook-f fa-lg"></i>
                                        </Link>

                                        <Link className="text-white" href="#!">
                                            <i className="fab fa-twitter fa-lg mx-4 px-2"></i>
                                        </Link>

                                        <Link className="text-white" href="#!">
                                            <i className="fab fa-google fa-lg"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registro;
