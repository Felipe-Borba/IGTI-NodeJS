import pg from "pg";

async function connect() {
  if (global.connection) {
    return global.connection.connect();
  }

  const pool = new pg.Pool({
    connectionString:
      "https://api.elephantsql.com/console/55e57472-0090-49c7-8aa2-b96925f956bf/details",
  });

  global.connection = pool;

  return pool.connect();
}

export default {
  connect,
};
