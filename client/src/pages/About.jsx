import { Heart, Leaf, ShieldCheck, Truck } from "lucide-react";

const values = [
  {
    icon: Leaf,
    title: "Sustainable",
    body: "We work with mills and partners who use organic and recycled fabrics whenever possible.",
  },
  {
    icon: ShieldCheck,
    title: "Quality First",
    body: "Every piece is inspected by hand. If it doesn't meet our bar, it doesn't reach you.",
  },
  {
    icon: Truck,
    title: "Fast Shipping",
    body: "Free standard shipping on orders over $75 — most orders arrive in 2-4 business days.",
  },
  {
    icon: Heart,
    title: "Made for Everyone",
    body: "Inclusive sizing, accessible prices, and styles for every age and body type.",
  },
];

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-3">
            About ShopSmart
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
            Style that fits your life — and your values.
          </h1>
          <p className="text-gray-600 leading-relaxed mb-4">
            ShopSmart started in 2022 with a simple idea: clothes should look
            good, last a long time, and be made by people treated well. Five
            years later, we ship to over 30 countries and partner with mills
            across India, Portugal, and Vietnam.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We're a small team of designers, engineers, and stylists obsessed
            with the details — from the weight of a knit to the way a button
            sits on a placket.
          </p>
        </div>
        <div className="aspect-square rounded-3xl overflow-hidden bg-gray-100">
          <img
            src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=1200&q=80"
            alt="Storefront"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center mb-10">
          What we stand for
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow"
            >
              <Icon size={28} className="mb-4" />
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
