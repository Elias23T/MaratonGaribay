import { useState } from 'react';
import { Link } from 'react-router-dom';
import ParticipanteForm from '../components/ParticipanteForm';
import participantesService from '../services/participantesService';
import '../styles/inscripcion.css';

export default function Inscripcion() {
  const [mensaje, setMensaje] = useState('');
  const [numeroCorredor, setNumeroCorredor] = useState('');
  const [error, setError] = useState('');
  const [guardando, setGuardando] = useState(false);

  async function handleGuardar(datos) {
    setError('');
    setMensaje('');
    setGuardando(true);
    try {
      const participante = await participantesService.inscribirPublico(datos);
      setNumeroCorredor(participante.numero_corredor);
      setMensaje('¡Inscripción guardada exitosamente!');
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error al registrar la inscripción');
    } finally {
      setGuardando(false);
    }
  }

  return (
    <div className="inscripcion-page">
      <div className="inscripcion-card">
        <h1>Inscripción a la Maratón</h1>
        <p>
          <Link to="/consulta">¿Ya te inscribiste? Consulta aquí</Link>
          {' | '}
          <Link to="/login">Ingresar como administrador</Link>
        </p>

        {mensaje && (
          <div className="mensaje-exito">
            <div className="check-icono">✓</div>
            <p className="mensaje-exito-texto">{mensaje}</p>
            <p className="numero-corredor-label">Tu número de corredor es</p>
            <p className="numero-corredor">{numeroCorredor}</p>
            <button
              type="button"
              className="btn-nueva-inscripcion"
              onClick={() => {
                setMensaje('');
                setNumeroCorredor('');
              }}
            >
              Registrar otro participante
            </button>
          </div>
        )}

        {error && <p className="form-error">{error}</p>}

        {!mensaje && <ParticipanteForm onGuardar={handleGuardar} guardando={guardando} />}
      </div>
    </div>
  );
}