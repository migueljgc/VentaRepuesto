import React, { useEffect, useState } from 'react';
import { MenuUser } from '../../Component/Menu';
import '../vendedor/ingreso.css'
import axios from 'axios';

export const Ingreso = () => {
    const [categoria, setCategoria] = useState([]);
    const [data, setData] = useState({
        nombre:'',
        descripcion: '',
        cantidad: '',
        precio: '',
        categoria: '',
        marca: '',
    });

    const [selectedFile, setSelectedFile] = useState(null);
    const fetchCategoria = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/Categoria/get')
            setCategoria(response.data);
            console.log("esta es la data ", categoria);
        } catch (error) {
            console.error('Error en la data: ', error);
        }

    };

    useEffect(() => {
        document.title = ""
        fetchCategoria();
    }, []);

    const handleData = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });

    };
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    const handleChange = async (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('producto', JSON.stringify({
            nombreProducto: data.nombre,
            descripcion: data.descripcion,
            marca: data.marca,
            cantidad: data.cantidad,
            precio: data.precio,
            categoria: { id: data.categoria }
        }));
        formData.append('imagen', selectedFile);

        try {
            const response = await axios.post('http://localhost:8080/api/Productos/save', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Producto guardado', response.data);
        } catch (error) {
            console.error('Error al guardar el producto: ', error);
        }
    }


    return (
        <div>
            <MenuUser />
            <br />
            <form className="ing" onSubmit={handleChange}>
                <div className='' >
                    <label htmlFor="nombre">Producto</label><br />
                    <input type="text" name="nombre" id="nombre" value={data.nombre} onChange={handleData} required/>
                </div><br />
                <div >
                    <label htmlFor="">Descripcion</label><br />
                    <input type="text" name="descripcion" id="descripcion" value={data.descripcion} onChange={handleData} required/>
                </div><br />
                <div >
                    <label htmlFor="">Marca</label><br />
                    <input type="text" name="marca" id="marca" value={data.marca} onChange={handleData} required/>
                </div><br />
                <div >
                    <label htmlFor="cantidad">Cantidad</label><br />
                    <input type="text" name="cantidad" id="cantidad" value={data.cantidad} onChange={handleData} required/>
                </div><br />
                <div >
                    <label htmlFor="precio">Precio</label><br />
                    <input type="text" name="precio" id="precio" value={data.precio} onChange={handleData} required/>
                </div><br />
                <div >
                    <label htmlFor="categoria">Categoria</label><br />
                    <select
                        name="categoria"
                        id="categoria"
                        value={data.categoria}
                        onChange={handleData} required
                    >
                        <option key="" value=""></option>
                        {categoria.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.nombre}
                            </option>
                        ))}
                    </select>

                </div><br />
                <div >
                    <input type="file" onChange={handleFileChange} />
                </div><br />
                <div >
                    <button type='submit'>Enviar</button>
                </div>
            </form>

        </div>
    );
}
