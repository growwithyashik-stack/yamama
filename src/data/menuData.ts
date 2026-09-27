export interface MenuItemPortion {
  size: 'Full' | 'Half' | 'Quarter' | 'Standard';
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'SHAWAYA & RICE' | 'MOJITOS (BENE TIBI)' | 'MOJITOS';
  description?: string;
  image?: string;
  isPopular?: boolean;
  isSpecial?: boolean;
  portions: MenuItemPortion[];
}

import shawayaHeroImg from '@/src/assets/images/shawaya_hero_dish_1790495348191.jpg';
import shawayaKubusImg from '@/src/assets/images/shawaya_kubus_dish_1790495407173.jpg';
import bishawariRiceImg from '@/src/assets/images/bishawari_rice_dish_1790495423412.jpg';
import mojitosImg from '@/src/assets/images/gourmet_mojitos_1790495390206.jpg';

export const RESTAURANT_INFO = {
  name: "YAMAMA SHAWAYA",
  tagline: "REFILL YOUR ENERGY",
  location: "Perinthalmanna / Angadippuram, Kerala",
  phones: [
    { display: "9747 36 21 01", raw: "919747362101" },
    { display: "9747 36 21 02", raw: "919747362102" }
  ],
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Yamama+Shawaya+Perinthalmanna+Angadippuram+Kerala",
  openingHours: "12:00 PM – 11:30 PM (Daily)",
  deliveryNotice: "Fast local delivery & takeaway available across Perinthalmanna, Angadippuram & nearby areas."
};

