const fastify = require("../setupEnvTest")();

describe("POST data People", () => {
  test("with full properties object body", async () => {
    const requestPayload = {
      name: "Lelianto Eko Pradana",
      status: "Fulltime",
      role: "Front End Web Developer",
      location: "Jakarta",
      social_media: {
        Linkedin: "https://www.linkedin.com/in/lelianto1/",
        Github: "https://github.com/Lelianto",
      },
      tech_stack: ["React.js", "Nuxt.js", "Python", "Flask", "Javascript"],
    };

    const serverResponse = await fastify.inject({
      method: "POST",
      url: "/api/people",
      payload: requestPayload,
    });

    expect(serverResponse.json().data.tech_stack).toContain(
      requestPayload.tech_stack[0]
    );
    expect(serverResponse.json().status).toEqual(200);
    expect(serverResponse.json().data.name).toEqual(requestPayload.name);
    expect(serverResponse.json().data.status).toEqual(requestPayload.status);
    expect(serverResponse.json().data.role).toEqual(requestPayload.role);
    expect(serverResponse.json().data.location).toEqual(
      requestPayload.location
    );
    expect(serverResponse.json().data.social_media.Github).toEqual(
      requestPayload.social_media.Github
    );
    expect(serverResponse.json().data.social_media.Linkedin).toEqual(
      requestPayload.social_media.Linkedin
    );
    expect(serverResponse.json().data.hired).toBeFalsy();
  });

  test("with an properties body id null", async () => {
    const requestPayload = {
      name: "Lelianto Eko Pradana",
      role: "Front End Web Developer",
      status: null,
      location: "Jakarta",
      social_media: {
        Linkedin: "https://www.linkedin.com/in/lelianto1/",
        Github: "https://github.com/Lelianto",
      },
      tech_stack: ["React.js", "Nuxt.js", "Python", "Flask", "Javascript"],
    };

    const serverResponse = await fastify.inject({
      method: "POST",
      url: "/api/people",
      payload: requestPayload,
    });

    expect(serverResponse.json().data.tech_stack).toContain(
      requestPayload.tech_stack[0]
    );
    expect(serverResponse.statusCode).toEqual(200);
    expect(serverResponse.json().data.name).toEqual(requestPayload.name);
    expect(serverResponse.json().data.status).toEqual("");
    expect(serverResponse.json().data.role).toEqual(requestPayload.role);
    expect(serverResponse.json().data.location).toEqual(
      requestPayload.location
    );
    expect(serverResponse.json().data.social_media.Github).toEqual(
      requestPayload.social_media.Github
    );
    expect(serverResponse.json().data.social_media.Linkedin).toEqual(
      requestPayload.social_media.Linkedin
    );
    expect(serverResponse.json().data.hired).toBeFalsy();
  });

  test("Handle error if a request body not compelate", async () => {
    const requestPayload = {
      name: "Lelianto Eko Pradana",
      role: "Front End Web Developer",
      location: "Jakarta",
      social_media: {
        Linkedin: "https://www.linkedin.com/in/lelianto1/",
        Github: "https://github.com/Lelianto",
      },
      tech_stack: ["React.js", "Nuxt.js", "Python", "Flask", "Javascript"],
    };

    const serverResponse = await fastify.inject({
      method: "POST",
      url: "/api/people",
      payload: requestPayload,
    });
    expect(serverResponse.json().statusCode).toEqual(400);
    expect(serverResponse.json().message).toEqual(
      "body should have required property 'status'"
    );
  });
});

describe("GET data all People", () => {
  test("test status code 200", async () => {
    const serverResponse = await fastify.inject({
      method: "GET",
      url: "/api/people",
    });
    expect(serverResponse.statusCode).toEqual(200);
  });

  test("return array", async () => {
    const requestPayload = {
      name: "Lelianto Eko Pradana",
      status: "Fulltime",
      role: "Front End Web Developer",
      location: "Jakarta",
      social_media: {
        Linkedin: "https://www.linkedin.com/in/lelianto1/",
        Github: "https://github.com/Lelianto",
      },
      tech_stack: ["React.js", "Nuxt.js", "Python", "Flask", "Javascript"],
    };

    await fastify.inject({
      method: "POST",
      url: "/api/people",
      payload: requestPayload,
    });

    const serverResponse = await fastify.inject({
      method: "GET",
      url: "/api/people",
    });
    expect(serverResponse.json().data[0].name).toEqual(requestPayload.name);
    expect(serverResponse.json().data[0].id).toBeDefined();
  });
});

