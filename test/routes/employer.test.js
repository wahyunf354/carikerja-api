const fastify = require("../setupEnvTest")();

describe("POST", () => {
  test("success a post with body complete", () => {
    const requestPayload = {
      name: "Warung Pintar",
      category: "retail-technology",
      link: "https://warungpintar.co.id/karir/",
      description:
        "Warung Pintar adalah perusahaan teknologi yang mentransformasi warung di Indonesia. Kami menyediakan program yang memungkinkan Juragan terus bertumbuh sesuai dengan jenis usahanya.",
    };

    const serverResponse = await fastify.inject({
      method: "POST",
      url: "/employer",
      payload: requestPayload
    })

    console.warn(serverResponse.json());
  });

  test.todo("success a post with properties null");
  test.todo("success handle error a post with one properties nothing");
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
