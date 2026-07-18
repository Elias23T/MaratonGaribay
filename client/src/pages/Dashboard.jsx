import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Card from '../components/DashboardCard';
import Loading from '../components/Loading';
import participantesService from '../services/participantesService';
import '../styles/dashboard.css';

export default function Dashboard() {
  const [total, setTotal] = useState(0);
  const [totalA, setTotalA] = useState(0);
  const [totalB, setTotalB] = useState(0);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargar() {
      try {
        const [general, catA, catB] = await Promise.all([
          participantesService.listar({ page: 1, limit: 1 }),
          participantesService.listar({ categoria: 'A', page: 1, limit: 1 }),
          participantesService.listar({ categoria: 'B', page: 1, limit: 1 }),
        ]);
        setTotal(general.total);
        setTotalA(catA.total);
        setTotalB(catB.total);
      } finally {
        setCargando(false);
      }
    }
    cargar();
  }, []);

  return (
    <div className="layout">
      <Sidebar />
      <div className="contenido">
        <Navbar />
        <div className="dashboard-body">
          <h1>Dashboard</h1>
          <p className="dashboard-subtitulo">Resumen general de la maratón</p>

          {cargando ? (
            <Loading />
          ) : (
            <div className="dashboard-cards">
              <Card titulo="Total de participantes" valor={total} />
              <Card titulo="Categoría A" valor={totalA} />
              <Card titulo="Categoría B" valor={totalB} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}