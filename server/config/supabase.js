const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;

// Usamos la clave privada del backend
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;


if (!supabaseUrl || !supabaseKey) {
  console.error('ERROR: Faltan las variables de entorno SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}


const supabase = createClient(
  supabaseUrl,
  supabaseKey
);


module.exports = supabase;
