"use strict";

module.exports = async function (fastify, opts) {
  const schemaPeopleData = {
    type: "object",
    properties: {
      id: { type: "number" },
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
      sosial_media: {
        type: "object",
        properties: {
          Linkedin: { type: "string" },
          Github: { type: "string" },
        },
      },
    },
  };

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
    handler: (request, reply) => {
      return {
        status: 200,
        data: [
          {
            id: 1,
            name: "Lelianto Eko Pradana",
            status: "Fulltime",
            role: "Front End Web Developer",
            location: "Jakarta",
            social_media: {
              Linkedin: "https://www.linkedin.com/in/lelianto1/",
              Github: "https://github.com/Lelianto",
            },
            tech_stack: [
              "React.js",
              "Nuxt.js",
              "Python",
              "Flask",
              "Javascript",
            ],
            hired: true,
          },
        ],
      };
    },
  });

  fastify.route({
    url: "/",
    method: "POST",
    schema: {
      tags: ["People"],
      description: "Endpoint to add data people",
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
    handler: (request, reply) => {
      return {
        status: 204,
        data: {
          name: "Lelianto Eko Pradana",
          status: "Fulltime",
          role: "Front End Web Developer",
          location: "Jakarta",
          social_media: {
            Linkedin: "https://www.linkedin.com/in/lelianto1/",
            Github: "https://github.com/Lelianto",
          },
          tech_stack: ["React.js", "Nuxt.js", "Python", "Flask", "Javascript"],
          hired: false,
        },
      };
    },
  });

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
    handler: (request, replay) => {
      return {
        status: 200,
        data: {
          name: "Lelianto Eko Pradana",
          status: "Fulltime",
          role: "Front End Web Developer",
          location: "Jakarta",
          social_media: {
            Linkedin: "https://www.linkedin.com/in/lelianto1/",
            Github: "https://github.com/Lelianto",
          },
          tech_stack: ["React.js", "Nuxt.js", "Python", "Flask", "Javascript"],
          hired: false,
        },
      };
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
    handler: (request, replay) => {
      return {
        status: 204,
        message: "Successful delete schema",
      };
    },
  });
};
