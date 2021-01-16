const { expectUncaughtException } = require("tap");

const fastify = require("../setupEnvTest")();

describe("TEST enpoint /", () => {
  test("Return status OK", async () => {
    const serverResponse = await fastify.inject({
      url: "/",
      method: "GET",
    });

    expect(serverResponse.statusCode).toEqual(200);
    expect(serverResponse.json().status).toEqual(200);
  });
});
