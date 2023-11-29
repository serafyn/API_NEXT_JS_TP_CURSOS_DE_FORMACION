import React, { useState, useEffect } from 'react';

const DniInput = ({ setIsFormValid }) => {
    const [dni, setDni] = useState('');

    useEffect(() => {
        setIsFormValid(validateForm());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dni, setIsFormValid]);

    const handleDniChange = (e) => {
        const { value } = e.target;
        // Validar que el valor sea numérico y tenga hasta 8 dígitos
        if (/^\d{0,8}$/.test(value)) {
            setDni(value);
        }
    };

    const validateForm = () => {
        // Verificar si el DNI tiene entre 8 y 8 dígitos
        return dni.length === 8 && /^\d{8}$/.test(dni);
    };

    return (
        <div className="form-outline form-white mb-4">
            <input
                type="text"
                id="dni"
                name="dni"
                className="form-control form-control-lg"
                placeholder="DNI"
                value={dni}
                onChange={handleDniChange}
            />
            {!validateForm() && dni.length > 0 && (
                <div className="invalid-feedback">El DNI debe tener 8 dígitos numéricos.</div>
            )}
        </div>
    );
};

export default DniInput;
