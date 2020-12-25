"use strict";

module.exports = async function (fastify, opts) {
  fastify.route({
    url: "/",
    method: "GET",
    schema: {
      tags: ["People"],
      description: "Endpoint get data people",
      response: {
        200: {
          description: "Successful response",
          type: "array",
          items: {
            type: "object",
            properties: {
              name: { type: "string" },
              status: { type: "string" },
              role: { type: "string" },
              location: { type: "string" },
              social_media: {
                type: "object",
                properties: {
                  Linkedin: { type: "string" },
                  Github: { type: "string" },
                },
              },
              tech_stack: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              hired: {
                type: "boolean",
              },
            },
          },
        },
      },
    },
    handler: (request, reply) => {
      return [
        {
          name: "Lelianto Eko Pradana",
          status: "Fulltime",
          role: "Front End Web Developer",
          location: "Jakarta",
          social_media: {
            Linkedin: "https://www.linkedin.com/in/lelianto1/",
            Github: "https://github.com/Lelianto",
          },
          tech_stack: ["React.js", "Nuxt.js", "Python", "Flask", "Javascript"],
          hired: true,
        },
      ];
    },
  });

  fastify.route({
    url: "/",
    method: "POST",
    // TODO: please complite a schema
    schema: {
      tags: ["People"],
      description: "Endpoint to add data people",
      body: {
        type: "object",
        properties: {
          name: { type: "string" },
        },
      },
    },
    handler: (request, reply) => {
      return { message: "OK" };
    },
  });
};
