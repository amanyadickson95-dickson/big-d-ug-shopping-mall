// ======================================================
// 1. FIREBASE PRODUCTION CREDENTIAL MATRIX
// ======================================================
const firebaseConfig = {
    apiKey: "AIzaSyAoOM8I-o5CpmA9_kNpaVRYdCrTDR1Wnf4",
    authDomain: "studio-328883854-f9b5b.firebaseapp.com",
    projectId: "studio-328883854-f9b5b",
    storageBucket: "studio-328883854-f9b5b.firebasestorage.app",
    messagingSenderId: "645236372393",
    appId: "1:645236372393:web:cdfb59c3d5eaa4e7dc8ab8"
};

// Initialize Engine Instances
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 20 Initial Local Seed Ads Per Category (Pre-set to Active)
let structuralDatabase = [
    // === PHONES & TABLETS (20 Ads) ===
    { id: "p1", status: "active", category: "phones", title: "iPhone 13 Pro Max - 256GB", price: "2500000", location: "Kampala", contact: "0770123456", description: "Super clean iPhone 13 Pro Max. Battery health 88%. No scratches.", images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500", "https://images.unsplash.com/photo-1565630916779-e303be97b6f5?w=500", "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500"] },
    { id: "p2", status: "active", category: "phones", title: "Samsung Galaxy S22 Ultra 5G", price: "2100000", location: "Entebbe", contact: "0752111222", description: "512GB Storage, Phantom Black, comes with original S-Pen. Working perfectly.", images: ["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500", "", ""] },
    { id: "p3", status: "active", category: "phones", title: "Oppo Reno 6 5G", price: "1150000", location: "Kampala", contact: "0783445566", description: "Stellar Black edition, 8GB RAM, 128GB ROM. High-quality camera execution.", images: ["https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500", "", ""] },
    { id: "p4", status: "active", category: "phones", title: "Infinix Note 30 Pro", price: "850000", location: "Mbarara", contact: "0701998877", description: "Magic Black, 68W fast charging, 256GB storage. Barely used.", images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500", "", ""] },
    { id: "p5", status: "active", category: "phones", title: "Google Pixel 7 Pro", price: "1850000", location: "Jinja", contact: "0772665544", description: "128GB Obsidian, Factory Unlocked, incredible AI camera features.", images: ["https://images.unsplash.com/photo-1565630916779-e303be97b6f5?w=500", "", ""] },
    { id: "p6", status: "active", category: "phones", title: "Tecno Camon 20 Premier", price: "950000", location: "Kampala", contact: "0751887766", description: "512GB storage, 8GB RAM, leather back layout design.", images: ["https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500", "", ""] },
    { id: "p7", status: "active", category: "phones", title: "Xiaomi Redmi Note 12 Pro", price: "780000", location: "Gulu", contact: "0785112233", description: "Dual SIM, Onyx Black, 128GB. Great battery life performance.", images: ["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500", "", ""] },
    { id: "p8", status: "active", category: "phones", title: "iPad Air 5 M1 Chip", price: "2300000", location: "Kampala", contact: "0706334455", description: "Space Gray, 64GB WiFi setup. Excellent choice for gaming and digital web work.", images: ["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500", "", ""] },
    { id: "p9", status: "active", category: "phones", title: "Samsung Galaxy A54 5G", price: "1200000", location: "Wakiso", contact: "0774009988", description: "Awesome Lime color, 256GB storage, water-resistant build frame.", images: ["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500", "", ""] },
    { id: "p10", status: "active", category: "phones", title: "iPhone 14 Pro - 128GB", price: "3200000", location: "Kampala", contact: "0759223344", description: "Deep Purple, Dynamic Island fully working, battery health 92%.", images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500", "", ""] },
    { id: "p11", status: "active", category: "phones", title: "Vivo V27 5G Edition", price: "1400000", location: "Entebbe", contact: "0781776655", description: "Color-changing back panel design, 256GB storage. Perfect portrait camera.", images: ["https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500", "", ""] },
    { id: "p12", status: "active", category: "phones", title: "Samsung Galaxy Note 20 Ultra", price: "1600000", location: "Kampala", contact: "0702554433", description: "Mystic Bronze, 256GB. Fluid 120Hz display configuration panel.", images: ["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500", "", ""] },
    { id: "p13", status: "active", category: "phones", title: "iPhone 11 Pro - 256GB", price: "1450000", location: "Mukono", contact: "0773889900", description: "Midnight Green, Face ID active, no system faults completely clean.", images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500", "", ""] },
    { id: "p14", status: "active", category: "phones", title: "Realme 11 Pro Plus", price: "1250000", location: "Kampala", contact: "0754332211", description: "200MP camera matrix, Sunrise Beige leather back layout.", images: ["https://images.unsplash.com/photo-1565630916779-e303be97b6f5?w=500", "", ""] },
    { id: "p15", status: "active", category: "phones", title: "OnePlus 10 Pro 5G", price: "1750000", location: "Wakiso", contact: "0789665544", description: "Hasselblad Camera tech, 12GB RAM, Volcanic Black pristine setup.", images: ["https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500", "", ""] },
    { id: "p16", status: "active", category: "phones", title: "Tecno Spark 20 Pro", price: "650000", location: "Masaka", contact: "0705113355", description: "256GB Storage, 8GB RAM, modern look and heavy battery life module.", images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500", "", ""] },
    { id: "p17", status: "active", category: "phones", title: "iPhone 12 - 128GB Black", price: "1600000", location: "Kampala", contact: "0771882299", description: "Unlocked, fully tested, True Tone active, very minor edge wear.", images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500", "", ""] },
    { id: "p18", status: "active", category: "phones", title: "Samsung Galaxy Tab S8", price: "1900000", location: "Kampala", contact: "0758442211", description: "11-inch premium tablet setup, perfect configuration for document edits.", images: ["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500", "", ""] },
    { id: "p19", status: "active", category: "phones", title: "Huawei P50 Pro Dual SIM", price: "1550000", location: "Jinja", contact: "0782337711", description: "8GB RAM, Cocoa Gold finish, crystal clear high zoom optics.", images: ["https://images.unsplash.com/photo-1565630916779-e303be97b6f5?w=500", "", ""] },
    { id: "p20", status: "active", category: "phones", title: "iPhone SE 2022 (3rd Gen)", price: "950000", location: "Kampala", contact: "0703887711", description: "64GB Product Red edition, fast A15 Bionic performance framework.", images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500", "", ""] },

    // === VEHICLES (20 Ads) ===
    { id: "v1", status: "active", category: "vehicles", title: "Toyota Harrier 2015 Silver", price: "68000000", location: "Wakiso", contact: "0701987654", description: "Excellent driving condition Toyota Harrier. Low mileage record. Custom rims.", images: ["https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=500", "", ""] },
    { id: "v2", status: "active", category: "vehicles", title: "Toyota Corolla Fielder 2012", price: "32000000", location: "Kampala", contact: "0774556677", description: "1490cc engine, silver metallic, extremely low fuel consumption profile.", images: ["https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=500", "", ""] },
    { id: "v3", status: "active", category: "vehicles", title: "Subaru Forester XT 2014", price: "48000000", location: "Entebbe", contact: "0753229988", description: "Turbocharged engine layout, dark blue pearl finish, symmetrical AWD.", images: ["https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500", "", ""] },
    { id: "v4", status: "active", category: "vehicles", title: "Toyota Premio UAN Series", price: "24500000", location: "Mukono", contact: "0784551122", description: "Clean beige interior paneling, well-maintained home commuter vehicle.", images: ["https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=500", "", ""] },
    { id: "v5", status: "active", category: "vehicles", title: "Mercedes Benz C200 2011", price: "42000000", location: "Kampala", contact: "0706337744", description: "Avantgarde spec matrix, automatic transmission, pristine leather seats.", images: ["https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500", "", ""] },
    { id: "v6", status: "active", category: "vehicles", title: "Toyota RAV4 2008 (Vanguard)", price: "38000000", location: "Kampala", contact: "0772551199", description: "7-Seater layout configuration, pearl white, ready for field assignments.", images: ["https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500", "", ""] },
    { id: "v7", status: "active", category: "vehicles", title: "Honda Fit 2013 Model", price: "22000000", location: "Mbarara", contact: "0751993388", description: "Black hatchback, super fuel saver, perfect unit for town rides.", images: ["https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=500", "", ""] },
    { id: "v8", status: "active", category: "vehicles", title: "Toyota Land Cruiser Prado TX", price: "85000000", location: "Kampala", contact: "0788663322", description: "2010 year model, Diesel engine block, dark gray executive look.", images: ["https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500", "", ""] },
    { id: "v9", status: "active", category: "vehicles", title: "Mazda Demio 2014 Skyactiv", price: "24000000", location: "Wakiso", contact: "0705448822", description: "Light blue, digital dashboard layout meters, clean engine health.", images: ["https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=500", "", ""] },
    { id: "v10", status: "active", category: "vehicles", title: "Toyota Wish 2010 (New Shape)", price: "29500000", location: "Kampala", contact: "0771442299", description: "7-seater family utility carrier, dark violet color tier, AC freezing cold.", images: ["https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=500", "", ""] },
    { id: "v11", status: "active", category: "vehicles", title: "Nissan X-Trail 2014 AWD", price: "45000000", location: "Entebbe", contact: "0759338811", description: "Panoramic sunroof, push start module button, dark red metallic layout.", images: ["https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500", "", ""] },
    { id: "v12", status: "active", category: "vehicles", title: "Toyota Vitz 2012 Model", price: "19500000", location: "Kampala", contact: "0783115599", description: "Metallic hot pink, lady driven, very clean engine space.", images: ["https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=500", "", ""] },
    { id: "v13", status: "active", category: "vehicles", title: "Mitsubishi Pajero iO 2005", price: "18000000", location: "Jinja", contact: "0702884433", description: "Short chassis offroad model, fully functional manual 4WD shifter lever.", images: ["https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500", "", ""] },
    { id: "v14", status: "active", category: "vehicles", title: "Toyota Mark X 250G 2011", price: "34000000", location: "Kampala", contact: "0775778811", description: "V6 sport engine module, premium dark black interior framing.", images: ["https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500", "", ""] },
    { id: "v15", status: "active", category: "vehicles", title: "Subaru Impreza 2013 Hatch", price: "26500000", location: "Wakiso", contact: "0754226600", description: "AWD, Pearl Silver finish, smooth shifting continuously variable system.", images: ["https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=500", "", ""] },
    { id: "v16", status: "active", category: "vehicles", title: "Toyota Hilux Revo PickUp", price: "115000000", location: "Kampala", contact: "0789115533", description: "Double cabin 2016 model, heavy offroad modification kit attached.", images: ["https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500", "", ""] },
    { id: "v17", status: "active", category: "vehicles", title: "Suzuki Swift 2014 Sports", price: "23000000", location: "Kampala", contact: "0701449911", description: "Yellow sports tuning accent design lines, manual gearing option.", images: ["https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=500", "", ""] },
    { id: "v18", status: "active", category: "vehicles", title: "Toyota Hiace Drone Van", price: "65000000", location: "Kampala", contact: "0772338800", description: "Commercial transport van, diesel fuel system, clean seating format layout.", images: ["https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=500", "", ""] },
    { id: "v19", status: "active", category: "vehicles", title: "Volkswagen Golf7 TSI 2014", price: "37000000", location: "Entebbe", contact: "0758114422", description: "Turbo direct injection fuel pipeline, automatic, sleek white frame build.", images: ["https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500", "", ""] },
    { id: "v20", status: "active", category: "vehicles", title: "Toyota Sienta 2010 Utility", price: "21500000", location: "Mukono", contact: "0706225588", description: "Sliding electronic doors setup, silver pearl panel paint overlay.", images: ["https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=500", "", ""] },

    // === REAL ESTATE (20 Ads) ===
    { id: "r1", status: "active", category: "real-estate", title: "2 Bedroom Apartment - Kira", price: "180000000", location: "Kira", contact: "0782998877", description: "Modern design construction, gated compound space with perimeter wall monitoring.", images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500", "", ""] },
    { id: "r2", status: "active", category: "real-estate", title: "Plot of Land 50x100ft Gayaza", price: "35000000", location: "Gayaza", contact: "0705114477", description: "Ready land title certificate available, water and national power lines nearby.", images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500", "", ""] },
    { id: "r3", status: "active", category: "real-estate", title: "Bungalow Shell For Sale Sonde", price: "140000000", location: "Sonde", contact: "0753882200", description: "4 Bedrooms layout plan, roofing stage completely finished. Great project.", images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500", "", ""] },
    { id: "r4", status: "active", category: "real-estate", title: "Rental Units monthly income", price: "450000000", location: "Kisaasi", contact: "0771004455", description: "5 fully tenanted double room apartment units bringing live monthly revenue.", images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500", "", ""] },
    { id: "r5", status: "active", category: "real-estate", title: "Prime Commercial Plot Kampala", price: "950000000", location: "Kampala Central", contact: "0704998833", description: "Direct tarmac main road access panel. Perfect setup for automated mall yards.", images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500", "", ""] },
    { id: "r6", status: "active", category: "real-estate", title: "Furnished Studio Apt Muyenga", price: "280000000", location: "Muyenga", contact: "0785331100", description: "Lake view overlook patio balcony frame, high class air conditioning modules.", images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500", "", ""] },
    { id: "r7", status: "active", category: "real-estate", title: "Acre of Farm Land Mukono", price: "65000000", location: "Mukono Rural", contact: "0759227744", description: "Deep black soil structure ideal for crop farming projects or ranch layout.", images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500", "", ""] },
    { id: "r8", status: "active", category: "real-estate", title: "Luxury 5 Bed Villa Munyonyo", price: "1200000000", location: "Munyonyo", contact: "0776882255", description: "Swimming pool deck, automated smart gates layout, high end secure enclave.", images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500", "", ""] },
    { id: "r9", status: "active", category: "real-estate", title: "3 Bed Estate House Matugga", price: "95000000", location: "Matugga", contact: "0702441188", description: "Newly built modern residential home with fully finished internal paint coats.", images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500", "", ""] },
    { id: "r10", status: "active", category: "real-estate", title: "Estate Plots Registered Kaji", price: "18000000", location: "Luweero", contact: "0773559922", description: "Surveyed corner stones fixed on ground. Freehold land registry documents.", images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500", "", ""] },
    { id: "r11", status: "active", category: "real-estate", title: "Office Space to Rent Kololo", price: "4500000", location: "Kololo", contact: "0751003311", description: "200 sqm open workspace layout with separate server rack closet room.", images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500", "", ""] },
    { id: "r12", status: "active", category: "real-estate", title: "Residential Compound Naalya", price: "550000000", location: "Naalya", contact: "0788443311", description: "Beautiful lawn garden block with mature palm trees framing the house front.", images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500", "", ""] },
    { id: "r13", status: "active", category: "real-estate", title: "2 Acre Industrial Plot Namanve", price: "1600000000", location: "Namanve", contact: "0706220055", description: "Industrial park zone setup with massive heavy truck entry gate access points.", images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500", "", ""] },
    { id: "r14", status: "active", category: "real-estate", title: "Townhouse Duplex Najeera", price: "320000000", location: "Najeera", contact: "0774332211", description: "3 levels design, Italian kitchen layout fittings, parking garage block.", images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500", "", ""] },
    { id: "r15", status: "active", category: "real-estate", title: "Lake View Land Garuga", price: "150000000", location: "Entebbe road", contact: "0759441199", description: "Direct view onto Victoria waters, ideal location for resort or hotel site.", images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500", "", ""] },
    { id: "r16", status: "active", category: "real-estate", title: "Single Room Rentals Block", price: "85000000", location: "Bweyogerere", contact: "0701552288", description: "Steady daily/weekly rental collections from ongoing local neighborhood market.", images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500", "", ""] },
    { id: "r17", status: "active", category: "real-estate", title: "4 Bedroom Mansion Kyanja", price: "480000000", location: "Kyanja", contact: "0772773300", description: "Ultra modern glass architecture balustrades, luxury high ceiling design.", images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500", "", ""] },
    { id: "r18", status: "active", category: "real-estate", title: "10 Decimals Plot Bulindo", price: "42000000", location: "Bulindo", contact: "0758440022", description: "Developing middle class neighborhood, piped water utility network ready.", images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500", "", ""] },
    { id: "r19", status: "active", category: "real-estate", title: "Warehouse Facility For Sale", price: "2200000000", location: "Industrial Area", contact: "0785110099", description: "Huge open hall space with overhead crane tracks structural reinforcement.", images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500", "", ""] },
    { id: "r20", status: "active", category: "real-estate", title: "Country Farmhouse Jinja Road", price: "250000000", location: "Lugazi", contact: "0703661155", description: "Surrounded by tea estates landscape, vintage wood panel design finishes.", images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500", "", ""] },

    // === ELECTRONICS (20 Ads) ===
    { id: "e1", status: "active", category: "electronics", title: "HP EliteBook 840 G8 Laptop", price: "1650000", location: "Kampala", contact: "0752003344", description: "Core i7 setup, 16GB RAM, 512GB SSD. Premium aluminum shell frame.", images: ["https://images.unsplash.com/photo-1496181130204-755241524eab?w=500", "", ""] },
    { id: "e2", status: "active", category: "electronics", title: "Sony PS5 Console (Disc Edition)", price: "2400000", location: "Kampala", contact: "0774889911", description: "Comes package sealed with two controllers and 1 free game disk.", images: ["https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500", "", ""] },
    { id: "e3", status: "active", category: "electronics", title: "Hisense 55-Inch Smart 4K TV", price: "1850000", location: "Wakiso", contact: "0703551100", description: "Frameless display configuration matrix, runs Netflix and YouTube app streams natively.", images: ["https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=500", "", ""] },
    { id: "e4", status: "active", category: "electronics", title: "MacBook Pro M1 2020", price: "2800000", location: "Kampala", contact: "0784990022", description: "Space Gray, 8GB unified RAM module, 256GB storage disk. Excellent battery cycle logs.", images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500", "", ""] },
    { id: "e5", status: "active", category: "electronics", title: "Dell Latitude 5490 Office PC", price: "850000", location: "Mbarara", contact: "0755227711", description: "Core i5 8th gen processor, 8GB RAM, ideal configuration for accounting scripts.", images: ["https://images.unsplash.com/photo-1496181130204-755241524eab?w=500", "", ""] },
    { id: "e6", status: "active", category: "electronics", title: "JBL Boombox 3 Speaker", price: "1400000", location: "Kampala", contact: "0771884433", description: "Original heavy bass portable box speaker setup, waterproof armor shell.", images: ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500", "", ""] },
    { id: "e7", status: "active", category: "electronics", title: "Canon EOS 80D DSLR Camera", price: "2100000", location: "Entebbe", contact: "0702661144", description: "Includes 18-135mm stabilization zoom lens kit bundle. Perfect state equipment.", images: ["https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500", "", ""] },
    { id: "e8", status: "active", category: "electronics", title: "Samsung Double Door Fridge", price: "2600000", location: "Kampala", contact: "0785116633", description: "Digital inverter motor system saves power usage grid bills. Safe ice box filter.", images: ["https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500", "", ""] },
    { id: "e9", status: "active", category: "electronics", title: "Asus ROG Strix Gaming Laptop", price: "3500000", location: "Kampala", contact: "0759332200", description: "RTX 3060 graphics processor, RGB light rows keyboard frame, supreme refresh panel.", images: ["https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500", "", ""] },
    { id: "e10", status: "active", category: "electronics", title: "Anker PowerCore 20000mAh", price: "180000", location: "Kampala", contact: "0773005511", description: "Dual fast USB output interfaces. Charges any mobile model up to 5 times over.", images: ["https://images.unsplash.com/photo-1609592424209-dd967241897a?w=500", "", ""] },
    { id: "e11", status: "active", category: "electronics", title: "Apple AirPods Pro 2nd Gen", price: "750000", location: "Kampala", contact: "0705443399", description: "Active noise cancellation firmware matrix blocks ambient sound waves completely.", images: ["https://images.unsplash.com/photo-1588449668338-d15168822481?w=500", "", ""] },
    { id: "e12", status: "active", category: "electronics", title: "LG Smart Washing Machine", price: "2300000", location: "Wakiso", contact: "0782119955", description: "8KG drum capacity matrix loading gate, advanced automatic spinning cycles.", images: ["https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500", "", ""] },
    { id: "e13", status: "active", category: "electronics", title: "Lenovo ThinkPad X1 Carbon", price: "1950000", location: "Kampala", contact: "0751662288", description: "Super lightweight executive computing device build, carbon fiber layout weave.", images: ["https://images.unsplash.com/photo-1496181130204-755241524eab?w=500", "", ""] },
    { id: "e14", status: "active", category: "electronics", title: "DJI Mini 2 SE Drone Quad", price: "1800000", location: "Jinja", contact: "0706771144", description: "Incredible stable flight navigation chip, captures glorious 2.7K aerial maps.", images: ["https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=500", "", ""] },
    { id: "e15", status: "active", category: "electronics", title: "Sony WH-1000XM4 Headphones", price: "950000", location: "Kampala", contact: "0775338800", description: "Premium sound processing framework overdrive, pristine state ear cushion cups.", images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500", "", ""] },
    { id: "e16", status: "active", category: "electronics", title: "HP Laserjet Pro M404dn", price: "880000", location: "Kampala", contact: "0754229911", description: "High volume monochrome laser printing engine block, fast double sided mechanics.", images: ["https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500", "", ""] },
    { id: "e17", status: "active", category: "electronics", title: "iPad Pro 12.9 Inch (128GB)", price: "3100000", location: "Kampala", contact: "0789771133", description: "Liquid Retina XDR panel configuration screen setup with mini-LED backlights.", images: ["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500", "", ""] },
    { id: "e18", status: "active", category: "electronics", title: "Yamaha PSR-E373 Keyboard", price: "1100000", location: "Mukono", contact: "0701884400", description: "61 touch-sensitive music keys layout board. Great tool for church or studio tracks.", images: ["https://images.unsplash.com/photo-1552422535-c45813c61732?w=500", "", ""] },
    { id: "e19", status: "active", category: "electronics", title: "Philips Air Fryer XL size", price: "650000", location: "Kampala", contact: "0774225577", description: "Rapid air technology hot circulation vortex, bake clean meals with zero oils.", images: ["https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500", "", ""] },
    { id: "e20", status: "active", category: "electronics", title: "Nintendo Switch OLED Neon", price: "1350000", location: "Kampala", contact: "0758339911", description: "Vivid 7-inch handheld gaming console screen format layout, zero stick drifting.", images: ["https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500", "", ""] }
];

let currentFilter = "all";
let searchQuery = "";
let calculatedFee = 3000;

let isGoogleUserLoggedIn = localStorage.getItem('isGoogleUserLoggedIn') === 'true';
const ADMIN_PASSWORD = "27270";

// ======================================================
// 2. STABLE LIVE DATABASE SNAPSHOT LISTENERS
// ======================================================
function attachRealtimeDatabaseListener() {
    db.collection("ads").onSnapshot((snapshot) => {
        // Safe Memory Separation: Re-isolate hardcoded local items so snapshot drops never erase them
        structuralDatabase = structuralDatabase.filter(item => 
            typeof item.id === 'string' && (
                item.id.startsWith('p') || 
                item.id.startsWith('v') || 
                item.id.startsWith('r') || 
                item.id.startsWith('e')
            )
        );
        
        // Append all incoming online submissions directly from the live Firestore cluster
        snapshot.forEach((doc) => {
            const data = doc.data();
            if (data) {
                // Prevent duplicate tracking artifacts
                if (!structuralDatabase.some(existingItem => existingItem.id === doc.id)) {
                    structuralDatabase.push({
                        id: doc.id,
                        status: data.status || "pending",
                        category: data.category || "phones",
                        title: data.title || "Untitled Item",
                        price: String(data.price || "0"),
                        location: data.location || "Unknown",
                        contact: data.contact || "",
                        description: data.description || "",
                        images: data.images || ["", "", ""],
                        payeeName: data.payeeName || "Anonymous",
                        transactionId: data.transactionId || "N/A"
                    });
                }
            }
        });

        // Push updates to UI immediately
        renderAds();
        renderAdminDashboard();
    }, (error) => {
        console.error("Critical Stream Exception: ", error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    // Ignite listeners immediately
    attachRealtimeDatabaseListener();

    // --- Banner Carousels Slideshow Logic ---
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    let currentSlideIndex = 0;

    if (slides.length > 0) {
        function transitionSlideshow() {
            slides[currentSlideIndex].classList.remove("active");
            dots[currentSlideIndex].classList.remove("active");
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            slides[currentSlideIndex].classList.add("active");
            dots[currentSlideIndex].classList.add("active");
        }
        setInterval(transitionSlideshow, 3500);
    }

    // --- DOM Interface Controls Object Caches ---
    const adModal = document.getElementById('adModal');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    
    const googleAuthModal = document.getElementById('googleAuthModal');
    const googleAuthBtn = document.getElementById('googleAuthBtn');
    const closeAuthModalBtn = document.getElementById('closeAuthModalBtn');
    const confirmGoogleLoginBtn = document.getElementById('confirmGoogleLoginBtn');

    const adminModal = document.getElementById('adminModal');
    const openAdminBtn = document.getElementById('openAdminBtn');
    const closeAdminModalBtn = document.getElementById('closeAdminModalBtn');
    
    const stepDetails = document.getElementById('stepDetails');
    const stepPayment = document.getElementById('stepPayment');
    const adsGrid = document.getElementById('adsGrid');
    const feedHeading = document.getElementById('feedHeading');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const detailsModal = document.getElementById('detailsModal');
    const closeDetailsBtn = document.getElementById('closeDetailsBtn');
    const itemCategory = document.getElementById('itemCategory');
    
    const goToPaymentBtn = document.getElementById('goToPaymentBtn');
    const goToDetailsBtn = document.getElementById('goToDetailsBtn');
    const submitPaymentBtn = document.getElementById('submitPaymentBtn');

    if (isGoogleUserLoggedIn) {
        googleAuthBtn.innerHTML = `<i class="fas fa-user-circle"></i> Google Account Connected`;
        googleAuthBtn.classList.add('logged-in');
    }

    setupCategoryFilters();
    setupSearchFunctionality();
    updateDynamicPricingNotice();

    itemCategory.addEventListener('change', updateDynamicPricingNotice);

    // --- Sign-In Actions ---
    googleAuthBtn.addEventListener('click', () => {
        if (isGoogleUserLoggedIn) {
            isGoogleUserLoggedIn = false;
            localStorage.setItem('isGoogleUserLoggedIn', 'false');
            googleAuthBtn.innerHTML = `<i class="fab fa-google"></i> Sign In with Google`;
            googleAuthBtn.classList.remove('logged-in');
            alert("Signed out from Google Account.");
        } else {
            googleAuthModal.classList.add('active');
        }
    });

    closeAuthModalBtn.addEventListener('click', () => googleAuthModal.classList.remove('active'));

    confirmGoogleLoginBtn.addEventListener('click', () => {
        isGoogleUserLoggedIn = true;
        localStorage.setItem('isGoogleUserLoggedIn', 'true');
        googleAuthBtn.innerHTML = `<i class="fas fa-user-circle"></i> Google Account Connected`;
        googleAuthBtn.classList.add('logged-in');
        googleAuthModal.classList.remove('active');
        alert("✅ Authenticated successfully with Google!");
    });

    // --- UI Gate Guards ---
    if (openModalBtn) {
        openModalBtn.addEventListener('click', () => { 
            if (!isGoogleUserLoggedIn) {
                googleAuthModal.classList.add('active');
                alert("🔒 Access Denied! Every user must login with a Google Account first before listing ads.");
                return;
            }
            adModal.classList.add('active'); 
            goToDetails(); 
        });
    }
    
    if (closeModalBtn) closeModalBtn.addEventListener('click', () => adModal.classList.remove('active'));
    
    if (openAdminBtn) {
        openAdminBtn.addEventListener('click', () => { 
            const accessKey = prompt("🔒 Enter Admin Access Pin:");
            if (accessKey === ADMIN_PASSWORD) {
                adminModal.classList.add('active'); 
                renderAdminDashboard(); 
            } else if (accessKey !== null) {
                alert("❌ Access Denied!");
            }
        });
    }
    
    if (closeAdminModalBtn) closeAdminModalBtn.addEventListener('click', () => adminModal.classList.remove('active'));
    if (closeDetailsBtn) closeDetailsBtn.addEventListener('click', () => detailsModal.classList.remove('active'));

    if (goToPaymentBtn) {
        goToPaymentBtn.addEventListener('click', () => {
            if (!document.getElementById('itemTitle').value || !document.getElementById('itemPrice').value || 
                !document.getElementById('itemLocation').value || !document.getElementById('itemContact').value ||
                !document.getElementById('itemDescription').value || 
                !document.getElementById('itemImage1').value || 
                !document.getElementById('itemImage2').value || 
                !document.getElementById('itemImage3').value) {
                alert("Please fill in all details, including all 3 required images to continue.");
                return;
            }
            document.getElementById('dynamicPriceBox').innerHTML = `Amount to Send: <strong>UGX ${calculatedFee.toLocaleString()}</strong>`;
            stepDetails.classList.remove('active');
            stepPayment.classList.add('active');
        });
    }

    if (goToDetailsBtn) goToDetailsBtn.addEventListener('click', goToDetails);
    if (submitPaymentBtn) submitPaymentBtn.addEventListener('click', processManualPaymentSubmit);

    function goToDetails() { stepPayment.classList.remove('active'); stepDetails.classList.add('active'); }

    function updateDynamicPricingNotice() {
        const selectedCat = itemCategory.value;
        const priceTagLabel = document.getElementById('categoryPriceTag');
        if (!priceTagLabel) return;
        if (selectedCat === "vehicles" || selectedCat === "real-estate") {
            calculatedFee = 30000;
            priceTagLabel.innerText = "Premium Category Listing Fee: UGX 30,000 / month";
        } else {
            calculatedFee = 3000;
            priceTagLabel.innerText = "Standard Category Listing Fee: UGX 3,000";
        }
    }

    function setupSearchFunctionality() {
        searchInput.addEventListener('input', (e) => { searchQuery = e.target.value.toLowerCase().trim(); renderAds(); });
        searchBtn.addEventListener('click', () => { searchQuery = searchInput.value.toLowerCase().trim(); renderAds(); });
    }

    function setupCategoryFilters() {
        const categories = document.querySelectorAll('.cat-card');
        categories.forEach(card => {
            card.addEventListener('click', () => {
                categories.forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                currentFilter = card.getAttribute('data-category');
                renderAds();
            });
        });
    }

    // ======================================================
    // 3. UI GENERATION INTERFACES (HOMEPAGE FEED)
    // ======================================================
    function renderAds() {
        if (!adsGrid) return;
        adsGrid.innerHTML = ""; 
        
        let approvedItems = structuralDatabase.filter(item => item.status === "active");
        let itemsToDisplay = currentFilter === "all" ? approvedItems : approvedItems.filter(item => item.category === currentFilter);
            
        if (searchQuery !== "") {
            itemsToDisplay = itemsToDisplay.filter(item => 
                item.title.toLowerCase().includes(searchQuery) || 
                item.description.toLowerCase().includes(searchQuery) ||
                item.location.toLowerCase().includes(searchQuery)
            );
            feedHeading.innerText = `Search Results for "${searchQuery}"`;
        } else {
            feedHeading.innerText = `Trending Ads (${currentFilter.toUpperCase().replace("-", " ")})`;
        }

        if(itemsToDisplay.length === 0) {
            adsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; padding: 40px; color:#999;">No verified items listed.</p>`;
            return;
        }

        itemsToDisplay.forEach(item => {
            const adCard = document.createElement('div');
            adCard.classList.add('ad-card');
            adCard.addEventListener('click', () => openAdDetails(item.id));
            
            let formattedPrice = item.price;
            if(!String(formattedPrice).includes(",")) {
                formattedPrice = Number(String(formattedPrice).replace(/[^0-9]/g, '')).toLocaleString();
            }

            adCard.innerHTML = `
                <div class="ad-image" style="background-image: url('${item.images[0]}'); height: 160px; background-size: cover; background-position: center;"></div>
                <div class="ad-info">
                    <h4 class="ad-title">${item.title}</h4>
                    <p class="ad-price">UGX ${formattedPrice}</p>
                    <div class="ad-meta-row"><span><i class="fas fa-map-marker-alt"></i> ${item.location}</span></div>
                </div>
            `;
            adsGrid.appendChild(adCard);
        });
    }

    function openAdDetails(id) {
        const item = structuralDatabase.find(p => p.id === id);
        if(!item) return;

        document.getElementById('detailCategory').innerText = item.category.toUpperCase();
        document.getElementById('detailTitle').innerText = item.title;
        
        let detailPriceFormatted = item.price;
        if(!String(detailPriceFormatted).includes(",")) {
            detailPriceFormatted = Number(String(detailPriceFormatted).replace(/[^0-9]/g, '')).toLocaleString();
        }
        document.getElementById('detailPrice').innerText = `UGX ${detailPriceFormatted}`;
        document.getElementById('detailLocation').innerText = item.location;
        document.getElementById('detailDescription').innerText = item.description;
        
        document.getElementById('detailCallBtn').href = `tel:${item.contact}`;
        document.getElementById('detailSampleWaBtn').href = `https://wa.me/${item.contact}?text=Hello,%20I%20am%20interested%20in%20your%20ad:%20${encodeURIComponent(item.title)}`;

        const previewContainer = document.getElementById('detailMainImg');
        previewContainer.style.backgroundImage = `url('${item.images[0]}')`;
        
        const thumbRow = document.getElementById('detailThumbnails');
        thumbRow.innerHTML = "";
        item.images.forEach((imgUrl, idx) => {
            if(!imgUrl) return;
            const thumb = document.createElement('div');
            thumb.classList.add('thumb-img');
            if(idx === 0) thumb.classList.add('active');
            thumb.style.backgroundImage = `url('${imgUrl}')`;
            thumb.addEventListener('click', () => {
                document.querySelectorAll('.thumb-img').forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
                previewContainer.style.backgroundImage = `url('${imgUrl}')`;
            });
            thumbRow.appendChild(thumb);
        });

        detailsModal.classList.add('active'); 
    }

    // ======================================================
    // 4. PERSISTED DATA TRANSMISSIONS
    // ======================================================
    function processManualPaymentSubmit() {
        const payeeName = document.getElementById('payeeName').value.trim();
        const transactionId = document.getElementById('transactionId').value.trim();

        if(!payeeName || !transactionId) {
            alert("Please supply payment fields.");
            return;
        }

        let cleanRawPrice = document.getElementById('itemPrice').value.replace(/[^0-9]/g, '');

        const verificationPayload = {
            status: "pending", 
            payeeName: payeeName,
            transactionId: transactionId,
            category: itemCategory.value,
            title: document.getElementById('itemTitle').value,
            price: cleanRawPrice, 
            location: document.getElementById('itemLocation').value,
            contact: document.getElementById('itemContact').value,
            description: document.getElementById('itemDescription').value,
            images: [
                document.getElementById('itemImage1').value,
                document.getElementById('itemImage2').value,
                document.getElementById('itemImage3').value
            ],
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        db.collection("ads").add(verificationPayload)
            .then(() => {
                alert(`📥 Submission Logged under review online!\n\nOnce approved by the admin, your ad goes live instantly across all devices.`);
                document.getElementById('adForm').reset();
                document.getElementById('payeeName').value = "";
                document.getElementById('transactionId').value = "";
                adModal.classList.remove('active');
            })
            .catch((error) => {
                alert("Failed to sync ad online. Check connection protocols or database security rules.");
                console.error("Firestore Error: ", error);
            });
    }

    function renderAdminDashboard() {
        const container = document.getElementById('adminTableContainer');
        if (!container) return;

        let pendingItems = structuralDatabase.filter(item => item.status === "pending");

        if (pendingItems.length === 0) {
            container.innerHTML = `<p style="text-align: center; padding: 20px; color: #777;">No pending ads to approve right now.</p>`;
            return;
        }

        let tableHtml = `
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 13px;">
                <thead>
                    <tr style="background: #f4f4f4; border-bottom: 2px solid #ddd; text-align: left;">
                        <th style="padding: 10px;">Item Details</th>
                        <th style="padding: 10px;">Sender Name</th>
                        <th style="padding: 10px;">Transaction ID</th>
                        <th style="padding: 10px; text-align: center;">Action</th>
                    </tr>
                </thead>
                <tbody>
        `;

        pendingItems.forEach(item => {
            let adminPrice = item.price;
            if(!String(adminPrice).includes(",")) {
                adminPrice = Number(String(adminPrice).replace(/[^0-9]/g, '')).toLocaleString();
            }

            tableHtml += `
                <tr style="border-bottom: 1px solid #eee;">
                    <td style="padding: 10px;"><strong>${item.title}</strong><br><span style="color:#777;">${item.category} | UGX ${adminPrice}</span></td>
                    <td style="padding: 10px;">${item.payeeName}</td>
                    <td style="padding: 10px;"><code style="background: #fff3e0; padding: 2px 6px; border-radius: 4px; color: #e65100;">${item.transactionId}</code></td>
                    <td style="padding: 10px; text-align: center;">
                        <button class="approve-action-btn" data-id="${item.id}" style="background: #2e7d32; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-weight: bold;">Approve</button>
                    </td>
                </tr>
            `;
        });

        tableHtml += `</tbody></table>`;
        container.innerHTML = tableHtml;

        const approveButtons = container.querySelectorAll('.approve-action-btn');
        approveButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const adId = e.target.getAttribute('data-id');
                approveAd(adId);
            });
        });
    }

    function approveAd(id) {
        if (!id) return;
        
        db.collection("ads").doc(id).update({
            status: "active"
        })
        .then(() => {
            alert(`✅ Ad verified! It is now live on the public market homepage.`);
        })
        .catch((error) => {
            alert("Error updating database item states.");
            console.error("Firestore Update Error: ", error);
        });
    }
});
