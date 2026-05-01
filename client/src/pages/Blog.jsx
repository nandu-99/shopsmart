const posts = [
  {
    id: 1,
    title: "Top 5 Wardrobe Essentials for 2026",
    excerpt:
      "From the perfect white tee to a tailored blazer — these are the pieces every closet needs this year.",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
    author: "Maya Patel",
    date: "April 22, 2026",
    readTime: "6 min read",
  },
  {
    id: 2,
    title: "How to Style Denim All Year Round",
    excerpt:
      "Denim isn't just for fall. Here's how to make jeans, jackets, and more work in every season.",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1200&q=80",
    author: "Liam Chen",
    date: "April 14, 2026",
    readTime: "4 min read",
  },
  {
    id: 3,
    title: "Sustainable Fabrics: What to Look For",
    excerpt:
      "A buyer's guide to organic cotton, recycled polyester, and the labels that actually mean something.",
    image:
      "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=1200&q=80",
    author: "Sara Okafor",
    date: "April 02, 2026",
    readTime: "8 min read",
  },
  {
    id: 4,
    title: "The Comeback of Minimalist Watches",
    excerpt:
      "Why simple, clean dials are dominating wrists in 2026 — and which styles to consider.",
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=80",
    author: "Daniel Park",
    date: "March 28, 2026",
    readTime: "5 min read",
  },
  {
    id: 5,
    title: "Dressing Kids for Every Season",
    excerpt:
      "Practical tips on layering, fabrics, and growth-friendly fits that won't break the bank.",
    image:
      "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=1200&q=80",
    author: "Priya Sharma",
    date: "March 19, 2026",
    readTime: "7 min read",
  },
  {
    id: 6,
    title: "Accessorize Like a Pro",
    excerpt:
      "From belts to backpacks — small choices that elevate any outfit instantly.",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80",
    author: "Ethan Wright",
    date: "March 10, 2026",
    readTime: "3 min read",
  },
];

export default function Blog() {
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3">The ShopSmart Journal</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Style guides, trend reports, and stories from our community.
        </p>
      </div>

      <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 group cursor-pointer">
        <div className="aspect-4/3 rounded-3xl overflow-hidden bg-gray-100">
          <img
            src={featured.image}
            alt={featured.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
            Featured · {featured.readTime}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-3">
            {featured.title}
          </h2>
          <p className="text-gray-600 mb-4">{featured.excerpt}</p>
          <p className="text-sm text-gray-500">
            By {featured.author} · {featured.date}
          </p>
        </div>
      </article>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {rest.map((p) => (
          <article
            key={p.id}
            className="group cursor-pointer border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="aspect-4/3 bg-gray-100 overflow-hidden">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-5">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                {p.readTime}
              </p>
              <h3 className="text-lg font-semibold leading-snug mb-2">
                {p.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {p.excerpt}
              </p>
              <p className="text-xs text-gray-500">
                {p.author} · {p.date}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
