'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const products = [
      {
        id: 1,
        specifications: JSON.stringify({
          "Display": "6.7-inch Super Retina XDR display, 2796 x 1290 pixels, 460 ppi",
          "Processor": "A17 Pro chip with 6-core CPU, 6-core GPU, 16-core Neural Engine",
          "Camera": "48MP main camera (f/1.78), 12MP ultra wide (f/2.2), 12MP telephoto (f/2.8)",
          "Battery": "4422 mAh, Up to 29 hours video playback",
          "Storage": "256GB, 512GB, 1TB",
          "Operating System": "iOS 17",
          "Water Resistance": "IP68 (up to 6 meters for 30 minutes)",
          "Dimensions": "160.7 x 77.6 x 7.85 mm",
          "Weight": "221g",
          "Connectivity": "5G, Wi-Fi 6E, Bluetooth 5.3, NFC",
          "Colors": "Natural Titanium, Blue Titanium, White Titanium, Black Titanium",
          "Materials": "Titanium frame, Ceramic Shield front, textured matte glass back",
          "Security": "Face ID, Emergency SOS via satellite"
        })
      },
      {
        id: 2,
        specifications: JSON.stringify({
          "Display": "13.4-inch 4K UHD+ (3840 x 2400) Touch Display, 500 nits",
          "Processor": "Intel Core i7-1250U, 12 cores (2 performance + 10 efficient)",
          "Memory": "16GB LPDDR5 5200MHz",
          "Storage": "512GB PCIe NVMe SSD",
          "Graphics": "Intel Iris Xe Graphics",
          "Battery": "60Wh, Up to 12 hours",
          "Operating System": "Windows 11 Pro",
          "Weight": "1.27kg",
          "Dimensions": "295.4 x 199.4 x 14.8 mm",
          "Ports": "2x Thunderbolt 4, 1x 3.5mm headphone jack",
          "Keyboard": "Backlit keyboard with fingerprint reader",
          "Colors": "Platinum Silver, Frost White",
          "Webcam": "720p HD camera with Windows Hello"
        })
      },
      {
        id: 3,
        specifications: JSON.stringify({
          "Display": "6.7-inch Super Retina XDR display, 2796 x 1290 pixels, 460 ppi",
          "Processor": "A16 Bionic chip with 6-core CPU, 5-core GPU, 16-core Neural Engine",
          "Camera": "48MP main camera (f/1.78), 12MP ultra wide (f/2.2), 12MP telephoto (f/2.8)",
          "Battery": "4323 mAh, Up to 29 hours video playback",
          "Storage": "128GB, 256GB, 512GB, 1TB",
          "Operating System": "iOS 16",
          "Water Resistance": "IP68 (up to 6 meters for 30 minutes)",
          "Dimensions": "160.7 x 77.6 x 7.85 mm",
          "Weight": "240g",
          "Connectivity": "5G, Wi-Fi 6E, Bluetooth 5.3, NFC",
          "Colors": "Space Black, Silver, Gold, Deep Purple",
          "Materials": "Surgical-grade stainless steel, Ceramic Shield front, textured matte glass back",
          "Security": "Face ID, Emergency SOS via satellite"
        })
      },
      {
        id: 4,
        specifications: JSON.stringify({
          "Display": "14-inch FHD (1920 x 1080) IPS, 60Hz, 250 nits",
          "Processor": "Intel Core i5-1235U, 10 cores (2 performance + 8 efficient)",
          "Memory": "8GB DDR4 3200MHz",
          "Storage": "512GB NVMe SSD",
          "Graphics": "Intel Iris Xe Graphics",
          "Battery": "52Wh, Up to 8 hours",
          "Operating System": "Windows 11 Home",
          "Weight": "1.4kg",
          "Dimensions": "319 x 219 x 16.9 mm",
          "Ports": "1x USB-C, 2x USB-A, 1x HDMI, 1x 3.5mm headphone jack",
          "Keyboard": "Backlit keyboard",
          "Colors": "Pure White",
          "Webcam": "720p HD camera"
        })
      },
      {
        id: 5,
        specifications: JSON.stringify({
          "Display": "10.9-inch Liquid Retina display, 2360 x 1640 pixels, 264 ppi",
          "Processor": "A14 Bionic chip with 6-core CPU, 4-core GPU, 16-core Neural Engine",
          "Storage": "64GB, 256GB",
          "Camera": "12MP front camera (f/2.4), 12MP back camera (f/1.8)",
          "Battery": "28.6Wh, Up to 10 hours",
          "Operating System": "iPadOS 16",
          "Weight": "477g",
          "Dimensions": "248.6 x 179.5 x 7mm",
          "Connectivity": "Wi-Fi 6, Bluetooth 5.0",
          "Colors": "Silver, Pink, Blue, Yellow",
          "Apple Pencil Support": "1st Generation",
          "Materials": "Aluminum body",
          "Security": "Touch ID in top button"
        })
      },
      {
        id: 6,
        specifications: JSON.stringify({
          "Display": "1.43-inch AMOLED, 466 x 466 pixels",
          "Processor": "Qualcomm Snapdragon W5+ Gen 1",
          "Memory": "2GB RAM, 32GB storage",
          "Battery": "486mAh, Up to 15 days",
          "Sensors": "Accelerometer, Gyro, Heart Rate, SpO2, Temperature",
          "Water Resistance": "5ATM",
          "Operating System": "Xiaomi HyperOS",
          "Weight": "36.5g",
          "Dimensions": "46.5 x 46.5 x 11.8 mm",
          "Connectivity": "Bluetooth 5.2, NFC",
          "Colors": "Black, Silver, Gold",
          "Sports Modes": "150+ sports modes",
          "Health Monitoring": "24/7 heart rate, sleep tracking, stress monitoring"
        })
      },
      {
        id: 7,
        specifications: JSON.stringify({
          "Driver": "10mm dynamic driver",
          "Noise Cancelling": "Hybrid ANC with 4 microphones",
          "Battery Life": "Up to 46 hours (ANC off), 27 hours (ANC on)",
          "Charging": "USB-C, Fast charging (10 minutes = 3 hours)",
          "Weight": "5g (each earbud), 45g (case)",
          "Connectivity": "Bluetooth 5.2",
          "Microphone": "4 microphones for calls",
          "Touch Controls": "Yes",
          "Colors": "Black, White",
          "Audio Codecs": "AAC, SBC",
          "Gaming Mode": "Yes, 45ms low latency",
          "Water Resistance": "IPX4"
        })
      },
      {
        id: 8,
        specifications: JSON.stringify({
          "Sensor": "24.1MP APS-C CMOS",
          "Processor": "DIGIC 8",
          "Lens Mount": "EF-M",
          "Display": "3.0-inch LCD touchscreen, 1.04M dots",
          "Video": "4K at 24fps, 1080p at 60fps",
          "ISO Range": "100-25600 (expandable to 51200)",
          "Autofocus": "Dual Pixel CMOS AF, 143 AF points",
          "Battery": "LP-E12, Up to 235 shots",
          "Weight": "387g (body only)",
          "Dimensions": "116.3 x 88.1 x 58.7 mm",
          "Connectivity": "Wi-Fi, Bluetooth",
          "Colors": "Black, White",
          "Viewfinder": "Electronic viewfinder, 2.36M dots",
          "Image Stabilization": "5-axis digital IS"
        })
      },
      {
        id: 9,
        specifications: JSON.stringify({
          "Display": "13.6-inch Liquid Retina display, 2560 x 1664 pixels, 500 nits",
          "Processor": "Apple M2 chip with 8-core CPU, 10-core GPU, 16-core Neural Engine",
          "Memory": "8GB unified memory",
          "Storage": "256GB SSD",
          "Battery": "52.6Wh, Up to 18 hours",
          "Operating System": "macOS",
          "Weight": "1.24kg",
          "Dimensions": "304.1 x 215 x 11.3 mm",
          "Camera": "1080p FaceTime HD camera",
          "Ports": "2x USB-C, MagSafe charging",
          "Colors": "Midnight, Starlight, Space Gray, Silver",
          "Keyboard": "Backlit Magic Keyboard",
          "Materials": "100% recycled aluminum"
        })
      },
      {
        id: 10,
        specifications: JSON.stringify({
          "Type": "Wired USB keyboard",
          "Layout": "Full-size, 104 keys",
          "Interface": "USB 2.0",
          "Cable Length": "1.8m",
          "Key Type": "Membrane",
          "Special Keys": "12 function keys, multimedia controls",
          "Dimensions": "451 x 150 x 20 mm",
          "Weight": "550g",
          "Colors": "Black",
          "Compatibility": "Windows, macOS, Linux",
          "Warranty": "1 year"
        })
      },
      {
        id: 11,
        specifications: JSON.stringify({
          "Capacity": "240GB",
          "Interface": "SATA III 6Gb/s",
          "Form Factor": "2.5-inch",
          "Sequential Read": "Up to 560MB/s",
          "Sequential Write": "Up to 520MB/s",
          "Random Read": "Up to 90,000 IOPS",
          "Random Write": "Up to 80,000 IOPS",
          "MTBF": "1,000,000 hours",
          "Warranty": "3 years",
          "Dimensions": "100 x 69.85 x 7 mm",
          "Weight": "45g",
          "Operating Temperature": "0°C to 70°C"
        })
      },
      {
        id: 12,
        specifications: JSON.stringify({
          "Display": "21.5-inch IPS, 1920 x 1080, 100Hz",
          "Panel Type": "IPS",
          "Brightness": "250 nits",
          "Contrast Ratio": "1000:1",
          "Response Time": "5ms (GTG)",
          "Viewing Angles": "178°(H)/178°(V)",
          "Ports": "1x HDMI 1.4, 1x VGA, 1x 3.5mm audio out",
          "Stand Adjustments": "Tilt (-5° to 20°)",
          "VESA Mount": "100 x 100mm",
          "Power Consumption": "18W",
          "Dimensions": "487.1 x 366.8 x 179.1 mm",
          "Weight": "3.2kg"
        })
      },
      {
        id: 13,
        specifications: JSON.stringify({
          "Display": "1.62-inch AMOLED, 192 x 490 pixels",
          "Battery": "190mAh, Up to 14 days",
          "Sensors": "Heart rate, SpO2, Sleep monitoring",
          "Water Resistance": "5ATM",
          "Connectivity": "Bluetooth 5.2",
          "Weight": "13.5g",
          "Strap Material": "TPU",
          "Colors": "Black, Blue, Pink",
          "Sports Modes": "120+ sports modes",
          "Charging": "Magnetic charging",
          "Compatibility": "Android 6.0+, iOS 10.0+",
          "Battery Life": "Up to 14 days (typical use)"
        })
      },
      {
        id: 14,
        specifications: JSON.stringify({
          "Type": "DDR4 SODIMM",
          "Capacity": "32GB (1x 32GB)",
          "Speed": "3200MHz",
          "Voltage": "1.2V",
          "Timing": "CL22",
          "Form Factor": "260-pin SODIMM",
          "Compatibility": "Laptops with DDR4 slots",
          "Warranty": "Lifetime",
          "Operating Temperature": "0°C to 85°C",
          "Storage Temperature": "-55°C to 100°C"
        })
      },
      {
        id: 15,
        specifications: JSON.stringify({
          "Resolution": "720p HD",
          "Frame Rate": "30fps",
          "Field of View": "60 degrees",
          "Focus Type": "Fixed focus",
          "Microphone": "Omnidirectional with noise reduction",
          "Interface": "USB 2.0",
          "Cable Length": "1.5m",
          "Compatibility": "Windows, macOS, Chrome OS",
          "Dimensions": "95 x 20 x 20 mm",
          "Weight": "74.5g",
          "Warranty": "2 years"
        })
      },
      {
        id: 16,
        specifications: JSON.stringify({
          "Capacity": "256GB",
          "Interface": "USB 3.2 Gen 1",
          "Read Speed": "Up to 400MB/s",
          "Write Speed": "Up to 350MB/s",
          "Connector": "USB Type-C",
          "Compatibility": "USB 3.0 and above",
          "Dimensions": "45.7 x 21.4 x 7.8 mm",
          "Weight": "4.5g",
          "Operating Temperature": "0°C to 45°C",
          "Warranty": "5 years",
          "Security": "Password protection with 128-bit AES encryption"
        })
      },
      {
        id: 17,
        specifications: JSON.stringify({
          "Version": "Bluetooth 5.3",
          "Range": "Up to 20 meters",
          "Interface": "USB Type-A",
          "Compatibility": "Windows 10/11, macOS 10.15+, Linux",
          "Supported Profiles": "A2DP, AVRCP, HFP, HSP",
          "Dimensions": "18.5 x 14.5 x 6.5 mm",
          "Weight": "2.5g",
          "Operating Temperature": "0°C to 40°C",
          "Warranty": "2 years",
          "Security": "AES-128 encryption"
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