import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || 'kawichchi';

if (!uri) {
  throw new Error('MONGODB_URI is not defined in .env.local or environment');
}

const client = new MongoClient(uri, {
  appName: 'kawichchi-seed-script',
  maxIdleTimeMS: 5000,
});

const projects = [
  {
    id: 1,
    title: 'Luxury Living Room – Colombo 7',
    category: 'Living Room',
    subcategory: 'Sofa Collection',
    location: 'Colombo 7, Sri Lanka',
    materials: ['Grade A Teak', 'Italian Velvet', 'Brass Details'],
    description: 'A curated seating ensemble with sculpted teak frames and velvet upholstery, designed for refined entertaining.',
    imageUrl: 'https://4gxpbhkq6gjh60vx.public.blob.vercel-storage.com/IMG_0385.PNG',
    portfolio: [
      'https://4gxpbhkq6gjh60vx.public.blob.vercel-storage.com/IMG_0385.PNG',
      'https://images.unsplash.com/photo-1592078615290-033ee5e6c5c9?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1470&auto=format&fit=crop'
    ]
  },
  {
    id: 2,
    title: 'Penthouse Bedroom – Rajagiriya',
    category: 'Bedroom',
    subcategory: 'Master Bedroom',
    location: 'Rajagiriya, Sri Lanka',
    materials: ['Walnut Veneer', 'Leather Panels', 'Soft Linen'],
    description: 'Warm walnut textures meet muted textiles to deliver a calm, hotel-grade sleep sanctuary.',
    imageUrl: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?q=80&w=1470&auto=format&fit=crop',
    portfolio: [
      'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507842955343-583cf22ee5a7?q=80&w=1470&auto=format&fit=crop'
    ]
  },
  {
    id: 3,
    title: 'Executive Office – Colombo 3',
    category: 'Office',
    subcategory: 'Executive Suite',
    location: 'Colombo 3, Sri Lanka',
    materials: ['Smoked Oak', 'Matte Brass', 'Stone Inlay'],
    description: 'A tailored office suite that balances authority with understated luxury for executive leadership.',
    imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1470&auto=format&fit=crop',
    portfolio: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1469&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1470&auto=format&fit=crop'
    ]
  },
  {
    id: 4,
    title: 'Private Dining – Galle',
    category: 'Dining',
    subcategory: 'Formal Dining',
    location: 'Galle, Sri Lanka',
    materials: ['Plantation Teak', 'Natural Stone', 'Handwoven Linen'],
    description: 'A dramatic 10-seater dining suite crafted for ocean-facing villas and intimate gatherings.',
    imageUrl: 'https://images.unsplash.com/photo-1617806118233-f8e167c4fa79?q=80&w=1632&auto=format&fit=crop',
    portfolio: [
      'https://images.unsplash.com/photo-1617806118233-f8e167c4fa79?q=80&w=1632&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540932239986-310128078ceb?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1559053991-641a8ac8dd52?q=80&w=1470&auto=format&fit=crop'
    ]
  },
  {
    id: 5,
    title: 'Signature Lounge – Cinnamon Gardens',
    category: 'Living Room',
    subcategory: 'Lounge Area',
    location: 'Cinnamon Gardens, Sri Lanka',
    materials: ['Teak', 'Bouclé Fabric', 'Bronze Accents'],
    description: 'An inviting lounge corner with sculptural forms and tactile fabrics for luxury hospitality.',
    imageUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1365&auto=format&fit=crop',
    portfolio: [
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1365&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555639106-d6fa073effba?q=80&w=1470&auto=format&fit=crop'
    ]
  },
  {
    id: 6,
    title: 'Master Wardrobe – Talpe',
    category: 'Bedroom',
    subcategory: 'Guest Suite',
    location: 'Talpe, Sri Lanka',
    materials: ['American Walnut', 'Smoked Glass', 'Soft Leather'],
    description: 'A bespoke wardrobe system engineered for seamless storage and boutique-level presentation.',
    imageUrl: 'https://images.unsplash.com/photo-1595428774223-ef0486bc9af7?q=80&w=1287&auto=format&fit=crop',
    portfolio: [
      'https://images.unsplash.com/photo-1595428774223-ef0486bc9af7?q=80&w=1287&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540932239986-310128078ceb?q=80&w=1470&auto=format&fit=crop'
    ]
  },
  {
    id: 7,
    title: 'Creative Studio – Colombo 5',
    category: 'Office',
    subcategory: 'Creative Studio',
    location: 'Colombo 5, Sri Lanka',
    materials: ['Ash Wood', 'Matte Steel', 'Acoustic Felt'],
    description: 'A collaborative workspace designed for teams seeking warmth, clarity, and focus.',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1469&auto=format&fit=crop',
    portfolio: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1469&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1470&auto=format&fit=crop'
    ]
  },
  {
    id: 8,
    title: 'Artisan Breakfast Lounge – Kandy',
    category: 'Dining',
    subcategory: 'Breakfast Nook',
    location: 'Kandy, Sri Lanka',
    materials: ['Teak', 'Marble', 'Handwoven Rattan'],
    description: 'A sunlit breakfast lounge with handcrafted textures for boutique residences.',
    imageUrl: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1469&auto=format&fit=crop',
    portfolio: [
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1469&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1585518419759-1b91ea626d6f?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517457373614-b7152f800fd1?q=80&w=1470&auto=format&fit=crop'
    ]
  }
];

async function main() {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection('projects');

  const operations = projects.map((project) => ({
    updateOne: {
      filter: { id: project.id },
      update: { $set: project },
      upsert: true,
    },
  }));

  const result = await collection.bulkWrite(operations);
  console.log('Seed result:', {
    matchedCount: result.matchedCount,
    modifiedCount: result.modifiedCount,
    upsertedCount: result.upsertedCount,
  });
  await client.close();
}

main().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
