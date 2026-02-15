import mongoose from 'mongoose';
import User from './server/models/User.js';
import Product from './server/models/Product.js';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});

    // Create admin user
    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@cannabis.com',
      password: 'Admin@123',
      role: 'admin',
    },
{
      username: 'user',
      email: 'user@cannabis.com',
      password: 'User@123',
      role: 'user',
    });

    const dummyProducts = [
      // Flower Category (7 products)
      {
        name: 'Golden Goliath Flower',
        description: 'Premium indoor-grown flower with a balanced cannabinoid profile',
        category: 'Flower',
        thc: 22.5,
        cbd: 0.8,
        price: 12.99,
        image: 'https://via.placeholder.com/300?text=Golden+Goliath',
        effects: ['Relaxed', 'Happy', 'Focused'],
        usageType: 'Smoking',
        stock: 15,
        createdBy: adminUser._id,
      },
      {
        name: 'Blueberry Dream',
        description: 'Sweet blueberry aroma with calming effects',
        category: 'Flower',
        thc: 18.5,
        cbd: 1.2,
        price: 10.99,
        image: 'https://via.placeholder.com/300?text=Blueberry+Dream',
        effects: ['Calm', 'Happy', 'Sleepy'],
        usageType: 'Smoking',
        stock: 20,
        createdBy: adminUser._id,
      },
      {
        name: 'Sour Diesel',
        description: 'Energizing strain with powerful diesel aroma',
        category: 'Flower',
        thc: 24.3,
        cbd: 0.5,
        price: 13.99,
        image: 'https://via.placeholder.com/300?text=Sour+Diesel',
        effects: ['Energetic', 'Focused', 'Creative'],
        usageType: 'Smoking',
        stock: 12,
        createdBy: adminUser._id,
      },
      {
        name: 'Purple Haze',
        description: 'Legendary strain with purple undertones',
        category: 'Flower',
        thc: 20.1,
        cbd: 0.9,
        price: 11.99,
        image: 'https://via.placeholder.com/300?text=Purple+Haze',
        effects: ['Uplifted', 'Creative', 'Happy'],
        usageType: 'Smoking',
        stock: 18,
        createdBy: adminUser._id,
      },
      {
        name: 'Og Kush',
        description: 'Classic strain with earthy and pine notes',
        category: 'Flower',
        thc: 21.5,
        cbd: 0.7,
        price: 12.49,
        image: 'https://via.placeholder.com/300?text=OG+Kush',
        effects: ['Relaxed', 'Happy', 'Sleepy'],
        usageType: 'Smoking',
        stock: 14,
        createdBy: adminUser._id,
      },
      {
        name: 'Strawberry Cough',
        description: 'Sweet strawberry flavor with mild cough effect',
        category: 'Flower',
        thc: 19.2,
        cbd: 1.1,
        price: 11.49,
        image: 'https://via.placeholder.com/300?text=Strawberry+Cough',
        effects: ['Energetic', 'Social', 'Happy'],
        usageType: 'Smoking',
        stock: 16,
        createdBy: adminUser._id,
      },
      {
        name: 'White Widow',
        description: 'Potent hybrid strain with frosty appearance',
        category: 'Flower',
        thc: 23.0,
        cbd: 0.6,
        price: 13.49,
        image: 'https://via.placeholder.com/300?text=White+Widow',
        effects: ['Energetic', 'Focused', 'Happy'],
        usageType: 'Smoking',
        stock: 11,
        createdBy: adminUser._id,
      },

      // Edibles Category (7 products)
      {
        name: 'Cannabis Gummies - Mixed Berry',
        description: 'Delicious mixed berry gummies, 10mg THC per piece',
        category: 'Edibles',
        thc: 12,
        cbd: 0,
        price: 14.99,
        image: 'https://via.placeholder.com/300?text=Cannabis+Gummies',
        effects: ['Relaxed', 'Happy'],
        usageType: 'Edible',
        stock: 25,
        createdBy: adminUser._id,
      },
      {
        name: 'Chocolate Bars - Dark',
        description: 'Premium dark chocolate infused with cannabis',
        category: 'Edibles',
        thc: 15,
        cbd: 5,
        price: 18.99,
        image: 'https://via.placeholder.com/300?text=Cannabis+Chocolate',
        effects: ['Relaxed', 'Content'],
        usageType: 'Edible',
        stock: 12,
        createdBy: adminUser._id,
      },
      {
        name: 'Cannabis Cookies - Chocolate Chip',
        description: 'Classic chocolate chip cookies with balanced THC/CBD',
        category: 'Edibles',
        thc: 12,
        cbd: 2,
        price: 12.99,
        image: 'https://via.placeholder.com/300?text=Cannabis+Cookies',
        effects: ['Happy', 'Relaxed'],
        usageType: 'Edible',
        stock: 18,
        createdBy: adminUser._id,
      },
      {
        name: 'Cannabis Honey - 500mg',
        description: 'Raw honey infused with high-quality cannabis extract',
        category: 'Edibles',
        thc: 18,
        cbd: 0,
        price: 24.99,
        image: 'https://via.placeholder.com/300?text=Cannabis+Honey',
        effects: ['Relaxed', 'Sleepy'],
        usageType: 'Sublingual',
        stock: 8,
        createdBy: adminUser._id,
      },
      {
        name: 'Cannabis Mints - Peppermint',
        description: 'Breath-freshening mints with 5mg THC each',
        category: 'Edibles',
        thc: 8,
        cbd: 0,
        price: 9.99,
        image: 'https://via.placeholder.com/300?text=Cannabis+Mints',
        effects: ['Uplifted', 'Focused'],
        usageType: 'Sublingual',
        stock: 30,
        createdBy: adminUser._id,
      },
      {
        name: 'Cannabis Brownies - Double Fudge',
        description: 'Decadent double fudge brownies',
        category: 'Edibles',
        thc: 15,
        cbd: 2,
        price: 15.99,
        image: 'https://via.placeholder.com/300?text=Cannabis+Brownies',
        effects: ['Relaxed', 'Happy'],
        usageType: 'Edible',
        stock: 14,
        createdBy: adminUser._id,
      },
      {
        name: 'Cannabis Tea - Chamomile',
        description: 'Calming chamomile tea blend with cannabis',
        category: 'Edibles',
        thc: 5,
        cbd: 8,
        price: 11.99,
        image: 'https://via.placeholder.com/300?text=Cannabis+Tea',
        effects: ['Calm', 'Sleepy'],
        usageType: 'Edible',
        stock: 22,
        createdBy: adminUser._id,
      },

      // Oils Category (6 products)
      {
        name: 'CBD Oil - Full Spectrum 1000mg',
        description: 'Full-spectrum CBD oil with natural hemp flavor',
        category: 'Oils',
        thc: 0,
        cbd: 90,
        price: 34.99,
        image: 'https://via.placeholder.com/300?text=CBD+Oil',
        effects: ['Calm', 'Focused', 'Relaxed'],
        usageType: 'Sublingual',
        stock: 10,
        createdBy: adminUser._id,
      },
      {
        name: 'THC Oil - Golden Extract 500mg',
        description: 'Potent THC oil for sublingual or vaping use',
        category: 'Oils',
        thc: 85,
        cbd: 0,
        price: 44.99,
        image: 'https://via.placeholder.com/300?text=THC+Oil',
        effects: ['Relaxed', 'Happy', 'Sleepy'],
        usageType: 'Sublingual',
        stock: 7,
        createdBy: adminUser._id,
      },
      {
        name: 'Balanced Oil - 1:1 THC:CBD',
        description: 'Perfectly balanced cannabis oil for therapeutic use',
        category: 'Oils',
        thc: 40,
        cbd: 40,
        price: 39.99,
        image: 'https://via.placeholder.com/300?text=Balanced+Oil',
        effects: ['Balanced', 'Focused', 'Calm'],
        usageType: 'Sublingual',
        stock: 9,
        createdBy: adminUser._id,
      },
      {
        name: 'Cannabis Salve - Soothing',
        description: 'Topical salve for muscle and joint relief',
        category: 'Oils',
        thc: 30,
        cbd: 30,
        price: 29.99,
        image: 'https://via.placeholder.com/300?text=Cannabis+Salve',
        effects: ['Relief', 'Soothing'],
        usageType: 'Topical',
        stock: 13,
        createdBy: adminUser._id,
      },
      {
        name: 'Vape Oil - Berry Blast 400mg',
        description: 'Smooth vape oil with berry flavoring',
        category: 'Oils',
        thc: 80,
        cbd: 0,
        price: 32.99,
        image: 'https://via.placeholder.com/300?text=Vape+Oil',
        effects: ['Uplifted', 'Happy', 'Creative'],
        usageType: 'Vaping',
        stock: 11,
        createdBy: adminUser._id,
      },
      {
        name: 'Isolate Oil - Pure CBD',
        description: 'Pure CBD isolate oil, 99% purity',
        category: 'Oils',
        thc: 0,
        cbd: 95,
        price: 49.99,
        image: 'https://via.placeholder.com/300?text=CBD+Isolate',
        effects: ['Calm', 'Clear-headed'],
        usageType: 'Sublingual',
        stock: 6,
        createdBy: adminUser._id,
      },
    ];

    await Product.insertMany(dummyProducts);

    console.log('Database seeded successfully!');
    console.log(`Created ${dummyProducts.length} products`);
    console.log(`Admin user created: ${adminUser.email}`);

    mongoose.connection.close();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();
