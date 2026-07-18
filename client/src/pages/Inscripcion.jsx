import { useState } from 'react';
import { Link } from 'react-router-dom';
import ParticipanteForm from '../components/ParticipanteForm';
import participantesService from '../services/participantesService';

export default function Inscripcion() {
  const [mensaje, setMensaje] = useState('');
  const [numeroCorredor, setNumeroCorredor] = useState('');
  const [error, setError] = useState('');

  async function handleGuardar(datos) {
    setError('');
    setMensaje('');
    try {
      const participante = await participantesService.inscribirPublico(datos);
      setNumeroCorredor(participante.numero_corredor);
      setMensaje('¡Inscripción exitosa! Guarda tu número de corredor.');
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error al registrar la inscripción');
    }
  }

  return (
    <div className="inscripcion-page">
      <h1>Inscripción a la Maratón</h1>
      <p>
        <Link to="/consulta">¿Ya te inscribiste? Consulta aquí</Link>
        {' | '}
        <Link to="/login">Ingresar como administrador</Link>
      </p>

      {mensaje && (
        <div className="mensaje-exito">
          <p>{mensaje}</p>
          <p>Tu número de corredor es: <strong>{numeroCorredor}</strong></p>
        </div>
      )}

      {error && <p className="form-error">{error}</p>}

      {!mensaje && <ParticipanteForm onGuardar={handleGuardar} />}
    </div>
  );
}