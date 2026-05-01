const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const products = [
  // ---------- MEN ----------
  {
    name: "Classic White Tee",
    price: 24.99,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    description:
      "A timeless white t-shirt made from soft 100% cotton. Perfect for everyday wear.",
    category: "Men",
    stock: 50,
  },
  {
    name: "Slim Fit Denim Jeans",
    price: 59.99,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80",
    description: "Slim-fit dark wash jeans with a modern silhouette.",
    category: "Men",
    stock: 80,
  },
  {
    name: "Leather Sneakers",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    description: "Premium leather sneakers with cushioned soles for comfort.",
    category: "Men",
    stock: 40,
  },
  {
    name: "Navy Blazer",
    price: 199.99,
    image:
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=800&q=80",
    description: "Tailored navy blazer for smart-casual occasions.",
    category: "Men",
    stock: 25,
  },
  {
    name: "Casual Linen Shirt",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
    description: "Breathable linen shirt, perfect for warm days.",
    category: "Men",
    stock: 60,
  },
  {
    name: "Black Hoodie",
    price: 54.99,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
    description: "Cozy fleece hoodie with kangaroo pocket.",
    category: "Men",
    stock: 70,
  },

  // ---------- WOMEN ----------
  {
    name: "Cream Wool Jacket",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80",
    description:
      "Warm cream-colored wool jacket, lightweight and stylish for cold mornings.",
    category: "Women",
    stock: 20,
  },
  {
    name: "Floral Summer Dress",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80",
    description: "Light floral dress, perfect for summer outings and brunches.",
    category: "Women",
    stock: 35,
  },
  {
    name: "High-Waisted Jeans",
    price: 69.99,
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
    description: "Flattering high-rise jeans with stretch denim.",
    category: "Women",
    stock: 45,
  },
  {
    name: "Silk Blouse",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=800&q=80",
    description: "Elegant silk blouse with a relaxed fit.",
    category: "Women",
    stock: 30,
  },
  {
    name: "Knit Sweater",
    price: 64.99,
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
    description: "Cozy chunky knit sweater for cooler days.",
    category: "Women",
    stock: 40,
  },
  {
    name: "Pleated Skirt",
    price: 44.99,
    image:
      "https://images.unsplash.com/photo-1577900232427-18219b9166a0?auto=format&fit=crop&w=800&q=80",
    description: "Midi-length pleated skirt, versatile and elegant.",
    category: "Women",
    stock: 50,
  },

  // ---------- KIDS ----------
  {
    name: "Kids Hoodie",
    price: 34.99,
    image:
      "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=800&q=80",
    description: "Cozy hoodie for kids in soft fleece. Available in 5 colors.",
    category: "Kids",
    stock: 60,
  },
  {
    name: "Striped T-Shirt",
    price: 19.99,
    image:
      "https://images.unsplash.com/photo-1519278409-1f56fdda7fe5?auto=format&fit=crop&w=800&q=80",
    description: "Soft cotton striped tee for everyday play.",
    category: "Kids",
    stock: 80,
  },
  {
    name: "Denim Overalls",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=80",
    description: "Classic denim overalls with adjustable straps.",
    category: "Kids",
    stock: 45,
  },
  {
    name: "Rainbow Sneakers",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=800&q=80",
    description: "Fun rainbow sneakers with cushioned insoles.",
    category: "Kids",
    stock: 55,
  },
  {
    name: "Puffer Jacket",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?auto=format&fit=crop&w=800&q=80",
    description: "Warm puffer jacket for chilly days.",
    category: "Kids",
    stock: 35,
  },
  {
    name: "Cartoon Pajamas",
    price: 24.99,
    image:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80",
    description: "Soft 2-piece pajama set with fun cartoon prints.",
    category: "Kids",
    stock: 70,
  },

  // ---------- ACCESSORIES ----------
  {
    name: "Knit Beanie",
    price: 19.99,
    image:
      "https://images.unsplash.com/photo-1580655653885-65763b2597d0?auto=format&fit=crop&w=800&q=80",
    description: "Soft knit beanie, perfect for chilly weather. One size.",
    category: "Accessories",
    stock: 100,
  },
  {
    name: "Minimalist Watch",
    price: 149.99,
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
    description: "Clean minimalist watch with leather strap and sapphire glass.",
    category: "Accessories",
    stock: 25,
  },
  {
    name: "Leather Wallet",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80",
    description: "Bifold leather wallet with multiple card slots.",
    category: "Accessories",
    stock: 65,
  },
  {
    name: "Aviator Sunglasses",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80",
    description: "Classic aviator sunglasses with UV protection.",
    category: "Accessories",
    stock: 50,
  },
  {
    name: "Canvas Backpack",
    price: 59.99,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    description: "Durable canvas backpack with laptop compartment.",
    category: "Accessories",
    stock: 40,
  },
  {
    name: "Leather Belt",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=800&q=80",
    description: "Genuine leather belt with brushed metal buckle.",
    category: "Accessories",
    stock: 90,
  },
];

async function main() {
  console.log("Seeding database...");
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.product.deleteMany();
  for (const product of products) {
    await prisma.product.create({ data: product });
  }
  console.log(`Seeded ${products.length} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
