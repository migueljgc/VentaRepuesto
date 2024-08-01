import React, { useState } from 'react';
import './menu.css';
import { Script, ScriptUser } from './script';
import { TiThMenu } from "react-icons/ti";


export const MenuAdmin = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="menus">
            <div className="usa">
                <div className="menu">
                    <header className="main-header">
                        <label htmlFor="btn-nav" className="btn-nav"><TiThMenu /></label>
                        <input type="checkbox" id="btn-nav" />
                        <nav>
                            <ul className="men">
                                <li><a href="/"> Home </a></li>

                            </ul>
                        </nav>

                    </header>
                </div>
                <div className="usuario">
                    <div className="user-menu">
                        <div className="user-info">
                            <img src='/iconprofile.png' alt="Foto de perfil" className="profile-picture" width="35%" height="40%" onClick={() => setIsOpen((prev) => !prev)} />
                            <br />
                        </div>
                        {isOpen && (<ScriptUser />)
                        }

                    </div>



                </div>
                <div className="imag"><img src='/' width="80%" height="85%" /></div>
            </div>
        </div>
    );

};

export const MenuUser = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="menus">
            <div className="usa">
                <div className="menu">
                    <header className="main-header">
                        <label htmlFor="btn-nav" className="btn-nav"><TiThMenu /></label>
                        <input type="checkbox" id="btn-nav" />
                        <nav>
                            <ul className="men">
                                <li><a href="/"> Home </a></li>

                            </ul>
                        </nav>

                    </header>
                </div>
                <div className="usuario">
                    <div className="user-menu">
                        <div className="user-info">
                            <img src='/iconprofile.png' alt="Foto de perfil" className="profile-picture" width="35%" height="40%" onClick={() => setIsOpen((prev) => !prev)} />
                            <br />
                        </div>
                        {isOpen && (<ScriptUser />)
                        }

                    </div>



                </div>
                <div className="imag"><img src='/' width="80%" height="85%" /></div>
            </div>
        </div>
    );

};
export const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="menus">
            <div className="usa">
                <div className="menu">
                    <header className="main-header">
                        <label htmlFor="btn-nav" className="btn-nav"><TiThMenu /></label>
                        <input type="checkbox" id="btn-nav" />
                        <nav>
                            <ul className="men">
                                <li><a href="/"> Home </a></li>

                            </ul>
                        </nav>

                    </header>
                </div>
                <div className="usuario">
                <div className="user-menu">
                        <div className="user-info">
                            <img src='/iconprofile.png' alt="Foto de perfil" className="profile-picture" width="35%" height="40%" onClick={() => setIsOpen((prev) => !prev)} />
                            <br />
                        </div>
                        {isOpen && (<Script />)
                        }

                    </div>
                </div>
            </div>
        </div>
    );

};
