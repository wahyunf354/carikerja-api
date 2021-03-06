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
        required: ["name", "category", "link", "description"],
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
      reply.code(200).send({ status: 200, data: newEmployer });
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
    handler: async (request, reply) => {
      const data = await employerDal.getAllEmployer();
      reply.code(200).send({ status: 200, data });
    },
  });

  fastify.route({
    url: "/:id",
    method: "GET",
    schema: {
      tags: ["Employer"],
      description: ["Get one employer"],
      params: {
        type: "object",
        required: ["id"],
        properties: {
          id: { type: "number" },
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
      const { id } = request.params;
      const data = await employerDal.getEmployerById(id);

      reply.code(200).send({ status: 200, data });
    },
  });

  fastify.route({
    url: "/:id",
    method: "PUT",
    schema: {
      tags: ["Employer"],
      description: "Endpoint to update data employer",
      params: {
        type: "object",
        properties: {
          id: { type: "number" },
        },
      },
      body: {
        type: "object",
        required: ["name", "category", "link", "description"],
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
      const { id } = request.params;
      const { body } = request;
      const data = await employerDal.updateEmployer(id, body);

      reply.code(200).send({ status: 200, data });
    },
  });

  fastify.route({
    url: "/:id",
    method: "DELETE",
    schema: {
      tags: ["Employer"],
      description: "Delete data employer",
      params: {
        type: "object",
        required: ["id"],
        properties: {
          id: {
            type: "number",
          },
        },
      },
      response: {
        200: {
          type: "object",
          properties: {
            status: {
              type: "number",
            },
            message: {
              type: "string",
            },
          },
        },
      },
    },
    handler: async (request, reply) => {
      const { id } = request.params;
      const message = await employerDal.deleteEmployerById(id);

      reply.code(204).send({ status: 204, ...message });
    },
  });
};
