import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const usuario = authService.getUsuario();

  function handleLogout() {
    authService.logout();
    navigate('/login');
  }

  return (
    <nav className="navbar">
      <span className="navbar-titulo">Maratón</span>
      <div className="navbar-usuario">
        <span>{usuario ? usuario.nombre_completo : ''}</span>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </nav>
  );
}