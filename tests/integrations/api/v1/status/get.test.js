test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody).toBeDefined();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  const postgresVersion = responseBody.dependecies.database.postgres_version;
  expect(postgresVersion).toBeDefined();
  expect(postgresVersion).toBe("16.8");

  const maxConnections = responseBody.dependecies.database.max_connections;
  expect(maxConnections).toBeDefined();
  expect(maxConnections).toBe(100);

  const openedConnections =
    responseBody.dependecies.database.opened_connections;
  expect(openedConnections).toBeDefined();
  expect(openedConnections).toBe(1);
});
