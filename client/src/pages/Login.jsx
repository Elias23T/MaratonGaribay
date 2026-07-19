import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import '../styles/login.css';

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setCargando(true);
    try {
      await authService.login(correo, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error al iniciar sesión');
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="login-scroll-container">

      <section className="seccion-login">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Iniciar sesión</h2>
          {error && <p className="form-error">{error}</p>}
          <label>Correo</label>
          <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} />
          <label>Contraseña</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" disabled={cargando}>
            {cargando ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <div className="scroll-indicador">
          <span>Desliza para inscribirte</span>
          <div className="flecha-abajo">↓</div>
        </div>
      </section>

      <section className="seccion-registro">
        <div className="registro-contenido">
          <h2>¿Aún no estás inscrito?</h2>
          <p>Regístrate en segundos y asegura tu cupo en la carrera</p>

          <div className="registro-opciones">
            <Link to="/inscripcion" className="opcion-card opcion-principal">
              <span className="opcion-icono">📝</span>
              <span className="opcion-titulo">Inscribirme a la carrera</span>
              <span className="opcion-desc">Completa tus datos y obtén tu número de corredor</span>
            </Link>

            <Link to="/consulta" className="opcion-card">
              <span className="opcion-icono">🔍</span>
              <span className="opcion-titulo">Consultar mi inscripción</span>
              <span className="opcion-desc">Busca tu registro con tu número de carnet</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}