describe("UPDATE endpoint people", () => {
  test("update hired properties", async () => {
    const requestPayload = {
      name: "Lelianto Eko Pradana",
      status: "Fulltime",
      role: "Front End Web Developer",
      location: "Jakarta",
      social_media: {
        Linkedin: "https://www.linkedin.com/in/lelianto1/",
        Github: "https://github.com/Lelianto",
      },
      tech_stack: ["React.js", "Nuxt.js", "Python", "Flask", "Javascript"],
    };

    const requestPayloadUpdate = {
      name: "Lelianto Eko Pradana",
      status: "Fulltime",
      role: "Front End Web Developer",
      location: "Medan",
      social_media: {
        Linkedin: "https://www.linkedin.com/in/lelianto1/",
        Github: "https://github.com/Lelianto",
      },
      hired: true,
      tech_stack: [
        "React.js",
        "Nuxt.js",
        "Python",
        "Flask",
        "Javascript",
        "GoLang",
      ],
    };

    const postResponse = await fastify.inject({
      method: "POST",
      url: "/api/people",
      payload: requestPayload,
    });

    const serverResponse = await fastify.inject({
      method: "PUT",
      url: `/api/people/${Number(postResponse.json().data.id)}`,
      payload: requestPayloadUpdate,
    });

    expect(serverResponse.statusCode).toEqual(200);
    expect(serverResponse.json().data.hired).toBeTruthy;
  });

  test("update location and tech_stack properties", async () => {
    const requestPayload = {
      name: "Lelianto Eko Pradana",
      status: "Fulltime",
      role: "Front End Web Developer",
      location: "Jakarta",
      social_media: {
        Linkedin: "https://www.linkedin.com/in/lelianto1/",
        Github: "https://github.com/Lelianto",
      },
      tech_stack: ["React.js", "Nuxt.js", "Python", "Flask", "Javascript"],
    };

    const requestPayloadUpdate = {
      name: "Lelianto Eko Pradana",
      status: "Fulltime",
      role: "Front End Web Developer",
      location: "Medan",
      social_media: {
        Linkedin: "https://www.linkedin.com/in/lelianto1/",
        Github: "https://github.com/Lelianto",
      },
      hired: false,
      tech_stack: [
        "React.js",
        "Nuxt.js",
        "Python",
        "Flask",
        "Javascript",
        "GoLang",
      ],
    };

    const postResponse = await fastify.inject({
      method: "POST",
      url: "/api/people",
      payload: requestPayload,
    });

    const serverResponse = await fastify.inject({
      method: "PUT",
      url: `/api/people/${Number(postResponse.json().data.id)}`,
      payload: requestPayloadUpdate,
    });

    expect(serverResponse.statusCode).toEqual(200);
    expect(serverResponse.json().data.location).toEqual(
      requestPayloadUpdate.location
    );
    expect(serverResponse.json().data.tech_stack).toContain("GoLang");
  });
});

describe("DELETE endpoint people", () => {
  test("delete a people", async () => {
    const requestPayload = {
      name: "Lelianto Eko Pradana",
      status: "Fulltime",
      role: "Front End Web Developer",
      location: "Jakarta",
      social_media: {
        Linkedin: "https://www.linkedin.com/in/lelianto1/",
        Github: "https://github.com/Lelianto",
      },
      tech_stack: ["React.js", "Nuxt.js", "Python", "Flask", "Javascript"],
    };

    const postResponse = await fastify.inject({
      method: "POST",
      url: "/api/people",
      payload: requestPayload,
    });

    const serverResponse = await fastify.inject({
      method: "DELETE",
      url: `/api/people/${Number(postResponse.json().data.id)}`,
    });

    expect(serverResponse.statusMessage).toEqual("OK");
    expect(serverResponse.json().message).toEqual("Successful delete schema");
    expect(serverResponse.json().status).toEqual(204);
  });
});
