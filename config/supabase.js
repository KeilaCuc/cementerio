import postgres from "postgres";

const connectionString = process.env.SUPABASE_URL;

if (!connectionString) {
  console.error("❌ SUPABASE_URL no está configurada");
  process.exit(1);
}

console.log("🔗 Configurando conexión para Render...");

// Configuración optimizada para Render que resuelve problemas IPv6
const sql = postgres(connectionString, {
  // Configuración SSL requerida
  ssl: "require",
  // Reducir conexiones para hosting
  max: 3,
  // Timeouts ajustados para servicios en la nube
  idle_timeout: 0,
  max_lifetime: 60 * 5, // 5 minutos
  connect_timeout: 60,
  // Desactivar prepared statements para mejor compatibilidad
  prepare: false,
  // Configuración de conexión
  connection: {
    application_name: "render-cementerio",
  },
});

// Test de conexión con mejor manejo de errores
sql`SELECT 1 as test`
  .then(() => console.log("✅ Conexión a Supabase exitosa"))
  .catch((err) => {
    console.error("❌ Error de conexión a Supabase:", err.message);
    // No terminar el proceso, solo registrar el error
  });

export default sql;
