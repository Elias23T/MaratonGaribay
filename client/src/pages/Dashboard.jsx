import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Card from '../components/DashboardCard';
import Loading from '../components/Loading';
import participantesService from '../services/participantesService';

export default function Dashboard() {
  const [total, setTotal] = useState(0);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargar() {
      try {
        const data = await participantesService.listar({ page: 1, limit: 1 });
        setTotal(data.total);
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
        <h1>Dashboard</h1>
        {cargando ? <Loading /> : <Card titulo="Total de participantes" valor={total} />}
      </div>
    </div>
  );
}