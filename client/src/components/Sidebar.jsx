import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'activo' : '')}>
        Dashboard
      </NavLink>
      <NavLink to="/participantes" className={({ isActive }) => (isActive ? 'activo' : '')}>
        Participantes
      </NavLink>
    </aside>
  );
}