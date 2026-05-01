const express = require("express");
const prisma = require("../db");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.use(requireAuth);

router.post("/", async (req, res) => {
  const items = await prisma.cartItem.findMany({
    where: { userId: req.userId },
    include: { product: true },
  });
  if (items.length === 0) {
    return res.status(400).json({ error: "Cart is empty" });
  }
  const total = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0,
  );

  const order = await prisma.$transaction(async (tx) => {
    const created = await tx.order.create({
      data: {
        userId: req.userId,
        total,
        status: "PAID",
        items: {
          create: items.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
            priceAtPurchase: i.product.price,
          })),
        },
      },
      include: { items: { include: { product: true } } },
    });
    await tx.cartItem.deleteMany({ where: { userId: req.userId } });
    return created;
  });

  res.status(201).json(order);
});

router.get("/orders", async (req, res) => {
  const orders = await prisma.order.findMany({
    where: { userId: req.userId },
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });
  res.json(orders);
});

module.exports = router;
