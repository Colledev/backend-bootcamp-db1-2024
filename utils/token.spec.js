const { describe, it, expect, jest } = require("@jest/globals");
const { generateUserToken } = require("./token");
const jwt = require("jsonwebtoken");

describe("token", () => {
  it("should generate token for logged user", () => {
    // 1. Realizo a operação desejada
    const mockUser = {
      name: "Gabriel Colle",
      email: "gabrielcolle3@hotmail.com",
    };
    const token = generateUserToken(mockUser);
    // 2. Verifico se o resultado obtido bate com o esperado
    expect(token).toBeDefined();
    expect(typeof token).toBe("string");
    expect(token.length).toBeGreaterThan(0);
  });
});

it("should if jwt.sign was called when the token is generated", () => {
  const spyJwtSign = jest.spyOn(jwt, "sign");

  const mockUser = {
    name: "Gabriel Colle",
    email: "gabrielcolle3@hotmail.com",
  };
  generateUserToken(mockUser);
  expect(spyJwtSign).toHaveBeenCalledTimes(1);
  expect(spyJwtSign).toHaveBeenCalledWith(mockUser, process.env.JWT_TOKEN, {
    expiresIn: "7d",
  });

  spyJwtSign.mockRestore();
});

it("should return a valid json web token", () => {
  const mockUser = {
    name: "Gabriel Colle",
    email: "gabrielcolle3@hotmail.com",
  };
  const token = generateUserToken(mockUser);

  const payload = jwt.verify(token, process.env.JWT_TOKEN);

  expect(payload).toEqual({
    ...mockUser,
    iat: expect.any(Number),
    exp: expect.any(Number),
  });
});
