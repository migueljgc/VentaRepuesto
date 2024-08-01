import React, { useEffect, useState } from 'react';
import { Menu, MenuUser } from '../Component/Menu';
import axios from 'axios';
import '../Pages/HomePages.css'
import { useNavigate } from 'react-router-dom';

export const HomePages = () => {
    const [data, setData] = useState([]);
    const [categoria, setCategoria] = useState([]);
    const [selectedCategoria, setSelectedCategoria] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [isLogged, setIsLogged] = useState('');
    const Navigate = useNavigate();
    const [datos, setDatos] = useState();


    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/Productos/get')
            setData(response.data);
            console.log("esta es la data ", data);
        } catch (error) {
            console.error('Error en la data: ', error);
        }

    };
    const fetchCategoria = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/Categoria/get')
            setCategoria(response.data);
            console.log("esta es la data ", categoria);
        } catch (error) {
            console.error('Error en la data: ', error);
        }

    };
    const checkLoginStatus = () => {
        const logged = localStorage.getItem('logget') === 'true';
        setIsLogged(logged);
        console.log('Logget: ', logged);

    };
    useEffect(() => {
        document.title = ""
        console.log(isLogged)
        fetchData();
        fetchCategoria();
        checkLoginStatus();
    }, []);
    const filteredData = data.filter(producto => {
        const matchesCategoria = selectedCategoria ? producto.categoria.id === parseInt(selectedCategoria) : true;
        const matchesSearchTerm = producto.nombreProducto.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategoria && matchesSearchTerm;
    })
    const handleCategoriaChange = (catId) => {
        setSelectedCategoria(catId);
    };
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const handleButtonClick = (datas) => {

        if (isLogged == true) {
            axios.get('http://localhost:8080/api/Productos/get', datas)
                .then(response => {
                    console.log(datas)
                    console.log('Solicitud actualizada:', response.data);
                    // Redirigir a la página de respuesta de PQRS
                    Navigate('/compra', { state: { data: datas } });

                })
                .catch(error => {
                    console.error('Error al actualizar la solicitud:', error);
                    alert('Error al actualizar la solicitud. Por favor, inténtalo de nuevo más tarde.');
                });

        }
        else {
            Navigate('/Login');
        }
    };
    const token = localStorage.getItem('token');
    const handleButton = async (datas) => {
        try {
            if (isLogged) {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Token no disponible');
                    return;
                }
    
                const { id, precio } = datas;
                const response1 = await axios.get('http://localhost:8080/api/auth/editar', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
    
                const userId = response1.data.id;
                const userRol = response1.data.rol;  // Asegúrate de obtener el rol del usuario
                console.log(response1);
    
                if (!userRol) {
                    console.error('Rol del usuario no disponible');
                    return;
                }
    
                const envio = 12345;
                const total = envio + precio;
    
                const carrito = await axios.post('http://localhost:8080/api/CarritoCompras/save', {
                    productos: { id: id },
                    cantidad: 1,
                    envio: envio,
                    total: total,
                    usuario: { id: userId, rol: userRol }  // Incluye el rol en el objeto usuario
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
    
                console.log('carrito ', carrito);
                alert('Producto agregado al carrito exitosamente');
            } else {
                Navigate('/Login');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error.response?.data || error.message);
            alert('Error al agregar el producto al carrito. Por favor, inténtalo de nuevo más tarde.');
        }
    };
    

    return (
        <div>
            {isLogged ? <MenuUser /> : <Menu />}

            <br />
            <div className="res">
                <div className="categorias">
                    <div className="">
                        <input
                            type="text"
                            placeholder="Buscar producto..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <p>Categoria</p>
                        <div>
                            <input
                                type="radio"
                                id="categoria-todas"
                                name="categoria"
                                value=""
                                checked={selectedCategoria === ''}
                                onChange={() => handleCategoriaChange('')}
                            />
                            <label htmlFor="categoria-todas">Todas</label>
                        </div>

                        {categoria.map((cat, index) => (
                            <div key={index}>
                                <input
                                    type="radio"
                                    id={`categoria-${cat.id}`}
                                    name="categoria"
                                    value={cat.id}
                                    onChange={() => handleCategoriaChange(cat.id)}
                                />
                                <label htmlFor={`categoria-${cat.id}`}>{cat.nombre}</label>
                            </div>
                        ))}
                    </div>

                </div>
                <div className="piezas">
                    <div className="pieza"><br />
                        {filteredData.map(datas => (
                            <div className="datos">
                                <div key={datas.id} className='data'>
                                    <div className="">
                                        {datas.imagen && (
                                            <img src={`data:image/jpeg;base64,${datas.imagen}`} alt={datas.nombreProducto} width="300" />
                                        )}
                                    </div>
                                    <h2>{datas.nombreProducto}</h2>
                                    <p>{datas.descripcion}</p>
                                    <p>Marca: {datas.marca}</p>
                                    <p>Stock: {datas.cantidad}</p>
                                    <p>${datas.precio}</p>
                                    <p>Categoria: {datas.categoria.nombre}</p>
                                </div>
                                <div className="compra">
                                    <button name="compras" id="compras"
                                        onClick={() => handleButtonClick(datas)}
                                    >Comprar </button>
                                </div>
                                <div className="carrito-compra">
                                    <button name="carrito-compras" id="carrito-compras"
                                        onClick={() => handleButton(datas)}
                                    >Agregar al Carrito de Compras</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <br />

                </div>
            </div>
        </div>
    );
}
