import React, { useState, useEffect } from 'react';
import './Login.css';
import { VscAccount } from "react-icons/vsc";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Login = () => {
    const navigate = useNavigate();
    const [correo, setUser] = useState('');
    const [contraseña, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        document.title = "Login"
        const storedUsername = localStorage.getItem('username'); 
        localStorage.setItem('logget', false);

        if (storedUsername) {
            setUser(storedUsername);
            setRememberMe(true);
        }
    }, []);

    const onLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/auth/authenticate', {
                correo,
                contraseña,
            });console.log(correo, contraseña)
            console.log(response)
            if (response.status === 200) {
                const responseData = response.data;
                console.log(responseData)
                const { token, authorities } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify({ correo, rol: authorities[0] })); // Assuming single role
                const response1 = await axios.get('http://localhost:8080/api/auth/editar', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                localStorage.removeItem('username')
                const users=(response1.data.nombre)
                console.log(users)
                localStorage.setItem('users', users);
                const email=(response1.data.correo)
                console.log(email)
                localStorage.setItem('email', email);
                if (authorities.includes('Admin')) {
                    localStorage.setItem('logget', true);
                    window.location.href = '/';
                } else if (authorities.includes('User')) {
                    localStorage.setItem('logget', true);
                    window.location.href = '/';
                } else {
                    window.location.href = '/';
                    alert('Credenciales incorrectas');
                }

            } else {
                alert('Credenciales incorrectas');
            }
        } catch (error) {
            console.error('Error al obtener los datos de la base de datos:', error);
            //alert('Credenciales incorrectas');
        }

        if (rememberMe) {
            localStorage.removeItem('username')
            localStorage.setItem('username', correo);
        }
    }

    return (
        <div className='login'>
            <div className="formLogin" onSubmit={onLogin}>
                <div className="usa">
                    <div className="usu"></div>
                </div>
                <div className="loginForm">
                    <form action="" className="Formlogin">
                        <h1>Login</h1>

                        <div className="input-box">
                            <label htmlFor='user'><VscAccount /> Usuario: </label><br />
                            <input type="text" className='usuario' value={correo} onChange={e => setUser(e.target.value)} required />
                        </div><br />
                        <div className="input-box">
                            <label htmlFor=""><RiLockPasswordLine /> Contraseña: </label><br />
                            <input type="password" className='contrasena' value={contraseña} onChange={e => setPassword(e.target.value)} required />
                        </div><br />
                        <div className="btnIniciarSesion">
                            <button type="submit">
                                Iniciar Sesión
                            </button>
                        </div><br />
                        <div className="remember-forgod">
                            <label> <input type="checkbox" checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)} /> Recuérdame</label>
                            <a href="/Recuperacion">  ¿Olvidaste tu contraseña?</a>
                        </div>
                        <div className="register">
                            <p>¿No tienes cuenta aún? <a href="/Registro">Registrar</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};