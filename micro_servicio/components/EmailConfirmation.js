import React, { useState, useEffect } from 'react';

const EmailConfirmation = ({ setIsFormValid }) => {
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [isMatch, setIsMatch] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleConfirmEmailChange = (e) => {
        setConfirmEmail(e.target.value);
    };

    useEffect(() => {
        setIsMatch(email === confirmEmail);
    }, [email, confirmEmail]);

    useEffect(() => {
        setIsFormValid(isMatch && email !== ''); // Verifica también si el campo de email no está vacío
    }, [isMatch, email, setIsFormValid]);

    return (
        <>
            <div className="mb-4">
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder='E-mail'
                    className={`form-control form-control-lg ${email !== '' && isMatch ? 'is-valid' : 'is-invalid'}`}
                    value={email}
                    onChange={handleEmailChange}
                />
            </div>

            <div className="mb-4">
                <input
                    type="email"
                    id="mailConfirm"
                    name="mailConfirm"
                    className={`form-control form-control-lg ${email !== '' && isMatch ? 'is-valid' : 'is-invalid'}`}
                    placeholder='Repite tu e-mail'
                    value={confirmEmail}
                    onChange={handleConfirmEmailChange}
                />
                {!isMatch && email !== '' && (
                    <div className="invalid-feedback">Los correos electrónicos no coinciden.</div>
                )}
            </div>
        </>
    );
};

export default EmailConfirmation;
