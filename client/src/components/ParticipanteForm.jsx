import { useState, useEffect } from 'react';
import { esMenorDeEdad } from '../utils/calcularEdad';

const valoresIniciales = {
  categoria: '',
  nombre_completo: '',
  ci: '',
  fecha_nacimiento: '',
  celular: '',
  barrio: '',
  nombre_tutor: '',
  ci_tutor: '',
};

export default function ParticipanteForm({ participante, onGuardar, onCancelar, guardando }) {
  const [form, setForm] = useState(valoresIniciales);
  const [error, setError] = useState('');

  useEffect(() => {
    if (participante) {
      setForm({ ...valoresIniciales, ...participante });
    } else {
      setForm(valoresIniciales);
    }
  }, [participante]);

  const esMenor = esMenorDeEdad(form.fecha_nacimiento);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!form.categoria || !form.nombre_completo || !form.ci || !form.fecha_nacimiento || !form.celular || !form.barrio) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (esMenor && (!form.nombre_tutor || !form.ci_tutor)) {
      setError('Debe registrar los datos del tutor para menores de edad');
      return;
    }

    onGuardar(form);
  }

  return (
    <form onSubmit={handleSubmit} className="participante-form">
      {error && <p className="form-error">{error}</p>}

      <div className="campo">
        <label>Categoría</label>
        <select name="categoria" value={form.categoria} onChange={handleChange}>
          <option value="">Seleccione categoría</option>
          <option value="A">A</option>
          <option value="B">B</option>
        </select>
      </div>

      <div className="campo campo-ancho">
        <label>Nombre completo</label>
        <input name="nombre_completo" value={form.nombre_completo} onChange={handleChange} />
      </div>

      <div className="campo">
        <label>CI</label>
        <input name="ci" value={form.ci} onChange={handleChange} />
      </div>

      <div className="campo">
        <label>Fecha de nacimiento</label>
        <input type="date" name="fecha_nacimiento" value={form.fecha_nacimiento} onChange={handleChange} />
      </div>

      <div className="campo">
        <label>Celular</label>
        <input name="celular" value={form.celular} onChange={handleChange} />
      </div>

      <div className="campo campo-ancho">
        <label>Barrio</label>
        <input name="barrio" value={form.barrio} onChange={handleChange} />
      </div>

      {esMenor && (
        <>
          <div className="campo campo-ancho">
            <label>Nombre del tutor</label>
            <input name="nombre_tutor" value={form.nombre_tutor} onChange={handleChange} />
          </div>

          <div className="campo campo-ancho">
            <label>CI del tutor</label>
            <input name="ci_tutor" value={form.ci_tutor} onChange={handleChange} />
          </div>
        </>
      )}

      <div className="form-botones">
        <button type="submit" disabled={guardando}>
          {guardando ? 'Guardando...' : 'Guardar'}
        </button>
        {onCancelar && <button type="button" onClick={onCancelar}>Cancelar</button>}
      </div>
    </form>
  );
}