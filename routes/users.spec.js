const { describe, it, expect, beforeAll } = require("@jest/globals");
const request = require("supertest");

const app = require("../app");
const sequelize = require("../database/sequelize");

beforeAll(async () => {
  await sequelize.sync();
});

describe("users", () => {
  it("should create a new user successfully", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        name: "Gabriel Colle",
        email: "gabrielcolle3@hotmail.com",
        password: "senha123",
      })
      .accept("application/json")
      .expect("Content-Type", "application/json; charset=utf-8");

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      id: 1,
      name: "Gabriel Colle",
      email: "gabrielcolle3@hotmail.com",
      created_at: expect.any(String),
      updated_at: expect.any(String),
    });
  });
});
