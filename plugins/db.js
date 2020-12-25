"use strict";

const fp = require("fastify-plugin");

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope
// TODO: DB Connect
module.exports = fp(async function (fastify, opts) {
  fastify.decorate("db", function () {
    return "db";
  });
});
