import acerBattery from "../Assets/Batteries/acer-battery.png"
import asusBattery from "../Assets/Batteries/asus-battery.png"
import dellBattery from "../Assets/Batteries/dell-battery.png"
import hpBattery from "../Assets/Batteries/hp-battery.png"
import lenovoBattery from "../Assets/Batteries/lenovo-battery.png"
import edp30pin from "../Assets/Cables/edp-30pin.png"
import satacable from "../Assets/Cables/sata-cable.png"
import dell65w from "../Assets/Chargers/dell-65w.png"
import hp65w from "../Assets/Chargers/hp-65w.png"
import lenovousbc from "../Assets/Chargers/lenovo-usbc.png"
import seagate1tb from "../Assets/HDD/seagate-1tb.png"
import wdblue1tb from "../Assets/HDD/wd-blue-1tb.png"
import dellkeyboard from "../Assets/Keyboards/dell-keyboard.png"
import hpkeyboard from "../Assets/Keyboards/hp-keyboard.png"
import lenovokeyboard from '../Assets/Keyboards/lenovo-keyboard.png'
import corei511thBoard from "../Assets/Motherboard/core-i5-11th-gen-board.jpg";
import crucial8gb from "../Assets/Motherboard/crucial-8gb-ddr4-3200.jpg";
import dellInspironFan from "../Assets/Motherboard/dell-inspiron-fan.jpg";
import hp15Hinge from "../Assets/Motherboard/hp-15-bs-hinge-pair.jpg";
import intelAX210 from "../Assets/Motherboard/intel-ax210-wifi6e.jpg";
import screen14 from "../Assets/Screens/14-inch-fhd.png";
import screen156 from "../Assets/Screens/15.6-inch-fhd.png";


