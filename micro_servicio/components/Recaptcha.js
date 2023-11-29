import ReCAPTCHA from "react-google-recaptcha";
import React, { useRef, useEffect } from 'react';

const Recaptcha = ({ setCaptchaValido, onChange }) => {
    const captcha = useRef(null);

    // Manejar cambios en el captcha
    const handleCaptchaChange = () => {
        const captchaValue = captcha.current.getValue();
        if (captchaValue) {
            setCaptchaValido(true);
            onChange(true, captchaValue); // Pasar el valor del token al backend
        } else {
            setCaptchaValido(false);
            onChange(false, null); // Pasar null si el captcha no es válido
        }
    };

    // Cargar el script de reCAPTCHA
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://www.google.com/recaptcha/api.js";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div>
            {/* Componente reCAPTCHA */}
            <ReCAPTCHA
                ref={captcha}
                //sitekey="6LeZhK8oAAAAAKSH9JSZC_kNxs1oGdqSYxAszMCM" //NGROK.EXE
                sitekey="6LdrN9EoAAAAANEMsI6u-4IECGH3psINaJTSWkLV"  // Clave del sitio de reCAPTCHA para localhost
                onChange={handleCaptchaChange}
            />
        </div>
    );
};

export default Recaptcha;
