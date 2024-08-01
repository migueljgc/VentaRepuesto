import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Login and Register/Registro.css'


export const Registro = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        numero: '',
        contraseña: '',
        confirmarContraseña: '',
        accountType: ''
    });

    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    useEffect(() => {
        document.title = "Registro"
        // localStorage.clear();

    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleReset = () => {
        setFormData({
            nombre: '',
            apellido: '',
            correo: '',
            numero: '',
            contraseña: '',
            confirmarContraseña: '',
            accountType: ''
        });
    }


    const validatePassword = (password) => {
        const minLength = password.length >= 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerrCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/.test(password);

        return minLength && hasUpperCase && hasNumber && hasSpecialChar && hasLowerrCase;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValidPassword = validatePassword(formData.contraseña);
        if (!isValidPassword) {
            setPasswordError('La contraseña debe tener mínimo 8 caracteres, al menos un número, un signo y una letra mayúscula.');
            return;
        } else {
            setPasswordError('Contraseña valida');
        }

        if (formData.contraseña !== formData.confirmarContraseña) {
            setConfirmPasswordError('Las contraseñas no coinciden');
            return;
        } else {
            setConfirmPasswordError('Contraseña valida');
        }

        try {
            console.log('Datos del formulario a enviar:', formData);

            if (formData.accountType === 'Cliente') {
                if (formData.contraseña === formData.confirmarContraseña) {
                    const userResponse = await axios.post('http://localhost:8080/api/auth/register', {
                        nombre: formData.nombre,
                        apellido: formData.apellido,
                        correo: formData.correo,
                        contraseña: formData.contraseña,
                        numero: formData.numero
                    });
                    alert('Se ha enviado un mensaje de verificacion a su correo, si no le aparece verifique la carpeta de spam.');
                    console.log('Respuesta al guardar usuario:', userResponse.data);
                    console.log('Usuario registrado correctamente');
                    setConfirmPasswordError('')
                    setPasswordError('')
                    handleReset();
                }
                else {
                    alert('Contraseñas no coinciden')
                }
            }
            else if (formData.accountType === 'Vendedor') {
                if (formData.contraseña === formData.confirmarContraseña) {
                    const userResponse = await axios.post('http://localhost:8080/api/auth/registerSeller', {
                        nombre: formData.nombre,
                        apellido: formData.apellido,
                        correo: formData.correo,
                        contraseña: formData.contraseña,
                        numero: formData.numero
                    });
                    alert('Se ha enviado un mensaje de verificacion a su correo, si no le aparece verifique la carpeta de spam.');
                    console.log('Respuesta al guardar usuario:', userResponse.data);
                    console.log('Usuario registrado correctamente');
                    setConfirmPasswordError('')
                    setPasswordError('')
                    handleReset();
                }
                else {
                    alert('Contraseñas no coinciden')
                }
            }
            else{
                alert('Hubo un problema intente mas tarde')
            }


        } catch (error) {
            console.error('Error al guardar información en la base de datos', error);
        }

    };

    return (
        <div className="crearUsuario">
            <div className="fr"><div className=""></div>
                <div className="formu">
                    <h1>Registro</h1>
                    <label htmlFor="">¿No tienes una cuenta? Regístrate</label>
                    <form className='formPQRS' onSubmit={handleSubmit}>
                        <br />
                        <div className="input-box">
                            <input
                                type="radio"
                                id="cliente"
                                name="accountType"
                                value="Cliente"
                                checked={formData.accountType === 'Cliente'}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="cliente">Cliente</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="vendedor"
                                name="accountType"
                                value="Vendedor"
                                checked={formData.accountType === 'Vendedor'}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="vendedor">Vendedor</label>
                        </div><br />


                        <div className="input-box1">
                            <label htmlFor="nombre">Nombre:</label><br />
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange} required
                            />
                        </div> <br />
                        <div className="input-box1">
                            <label htmlFor="apellido">Apellido:</label><br />
                            <input
                                type="text"
                                id="apellido"
                                name="apellido"
                                value={formData.apellido}
                                onChange={handleChange} required
                            />
                        </div> <br />
                        <div className="input-box1">
                            <label htmlFor="correo">Correo:</label><br />
                            <input
                                type="email"
                                id="correo"
                                name="correo"
                                value={formData.correo}
                                onChange={handleChange} required
                            />
                        </div> <br />
                        <div className="input-box1">
                            <label htmlFor="numero">Número:</label><br />
                            <input
                                type="int"
                                id="numero"
                                name="numero"
                                value={formData.numero}
                                onChange={handleChange} required
                            />
                        </div> <br />

                        <div className="input-box1">
                            <label htmlFor="contraseña">Contraseña:</label><br />
                            <input
                                type="password"
                                id="contraseña"
                                name="contraseña"
                                value={formData.contraseña}
                                onChange={handleChange} required
                            />
                            {passwordError && <div className='errore'> {passwordError}</div>}
                        </div> <br />
                        <div className="input-box1">
                            <label htmlFor="confirmarContraseña">Confirmar Contraseña:</label><br />
                            <input
                                type="password"
                                id="confirmarContraseña"
                                name="confirmarContraseña"
                                value={formData.confirmarContraseña}
                                onChange={handleChange} required
                            />
                            {confirmPasswordError && <div className='errore'> {confirmPasswordError}</div>}
                        </div> <br />
                        <div className="btnIniciarSesion">
                            <button type="submit">Registrar</button>
                        </div><br />
                    </form>
                    <p>¿Ya tienes cuenta? <a href="/Login">Inicia Sesión</a></p>
                </div><div className=""></div>
            </div>
        </div>
    );
};