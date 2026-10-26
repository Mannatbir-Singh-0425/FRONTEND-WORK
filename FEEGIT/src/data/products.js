export const products = [
  {
    id: 1,
    name: "Everyday Ceramic Mug",
    category: "Home",
    price: 649,
    description: "A quietly beautiful mug for your morning ritual.",
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=85",
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Linen Market Tote",
    category: "Accessories",
    price: 899,
    description: "Roomy, reusable, and ready for wherever the day goes.",
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85",
    badge: "",
  },
  {
    id: 3,
    name: "Soft Knit Throw",
    category: "Home",
    price: 2199,
    description: "A cozy layer for slow mornings and movie nights.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85",
    badge: "Made for slow days",
  },
  {
    id: 4,
    name: "Daily Notes Journal",
    category: "Stationery",
    price: 499,
    description: "A little space for big ideas, lists, and everything in between.",
    image:
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=900&q=85",
    badge: "",
  },
  {
    id: 5,
    name: "Sandalwood Candle",
    category: "Home",
    price: 799,
    description: "Warm, woody notes to make any room feel like yours.",
    image:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=85",
    badge: "Customer favorite",
  },
  {
    id: 6,
    name: "Sunday Sunglasses",
    category: "Accessories",
    price: 1299,
    description: "Easygoing frames for bright days and long weekends.",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85",
    badge: "",
  },
  {
    id: 7,
    name: "Pocket Sketchbook",
    category: "Stationery",
    price: 379,
    description: "A pocket-sized companion for your next great thought.",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=85",
    badge: "",
  },
  {
    id: 8,
    name: "Stoneware Serving Bowl",
    category: "Home",
    price: 1499,
    description: "Hand-finished character for everyday meals and sharing.",
    image:
      "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=900&q=85",
    badge: "Small-batch",
  },
];

export const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
