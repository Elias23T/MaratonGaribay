import { useState } from 'react';

export default function SearchBar({ onBuscar, onLimpiar }) {
  const [termino, setTermino] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (termino.trim() === '') {
      onLimpiar();
      return;
    }
    onBuscar(termino.trim());
  }

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        placeholder="Buscar por nombre, CI o N° corredor"
        value={termino}
        onChange={(e) => setTermino(e.target.value)}
      />
      <button type="submit">Buscar</button>
    </form>
  );
}