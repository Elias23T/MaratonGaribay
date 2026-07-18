export function calcularEdad(fechaNacimiento) {
    if (!fechaNacimiento) return '';
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  }
  
  export function esMenorDeEdad(fechaNacimiento) {
    const edad = calcularEdad(fechaNacimiento);
    return edad !== '' && edad < 18;
  }