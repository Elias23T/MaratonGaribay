export function previsualizarNumero(categoria, correlativo = 1) {
    if (!categoria) return '';
    const numero = String(correlativo).padStart(4, '0');
    return `${categoria.toUpperCase()}-${numero}`;
  }