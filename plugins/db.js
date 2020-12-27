"use strict";

const fp = require("fastify-plugin");
const pgp = require("pg-promise")();
const appConfig = require("../config/appConfig");

module.exports = fp(async function (fastify, opts) {
  const db = pgp(appConfig.postgresUri);

  fastify.decorate("db", db);
});
