const { expectUncaughtException } = require("tap");

const fastify = require("../setupEnvTest")();

describe("POST", () => {
  test("success a post with body complete", async () => {
    const requestPayload = {
      name: "Warung Pintar",
      category: "retail-technology",
      link: "https://warungpintar.co.id/karir/",
      description:
        "Warung Pintar adalah perusahaan teknologi yang mentransformasi warung di Indonesia. Kami menyediakan program yang memungkinkan Juragan terus bertumbuh sesuai dengan jenis usahanya.",
    };

    const serverResponse = await fastify.inject({
      method: "POST",
      url: "/api/employer",
      payload: requestPayload,
    });

    expect(serverResponse.statusCode).toEqual(200);
    expect(serverResponse.json().data.name).toEqual(requestPayload.name);
    expect(serverResponse.json().data.category).toEqual(
      requestPayload.category
    );
    expect(serverResponse.json().data.link).toEqual(requestPayload.link);
    expect(serverResponse.json().data.description).toEqual(
      requestPayload.description
    );
  });

  test("success a post with properties null", async () => {
    const requestPayload = {
      name: "Warung Pintar",
      category: null,
      link: "https://warungpintar.co.id/karir/",
      description:
        "Warung Pintar adalah perusahaan teknologi yang mentransformasi warung di Indonesia. Kami menyediakan program yang memungkinkan Juragan terus bertumbuh sesuai dengan jenis usahanya.",
    };

    const serverResponse = await fastify.inject({
      method: "POST",
      url: "/api/employer",
      payload: requestPayload,
    });

    expect(serverResponse.statusCode).toEqual(200);
    expect(serverResponse.json().data.name).toEqual(requestPayload.name);
    expect(serverResponse.json().data.link).toEqual(requestPayload.link);
    expect(serverResponse.json().data.description).toEqual(
      requestPayload.description
    );
  });

  test("success handle error a post with one properties nothing", async () => {
    const requestPayload = {
      name: "Warung Pintar",
      category: "retail-technology",
      link: "https://warungpintar.co.id/karir/",
    };

    const serverResponse = await fastify.inject({
      method: "POST",
      url: "/api/employer",
      payload: requestPayload,
    });

    expect(serverResponse.statusCode).toEqual(400);
    expect(serverResponse.json().message).toEqual(
      "body should have required property 'description'"
    );
    expect(serverResponse.json().error).toEqual("Bad Request");
  });
});

describe("GET All", () => {
  test.todo("success a get all employer");
});

describe("GET one employer", () => {
  test.todo("success a get one employer");
});

describe("PUT", () => {
  test.todo("success a update a employer");
});
