const fastify = require("fastify");
const app = require("../app");
const fp = require("fastify-plugin");

const clearDatabaseSql = "DELETE FROM tb_employer;DELETE FROM tb_people;";

module.exports = function setupEnvTest() {
  // setup envaronment test
  process.env.POSTGRES_URL =
    "postgres://carikerja_admin:localhost@localhost:54/carikerja_db_test";

  // setup fastify server
  const server = fastify({
    logger: {
      level: process.env.LOG_LEVEL || "silent",
    },
    pluginTimeout: 2 * 60 * 1000,
  });

  // setup test lifecycle hooks
  beforeAll(async () => {
    server.register(fp(app));
    await server.ready();
    await server.db.query(clearDatabaseSql);
  });

  beforeEach(async () => {
    await server.db.query(clearDatabaseSql);
  });

  afterEach(async () => {
    await server.db.query(clearDatabaseSql);
  });

  afterAll(async () => {
    await server.close();
  });

  // return aur fastify server
  return server;
};
