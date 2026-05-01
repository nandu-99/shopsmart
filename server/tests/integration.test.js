const request = require("supertest");
const app = require("../src/app");
const prisma = require("../src/db");

const ts = Date.now();
const email = `it-user-${ts}@test.local`;
const password = "supersecret";
let token;
let productId;

beforeAll(async () => {
  // Ensure at least one product exists for cart/checkout tests
  const existing = await prisma.product.findFirst();
  if (existing) {
    productId = existing.id;
  } else {
    const created = await prisma.product.create({
      data: {
        name: "IT Test Product",
        price: 9.99,
        image: "https://placehold.co/400",
        description: "integration",
        category: "Men",
        stock: 100,
      },
    });
    productId = created.id;
  }
});

afterAll(async () => {
  await prisma.user.deleteMany({ where: { email } });
  await prisma.$disconnect();
});

describe("Integration: register → login → cart → checkout", () => {
  it("registers a new user and returns a token", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ email, password, name: "IT Tester" });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
    expect(res.body.user).toMatchObject({ email, name: "IT Tester" });
    token = res.body.token;
  });

  it("rejects duplicate registration", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ email, password, name: "IT Tester" });
    expect(res.statusCode).toBe(409);
  });

  it("logs in with correct credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email, password });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("rejects login with wrong password", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email, password: "wrong" });
    expect(res.statusCode).toBe(401);
  });

  it("returns the authenticated user via /api/auth/me", async () => {
    const res = await request(app)
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe(email);
  });

  it("lists products without auth", async () => {
    const res = await request(app).get("/api/products");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("filters products by category via search", async () => {
    const res = await request(app).get("/api/products?search=Men");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("adds an item to the cart", async () => {
    const res = await request(app)
      .post("/api/cart")
      .set("Authorization", `Bearer ${token}`)
      .send({ productId, quantity: 2 });
    expect(res.statusCode).toBe(201);
    expect(res.body.quantity).toBe(2);
  });

  it("retrieves the cart with the item", async () => {
    const res = await request(app)
      .get("/api/cart")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].productId).toBe(productId);
  });

  it("checks out and creates an order", async () => {
    const res = await request(app)
      .post("/api/checkout")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe("PAID");
    expect(res.body.items.length).toBeGreaterThan(0);
  });

  it("returns 400 when checking out an empty cart", async () => {
    const res = await request(app)
      .post("/api/checkout")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(400);
  });

  it("lists order history", async () => {
    const res = await request(app)
      .get("/api/checkout/orders")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
