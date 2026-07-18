export default function ParticipantesTable({ participantes, onEditar, onEliminar }) {
    if (!participantes || participantes.length === 0) {
      return <p>No hay participantes registrados</p>;
    }
  
    return (
      <table className="participantes-table">
        <thead>
          <tr>
            <th>N° Corredor</th>
            <th>Categoría</th>
            <th>Nombre</th>
            <th>CI</th>
            <th>Edad</th>
            <th>Celular</th>
            <th>Barrio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {participantes.map((p) => (
            <tr key={p.id}>
              <td>{p.numero_corredor}</td>
              <td>{p.categoria}</td>
              <td>{p.nombre_completo}</td>
              <td>{p.ci}</td>
              <td>{p.edad}</td>
              <td>{p.celular}</td>
              <td>{p.barrio}</td>
              <td>
                <button onClick={() => onEditar(p)}>Editar</button>
                <button onClick={() => onEliminar(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }