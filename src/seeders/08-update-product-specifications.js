'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const products = [
      {
        id: 1,
        specifications: JSON.stringify({
          "Display": "6.7-inch Super Retina XDR display",
          "Processor": "A17 Pro chip",
          "Camera": "48MP main camera, 12MP ultra wide, 12MP telephoto",
          "Battery": "4422 mAh",
          "Storage": "256GB, 512GB, 1TB",
          "Operating System": "iOS 17",
          "Water Resistance": "IP68",
          "Dimensions": "160.7 x 77.6 x 7.85 mm",
          "Weight": "221g",
          "Connectivity": "5G, Wi-Fi 6E, Bluetooth 5.3",
          "Colors": "Natural Titanium, Blue Titanium, White Titanium, Black Titanium"
        })
      },
      {
        id: 2,
        specifications: JSON.stringify({
          "Display": "13.4-inch 4K UHD+ Touch Display",
          "Processor": "Intel Core i7-1250U",
          "Memory": "16GB LPDDR5",
          "Storage": "512GB SSD",
          "Graphics": "Intel Iris Xe Graphics",
          "Battery": "60Wh",
          "Operating System": "Windows 11 Pro",
          "Weight": "1.27kg",
          "Dimensions": "295.4 x 199.4 x 14.8 mm",
          "Ports": "2x Thunderbolt 4, 1x 3.5mm headphone jack",
          "Keyboard": "Backlit keyboard with fingerprint reader"
        })
      },
      {
        id: 3,
        specifications: JSON.stringify({
          "Display": "10.9-inch Liquid Retina display",
          "Processor": "A14 Bionic chip",
          "Storage": "64GB, 256GB",
          "Camera": "12MP front camera, 12MP back camera",
          "Battery": "28.6Wh",
          "Operating System": "iPadOS 16",
          "Weight": "477g",
          "Dimensions": "248.6 x 179.5 x 7mm",
          "Connectivity": "Wi-Fi 6, Bluetooth 5.0",
          "Colors": "Silver, Pink, Blue, Yellow",
          "Apple Pencil Support": "1st Generation"
        })
      },
      {
        id: 4,
        specifications: JSON.stringify({
          "Display": "1.4-inch Super AMOLED",
          "Processor": "Exynos W920",
          "Memory": "1.5GB RAM, 16GB storage",
          "Battery": "410mAh",
          "Sensors": "Accelerometer, Gyro, Heart Rate, Barometer",
          "Water Resistance": "IP68",
          "Operating System": "Wear OS",
          "Weight": "46.5g",
          "Dimensions": "44.4 x 43.3 x 9.8 mm",
          "Connectivity": "Bluetooth 5.2, Wi-Fi, NFC",
          "Colors": "Black, Silver, Pink Gold",
          "Battery Life": "Up to 50 hours"
        })
      },
      {
        id: 5,
        specifications: JSON.stringify({
          "Driver": "30mm dynamic driver",
          "Noise Cancelling": "Yes, Adaptive Noise Cancelling",
          "Battery Life": "Up to 30 hours with ANC",
          "Charging": "USB-C, Quick Charge",
          "Weight": "250g",
          "Connectivity": "Bluetooth 5.2, NFC",
          "Microphone": "8 microphones for calls",
          "Touch Controls": "Yes",
          "Foldable": "Yes",
          "Colors": "Black, Silver",
          "Audio Codecs": "LDAC, AAC, SBC",
          "Speak-to-Chat": "Yes"
        })
      },
      {
        id: 6,
        specifications: JSON.stringify({
          "Sensor": "24.1MP APS-C CMOS",
          "Processor": "DIGIC 8",
          "Lens Mount": "EF-M",
          "Display": "3.0-inch LCD touchscreen",
          "Video": "4K at 24fps",
          "ISO Range": "100-25600",
          "Autofocus": "Dual Pixel CMOS AF",
          "Battery": "LP-E12",
          "Weight": "387g",
          "Dimensions": "116.3 x 88.1 x 58.7 mm",
          "Connectivity": "Wi-Fi, Bluetooth",
          "Colors": "Black, White",
          "Viewfinder": "Electronic viewfinder"
        })
      },
      {
        id: 7,
        specifications: JSON.stringify({
          "Display": "13.6-inch Liquid Retina display",
          "Processor": "Apple M2 chip",
          "Memory": "8GB unified memory",
          "Storage": "256GB SSD",
          "Battery": "52.6Wh",
          "Operating System": "macOS",
          "Weight": "1.24kg",
          "Dimensions": "304.1 x 215 x 11.3 mm",
          "Camera": "1080p FaceTime HD camera",
          "Ports": "2x USB-C, MagSafe charging",
          "Colors": "Midnight, Starlight, Space Gray, Silver",
          "Keyboard": "Backlit Magic Keyboard"
        })
      },
      {
        id: 8,
        specifications: JSON.stringify({
          "Display": "6.3-inch OLED, 90Hz",
          "Processor": "Google Tensor G2",
          "Memory": "8GB RAM",
          "Storage": "128GB, 256GB",
          "Camera": "50MP main, 12MP ultra-wide",
          "Battery": "4355mAh",
          "Operating System": "Android 13",
          "Weight": "197g",
          "Dimensions": "155.6 x 73.2 x 8.7 mm",
          "Connectivity": "5G, Wi-Fi 6E, Bluetooth 5.2",
          "Colors": "Obsidian, Snow, Lemongrass",
          "Water Resistance": "IP68",
          "Wireless Charging": "Yes"
        })
      },
      {
        id: 9,
        specifications: JSON.stringify({
          "Display": "6.8-inch Dynamic AMOLED 2X",
          "Processor": "Snapdragon 8 Gen 2",
          "Memory": "12GB RAM",
          "Storage": "256GB, 512GB, 1TB",
          "Camera": "200MP main, 12MP ultra-wide, 10MP telephoto",
          "Battery": "5000mAh",
          "Operating System": "Android 13",
          "Weight": "233g",
          "Dimensions": "163.4 x 78.1 x 8.9 mm",
          "Connectivity": "5G, Wi-Fi 6E, Bluetooth 5.3",
          "Colors": "Phantom Black, Cream, Green, Lavender",
          "Water Resistance": "IP68",
          "Wireless Charging": "Yes"
        })
      },
      {
        id: 10,
        specifications: JSON.stringify({
          "Display": "14-inch 2.8K OLED",
          "Processor": "Intel Core i9-13900H",
          "Memory": "32GB LPDDR5",
          "Storage": "1TB SSD",
          "Graphics": "NVIDIA GeForce RTX 4070",
          "Battery": "76Wh",
          "Operating System": "Windows 11 Pro",
          "Weight": "1.7kg",
          "Dimensions": "312.4 x 221.4 x 16.9 mm",
          "Ports": "2x Thunderbolt 4, HDMI 2.1, USB-A, SD card reader",
          "Keyboard": "Backlit keyboard with numpad",
          "Colors": "Eclipse Gray"
        })
      },
      {
        id: 11,
        specifications: JSON.stringify({
          "Display": "11-inch Liquid Retina display",
          "Processor": "M2 chip",
          "Storage": "128GB, 256GB",
          "Camera": "12MP front camera, 12MP back camera",
          "Battery": "28.6Wh",
          "Operating System": "iPadOS 16",
          "Weight": "461g",
          "Dimensions": "247.6 x 178.5 x 5.9 mm",
          "Connectivity": "Wi-Fi 6, Bluetooth 5.3",
          "Colors": "Space Gray, Silver",
          "Apple Pencil Support": "2nd Generation",
          "Magic Keyboard Support": "Yes"
        })
      },
      {
        id: 12,
        specifications: JSON.stringify({
          "Display": "1.9-inch AMOLED",
          "Processor": "Snapdragon W5+ Gen 1",
          "Memory": "2GB RAM, 32GB storage",
          "Battery": "590mAh",
          "Sensors": "Accelerometer, Gyro, Heart Rate, ECG, Blood Pressure",
          "Water Resistance": "IP68",
          "Operating System": "Wear OS",
          "Weight": "47g",
          "Dimensions": "45.4 x 45.4 x 10.5 mm",
          "Connectivity": "Bluetooth 5.2, Wi-Fi, LTE",
          "Colors": "Black, Silver, Gold",
          "Battery Life": "Up to 40 hours"
        })
      },
      {
        id: 13,
        specifications: JSON.stringify({
          "Driver": "40mm dynamic driver",
          "Noise Cancelling": "Yes, Adaptive Noise Cancelling",
          "Battery Life": "Up to 38 hours with ANC",
          "Charging": "USB-C, Quick Charge",
          "Weight": "254g",
          "Connectivity": "Bluetooth 5.3, NFC",
          "Microphone": "6 microphones for calls",
          "Touch Controls": "Yes",
          "Foldable": "Yes",
          "Colors": "Black, White, Blue",
          "Audio Codecs": "LDAC, AAC, SBC",
          "Speak-to-Chat": "Yes",
          "360 Reality Audio": "Yes"
        })
      },
      {
        id: 14,
        specifications: JSON.stringify({
          "Sensor": "24.2MP Full-Frame CMOS",
          "Processor": "BIONZ XR",
          "Lens Mount": "E-mount",
          "Display": "3.0-inch LCD touchscreen",
          "Video": "4K at 60fps",
          "ISO Range": "100-51200",
          "Autofocus": "Real-time Eye AF",
          "Battery": "NP-FZ100",
          "Weight": "614g",
          "Dimensions": "128.9 x 96.9 x 77.5 mm",
          "Connectivity": "Wi-Fi, Bluetooth",
          "Colors": "Black",
          "Viewfinder": "Electronic viewfinder, 9.44M dots"
        })
      },
      {
        id: 15,
        specifications: JSON.stringify({
          "Display": "16-inch Liquid Retina XDR display",
          "Processor": "M2 Pro chip",
          "Memory": "16GB unified memory",
          "Storage": "512GB SSD",
          "Battery": "100Wh",
          "Operating System": "macOS",
          "Weight": "2.1kg",
          "Dimensions": "355.7 x 248.1 x 16.8 mm",
          "Camera": "1080p FaceTime HD camera",
          "Ports": "3x Thunderbolt 4, HDMI, SDXC card slot, MagSafe",
          "Colors": "Space Gray, Silver",
          "Keyboard": "Backlit Magic Keyboard with Touch ID"
        })
      },
      {
        id: 16,
        specifications: JSON.stringify({
          "Display": "6.7-inch AMOLED, 120Hz",
          "Processor": "Snapdragon 8 Gen 2",
          "Memory": "12GB RAM",
          "Storage": "256GB, 512GB",
          "Camera": "50MP main, 50MP ultra-wide, 50MP telephoto",
          "Battery": "5000mAh",
          "Operating System": "Android 13",
          "Weight": "219g",
          "Dimensions": "163.1 x 74.1 x 8.5 mm",
          "Connectivity": "5G, Wi-Fi 6E, Bluetooth 5.3",
          "Colors": "Black, Green",
          "Water Resistance": "IP68",
          "Wireless Charging": "Yes"
        })
      },
      {
        id: 17,
        specifications: JSON.stringify({
          "Display": "15.6-inch 4K OLED",
          "Processor": "Intel Core i9-13900HX",
          "Memory": "32GB DDR5",
          "Storage": "2TB SSD",
          "Graphics": "NVIDIA GeForce RTX 4090",
          "Battery": "99.9Wh",
          "Operating System": "Windows 11 Pro",
          "Weight": "2.4kg",
          "Dimensions": "357.2 x 264.2 x 19.9 mm",
          "Ports": "2x Thunderbolt 4, HDMI 2.1, USB-A, RJ45",
          "Keyboard": "Per-key RGB backlit keyboard",
          "Colors": "Dark Side of the Moon"
        })
      },
      {
        id: 18,
        specifications: JSON.stringify({
          "Display": "12.9-inch Liquid Retina XDR display",
          "Processor": "M2 chip",
          "Storage": "256GB, 512GB, 1TB, 2TB",
          "Camera": "12MP front camera, 12MP back camera",
          "Battery": "40.88Wh",
          "Operating System": "iPadOS 16",
          "Weight": "682g",
          "Dimensions": "280.6 x 214.9 x 6.4 mm",
          "Connectivity": "Wi-Fi 6E, Bluetooth 5.3",
          "Colors": "Space Gray, Silver",
          "Apple Pencil Support": "2nd Generation",
          "Magic Keyboard Support": "Yes"
        })
      },
      {
        id: 19,
        specifications: JSON.stringify({
          "Display": "1.5-inch AMOLED",
          "Processor": "Exynos W920",
          "Memory": "1.5GB RAM, 16GB storage",
          "Battery": "361mAh",
          "Sensors": "Accelerometer, Gyro, Heart Rate, ECG",
          "Water Resistance": "IP68",
          "Operating System": "Wear OS",
          "Weight": "46.3g",
          "Dimensions": "40.4 x 39.3 x 9.8 mm",
          "Connectivity": "Bluetooth 5.0, Wi-Fi, NFC",
          "Colors": "Black, Silver, Pink Gold",
          "Battery Life": "Up to 40 hours"
        })
      }
    ];

    for (const product of products) {
      await queryInterface.sequelize.query(
        `UPDATE Products SET specifications = :specifications WHERE id = :id`,
        {
          replacements: {
            specifications: product.specifications,
            id: product.id
          }
        }
      );
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      `UPDATE Products SET specifications = NULL`
    );
  }
}; 