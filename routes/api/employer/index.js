"use strict";
const EmployerDal = require("./employerDal");

module.exports = async function (fastify) {
  const employerDal = EmployerDal(fastify.db);

  fastify.route({
    url: "/",
    method: "POST",
    schema: {
      tags: ["Employer"],
      description: "Enpoint to add a employer",
      body: {
        type: "object",
        properties: {
          name: { type: "string" },
          category: { type: "string" },
          link: { type: "string" },
          description: { type: "string" },
        },
      },
      response: {
        200: {
          type: "object",
          properties: {
            status: { type: "number" },
            data: {
              type: "object",
              properties: {
                id: { type: "number" },
                name: { type: "string" },
                category: { type: "string" },
                link: { type: "string" },
                description: { type: "string" },
              },
            },
          },
        },
      },
    },
    handler: async (request, reply) => {
      const data = request.body;
      const newEmployer = await employerDal.createEmployer(data);
      reply.send({ status: 200, data: newEmployer });
    },
  });

  fastify.route({
    url: "/",
    method: "GET",
    schema: {
      tags: ["Employer"],
      description: "Get all employer",
      response: {
        200: {
          type: "object",
          properties: {
            status: { type: "number" },
            data: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "number" },
                  name: { type: "string" },
                  category: { type: "string" },
                  link: { type: "string" },
                  description: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
    handler: async () => {
      const data = await employerDal.getAllEmployer();
      return { status: 200, data: data };
    },
  });
};
