import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import ParticipantesTable from '../components/ParticipantesTable';
import ParticipanteForm from '../components/ParticipanteForm';
import Loading from '../components/Loading';
import participantesService from '../services/participantesService';
import { exportarParticipantesPDF } from '../utils/exportPDF';
import { exportarParticipantesExcel } from '../utils/exportExcel';
import '../styles/dashboard.css';
import '../styles/participantes.css';

export default function Participantes() {
  const [participantes, setParticipantes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [participanteEditar, setParticipanteEditar] = useState(null);
  const [error, setError] = useState('');

  async function cargarParticipantes() {
    setCargando(true);
    try {
      const data = await participantesService.listar({ page: 1, limit: 100 });
      setParticipantes(data.participantes);
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error al cargar participantes');
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarParticipantes();
  }, []);

  async function handleBuscar(termino) {
    setCargando(true);
    try {
      const resultado = await participantesService.buscar(termino);
      setParticipantes(resultado);
    } finally {
      setCargando(false);
    }
  }

  function handleNuevo() {
    setParticipanteEditar(null);
    setMostrarForm(true);
  }

  function handleEditar(participante) {
    setParticipanteEditar(participante);
    setMostrarForm(true);
  }

  async function handleGuardar(datos) {
    try {
      if (participanteEditar) {
        await participantesService.actualizar(participanteEditar.id, datos);
      } else {
        await participantesService.crear(datos);
      }
      setMostrarForm(false);
      cargarParticipantes();
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error al guardar participante');
    }
  }

  async function handleEliminar(id) {
    if (!confirm('¿Eliminar este participante?')) return;
    await participantesService.eliminar(id);
    cargarParticipantes();
  }

  return (
    <div className="layout">
      <Sidebar />
      <div className="contenido">
        <Navbar />
        <div className="participantes-body">
          <div className="participantes-header">
            <div>
              <h1>Participantes</h1>
              <p className="dashboard-subtitulo">{participantes.length} registrados</p>
            </div>
            <button className="btn-nuevo" onClick={handleNuevo}>+ Nuevo participante</button>
          </div>

          {error && <p className="form-error">{error}</p>}

          <div className="participantes-toolbar">
            <SearchBar onBuscar={handleBuscar} onLimpiar={cargarParticipantes} />
            <div className="toolbar-exportar">
              <button className="btn-exportar btn-pdf" onClick={() => exportarParticipantesPDF(participantes)}>
                Exportar PDF
              </button>
              <button className="btn-exportar btn-excel" onClick={() => exportarParticipantesExcel(participantes)}>
                Exportar Excel
              </button>
            </div>
          </div>

          {mostrarForm && (
            <div className="modal-overlay" onClick={() => setMostrarForm(false)}>
              <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h2>{participanteEditar ? 'Editar participante' : 'Nuevo participante'}</h2>
                  <button className="modal-cerrar" onClick={() => setMostrarForm(false)}>✕</button>
                </div>
                <ParticipanteForm
                  participante={participanteEditar}
                  onGuardar={handleGuardar}
                  onCancelar={() => setMostrarForm(false)}
                />
              </div>
            </div>
          )}

          <div className="tabla-contenedor">
            {cargando ? (
              <Loading />
            ) : (
              <ParticipantesTable
                participantes={participantes}
                onEditar={handleEditar}
                onEliminar={handleEliminar}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}