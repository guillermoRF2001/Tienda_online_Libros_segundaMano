// src/Comprobar.js
import React, { useState } from 'react';
import connectToDatabase from '../components/connectBD';

const Comprobar = () => {
    const [message, setMessage] = useState('');

    const handleConnect = async () => {
        setMessage('Conectando...');
        try {
            const response = await connectToDatabase();
            setMessage(response); 
        } catch (error) {
            setMessage(error);  
        }
    };

    return (
        <div>
            <button onClick={handleConnect}>Conectar a la Base de Datos</button>
            <p>{message}</p>
        </div>
    );
};

export default Comprobar;
