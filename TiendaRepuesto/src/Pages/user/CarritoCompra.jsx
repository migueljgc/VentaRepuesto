// src/components/Cart.js
import React, { useEffect, useState } from 'react';
import './CarritoCompra.css';
import axios from 'axios';
import { MenuUser } from '../../Component/Menu';

export const CarritoCompra = () => {
    const [data, setData] = useState([]);

    const token = localStorage.getItem('token');
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/CarritoCompras/get', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }

            })
            console.log(response)
            const email=localStorage.getItem('email');
            console.log(email)
            if (email) {
                const filtered = response.data.filter(item => item.usuario.correo=== email); // Filtrar los datos por el usuario
                setData(filtered);
                console.log("filteredData  ", filtered)
            }
            console.log("esta es la data ", data);
        } catch (error) {
            console.error('Error en la data: ', error);
        }
    }
    const filteredData = data

    useEffect(() => {
        document.title = ""
        fetchData();
    }, []);
    const productos = [
        {
            nombreProducto: 'Soporte Base Celular Tablet Escritorio Altura Ajustab...',
            precio: 17850,
            envio: 13700
        }
    ];

    const total = productos.reduce((acc, producto) => acc + producto.precio, 0) + productos[0].envio; // Precio del producto más envío

    return (
        <div className="">
            <MenuUser />
            <br />

            {filteredData.map(datas => (
                <div className="date">
                    <div key={datas.id} className='dat'>
                        <div className="cart-item">
                            <div className="product-details">
                                <div className="img">
                                    {datas.productos.imagen && (
                                        <img src={`data:image/jpeg;base64,${datas.productos.imagen}`} alt={datas.productos.nombreProducto} width="300" />
                                    )}
                                </div>
                                <div class="dato">
                                    <p className="product-name">{datas.productos.nombreProducto}</p>
                                    <p className="product-price">Precio: ${datas.productos.precio}</p>
                                    <p>Envío: ${datas.envio}</p>

                                </div>

                            </div>



                        </div>
                        <div className="cart-summary">
                            <p>Producto: ${productos[0].precio}</p>
                            <p>Envío: ${productos[0].envio}</p>
                            <h3>Total: ${total}</h3>
                            <button>Continuar compra</button>
                        </div>

                    </div>
                </div>
            ))}
        </div>


    );
};

