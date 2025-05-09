import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const postgresVersion = await database.query("SHOW server_version");
  const parsedVersion = postgresVersion.rows[0].server_version;

  const maxConnections = await database.query("SHOW max_connections");
  const parsedMaxConnections = parseInt(maxConnections.rows[0].max_connections);

  const activeConnections = await database.query(
    "SELECT count(*) FROM pg_stat_activity WHERE state = 'active'",
  );
  const parsedActiveConnections = parseInt(activeConnections.rows[0].count);

  response.status(200).json({
    updated_at: updatedAt,
    postgres_version: parsedVersion,
    max_connections: parsedMaxConnections,
    opened_connections: parsedActiveConnections,
  });
}
export default status;
