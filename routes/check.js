"use strict";

module.exports = async function (fastify, opts) {
  fastify.route({
    url: "/",
    // TODO: make schema
    method: "GET",
    handler: (request, reply) => {
      return { status: "OK", date: Date.now() };
    },
  });
};
