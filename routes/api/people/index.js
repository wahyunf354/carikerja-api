"use strict";
const PeopleDal = require("./peopleDal");

module.exports = async function (fastify) {
  const peopleDal = PeopleDal(fastify.db);

  const schemaPeopleData = {
    type: "object",
    properties: {
      id: { type: "number" },
      name: { type: "string" },
      status: { type: "string" },
      role: { type: "string" },
      location: { type: "string" },
      status: { type: "string" },
      hired: { type: "boolean" },
      tech_stack: {
        type: "array",
        items: {
          type: "string",
        },
      },
      social_media: {
        type: "object",
        properties: {
          Linkedin: { type: "string" },
          Github: { type: "string" },
        },
      },
    },
  };

  // get all people
  fastify.route({
    url: "/",
    method: "GET",
    schema: {
      tags: ["People"],
      description: "Endpoint get data people",
      response: {
        200: {
          type: "object",
          properties: {
            status: {
              type: "number",
            },
            data: {
              description: "Successful response",
              type: "array",
              items: schemaPeopleData,
            },
          },
        },
      },
    },
    handler: async (request, reply) => {
      const result = await peopleDal.getAllPeople();
      reply.code(200).send(result);
    },
  });

  fastify.route({
    url: "/:id",
    method: "GET",
    schema: {
      tags: ["People"],
      description: "Endpoint to get data people by id",
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
            data: {
              description: "Successful response",
              ...schemaPeopleData,
            },
          },
        },
      },
    },
    handler: async (request, reply) => {
      const { id } = request.params;
      const resultGet = await peopleDal.getPeopleById(id);

      reply.code(200).send({ status: 200, data: resultGet[0] });
    },
  });

  // create data people
  fastify.route({
    url: "/",
    method: "POST",
    schema: {
      tags: ["People"],
      description: "Endpoint to add data people",
      body: {
        type: "object",
        required: ["name", "status", "role", "tech_stack", "social_media"],
        properties: {
          name: { type: "string" },
          status: { type: "string" },
          role: { type: "string" },
          hired: { type: "boolean" },
          tech_stack: {
            type: "array",
            items: {
              type: "string",
            },
          },
          social_media: {
            type: "object",
            properties: {
              Linkedin: { type: "string" },
              Github: { type: "string" },
            },
          },
        },
      },
      response: {
        200: {
          type: "object",
          properties: {
            status: { type: "number" },
            data: schemaPeopleData,
          },
        },
      },
    },
    handler: async (request, reply) => {
      const data = request.body;
      const result = await peopleDal.createPeople(data);
      reply.code(200).send(result);
    },
  });

  // update data people
  fastify.route({
    url: "/:id",
    method: "PUT",
    schema: {
      tags: ["People"],
      description: "Endpoint to update data people",
      params: {
        type: "object",
        required: ["id"],
        properties: {
          id: {
            type: "number",
          },
        },
      },
      body: schemaPeopleData,
      response: {
        200: {
          type: "object",
          properties: {
            status: { type: "number" },
            data: schemaPeopleData,
          },
        },
      },
    },
    handler: async (request, reply) => {
      const data = request.body;
      const { id } = request.params;
      const resultUpdate = await peopleDal.updatePeople(id, data);
      reply.code(200).send({ status: 200, data: resultUpdate });
    },
  });

  fastify.route({
    url: "/:id",
    method: "DELETE",
    schema: {
      tags: ["People"],
      description: "Endpoint to delete data people - WARNING - PERMANEND",
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
            status: { type: "number" },
            message: { type: "string" },
          },
        },
      },
    },
    handler: async (request, reply) => {
      const { id } = request.params;
      const resultDelete = await peopleDal.deletePeople(id);

      reply.code(204).send({ status: 204, ...resultDelete });
    },
  });
};
