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
  test("success a get all employer", async () => {
    const requestPayload = {
      name: "Warung Pintar",
      category: "retail-technology",
      link: "https://warungpintar.co.id/karir/",
      description:
        "Warung Pintar adalah perusahaan teknologi yang mentransformasi warung di Indonesia. Kami menyediakan program yang memungkinkan Juragan terus bertumbuh sesuai dengan jenis usahanya.",
    };

    await fastify.inject({
      method: "POST",
      url: "/api/employer",
      payload: requestPayload,
    });

    const serverResponse = await fastify.inject({
      method: "GET",
      url: "/api/employer",
    });

    expect(serverResponse.statusCode).toEqual(200);
  });
});

describe("GET one employer", () => {
  test("success a get one employer", async () => {
    const requestPayload = {
      name: "Warung Pintar",
      category: "retail-technology",
      link: "https://warungpintar.co.id/karir/",
      description:
        "Warung Pintar adalah perusahaan teknologi yang mentransformasi warung di Indonesia. Kami menyediakan program yang memungkinkan Juragan terus bertumbuh sesuai dengan jenis usahanya.",
    };

    const postResponse = await fastify.inject({
      method: "POST",
      url: "/api/employer",
      payload: requestPayload,
    });

    const serverResponse = await fastify.inject({
      method: "GET",
      url: `/api/employer/${Number(postResponse.json().data.id)}`,
    });

    expect(serverResponse.statusCode).toEqual(200);
    expect(serverResponse.json().data.name).toEqual(requestPayload.name);
  });
});

describe("PUT", () => {
  test("success a update a employer", async () => {
    const requestPayload = {
      name: "Warung Pintar",
      category: "retail-technology",
      link: "https://warungpintar.co.id/karir/",
      description:
        "Warung Pintar adalah perusahaan teknologi yang mentransformasi warung di Indonesia. Kami menyediakan program yang memungkinkan Juragan terus bertumbuh sesuai dengan jenis usahanya.",
    };

    const postResponse = await fastify.inject({
      method: "POST",
      url: "/api/employer",
      payload: requestPayload,
    });

    const requestPayloadUpdate = {
      name: "Warung Pintar Sekali",
      category: "retail-technology",
      link: "https://warungpintar.co.id/karir/",
      description:
        "Warung Pintar adalah perusahaan teknologi yang mentransformasi warung di Indonesia. Kami menyediakan program yang memungkinkan Juragan terus bertumbuh sesuai dengan jenis usahanya.",
    };

    const serverResponse = await fastify.inject({
      method: "PUT",
      url: `/api/employer/${Number(postResponse.json().data.id)}`,
      payload: requestPayloadUpdate,
    });

    expect(serverResponse.statusCode).toEqual(200);
    expect(serverResponse.json().data.name).toEqual(requestPayloadUpdate.name);
  });
});

describe("DELETE", () => {
  test("should delete data employer", async () => {
    const requestPayload = {
      name: "Warung Pintar",
      category: "retail-technology",
      link: "https://warungpintar.co.id/karir/",
      description:
        "Warung Pintar adalah perusahaan teknologi yang mentransformasi warung di Indonesia. Kami menyediakan program yang memungkinkan Juragan terus bertumbuh sesuai dengan jenis usahanya.",
    };

    const postResponse = await fastify.inject({
      method: "POST",
      url: "/api/employer",
      payload: requestPayload,
    });

    const serverResponse = await fastify.inject({
      method: "DELETE",
      url: `/api/employer/${Number(postResponse.json().data.id)}`,
    });
    expect(serverResponse.statusCode).toEqual(204);
  });
});
