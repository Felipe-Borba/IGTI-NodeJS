import pg from "pg";

async function connect() {
  if (global.connection) {
    return global.connection.connect();
  }

  const pool = new pg.pool({
    connectionString:
      "postgres://obwrxdnl:n82rOxHh9I3P2ZU2xjmEobjBQE-KSSe7@tuffi.db.elephantsql.com/obwrxdnl",
  });

  global.connection = pool;

  return pool.connect;
}

export default {
  connect,
};
