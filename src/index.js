import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Asegúrate de que la ruta sea correcta
import './index.css'; // Si tienes un archivo CSS

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);