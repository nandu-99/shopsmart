const request = require("supertest");
const app = require("../src/app");

describe("GET /api/health", () => {
  it("should return 200 and status ok", async () => {
    const res = await request(app).get("/api/health");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("status", "ok");
  });
});

describe("Protected routes without token", () => {
  it("GET /api/cart should return 401", async () => {
    const res = await request(app).get("/api/cart");
    expect(res.statusCode).toEqual(401);
  });

  it("POST /api/checkout should return 401", async () => {
    const res = await request(app).post("/api/checkout");
    expect(res.statusCode).toEqual(401);
  });
});

describe("Auth validation", () => {
  it("POST /api/auth/login without body returns 400", async () => {
    const res = await request(app).post("/api/auth/login").send({});
    expect(res.statusCode).toEqual(400);
  });

  it("POST /api/auth/register without body returns 400", async () => {
    const res = await request(app).post("/api/auth/register").send({});
    expect(res.statusCode).toEqual(400);
  });
});
