import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import robotImage from './assets/robot.png';
import buscarImage from './assets/buscar.png';
import './AccountOverview.css';

function AccountOverview() {
  const location = useLocation();
  const navigate = useNavigate();
  const userInfo = location.state?.userInfo || { 
    nombre: 'Usuario', 
    apellidoPaterno: 'Prueba', 
    hasPaymentMethod: false,
    membership: 'No especificado',
    registrationDate: 'Fecha de prueba',
    expirationDate: 'Fecha de expiración de prueba'
  }; // Información de prueba temporal

  const [showHelpInfo, setShowHelpInfo] = useState(false);

  const handleHelpClick = () => {
    setShowHelpInfo(!showHelpInfo);
  };

  const handleRenewMembership = () => {
    // Aquí deberías actualizar el estado de userInfo
    const updatedUserInfo = {
      ...userInfo,
      hasPaymentMethod: true,
      membership: 'Membresía Premium',
      expirationDate: 'Fecha de expiración de la membresía' // Actualiza con la fecha real
    };

    navigate('/renew-membership', { state: { userInfo: updatedUserInfo } });
  };

  return (
    <div className="account-overview-container">
      <header className="account-header">
        <img src={robotImage} alt="Robot" className="robot-image" />
        <h1 className="chopping-title">Chopping</h1>
        <div className="search-container">
          <input type="text" placeholder="Buscar productos..." className="search-input" />
          <img src={buscarImage} alt="Buscar" className="search-icon" />
        </div>
      </header>
      <nav className="account-nav">
        <Link to="/">Crear Cuenta</Link>
        <Link to="/login">Ingresar</Link>
        <Link to="/categories">Categorías</Link>
        <span style={{ fontWeight: 'bold', color: '#00BFFF' }}>Mi Cuenta</span> {/* Color azul claro */}
        <Link to="/promotions">Promociones</Link>
        <Link to="/best-sellers">Lo más vendidos</Link>
        <Link to="/help" onClick={handleHelpClick}>Ayuda</Link>
      </nav>

      {/* Información de la cuenta */}
      <div style={{ textAlign: 'center' }}>
        <h2>Membresía Chopping</h2>
        <h3>{userInfo.nombre} {userInfo.apellidoPaterno}</h3>
        <p>Miembro desde: <strong>{userInfo.registrationDate || 'Fecha de prueba'}</strong></p>
        <p>Expira el: <strong>{userInfo.expirationDate || 'Fecha de expiración de prueba'}</strong></p>

        {/* Botón para adquirir o renovar la membresía */}
        {userInfo.hasPaymentMethod ? (
          <div>
            <p style={{ color: 'green' }}>Estado de Membresía: <strong>{userInfo.membership || 'No especificado'}</strong></p>
            <button className="renew-button" onClick={handleRenewMembership}>Renovar Membresía</button>
          </div>
        ) : (
          <div>
            <p className="no-membership-info">No tienes una membresía premium. Considera adquirir una.</p>
            <button className="renew-button" onClick={handleRenewMembership}>Adquirir Membresía Premium</button>
          </div>
        )}
      </div>

      {/* Información de ayuda */}
      {showHelpInfo && (
        <div style={{ textAlign: 'center' }}>
          <h2>Ayuda</h2>
          <p>En <strong>Chopping</strong>, estamos aquí para ayudarte. Si tienes alguna pregunta o necesitas asistencia, puedes contactar a nuestro equipo de soporte a través de:</p>
          <p><strong>Teléfono:</strong> 123-456-7890</p>
          <p><strong>Correo electrónico:</strong> soporte@chopping.com</p>
          <p>¡No dudes en contactarnos para cualquier consulta!</p>
        </div>
      )}

      <footer>
        © 2023-2024, Chopping, Inc. o sus afiliados
      </footer>
    </div>
  );
}

export default AccountOverview;
