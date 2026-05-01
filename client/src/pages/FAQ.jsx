import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "How long does shipping take?",
    a: "Standard shipping takes 2-4 business days within the US, and 5-10 business days internationally. Express options are available at checkout.",
  },
  {
    q: "What is your return policy?",
    a: "We accept returns within 30 days of delivery. Items must be unworn, unwashed, and have original tags attached. Refunds are processed within 5 business days.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes — we ship to over 30 countries. Duties and taxes for international orders are calculated at checkout.",
  },
  {
    q: "How do I find my size?",
    a: "Each product page has a detailed size guide. If you're between sizes, we generally recommend sizing up for a relaxed fit.",
  },
  {
    q: "Can I cancel or change my order?",
    a: "You can cancel or modify your order within 1 hour of placing it. After that, the order goes into fulfillment and cannot be changed.",
  },
  {
    q: "Are your products ethically made?",
    a: "Absolutely. We audit every partner factory annually for fair wages, safe conditions, and reasonable hours. Our certification details are on the About page.",
  },
  {
    q: "Do you offer gift cards?",
    a: "Yes — digital gift cards are available in any amount from $25 to $500 and are delivered by email instantly.",
  },
  {
    q: "How do I contact customer support?",
    a: "Email us at support@shopsmart.example or use the chat widget at the bottom right. We respond within 24 hours, Monday through Friday.",
  },
  {
    q: "Where can I track my order?",
    a: "Once your order ships, you'll receive a tracking link via email. You can also view all your orders on the Profile page.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept Visa, Mastercard, American Express, Apple Pay, Google Pay, and PayPal. Payment is processed securely at checkout.",
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between text-left py-5 hover:text-black"
        aria-expanded={open}
      >
        <span className="font-medium pr-4">{q}</span>
        <ChevronDown
          size={20}
          className={`shrink-0 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all ${
          open ? "max-h-40 pb-5" : "max-h-0"
        }`}
      >
        <p className="text-gray-600 leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="max-w-3xl mx-auto px-4 pt-8 pb-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-3">Frequently Asked Questions</h1>
        <p className="text-gray-500">
          Can't find what you're looking for? Email{" "}
          <a
            href="mailto:support@shopsmart.example"
            className="underline hover:text-black"
          >
            support@shopsmart.example
          </a>
          .
        </p>
      </div>
      <div>
        {faqs.map((f, i) => (
          <FAQItem key={i} q={f.q} a={f.a} />
        ))}
      </div>
    </div>
  );
}
