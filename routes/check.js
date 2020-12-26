"use strict";

module.exports = async function (fastify, opts) {
  fastify.route({
    url: "/",
    schema: {
      tags: ["Healty Check"],
      description: "Endpoint check API",
      response: {
        200: {
          type: "object",
          properties: {
            status: { type: "string" },
            date: { type: "string", format: "date-time" },
          },
        },
      },
    },
    method: "GET",
    handler: (request, reply) => {
      return { status: "OK", date: new Date().toISOString() };
    },
  });
};
