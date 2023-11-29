import { useState, useEffect } from 'react';

const PasswordValidationComponent = ({ setIsFormValid }) => {
    // Estados para almacenar la contraseña, confirmación de contraseña y errores
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    // Efecto que se ejecuta cuando cambian las contraseñas
    useEffect(() => {
        // Validar las contraseñas
        validatePassword();
        // Desactivar la advertencia de dependencias para setIsFormValid
        // ya que estamos seguros de que no cambia durante la vida del componente
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [password, confirmPassword, setIsFormValid]);

    // Manejador de cambio de la contraseña
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError('');
    };

    // Manejador de cambio de la confirmación de contraseña
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setConfirmPasswordError('');
    };

    // Función para validar las contraseñas
    const validatePassword = () => {
        let isValid = true;

        // Validar longitud mínima de la contraseña
        if (password.length < 8) {
            isValid = false;
            setPasswordError('La contraseña debe tener al menos 8 caracteres.');
        }

        // Validar que la contraseña sea alfanumérica
        if (!password.match(/^(?=.*[0-9])(?=.*[a-zA-Z])/)) {
            isValid = false;
            setPasswordError('La contraseña debe ser alfanumérica.');
        }

        // Validar que las contraseñas coincidan
        if (password !== confirmPassword) {
            isValid = false;
            setConfirmPasswordError('Las contraseñas no coinciden.');
        }

        // Actualizar el estado de la validez del formulario
        setIsFormValid(isValid);
    };

    return (
        <>
            {/* Input para la contraseña */}
            <div className="form-outline form-white mb-4">
                <input
                    type="password"
                    id="typePasswordX"
                    name="password"
                    placeholder="Contraseña"
                    className={`form-control form-control-lg ${!passwordError && password ? 'is-valid' : ''} ${passwordError ? 'is-invalid' : ''}`}
                    value={password}
                    onChange={handlePasswordChange}
                />
                {passwordError && <div className="error-message text-danger">{passwordError}</div>}
            </div>

            {/* Input para la confirmación de contraseña */}
            <div className="form-outline form-white mb-4">
                <input
                    type="password"
                    id="checkPass"
                    name="checkPass"
                    placeholder="Repite tu contraseña"
                    className={`form-control form-control-lg ${!confirmPasswordError && confirmPassword ? 'is-valid' : ''} ${confirmPasswordError ? 'is-invalid' : ''}`}
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                />
                {confirmPasswordError && (
                    <div className="error-message text-danger">{confirmPasswordError}</div>
                )}
            </div>
        </>
    );
};

export default PasswordValidationComponent;
