const express = require("express");
const prisma = require("../db");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.use(requireAuth);

router.get("/", async (req, res) => {
  const items = await prisma.cartItem.findMany({
    where: { userId: req.userId },
    include: { product: true },
    orderBy: { id: "asc" },
  });
  res.json(items);
});

router.post("/", async (req, res) => {
  const { productId, quantity } = req.body || {};
  const pid = Number(productId);
  const qty = Number(quantity) > 0 ? Number(quantity) : 1;
  if (!pid) return res.status(400).json({ error: "productId required" });

  const product = await prisma.product.findUnique({ where: { id: pid } });
  if (!product) return res.status(404).json({ error: "Product not found" });

  const item = await prisma.cartItem.upsert({
    where: { userId_productId: { userId: req.userId, productId: pid } },
    create: { userId: req.userId, productId: pid, quantity: qty },
    update: { quantity: { increment: qty } },
    include: { product: true },
  });
  res.status(201).json(item);
});

router.patch("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const quantity = Number(req.body?.quantity);
  if (!id || !quantity || quantity < 1) {
    return res.status(400).json({ error: "Invalid id or quantity" });
  }
  const existing = await prisma.cartItem.findUnique({ where: { id } });
  if (!existing || existing.userId !== req.userId) {
    return res.status(404).json({ error: "Cart item not found" });
  }
  const updated = await prisma.cartItem.update({
    where: { id },
    data: { quantity },
    include: { product: true },
  });
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: "Invalid id" });
  const existing = await prisma.cartItem.findUnique({ where: { id } });
  if (!existing || existing.userId !== req.userId) {
    return res.status(404).json({ error: "Cart item not found" });
  }
  await prisma.cartItem.delete({ where: { id } });
  res.json({ ok: true });
});

module.exports = router;
