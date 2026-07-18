import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Participantes from './pages/participantes';
import Inscripcion from './pages/Inscripcion';
import ConsultaInscripcion from './pages/ConsultaInscripcion';
import authService from './services/authService';

function RutaProtegida({ children }) {
  return authService.isAutenticado() ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/inscripcion" element={<Inscripcion />} />
        <Route path="/consulta" element={<ConsultaInscripcion />} />

        <Route
          path="/dashboard"
          element={
            <RutaProtegida>
              <Dashboard />
            </RutaProtegida>
          }
        />
        <Route
          path="/participantes"
          element={
            <RutaProtegida>
              <Participantes />
            </RutaProtegida>
          }
        />

        <Route path="*" element={<Navigate to="/inscripcion" />} />
      </Routes>
    </BrowserRouter>
  );
}