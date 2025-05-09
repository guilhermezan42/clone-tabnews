import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const postgresVersion = await database.query("SHOW server_version");
  const parsedVersion = postgresVersion.rows[0].server_version;

  const maxConnections = await database.query("SHOW max_connections");
  const parsedMaxConnections = parseInt(maxConnections.rows[0].max_connections);

  const databaseName = process.env.POSTGRES_DB;

  const openedConnections = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const openedConnectionsValue = openedConnections.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependecies: {
      database: {
        postgres_version: parsedVersion,
        max_connections: parsedMaxConnections,
        opened_connections: openedConnectionsValue,
      },
    },
  });
}
export default status;
