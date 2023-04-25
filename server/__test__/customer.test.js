const app = require("../app");
const { User } = require("../models");
const request = require("supertest");

const user = {
  username: "test",
  email: "test@mail.com",
  password: "test",
  phoneNumber: "test",
  address: "test",
};

const login = {
  email: "test@mail.com",
  password: "test",
};

const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNjY5Nzk0NzIyfQ.T7UzQCDiTMA5I62h3LiPaf-4BRul0kdKAIX4_DzlzWg"

beforeAll((done) => {
  User.destroy({ truncate: true, cascade: true, restartIdentity: true })
    .then(() => {
      done();
    })
    .catch((error) => {
      done(error);
    });
});

afterAll((done) => {
  User.destroy({ truncate: true, cascade: true, restartIdentity: true })
    .then(() => {
      done();
    })
    .catch((error) => {
      done(error);
    });
});

describe("POST /register - register new user with customer role", () => {
  test("201 - Created | Should return new user", (done) => {
    request(app)
      .post("/customer/register")
      .send(user)
      .end((error, response) => {
        if (error) return done(error);
        const { status, body } = response;

        expect(status).toBe(201);
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("email", user.email);
        return done();
      });
  });

  test("400 - Bad Request | Should return error if email is null", (done) => {
    request(app)
      .post("/customer/register")
      .send({
        username: "test1",
        password: "test",
        phoneNumber: "test",
        address: "test",
      })
      .end((error, response) => {
        if (error) return done(error);
        const { status, body } = response;

        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Email required");
        return done();
      });
  });

  test("400 - Bad Request | Should return error if email is empty", (done) => {
    request(app)
      .post("/customer/register")
      .send({
        email: "",
        username: "test1",
        password: "test",
        phoneNumber: "test",
        address: "test",
      })
      .end((error, response) => {
        if (error) return done(error);
        const { status, body } = response;

        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Email required");
        return done();
      });
  });

  test("400 - Bad Request | Should return error if email format is invalid", (done) => {
    request(app)
      .post("/customer/register")
      .send({
        email: "email",
        username: "test1",
        password: "test",
        phoneNumber: "test",
        address: "test",
      })
      .end((error, response) => {
        if (error) return done(error);
        const { status, body } = response;

        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Invalid email format");
        return done();
      });
  });

  test("400 - Bad Request | Should return error if username is null", (done) => {
    request(app)
      .post("/customer/register")
      .send({
        email: "test@mail.com",
        password: "test",
        phoneNumber: "test",
        address: "test",
      })
      .end((error, response) => {
        if (error) return done(error);
        const { status, body } = response;

        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Username required");
        return done();
      });
  });

  test("400 - Bad Request | Should return error if username is empty", (done) => {
    request(app)
      .post("/customer/register")
      .send({
        username: "",
        email: "test@mail.com",
        password: "test",
        phoneNumber: "test",
        address: "test",
      })
      .end((error, response) => {
        if (error) return done(error);
        const { status, body } = response;

        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Username required");
        return done();
      });
  });

  test("400 - Bad Request | Should return error if email is already used", (done) => {
    request(app)
      .post("/customer/register")
      .send(user)
      .end((error, response) => {
        if (error) return done(error);
        const { status, body } = response;

        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Username already used!");
        return done();
      });
  });

  test("400 - Bad Request | Should return error if password is null", (done) => {
    request(app)
      .post("/customer/register")
      .send({
        username: "test",
        email: "test@mail.com",
        phoneNumber: "test",
        address: "test",
      })
      .end((error, response) => {
        if (error) return done(error);
        const { status, body } = response;

        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Password required");
        return done();
      });
  });

  test("400 - Bad Request | Should return error if password is empty", (done) => {
    request(app)
      .post("/customer/register")
      .send({
        username: "test",
        email: "test@mail.com",
        password: "",
        phoneNumber: "test",
        address: "test",
      })
      .end((error, response) => {
        if (error) return done(error);
        const { status, body } = response;

        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Password required");
        return done();
      });
  });
});

describe("POST /login", () => {
  test("200 - OK | Should return access token", (done) => {
    request(app)
      .post("/customer/login")
      .send(login)
      .end((error, response) => {
        if (error) return done(error);
        const { status, body } = response;

        expect(status).toBe(200);
        expect(body).toHaveProperty("access_token", expect.any(String));
        return done();
      });
  });

  test("400 - Bad Request | Should return error if email is null", (done) => {
    request(app)
      .post("/customer/login")
      .send({
        password: "test",
      })
      .end((error, response) => {
        if (error) return done(error);
        const { status, body } = response;

        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "email required");
        return done();
      });
  });

  test("400 - Bad Request | Should return error if email is empty", (done) => {
    request(app)
      .post("/customer/login")
      .send({
        email: "",
        password: "test",
      })
      .end((error, response) => {
        if (error) return done(error);
        const { status, body } = response;

        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "email required");
        return done();
      });
  });

  test("400 - Bad Request | Should return error if password is null", (done) => {
    request(app)
      .post("/customer/login")
      .send({
        email: "test@mail.com",
      })
      .end((error, response) => {
        if (error) return done(error);
        const { status, body } = response;

        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "password required");
        return done();
      });
  });

  test("400 - Bad Request | Should return error if password is empty", (done) => {
    request(app)
      .post("/customer/login")
      .send({
        email: "test@mail.com",
        password: "",
      })
      .end((error, response) => {
        if (error) return done(error);
        const { status, body } = response;

        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "password required");
        return done();
      });
  });

  test("401 - Unauthorized | Should return error if email is invalid", (done) => {
    request(app)
      .post("/customer/login")
      .send({
        email: "test123@mail.com",
        password: "test",
      })
      .end((error, response) => {
        if (error) return done(error);
        const { status, body } = response;

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "invalid email or password");
        return done();
      });
  });

  test("401 - Unauthorized | Should return error if password is invalid", (done) => {
    request(app)
      .post("/customer/login")
      .send({
        email: "test@mail.com",
        password: "test123",
      })
      .end((error, response) => {
        if (error) return done(error);
        const { status, body } = response;

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "invalid email or password");
        return done();
      });
  });
});

describe("GET /username", () => {});

// describe("GET /food", () => {});
