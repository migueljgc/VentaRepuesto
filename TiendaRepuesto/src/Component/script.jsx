import { useEffect, useState } from 'react';
import './script.css';

export const Script = () => {
  const [user, setUser] = useState(localStorage.getItem('users'));

  useEffect(() => {
    // Actualizar el estado del usuario cuando cambie el valor en localStorage
    const handleStorageChange = () => setUser(localStorage.getItem('users'));
    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.setItem('logget', 'false');
  };

  return (
    <div className="dropdown-content">
      <div className="App">
        <div className="abajo">
          <a href="/Login" onClick={handleLogout}>
            <i className="fa fa-sign-out"></i> Iniciar Sesion
          </a>
        </div>
      </div>
    </div>
  );
};

export const ScriptUser = () => {
  const [user, setUser] = useState(localStorage.getItem('users'));

  useEffect(() => {
    // Actualizar el estado del usuario cuando cambie el valor en localStorage
    const handleStorageChange = () => setUser(localStorage.getItem('users'));
    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.setItem('logget', 'false');
  };

  return (
    <div className="dropdown-content">
      <div className="App">
        <div className="arriba">{user && <p>Bienvenido, {user}!</p>}</div>
        <div className="abajo">
          <a href="/">
            <i className="fa fa-plus"></i> Editar usuario
          </a>
          <a href="/" onClick={handleLogout}>
            <i className="fa fa-sign-out"></i> Salir
          </a>
        </div>
      </div>
    </div>
  );
};
