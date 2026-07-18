import { useState } from 'react';
import { Link } from 'react-router-dom';
import participantesService from '../services/participantesService';

export default function ConsultaInscripcion() {
  const [ci, setCi] = useState('');
  const [resultado, setResultado] = useState(null);
  const [buscando, setBuscando] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setResultado(null);

    if (!ci.trim()) {
      setError('Ingresa tu número de carnet (CI)');
      return;
    }

    setBuscando(true);
    try {
      const data = await participantesService.consultarPorCI(ci.trim());
      setResultado(data);
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error al consultar la inscripción');
    } finally {
      setBuscando(false);
    }
  }

  return (
    <div className="consulta-page">
      <h1>Consultar Inscripción</h1>
      <p><Link to="/inscripcion">Volver a inscripción</Link></p>

      <form onSubmit={handleSubmit} className="consulta-form">
        <label>Número de carnet (CI)</label>
        <input value={ci} onChange={(e) => setCi(e.target.value)} placeholder="Ej: 1234567" />
        <button type="submit" disabled={buscando}>
          {buscando ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      {error && <p className="form-error">{error}</p>}

      {resultado && resultado.inscrito && (
        <div className="resultado-inscrito">
          <p>Estás inscrito.</p>
          <p>N° Corredor: <strong>{resultado.participante.numero_corredor}</strong></p>
          <p>Categoría: {resultado.participante.categoria}</p>
          <p>Nombre: {resultado.participante.nombre_completo}</p>
          <p>Barrio: {resultado.participante.barrio}</p>
        </div>
      )}

      {resultado && !resultado.inscrito && (
        <p>No se encontró ninguna inscripción con ese CI.</p>
      )}
    </div>
  );
}