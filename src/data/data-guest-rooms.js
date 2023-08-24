import { supabaseUrl } from "../services/supabase";

const imageUrl = `${supabaseUrl}/storage/v1/object/public/guest-room-images/`;

export const guestRooms = [
  {
    name: "Faisalabad",
    maxCapacity: 2,
    regularPrice: 250,
    discount: 0,
    image: imageUrl + "faisalabad.jpg",
    description:
      "Discover the ultimate luxury getaway for couples in the cozy wooden Faisalabad Guest Room. Nestled in a picturesque forest, this stunning guest-room offers a secluded and intimate retreat. Inside, enjoy modern high-quality wood interiors, a comfortable seating area, a fireplace and a fully-equipped kitchen. The plush king-size bed, dressed in fine linens guarantees a peaceful nights sleep. Relax in the spa-like shower and unwind on the private deck with hot tub.",
  },
  {
    name: "Karachi",
    maxCapacity: 2,
    regularPrice: 350,
    discount: 25,
    image: imageUrl + "karachi.jpg",
    description:
      "Escape to the serenity of nature and indulge in luxury in our cozy Karachi Guest Room. Perfect for couples, this guest-room offers a secluded and intimate retreat in the heart of a picturesque forest. Inside, you will find warm and inviting interiors crafted from high-quality wood, a comfortable living area, a fireplace and a fully-equipped kitchen. The luxurious bedroom features a plush king-size bed and spa-like shower. Relax on the private deck with hot tub and take in the beauty of nature.",
  },
  {
    name: "Multan",
    maxCapacity: 4,
    regularPrice: 300,
    discount: 0,
    image: imageUrl + "multan.jpg",
    description:
      "Experience luxury family living in our medium-sized wooden Multan Guest Room. Perfect for families of up to 4 people, this guest-room offers a comfortable and inviting space with all modern amenities. Inside, you will find warm and inviting interiors crafted from high-quality wood, a comfortable living area, a fireplace, and a fully-equipped kitchen. The bedrooms feature plush beds and spa-like bathrooms. The guest-room has a private deck with a hot tub and outdoor seating area, perfect for taking in the natural surroundings.",
  },
  {
    name: "Peshawar",
    maxCapacity: 4,
    regularPrice: 500,
    discount: 50,
    image: imageUrl + "peshawar.jpg",
    description:
      "Indulge in the ultimate luxury family vacation in this medium-sized Peshawar Guest Room. Designed for families of up to 4, this guest-room offers a sumptuous retreat for the discerning traveler. Inside, the guest-room boasts of opulent interiors crafted from the finest quality wood, a comfortable living area, a fireplace, and a fully-equipped gourmet kitchen. The bedrooms are adorned with plush beds and spa-inspired en-suite bathrooms. Step outside to your private deck and soak in the natural surroundings while relaxing in your own hot tub.",
  },
  {
    name: "Rawalpindi",
    maxCapacity: 6,
    regularPrice: 350,
    discount: 0,
    image: imageUrl + "rawalpindi.jpg",
    description:
      "Enjoy a comfortable and cozy getaway with your group or family in our spacious Rawalpindi Guest Room. Designed to accommodate up to 6 people, this guest-room offers a secluded retreat in the heart of nature. Inside, the guest-room features warm and inviting interiors crafted from quality wood, a living area with fireplace, and a fully-equipped kitchen. The bedrooms are comfortable and equipped with en-suite bathrooms. Step outside to your private deck and take in the natural surroundings while relaxing in your own hot tub.",
  },
  {
    name: "Lahore",
    maxCapacity: 6,
    regularPrice: 800,
    discount: 100,
    image: imageUrl + "lahore.jpg",
    description:
      "Experience the epitome of luxury with your group or family in our spacious wooden Lahore Guest Room. Designed to comfortably accommodate up to 6 people, this guest-room offers a lavish retreat in the heart of nature. Inside, the guest-room features opulent interiors crafted from premium wood, a grand living area with fireplace, and a fully-equipped gourmet kitchen. The bedrooms are adorned with plush beds and spa-like en-suite bathrooms. Step outside to your private deck and soak in the natural surroundings while relaxing in your own hot tub.",
  },
  {
    name: "Jhelum",
    maxCapacity: 8,
    regularPrice: 600,
    discount: 100,
    image: imageUrl + "jhelum.jpg",
    description:
      "Accommodate your large group or multiple families in the spacious and grand wooden Jhelum Guest Room. Designed to comfortably fit up to 8 people, this guest-room offers a secluded retreat in the heart of beautiful forests and mountains. Inside, the guest-room features warm and inviting interiors crafted from quality wood, multiple living areas with fireplace, and a fully-equipped kitchen. The bedrooms are comfortable and equipped with en-suite bathrooms. The guest-room has a private deck with a hot tub and outdoor seating area, perfect for taking in the natural surroundings.",
  },
  {
    name: "Sialkot",
    maxCapacity: 10,
    regularPrice: 1400,
    discount: 0,
    image: imageUrl + "sialkot.jpg",
    description:
      "Experience the epitome of luxury and grandeur with your large group or multiple families in our grand Sialkot Guest Room. This guest-room offers a lavish retreat that caters to all your needs and desires. The guest-room features an opulent design and boasts of high-end finishes, intricate details and the finest quality wood throughout. Inside, the guest-room features multiple grand living areas with fireplaces, a formal dining area, and a gourmet kitchen that is a chef's dream. The bedrooms are designed for ultimate comfort and luxury, with plush beds and en-suite spa-inspired bathrooms. Step outside and immerse yourself in the beauty of nature from your private deck, featuring a luxurious hot tub and ample seating areas for ultimate relaxation and enjoyment.",
  },
];