const products = [
  {
    "id": 1,
    "category": "Battery",
    "brand": "Acer",
    "name": "Acer Laptop Battery",
    "model": "Compatible Replacement Battery",
    "image": acerBattery,
    "description": "High-quality replacement battery for Acer laptops with reliable backup and long battery life.",
    "features": [
      "100% Compatible",
      "Long Backup",
      "Overcharge Protection",
      "6-12 Months Warranty"
    ],
    "availability": "In Stock",
    "service": "Installation Available",
    "price": "Contact for Price"
  },
  {
    "id": 2,
    "category": "Battery",
    "brand": "ASUS",
    "name": "ASUS Laptop Battery",
    "model": "Compatible Replacement Battery",
    "image": asusBattery,
    "description": "Premium replacement battery suitable for most ASUS laptop models.",
    "features": [
      "OEM Quality",
      "High Capacity",
      "Safety Certified"
    ],
    "availability": "In Stock",
    "service": "Installation Available",
    "price": "Contact for Price"
  },
  {
    "id": 3,
    "category": "Battery",
    "brand": "Dell",
    "name": "Dell Laptop Battery",
    "model": "Compatible Replacement Battery",
    "image": dellBattery,
    "description": "Reliable Dell replacement battery with excellent backup performance.",
    "features": [
      "OEM Compatible",
      "Fast Charging",
      "Long Life"
    ],
    "availability": "In Stock",
    "service": "Installation Available",
    "price": "Contact for Price"
  },
  {
    "id": 4,
    "category": "Battery",
    "brand": "HP",
    "name": "HP Laptop Battery",
    "model": "Compatible Replacement Battery",
    "image": hpBattery,
    "description": "Original quality HP laptop battery replacement.",
    "features": [
      "Safety Protection",
      "High Capacity",
      "Warranty Included"
    ],
    "availability": "In Stock",
    "service": "Installation Available",
    "price": "Contact for Price"
  },
  {
    "id": 5,
    "category": "Battery",
    "brand": "Lenovo",
    "name": "Lenovo Laptop Battery",
    "model": "Compatible Replacement Battery",
    "image": lenovoBattery,
    "description": "High-performance battery for Lenovo ThinkPad, IdeaPad and Legion series.",
    "features": [
      "OEM Compatible",
      "High Backup",
      "Certified Cells"
    ],
    "availability": "In Stock",
    "service": "Installation Available",
    "price": "Contact for Price"
  },

  {
    "id": 6,
    "category": "Cable",
    "brand": "Universal",
    "name": "30 Pin eDP Display Cable",
    "model": "30 Pin",
    "image": edp30pin,
    "description": "Laptop LCD display cable compatible with multiple laptop models.",
    "features": [
      "30 Pin",
      "Flexible Cable",
      "High Signal Quality"
    ],
    "availability": "In Stock",
    "service": "Installation Available",
    "price": "Contact for Price"
  },
  {
    "id": 7,
    "category": "Cable",
    "brand": "Universal",
    "name": "SATA HDD Cable",
    "model": "Laptop SATA Cable",
    "image": satacable,
    "description": "Replacement SATA hard drive cable for laptops.",
    "features": [
      "High-Speed Data",
      "Durable Build"
    ],
    "availability": "In Stock",
    "service": "Installation Available",
    "price": "Contact for Price"
  },

  {
    "id": 8,
    "category": "Charger",
    "brand": "Dell",
    "name": "Dell 65W Laptop Charger",
    "model": "65W",
    "image": dell65w,
    "description": "Original compatible Dell 65W laptop adapter.",
    "features": [
      "Fast Charging",
      "Surge Protection"
    ],
    "availability": "In Stock",
    "service": "Ready Stock",
    "price": "Contact for Price"
  },
  {
    "id": 9,
    "category": "Charger",
    "brand": "HP",
    "name": "HP 65W Laptop Charger",
    "model": "65W",
    "image": hp65w,
    "description": "Premium HP compatible power adapter.",
    "features": [
      "Fast Charging",
      "Reliable Output"
    ],
    "availability": "In Stock",
    "price": "Contact for Price"
  },
  {
    "id": 10,
    "category": "Charger",
    "brand": "Lenovo",
    "name": "Lenovo USB-C Charger",
    "model": "USB-C PD",
    "image": lenovousbc,
    "description": "USB-C Power Delivery charger for Lenovo laptops.",
    "features": [
      "USB-C",
      "Fast Charging",
      "Power Delivery"
    ],
    "availability": "In Stock",
    "price": "Contact for Price"
  },

  {
    "id": 11,
    "category": "HDD",
    "brand": "Seagate",
    "name": "Seagate 1TB HDD",
    "model": "1TB SATA",
    "image": seagate1tb,
    "description": "Reliable 1TB laptop hard drive.",
    "features": [
      "1TB Storage",
      "5400 RPM",
      "2.5 Inch"
    ],
    "availability": "In Stock",
    "price": "Contact for Price"
  },
  {
    "id": 12,
    "category": "HDD",
    "brand": "Western Digital",
    "name": "WD Blue 1TB HDD",
    "model": "1TB SATA",
    "image": wdblue1tb,
    "description": "WD Blue laptop hard drive for reliable storage.",
    "features": [
      "1TB",
      "Quiet Operation",
      "Reliable Performance"
    ],
    "availability": "In Stock",
    "price": "Contact for Price"
  },

  {
    "id": 13,
    "category": "Keyboard",
    "brand": "Dell",
    "name": "Dell Laptop Keyboard",
    "model": "Replacement Keyboard",
    "image": dellkeyboard,
    "description": "High-quality replacement keyboard for Dell laptops.",
    "availability": "In Stock",
    "price": "Contact for Price"
  },
  {
    "id": 14,
    "category": "Keyboard",
    "brand": "HP",
    "name": "HP Laptop Keyboard",
    "model": "Replacement Keyboard",
    "image": hpkeyboard,
    "description": "Original compatible HP keyboard.",
    "availability": "In Stock",
    "price": "Contact for Price"
  },
  {
    "id": 15,
    "category": "Keyboard",
    "brand": "Lenovo",
    "name": "Lenovo Laptop Keyboard",
    "model": "Replacement Keyboard",
    "image": lenovokeyboard,
    "description": "Compatible Lenovo replacement keyboard.",
    "availability": "In Stock",
    "price": "Contact for Price"
  },

  // Motherboards & Parts

{
  id: 16,
  category: "Motherboard",
  brand: "Intel",
  name: "Intel Core i5 11th Gen Laptop Motherboard",
  model: "11th Generation",
  image: corei511thBoard,
  description: "Original replacement motherboard for Intel Core i5 11th Generation laptops. Fully tested and compatible with supported laptop models.",
  features: [
    "Original Motherboard",
    "Fully Tested",
    "High Performance",
    "Installation Available"
  ],
  availability: "In Stock",
  service: "Installation Available",
  warranty: "3 Months",
  price: "Contact for Price"
},

{
  id: 17,
  category: "SSD",
  brand: "Crucial",
  name: "Crucial 8GB DDR4 3200MHz RAM",
  model: "DDR4 3200",
  image: crucial8gb,
  description: "High-speed Crucial DDR4 laptop RAM for faster multitasking and improved system performance.",
  features: [
    "8GB Capacity",
    "3200MHz Speed",
    "DDR4 Memory",
    "Energy Efficient"
  ],
  availability: "In Stock",
  service: "Installation Available",
  warranty: "3 Years",
  price: "Contact for Price"
},

{
  id: 18,
  category: "Cooling Fan",
  brand: "Dell",
  name: "Dell Inspiron Laptop Cooling Fan",
  model: "Inspiron Series",
  image: dellInspironFan,
  description: "Replacement CPU cooling fan designed for Dell Inspiron laptops to maintain optimal temperature and reduce overheating.",
  features: [
    "Low Noise",
    "Efficient Cooling",
    "Easy Installation"
  ],
  availability: "In Stock",
  service: "Installation Available",
  warranty: "3 Months",
  price: "Contact for Price"
},

{
  id: 19,
  category: "Hinge",
  brand: "HP",
  name: "HP 15 Series Laptop Hinge Pair",
  model: "HP 15",
  image: hp15Hinge,
  description: "Premium replacement hinge pair for HP 15 series laptops. Restores smooth and secure screen movement.",
  features: [
    "Left & Right Pair",
    "Heavy Duty",
    "Perfect Fit"
  ],
  availability: "In Stock",
  service: "Installation Available",
  warranty: "3 Months",
  price: "Contact for Price"
},

{
  id: 20,
  category: "WiFi Card",
  brand: "Intel",
  name: "Intel AX210 WiFi 6E Wireless Card",
  model: "AX210",
  image: intelAX210,
  description: "High-speed Intel AX210 WiFi 6E and Bluetooth 5.3 wireless adapter for supported laptops.",
  features: [
    "WiFi 6E",
    "Bluetooth 5.3",
    "High-Speed Connectivity",
    "Low Latency"
  ],
  availability: "In Stock",
  service: "Installation Available",
  warranty: "1 Year",
  price: "Contact for Price"
},

// Screens

{
  id: 21,
  category: "Screen",
  brand: "Universal",
  name: "14 Inch Full HD Laptop Screen",
  model: "14.0 FHD",
  image: screen14,
  description: "14-inch Full HD LCD replacement screen compatible with various Acer, Dell, HP, Lenovo, ASUS and other laptop models.",
  features: [
    "1920 x 1080 Resolution",
    "LED Backlight",
    "Matte Finish",
    "30 Pin Connector"
  ],
  availability: "In Stock",
  service: "Installation Available",
  warranty: "6 Months",
  price: "Contact for Price"
},

{
  id: 22,
  category: "Screen",
  brand: "Universal",
  name: "15.6 Inch Full HD Laptop Screen",
  model: "15.6 FHD",
  image: screen156,
  description: "Premium 15.6-inch Full HD replacement LCD display compatible with most laptop brands.",
  features: [
    "1920 x 1080 Resolution",
    "IPS Compatible",
    "LED Display",
    "30 Pin / 40 Pin Options"
  ],
  availability: "In Stock",
  service: "Installation Available",
  warranty: "6 Months",
  price: "Contact for Price"
}
]

export default products;