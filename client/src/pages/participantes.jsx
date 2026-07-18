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
        <h1>Participantes</h1>
        {error && <p className="form-error">{error}</p>}

        <div className="acciones-superiores">
          <SearchBar onBuscar={handleBuscar} onLimpiar={cargarParticipantes} />
          <button onClick={handleNuevo}>Nuevo participante</button>
          <button onClick={() => exportarParticipantesPDF(participantes)}>Exportar PDF</button>
          <button onClick={() => exportarParticipantesExcel(participantes)}>Exportar Excel</button>
        </div>

        {mostrarForm && (
          <ParticipanteForm
            participante={participanteEditar}
            onGuardar={handleGuardar}
            onCancelar={() => setMostrarForm(false)}
          />
        )}

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
  );
}