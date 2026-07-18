import { useState } from 'react';
import { Link } from 'react-router-dom';
import participantesService from '../services/participantesService';
import '../styles/consulta.css';

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
      <div className="consulta-card">
        <h1>Consultar Inscripción</h1>
        <p className="consulta-volver">
          <Link to="/inscripcion">← Volver a inscripción</Link>
        </p>

        <form onSubmit={handleSubmit} className="consulta-form">
          <label>Número de carnet (CI)</label>
          <div className="consulta-input-grupo">
            <input value={ci} onChange={(e) => setCi(e.target.value)} placeholder="Ej: 1234567" />
            <button type="submit" disabled={buscando}>
              {buscando ? 'Buscando...' : 'Buscar'}
            </button>
          </div>
        </form>

        {error && <p className="form-error">{error}</p>}

        {resultado && resultado.inscrito && (
          <div className="resultado-inscrito">
            <div className="check-icono">✓</div>
            <p className="resultado-titulo">¡Estás inscrito!</p>

            <div className="resultado-datos">
              <div className="dato-fila">
                <span className="dato-label">N° Corredor</span>
                <span className="dato-valor destacado">{resultado.participante.numero_corredor}</span>
              </div>
              <div className="dato-fila">
                <span className="dato-label">Categoría</span>
                <span className="dato-valor">{resultado.participante.categoria}</span>
              </div>
              <div className="dato-fila">
                <span className="dato-label">Nombre</span>
                <span className="dato-valor">{resultado.participante.nombre_completo}</span>
              </div>
              <div className="dato-fila">
                <span className="dato-label">Barrio</span>
                <span className="dato-valor">{resultado.participante.barrio}</span>
              </div>
            </div>
          </div>
        )}

        {resultado && !resultado.inscrito && (
          <div className="resultado-no-encontrado">
            <div className="x-icono">✕</div>
            <p>No se encontró ninguna inscripción con ese CI.</p>
            <Link to="/inscripcion" className="btn-ir-inscripcion">
              Inscribirme ahora
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}