export const MENU_ITEMS: MenuItem[] = [
  // CATEGORY 1: SHAWAYA & RICE
  {
    id: "shawaya-rice-combo",
    name: "SHAWAYA CHICKEN WITH BISHAVARI RICE COMBO",
    category: "SHAWAYA & RICE",
    description: "Tender, coal-roasted juicy Shawaya chicken paired with authentic fragrant Bishavari spiced long-grain rice, toum garlic dip, pickles & mint sauce.",
    image: shawayaHeroImg,
    isPopular: true,
    portions: [
      { size: "Full", price: 660 },
      { size: "Half", price: 340 },
      { size: "Quarter", price: 180 },
    ]
  },
  {
    id: "shawaya-kubus",
    name: "SHAWAYA CHICKEN WITH KUBUS",
    category: "SHAWAYA & RICE",
    description: "Signature Middle Eastern spiced roasted chicken served with soft warm Kubus pita bread, signature creamy garlic toum and Arabian salad.",
    image: shawayaKubusImg,
    isPopular: true,
    portions: [
      { size: "Full", price: 460 },
      { size: "Half", price: 240 },
      { size: "Quarter", price: 130 },
    ]
  },
  {
    id: "bishavari-rice-only",
    name: "BISHAVARI RICE ONLY",
    category: "SHAWAYA & RICE",
    description: "Authentic Bishavari spiced basmati rice infused with traditional Arabian aromatics, crispy fried onions, and dry fruits garnish.",
    image: bishawariRiceImg,
    isPopular: false,
    portions: [
      { size: "Full", price: 300 },
      { size: "Half", price: 160 },
      { size: "Quarter", price: 90 },
    ]
  },

  // CATEGORY 2: MOJITOS (BENE TIBI)
  {
    id: "bene-tibi-green-apple",
    name: "Green Apple",
    category: "MOJITOS (BENE TIBI)",
    description: "Crisp and tangy green apple infusion with crushed mint, zesty lime and chilled sparkling soda.",
    image: mojitosImg,
    portions: [{ size: "Standard", price: 120 }]
  },
  {
    id: "bene-tibi-passion-fruit",
    name: "Passion Fruit",
    category: "MOJITOS (BENE TIBI)",
    description: "Exotic tropical passion fruit nectar crushed with ice, fresh garden mint and lime.",
    image: mojitosImg,
    isPopular: true,
    portions: [{ size: "Standard", price: 120 }]
  },
  {
    id: "bene-tibi-watermelon",
    name: "Watermelon",
    category: "MOJITOS (BENE TIBI)",
    description: "Juicy sun-ripened watermelon crushed over crushed ice, mint and sparkling fizz.",
    image: mojitosImg,
    portions: [{ size: "Standard", price: 120 }]
  },
  {
    id: "bene-tibi-blueberry",
    name: "Blue Berry",
    category: "MOJITOS (BENE TIBI)",
    description: "Rich wild blueberries blended with cool mint sprigs and sparkling refreshment.",
    image: mojitosImg,
    isPopular: true,
    portions: [{ size: "Standard", price: 120 }]
  },
  {
    id: "bene-tibi-strawberry",
    name: "Strawberry",
    category: "MOJITOS (BENE TIBI)",
    description: "Sweet handpicked strawberries muddled with fresh mint and chilled citrus soda.",
    image: mojitosImg,
    portions: [{ size: "Standard", price: 120 }]
  },
  {
    id: "bene-tibi-blackberry",
    name: "Blackberry",
    category: "MOJITOS (BENE TIBI)",
    description: "Bold dark blackberries with invigorating mint and crystalline crushed ice.",
    image: mojitosImg,
    portions: [{ size: "Standard", price: 120 }]
  },
  {
    id: "bene-tibi-mint",
    name: "Mint",
    category: "MOJITOS (BENE TIBI)",
    description: "The classic Bene Tibi double mint cooler with hand-pressed limes and sparkling mineral soda.",
    image: mojitosImg,
    portions: [{ size: "Standard", price: 120 }]
  },
  {
    id: "bene-tibi-rose",
    name: "Rose",
    category: "MOJITOS (BENE TIBI)",
    description: "Delicate and fragrant royal rose syrup with cool garden mint and citrus effervescence.",
    image: mojitosImg,
    portions: [{ size: "Standard", price: 120 }]
  },
  {
    id: "bene-tibi-mango",
    name: "Mango",
    category: "MOJITOS (BENE TIBI)",
    description: "Luscious golden Alphonso mango puree with refreshing mint leaves and chilled fizz.",
    image: mojitosImg,
    isPopular: true,
    portions: [{ size: "Standard", price: 120 }]
  },
  {
    id: "bene-tibi-mumbai",
    name: "Mumbai",
    category: "MOJITOS (BENE TIBI)",
    description: "Special signature Bene Tibi Mumbai formulation — vibrant, multi-layered exotic spice & fruit burst.",
    image: mojitosImg,
    isSpecial: true,
    portions: [{ size: "Standard", price: 220 }]
  },

  // CATEGORY 3: MOJITOS
  {
    id: "mojito-mint",
    name: "Mint",
    category: "MOJITOS",
    description: "Classic chilled mint mojito with lime and refreshing fizz.",
    image: mojitosImg,
    portions: [{ size: "Standard", price: 80 }]
  },
  {
    id: "mojito-watermelon",
    name: "Water Melon",
    category: "MOJITOS",
    description: "Sweet chilled watermelon refreshment with fresh mint and citrus.",
    image: mojitosImg,
    portions: [{ size: "Standard", price: 80 }]
  },
  {
    id: "mojito-passion-fruit",
    name: "Passion Fruit",
    category: "MOJITOS",
    description: "Tropical tangy passion fruit muddled with lime and soda.",
    image: mojitosImg,
    isPopular: true,
    portions: [{ size: "Standard", price: 80 }]
  },
  {
    id: "mojito-pineapple",
    name: "Pineapple",
    category: "MOJITOS",
    description: "Fresh golden pineapple burst with crisp mint leaves and crushed ice.",
    image: mojitosImg,
    portions: [{ size: "Standard", price: 80 }]
  },
  {
    id: "mojito-green-apple",
    name: "Green Apple",
    category: "MOJITOS",
    description: "Tart and invigorating green apple flavor with lime fizz.",
    image: mojitosImg,
    portions: [{ size: "Standard", price: 80 }]
  },
  {
    id: "mojito-lichi",
    name: "Lichi",
    category: "MOJITOS",
    description: "Delicate sweet lychee nectar combined with cool garden mint and soda.",
    image: mojitosImg,
    portions: [{ size: "Standard", price: 80 }]
  },
  {
    id: "mojito-strawberry",
    name: "Strawberry",
    category: "MOJITOS",
    description: "Fresh strawberry cooler with lime juice, mint and sparkling soda.",
    image: mojitosImg,
    portions: [{ size: "Standard", price: 80 }]
  },
  {
    id: "mojito-kiwi",
    name: "Kiwi",
    category: "MOJITOS",
    description: "Tangy emerald kiwi crushed over ice with refreshing mint leaves.",
    image: mojitosImg,
    portions: [{ size: "Standard", price: 80 }]
  }
];
