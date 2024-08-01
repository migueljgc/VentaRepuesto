import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MenuUser } from '../../Component/Menu';

export const Compra = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    const datas = state ? state.data : {};
    const [dataUser, setDataUser] = useState([]);


    const fetchData = async () => {
        try {
            console.log(datas.id)
            const response = await axios.get(`http://localhost:8080/api/Productos/get/${datas.id}`);
            console.log('Los datos', response.data);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };
    const fetchUser = async () => {
        try {
            const token=localStorage.getItem('token')
            const response = await axios.get('http://localhost:8080/api/auth/editar', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setDataUser(response.data)
            console.log('Los datos de usuario', dataUser);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };
    
    useEffect(() => {
         fetchData();
         fetchUser();
    }, []
);

   

    return (
        <div>
            <MenuUser /> 
            
        </div>
    );
}

