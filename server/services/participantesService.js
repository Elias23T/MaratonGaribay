const supabase = require('../config/supabase');

function calcularEdad(fechaNacimiento) {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  return edad;
}

async function generarNumeroCorredor(categoria) {
  const { data, error } = await supabase
    .from('participantes')
    .select('numero_corredor')
    .like('numero_corredor', `${categoria}-%`)
    .order('numero_corredor', { ascending: false })
    .limit(1);

  if (error) throw new Error(error.message);

  let siguiente = 1;
  if (data && data.length > 0) {
    const ultimo = data[0].numero_corredor;
    const partes = ultimo.split('-');
    siguiente = parseInt(partes[1], 10) + 1;
  }

  const correlativo = String(siguiente).padStart(4, '0');
  return `${categoria}-${correlativo}`;
}

async function crearParticipante(datos) {
  const {
    categoria,
    nombre_completo,
    ci,
    fecha_nacimiento,
    celular,
    barrio,
    nombre_tutor,
    ci_tutor,
  } = datos;

  if (!categoria || !nombre_completo || !ci || !fecha_nacimiento || !celular || !barrio) {
    throw new Error('Faltan campos obligatorios');
  }

  const categoriaNormalizada = String(categoria).trim().toUpperCase();

  if (categoriaNormalizada !== 'A' && categoriaNormalizada !== 'B') {
    throw new Error('La categoría debe ser A o B');
  }

  const { data: existente } = await supabase
    .from('participantes')
    .select('id')
    .eq('ci', ci)
    .maybeSingle();

  if (existente) {
    throw new Error('Ya existe un participante registrado con ese CI');
  }

  const edad = calcularEdad(fecha_nacimiento);
  const es_menor = edad < 18;

  if (es_menor && (!nombre_tutor || !ci_tutor)) {
    throw new Error('Los participantes menores de edad requieren nombre y CI del tutor');
  }

  const numero_corredor = await generarNumeroCorredor(categoriaNormalizada);

  const { data, error } = await supabase
    .from('participantes')
    .insert([{
      numero_corredor,
      categoria: categoriaNormalizada,
      nombre_completo,
      ci,
      fecha_nacimiento,
      edad,
      celular,
      barrio,
      es_menor,
      nombre_tutor: es_menor ? nombre_tutor : null,
      ci_tutor: es_menor ? ci_tutor : null,
    }])
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

async function listarParticipantes({ categoria, page = 1, limit = 20 } = {}) {
  let query = supabase.from('participantes').select('*', { count: 'exact' });

  if (categoria) {
    query = query.eq('categoria', categoria);
  }

  const desde = (page - 1) * limit;
  const hasta = desde + limit - 1;

  query = query.order('fecha_registro', { ascending: false }).range(desde, hasta);

  const { data, error, count } = await query;
  if (error) throw new Error(error.message);

  return { participantes: data, total: count, page: Number(page), limit: Number(limit) };
}

async function obtenerParticipantePorId(id) {
  const { data, error } = await supabase
    .from('participantes')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) throw new Error('Participante no encontrado');

  return data;
}

async function actualizarParticipante(id, datos) {
  const camposPermitidos = [
    'categoria', 'nombre_completo', 'ci', 'fecha_nacimiento',
    'celular', 'barrio', 'nombre_tutor', 'ci_tutor',
  ];

  const actualizacion = {};
  for (const campo of camposPermitidos) {
    if (datos[campo] !== undefined) actualizacion[campo] = datos[campo];
  }

  if (actualizacion.categoria) {
    const categoriaNormalizada = String(actualizacion.categoria).trim().toUpperCase();
    if (categoriaNormalizada !== 'A' && categoriaNormalizada !== 'B') {
      throw new Error('La categoría debe ser A o B');
    }
    actualizacion.categoria = categoriaNormalizada;
  }

  if (actualizacion.fecha_nacimiento) {
    actualizacion.edad = calcularEdad(actualizacion.fecha_nacimiento);
    actualizacion.es_menor = actualizacion.edad < 18;
  }

  const { data, error } = await supabase
    .from('participantes')
    .update(actualizacion)
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

async function eliminarParticipante(id) {
  const { error } = await supabase
    .from('participantes')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);

  return { mensaje: 'Participante eliminado correctamente' };
}

async function buscarParticipantes(termino) {
  const { data, error } = await supabase
    .from('participantes')
    .select('*')
    .or(`nombre_completo.ilike.%${termino}%,ci.ilike.%${termino}%,numero_corredor.ilike.%${termino}%`)
    .order('fecha_registro', { ascending: false });

  if (error) throw new Error(error.message);

  return data;
}
async function buscarPorCI(ci) {
  const { data, error } = await supabase
    .from('participantes')
    .select('numero_corredor, categoria, nombre_completo, ci, edad, barrio, fecha_registro')
    .eq('ci', ci)
    .maybeSingle();

  if (error) throw new Error(error.message);

  return data;
}

module.exports = {
  calcularEdad,
  generarNumeroCorredor,
  crearParticipante,
  listarParticipantes,
  obtenerParticipantePorId,
  actualizarParticipante,
  eliminarParticipante,
  buscarParticipantes,
  buscarPorCI,
};