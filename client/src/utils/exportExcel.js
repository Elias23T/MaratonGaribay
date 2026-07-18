import * as XLSX from 'xlsx';

function mapearFilas(participantes) {
  return participantes.map((p) => ({
    'N° Corredor': p.numero_corredor,
    Categoria: p.categoria,
    Nombre: p.nombre_completo,
    CI: p.ci,
    'Fecha Nacimiento': p.fecha_nacimiento,
    Edad: p.edad,
    Celular: p.celular,
    Barrio: p.barrio,
    'Es Menor': p.es_menor ? 'Si' : 'No',
    Tutor: p.nombre_tutor || '',
    'CI Tutor': p.ci_tutor || '',
  }));
}

export function exportarParticipantesExcel(participantes) {
  const categoriaA = participantes.filter((p) => p.categoria === 'A');
  const categoriaB = participantes.filter((p) => p.categoria === 'B');

  const libro = XLSX.utils.book_new();

  if (categoriaA.length > 0) {
    const hojaA = XLSX.utils.json_to_sheet(mapearFilas(categoriaA));
    XLSX.utils.book_append_sheet(libro, hojaA, 'Categoria A');
  }

  if (categoriaB.length > 0) {
    const hojaB = XLSX.utils.json_to_sheet(mapearFilas(categoriaB));
    XLSX.utils.book_append_sheet(libro, hojaB, 'Categoria B');
  }

  XLSX.writeFile(libro, 'participantes_maraton.xlsx');
}