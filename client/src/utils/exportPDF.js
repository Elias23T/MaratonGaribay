import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

function agregarTablaMayores(doc, titulo, participantes, startY) {
  doc.setFontSize(12);
  doc.text(titulo, 14, startY);

  const filas = participantes.map((p) => [
    p.numero_corredor,
    p.nombre_completo,
    p.ci,
    p.edad,
    p.celular,
    p.barrio,
  ]);

  autoTable(doc, {
    head: [['N° Corredor', 'Nombre', 'CI', 'Edad', 'Celular', 'Barrio']],
    body: filas,
    startY: startY + 5,
    styles: { fontSize: 8 },
  });

  return doc.lastAutoTable.finalY + 12;
}

function agregarTablaMenores(doc, titulo, participantes, startY) {
  doc.setFontSize(12);
  doc.text(titulo, 14, startY);

  const filas = participantes.map((p) => [
    p.numero_corredor,
    p.nombre_completo,
    p.ci,
    p.edad,
    p.celular,
    p.barrio,
    p.nombre_tutor || '-',
    p.ci_tutor || '-',
  ]);

  autoTable(doc, {
    head: [['N° Corredor', 'Nombre', 'CI', 'Edad', 'Celular', 'Barrio', 'Tutor', 'CI Tutor']],
    body: filas,
    startY: startY + 5,
    styles: { fontSize: 8 },
  });

  return doc.lastAutoTable.finalY + 12;
}

function agregarSeccionCategoria(doc, nombreCategoria, participantes, startY) {
  const mayores = participantes.filter((p) => !p.es_menor);
  const menores = participantes.filter((p) => p.es_menor);

  let y = startY;

  doc.setFontSize(15);
  doc.text(`Categoría ${nombreCategoria}`, 14, y);
  y += 8;

  if (mayores.length > 0) {
    y = agregarTablaMayores(doc, 'Mayores de edad', mayores, y);
  }

  if (menores.length > 0) {
    if (y > 250) {
      doc.addPage();
      y = 15;
    }
    y = agregarTablaMenores(doc, 'Menores de edad', menores, y);
  }

  return y;
}

export function exportarParticipantesPDF(participantes) {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('Listado de Participantes - Maratón', 14, 15);

  const categoriaA = participantes.filter((p) => p.categoria === 'A');
  const categoriaB = participantes.filter((p) => p.categoria === 'B');

  let y = 28;

  if (categoriaA.length > 0) {
    y = agregarSeccionCategoria(doc, 'A', categoriaA, y);
  }

  if (categoriaB.length > 0) {
    doc.addPage();
    y = 15;
    y = agregarSeccionCategoria(doc, 'B', categoriaB, y);
  }

  doc.save('participantes_maraton.pdf');
}