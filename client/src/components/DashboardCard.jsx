export default function DashboardCard({ titulo, valor }) {
    return (
      <div className="card">
        <p className="card-titulo">{titulo}</p>
        <p className="card-valor">{valor}</p>
      </div>
    );
  }