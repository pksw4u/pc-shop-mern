import connectDB from '../config/database';
import Category from '../models/category.model';
import Product from '../models/product.model';
import CompatibilityRule from '../models/compatibilityRules.model';
import Inventory from '../models/inventory.model';

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    await CompatibilityRule.deleteMany({});
    await Inventory.deleteMany({});

    console.log('Existing data cleared');

    // Seed Categories
    const categoriesData = [
      { name: 'CPUs', description: 'Central Processing Units' },
      { name: 'Motherboards', description: 'Main circuit boards' },
      { name: 'RAM', description: 'Random Access Memory' },
      { name: 'Storage', description: 'Hard drives and SSDs' },
      { name: 'GPUs', description: 'Graphics Processing Units' },
      { name: 'PSUs', description: 'Power Supply Units' },
      { name: 'Cases', description: 'Computer cases' },
      { name: 'Monitors', description: 'Display monitors' },
      { name: 'Peripherals', description: 'Keyboards, mice, etc.' },
    ];

    const categoryDocs = await Category.insertMany(categoriesData);
    const categoryMap = new Map(categoryDocs.map(cat => [cat.name, cat._id]));

    console.log('Categories seeded');

    // Seed Products
    const productsData = [
      // CPUs
      {
        name: 'AMD Ryzen 5 5600X',
        description: '6-core, 12-thread processor for gaming and productivity',
        price: 25000,
        category: categoryMap.get('CPUs'),
        attributes: [
          { name: 'Socket', value: 'AM4' },
          { name: 'Cores', value: '6' },
          { name: 'Threads', value: '12' },
          { name: 'Base Clock', value: '3.7 GHz' },
          { name: 'TDP', value: '65W' },
        ],
        stock: 10,
      },
      {
        name: 'Intel Core i5-12400F',
        description: '6-core, 12-thread processor for mainstream use',
        price: 18000,
        category: categoryMap.get('CPUs'),
        attributes: [
          { name: 'Socket', value: 'LGA1700' },
          { name: 'Cores', value: '6' },
          { name: 'Threads', value: '12' },
          { name: 'Base Clock', value: '2.5 GHz' },
          { name: 'TDP', value: '65W' },
        ],
        stock: 15,
      },
      // Motherboards
      {
        name: 'ASUS Prime B550M-A',
        description: 'Micro-ATX motherboard with AM4 socket',
        price: 12000,
        category: categoryMap.get('Motherboards'),
        attributes: [
          { name: 'Socket', value: 'AM4' },
          { name: 'Form Factor', value: 'Micro-ATX' },
          { name: 'RAM Type', value: 'DDR4' },
          { name: 'Max RAM', value: '128GB' },
          { name: 'Chipset', value: 'B550' },
        ],
        stock: 8,
      },
      {
        name: 'MSI MAG B660M Mortar',
        description: 'Micro-ATX motherboard with LGA1700 socket',
        price: 15000,
        category: categoryMap.get('Motherboards'),
        attributes: [
          { name: 'Socket', value: 'LGA1700' },
          { name: 'Form Factor', value: 'Micro-ATX' },
          { name: 'RAM Type', value: 'DDR4' },
          { name: 'Max RAM', value: '128GB' },
          { name: 'Chipset', value: 'B660' },
        ],
        stock: 12,
      },
      // RAM
      {
        name: 'Corsair Vengeance LPX 16GB DDR4-3200',
        description: '16GB DDR4 RAM kit',
        price: 5000,
        category: categoryMap.get('RAM'),
        attributes: [
          { name: 'Type', value: 'DDR4' },
          { name: 'Capacity', value: '16GB' },
          { name: 'Speed', value: '3200 MHz' },
          { name: 'Voltage', value: '1.35V' },
        ],
        stock: 20,
      },
      {
        name: 'G.Skill Ripjaws V 8GB DDR4-3600',
        description: '8GB DDR4 RAM module',
        price: 3000,
        category: categoryMap.get('RAM'),
        attributes: [
          { name: 'Type', value: 'DDR4' },
          { name: 'Capacity', value: '8GB' },
          { name: 'Speed', value: '3600 MHz' },
          { name: 'Voltage', value: '1.35V' },
        ],
        stock: 25,
      },
      // Storage
      {
        name: 'Samsung 970 EVO Plus 500GB NVMe SSD',
        description: '500GB NVMe SSD for fast storage',
        price: 8000,
        category: categoryMap.get('Storage'),
        attributes: [
          { name: 'Type', value: 'SSD' },
          { name: 'Interface', value: 'NVMe' },
          { name: 'Capacity', value: '500GB' },
          { name: 'Read Speed', value: '3500 MB/s' },
        ],
        stock: 18,
      },
      {
        name: 'WD Blue 1TB HDD',
        description: '1TB SATA HDD for bulk storage',
        price: 4000,
        category: categoryMap.get('Storage'),
        attributes: [
          { name: 'Type', value: 'HDD' },
          { name: 'Interface', value: 'SATA' },
          { name: 'Capacity', value: '1TB' },
          { name: 'RPM', value: '7200' },
        ],
        stock: 30,
      },
      // GPUs
      {
        name: 'NVIDIA RTX 3060 12GB',
        description: 'Mid-range graphics card for gaming',
        price: 35000,
        category: categoryMap.get('GPUs'),
        attributes: [
          { name: 'Interface', value: 'PCIe 4.0' },
          { name: 'VRAM', value: '12GB GDDR6' },
          { name: 'Power Connectors', value: '8-pin' },
          { name: 'Recommended PSU', value: '550W' },
        ],
        stock: 5,
      },
      {
        name: 'AMD Radeon RX 6600 XT',
        description: 'Performance graphics card',
        price: 32000,
        category: categoryMap.get('GPUs'),
        attributes: [
          { name: 'Interface', value: 'PCIe 4.0' },
          { name: 'VRAM', value: '8GB GDDR6' },
          { name: 'Power Connectors', value: '8-pin' },
          { name: 'Recommended PSU', value: '500W' },
        ],
        stock: 7,
      },
      // PSUs
      {
        name: 'Corsair RM650x 650W 80+ Gold',
        description: '650W modular PSU',
        price: 9000,
        category: categoryMap.get('PSUs'),
        attributes: [
          { name: 'Wattage', value: '650W' },
          { name: 'Efficiency', value: '80+ Gold' },
          { name: 'Modular', value: 'Yes' },
        ],
        stock: 14,
      },
      {
        name: 'EVGA 600 W1 600W 80+ White',
        description: '600W non-modular PSU',
        price: 5000,
        category: categoryMap.get('PSUs'),
        attributes: [
          { name: 'Wattage', value: '600W' },
          { name: 'Efficiency', value: '80+ White' },
          { name: 'Modular', value: 'No' },
        ],
        stock: 20,
      },
      // Cases
      {
        name: 'Fractal Design Meshify C Mini',
        description: 'Micro-ATX case with good airflow',
        price: 7000,
        category: categoryMap.get('Cases'),
        attributes: [
          { name: 'Form Factor', value: 'Micro-ATX' },
          { name: 'Side Panel', value: 'Tempered Glass' },
          { name: 'Max GPU Length', value: '315mm' },
        ],
        stock: 10,
      },
      {
        name: 'Cooler Master MasterBox NR600',
        description: 'Mid-tower ATX case',
        price: 6000,
        category: categoryMap.get('Cases'),
        attributes: [
          { name: 'Form Factor', value: 'ATX' },
          { name: 'Side Panel', value: 'Tempered Glass' },
          { name: 'Max GPU Length', value: '370mm' },
        ],
        stock: 12,
      },
      // Monitors
      {
        name: 'Dell S2421H 24" 1080p IPS',
        description: '24-inch Full HD monitor',
        price: 12000,
        category: categoryMap.get('Monitors'),
        attributes: [
          { name: 'Size', value: '24"' },
          { name: 'Resolution', value: '1920x1080' },
          { name: 'Panel Type', value: 'IPS' },
          { name: 'Refresh Rate', value: '75Hz' },
        ],
        stock: 15,
      },
      {
        name: 'Acer Nitro VG270UP 27" 1440p IPS',
        description: '27-inch QHD monitor',
        price: 20000,
        category: categoryMap.get('Monitors'),
        attributes: [
          { name: 'Size', value: '27"' },
          { name: 'Resolution', value: '2560x1440' },
          { name: 'Panel Type', value: 'IPS' },
          { name: 'Refresh Rate', value: '144Hz' },
        ],
        stock: 8,
      },
      // Peripherals
      {
        name: 'Logitech MX Master 3S',
        description: 'Wireless ergonomic mouse',
        price: 8000,
        category: categoryMap.get('Peripherals'),
        attributes: [
          { name: 'Type', value: 'Mouse' },
          { name: 'Connectivity', value: 'Wireless' },
          { name: 'DPI', value: '8000' },
        ],
        stock: 20,
      },
      {
        name: 'Keychron K8 Wireless Mechanical Keyboard',
        description: 'Wireless mechanical keyboard',
        price: 10000,
        category: categoryMap.get('Peripherals'),
        attributes: [
          { name: 'Type', value: 'Keyboard' },
          { name: 'Connectivity', value: 'Wireless' },
          { name: 'Switch Type', value: 'Brown' },
        ],
        stock: 15,
      },
    ];

    const productDocs = await Product.insertMany(productsData);
    const productMap = new Map(productDocs.map(prod => [prod.name, prod._id]));

    console.log('Products seeded');

    // Seed Compatibility Rules
    const compatibilityRulesData = [
      // CPU compatible with motherboards of same socket
      {
        productId: productMap.get('AMD Ryzen 5 5600X'),
        compatibleWith: [productMap.get('ASUS Prime B550M-A')],
        incompatibleWith: [productMap.get('MSI MAG B660M Mortar')],
      },
      {
        productId: productMap.get('Intel Core i5-12400F'),
        compatibleWith: [productMap.get('MSI MAG B660M Mortar')],
        incompatibleWith: [productMap.get('ASUS Prime B550M-A')],
      },
      // Motherboard compatible with CPUs of same socket
      {
        productId: productMap.get('ASUS Prime B550M-A'),
        compatibleWith: [productMap.get('AMD Ryzen 5 5600X')],
        incompatibleWith: [productMap.get('Intel Core i5-12400F')],
      },
      {
        productId: productMap.get('MSI MAG B660M Mortar'),
        compatibleWith: [productMap.get('Intel Core i5-12400F')],
        incompatibleWith: [productMap.get('AMD Ryzen 5 5600X')],
      },
      // RAM compatible with motherboards of same type
      {
        productId: productMap.get('Corsair Vengeance LPX 16GB DDR4-3200'),
        compatibleWith: [productMap.get('ASUS Prime B550M-A'), productMap.get('MSI MAG B660M Mortar')],
        incompatibleWith: [],
      },
      {
        productId: productMap.get('G.Skill Ripjaws V 8GB DDR4-3600'),
        compatibleWith: [productMap.get('ASUS Prime B550M-A'), productMap.get('MSI MAG B660M Mortar')],
        incompatibleWith: [],
      },
      // Storage compatible with motherboards (most are)
      {
        productId: productMap.get('Samsung 970 EVO Plus 500GB NVMe SSD'),
        compatibleWith: [productMap.get('ASUS Prime B550M-A'), productMap.get('MSI MAG B660M Mortar')],
        incompatibleWith: [],
      },
      {
        productId: productMap.get('WD Blue 1TB HDD'),
        compatibleWith: [productMap.get('ASUS Prime B550M-A'), productMap.get('MSI MAG B660M Mortar')],
        incompatibleWith: [],
      },
      // GPU compatible with PSUs that meet wattage
      {
        productId: productMap.get('NVIDIA RTX 3060 12GB'),
        compatibleWith: [productMap.get('Corsair RM650x 650W 80+ Gold')],
        incompatibleWith: [productMap.get('EVGA 600 W1 600W 80+ White')],
      },
      {
        productId: productMap.get('AMD Radeon RX 6600 XT'),
        compatibleWith: [productMap.get('Corsair RM650x 650W 80+ Gold'), productMap.get('EVGA 600 W1 600W 80+ White')],
        incompatibleWith: [],
      },
      // PSU compatible with GPUs
      {
        productId: productMap.get('Corsair RM650x 650W 80+ Gold'),
        compatibleWith: [productMap.get('NVIDIA RTX 3060 12GB'), productMap.get('AMD Radeon RX 6600 XT')],
        incompatibleWith: [],
      },
      {
        productId: productMap.get('EVGA 600 W1 600W 80+ White'),
        compatibleWith: [productMap.get('AMD Radeon RX 6600 XT')],
        incompatibleWith: [productMap.get('NVIDIA RTX 3060 12GB')],
      },
      // Case compatible with motherboards of same form factor
      {
        productId: productMap.get('Fractal Design Meshify C Mini'),
        compatibleWith: [productMap.get('ASUS Prime B550M-A'), productMap.get('MSI MAG B660M Mortar')],
        incompatibleWith: [],
      },
      {
        productId: productMap.get('Cooler Master MasterBox NR600'),
        compatibleWith: [productMap.get('ASUS Prime B550M-A'), productMap.get('MSI MAG B660M Mortar')],
        incompatibleWith: [],
      },
      // Monitors and peripherals have no specific compatibility, but can be compatible with all
      {
        productId: productMap.get('Dell S2421H 24" 1080p IPS'),
        compatibleWith: [],
        incompatibleWith: [],
      },
      {
        productId: productMap.get('Acer Nitro VG270UP 27" 1440p IPS'),
        compatibleWith: [],
        incompatibleWith: [],
      },
      {
        productId: productMap.get('Logitech MX Master 3S'),
        compatibleWith: [],
        incompatibleWith: [],
      },
      {
        productId: productMap.get('Keychron K8 Wireless Mechanical Keyboard'),
        compatibleWith: [],
        incompatibleWith: [],
      },
    ];

    await CompatibilityRule.insertMany(compatibilityRulesData);

    console.log('Compatibility rules seeded');

    // Seed Inventory
    const inventoryData = productDocs.map(prod => ({
      product: prod._id,
      quantity: prod.stock,
      location: 'Main Warehouse',
    }));

    await Inventory.insertMany(inventoryData);

    console.log('Inventory seeded');

    console.log('Seed data populated successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    console.log('Seed script completed');
    // process.exit(); // Commented out for testing
  }
};

seedData();