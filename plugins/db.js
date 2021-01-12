"use strict";

const fp = require("fastify-plugin");
const pgp = require("pg-promise")({
  capSQL: true,
});
const appConfig = require("../config/appConfig");
const DbMigrate = require("db-migrate");

function runMigration() {
  return new Promise((resolve, reject) => {
    const dbMigrate = DbMigrate.getInstance(true);

    dbMigrate.silence(true);

    dbMigrate.up((error, result = []) => {
      if (error) {
        return reject(error);
      }

      return resolve(result);
    });
  });
}

module.exports = fp(async function (fastify, opts) {
  const db = pgp(appConfig.postgresUri);

  fastify.decorate("db", db).addHook("onClose", async (instance, done) => {
    await db.$pool.end();
    done();
  });

  const migrationResult = await runMigration();

  if (migrationResult.length > 0) {
    fastify.log.info({
      migrationCount: migrationResult.length,
      msg: "Successful migrations run",
    });
  }
});
