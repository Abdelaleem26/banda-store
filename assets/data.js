window.BANDA_DATA = {
  shippingZones: [
    { id: 1, name: 'القاهرة', fee: 65, days: '1 - 2 يوم عمل' },
    { id: 2, name: 'الجيزة', fee: 65, days: '1 - 2 يوم عمل' },
    { id: 3, name: 'الإسكندرية', fee: 75, days: '2 - 3 أيام عمل' },
    { id: 4, name: 'الدلتا (المنصورة / طنطا / الزقازيق / كفر الشيخ)', fee: 85, days: '2 - 3 أيام عمل' },
    { id: 5, name: 'مدن القناة (الإسماعيلية / السويس / بورسعيد)', fee: 85, days: '2 - 3 أيام عمل' },
    { id: 6, name: 'الصعيد (أسيوط / المنيا / سوهاج / قنا / أسوان)', fee: 105, days: '3 - 5 أيام عمل' },
    { id: 7, name: 'البحر الأحمر وسيناء', fee: 120, days: '3 - 5 أيام عمل' }
  ],

  freeShippingThreshold: 2500,

  categories: [
    { id: 'overshirts', name: 'أوفرشيرت وجواكت', subtitle: 'خامات تويل وكتان تقيلة', image: 'assets/images/camel-overshirt.jpg' },
    { id: 'womens', name: 'تشكيلة السيدات', subtitle: 'بليزرات وقصّات محتشمة راقية', image: 'assets/images/womens-blazer.jpg' },
    { id: 'trousers', name: 'بناطيل تشينو', subtitle: 'قطن مصري مريح للبس اليومي', image: 'assets/images/chino-pants.jpg' },
    { id: 'sets', name: 'إطلالات متكاملة', subtitle: 'تنسيقات سمارت كاجوال جاهزة', image: 'assets/images/camel-set-look.jpg' }
  ],

  colors: [
    { id: 'camel', name: 'جملي', hex: '#C29B6C' },
    { id: 'olive', name: 'زيتوني', hex: '#4F5D43' },
    { id: 'sand', name: 'رملي', hex: '#D8C7AE' },
    { id: 'charcoal', name: 'أسود فحمي', hex: '#1C1917' },
    { id: 'cream', name: 'أوف وايت', hex: '#EDE8DF' }
  ],

  sizes: ['S', 'M', 'L', 'XL', 'XXL'],

  products: [
    {
      id: 1,
      modelCode: 'BND-101',
      name: 'أوفرشيرت قطن تويل — قصّة ريلاكسد',
      category: 'overshirts',
      categoryName: 'أوفرشيرت وجواكت',
      basePrice: 1650,
      salePrice: 1390,
      isNew: true,
      isBestSeller: true,
      fabric: '100% قطن تويل مصري مُعالج ضد الانكماش (وزن 310 جم) — مناسب للخريف والشتاء الخفيف.',
      defaultColor: 'camel',
      colorImages: {
        camel: 'assets/images/camel-overshirt.jpg',
        sand: 'assets/images/camel-set-look.jpg',
        charcoal: 'assets/images/camel-overshirt.jpg'
      },
      variants: [
        { id: 101, color: 'camel', size: 'S', stock: 4, sku: 'BND-101-CML-S' },
        { id: 102, color: 'camel', size: 'M', stock: 2, sku: 'BND-101-CML-M' },
        { id: 103, color: 'camel', size: 'L', stock: 7, sku: 'BND-101-CML-L' },
        { id: 104, color: 'camel', size: 'XL', stock: 0, sku: 'BND-101-CML-XL' },
        { id: 105, color: 'camel', size: 'XXL', stock: 3, sku: 'BND-101-CML-XXL' },
        { id: 106, color: 'sand', size: 'M', stock: 5, sku: 'BND-101-SND-M' },
        { id: 107, color: 'sand', size: 'L', stock: 1, sku: 'BND-101-SND-L' },
        { id: 108, color: 'sand', size: 'XL', stock: 0, sku: 'BND-101-SND-XL' },
        { id: 109, color: 'charcoal', size: 'M', stock: 0, sku: 'BND-101-CHR-M' },
        { id: 110, color: 'charcoal', size: 'L', stock: 2, sku: 'BND-101-CHR-L' },
        { id: 111, color: 'charcoal', size: 'XL', stock: 4, sku: 'BND-101-CHR-XL' }
      ]
    },
    {
      id: 2,
      modelCode: 'BND-204',
      name: 'بليزر كتان حريمي — قصّة أنيقة مريحة',
      category: 'womens',
      categoryName: 'تشكيلة السيدات',
      basePrice: 1950,
      salePrice: null,
      isNew: true,
      isBestSeller: true,
      fabric: 'خليط كتان طبيعي وفِسكوز ناعم ببطانة قطنية خفيفة وتفصيل كتف متوازن.',
      defaultColor: 'olive',
      colorImages: {
        olive: 'assets/images/olive-linen-blazer.jpg',
        camel: 'assets/images/womens-blazer.jpg'
      },
      variants: [
        { id: 201, color: 'olive', size: 'S', stock: 6, sku: 'BND-204-OLV-S' },
        { id: 202, color: 'olive', size: 'M', stock: 2, sku: 'BND-204-OLV-M' },
        { id: 203, color: 'olive', size: 'L', stock: 5, sku: 'BND-204-OLV-L' },
        { id: 204, color: 'olive', size: 'XL', stock: 0, sku: 'BND-204-OLV-XL' },
        { id: 205, color: 'camel', size: 'S', stock: 3, sku: 'BND-204-CML-S' },
        { id: 206, color: 'camel', size: 'M', stock: 8, sku: 'BND-204-CML-M' },
        { id: 207, color: 'camel', size: 'L', stock: 0, sku: 'BND-204-CML-L' },
        { id: 208, color: 'camel', size: 'XL', stock: 4, sku: 'BND-204-CML-XL' }
      ]
    },
    {
      id: 3,
      modelCode: 'BND-309',
      name: 'بنطلون تشينو ستريت فيت — قطن ستريتش',
      category: 'trousers',
      categoryName: 'بناطيل تشينو',
      basePrice: 1150,
      salePrice: 950,
      isNew: true,
      isBestSeller: true,
      fabric: '98% قطن مصري طويل التيلة + 2% إيلاستين لمرونة الحركة بدون ركبة.',
      defaultColor: 'olive',
      colorImages: {
        olive: 'assets/images/olive-chino.jpg',
        sand: 'assets/images/sand-chino.jpg'
      },
      variants: [
        { id: 301, color: 'olive', size: 'S', stock: 4, sku: 'BND-309-OLV-S' },
        { id: 302, color: 'olive', size: 'M', stock: 9, sku: 'BND-309-OLV-M' },
        { id: 303, color: 'olive', size: 'L', stock: 3, sku: 'BND-309-OLV-L' },
        { id: 304, color: 'olive', size: 'XL', stock: 2, sku: 'BND-309-OLV-XL' },
        { id: 305, color: 'olive', size: 'XXL', stock: 0, sku: 'BND-309-OLV-XXL' },
        { id: 306, color: 'sand', size: 'S', stock: 0, sku: 'BND-309-SND-S' },
        { id: 307, color: 'sand', size: 'M', stock: 5, sku: 'BND-309-SND-M' },
        { id: 308, color: 'sand', size: 'L', stock: 6, sku: 'BND-309-SND-L' },
        { id: 309, color: 'sand', size: 'XL', stock: 1, sku: 'BND-309-SND-XL' }
      ]
    },
    {
      id: 4,
      modelCode: 'BND-212',
      name: 'طقم بليزر وبنطلون وايد ليج — جملي دافئ',
      category: 'womens',
      categoryName: 'تشكيلة السيدات',
      basePrice: 2850,
      salePrice: 2490,
      isNew: true,
      isBestSeller: false,
      fabric: 'صوف مخلوط ناعم بقصّة انسيابية كاملة ومقاوم للتجعد للعمل والمناسبات.',
      defaultColor: 'camel',
      colorImages: {
        camel: 'assets/images/womens-blazer.jpg',
        cream: 'assets/images/womens-blazer-upper.jpg'
      },
      variants: [
        { id: 401, color: 'camel', size: 'S', stock: 2, sku: 'BND-212-CML-S' },
        { id: 402, color: 'camel', size: 'M', stock: 5, sku: 'BND-212-CML-M' },
        { id: 403, color: 'camel', size: 'L', stock: 3, sku: 'BND-212-CML-L' },
        { id: 404, color: 'camel', size: 'XL', stock: 0, sku: 'BND-212-CML-XL' },
        { id: 405, color: 'cream', size: 'M', stock: 4, sku: 'BND-212-CRM-M' },
        { id: 406, color: 'cream', size: 'L', stock: 1, sku: 'BND-212-CRM-L' }
      ]
    },
    {
      id: 5,
      modelCode: 'BND-402',
      name: 'جاكيت كاجوال سمارت مع بنطلون بليسيه',
      category: 'sets',
      categoryName: 'إطلالات متكاملة',
      basePrice: 2400,
      salePrice: null,
      isNew: false,
      isBestSeller: true,
      fabric: 'خامة جوخ خفيفة مبطنة بالكامل مع بنطلون بليسيه عملي عالي الجودة.',
      defaultColor: 'camel',
      colorImages: {
        camel: 'assets/images/camel-set-look.jpg',
        sand: 'assets/images/camel-overshirt.jpg'
      },
      variants: [
        { id: 501, color: 'camel', size: 'M', stock: 6, sku: 'BND-402-CML-M' },
        { id: 502, color: 'camel', size: 'L', stock: 2, sku: 'BND-402-CML-L' },
        { id: 503, color: 'camel', size: 'XL', stock: 4, sku: 'BND-402-CML-XL' },
        { id: 504, color: 'camel', size: 'XXL', stock: 0, sku: 'BND-402-CML-XXL' },
        { id: 505, color: 'sand', size: 'L', stock: 3, sku: 'BND-402-SND-L' },
        { id: 506, color: 'sand', size: 'XL', stock: 2, sku: 'BND-402-SND-XL' }
      ]
    },
    {
      id: 6,
      modelCode: 'BND-315',
      name: 'تشينو كلاسيك ثنائي الألوان — رملي وزيتوني',
      category: 'trousers',
      categoryName: 'بناطيل تشينو',
      basePrice: 1090,
      salePrice: 890,
      isNew: false,
      isBestSeller: true,
      fabric: 'قطن جبردين ناعم الغسيل (Enzyme Washed) مع خياطة مدعمة للجيوب.',
      defaultColor: 'sand',
      colorImages: {
        sand: 'assets/images/sand-chino.jpg',
        olive: 'assets/images/olive-chino.jpg'
      },
      variants: [
        { id: 601, color: 'sand', size: 'S', stock: 5, sku: 'BND-315-SND-S' },
        { id: 602, color: 'sand', size: 'M', stock: 7, sku: 'BND-315-SND-M' },
        { id: 603, color: 'sand', size: 'L', stock: 0, sku: 'BND-315-SND-L' },
        { id: 604, color: 'sand', size: 'XL', stock: 3, sku: 'BND-315-SND-XL' },
        { id: 605, color: 'olive', size: 'M', stock: 4, sku: 'BND-315-OLV-M' },
        { id: 606, color: 'olive', size: 'L', stock: 2, sku: 'BND-315-OLV-L' }
      ]
    },
    {
      id: 7,
      modelCode: 'BND-218',
      name: 'بلوزة حرير مات مع بليزر كلاسيك',
      category: 'womens',
      categoryName: 'تشكيلة السيدات',
      basePrice: 1790,
      salePrice: 1490,
      isNew: true,
      isBestSeller: false,
      fabric: 'بلوزة كريب حريري ناعم بقبة عالية خفيفة مع بليزر قصّة تايلورد.',
      defaultColor: 'cream',
      colorImages: {
        cream: 'assets/images/womens-blazer-upper.jpg',
        olive: 'assets/images/olive-linen-blazer.jpg'
      },
      variants: [
        { id: 701, color: 'cream', size: 'S', stock: 3, sku: 'BND-218-CRM-S' },
        { id: 702, color: 'cream', size: 'M', stock: 6, sku: 'BND-218-CRM-M' },
        { id: 703, color: 'cream', size: 'L', stock: 0, sku: 'BND-218-CRM-L' },
        { id: 704, color: 'olive', size: 'S', stock: 2, sku: 'BND-218-OLV-S' },
        { id: 705, color: 'olive', size: 'M', stock: 4, sku: 'BND-218-OLV-M' }
      ]
    },
    {
      id: 8,
      modelCode: 'BND-119',
      name: 'جاكيت أوفرشيرت جيوب أمامية — إصدار محدود',
      category: 'overshirts',
      categoryName: 'أوفرشيرت وجواكت',
      basePrice: 1750,
      salePrice: null,
      isNew: true,
      isBestSeller: false,
      fabric: 'قطن كانفاس متوسط السماكة بأزرار مات متناسقة وجيوب صدر عملية.',
      defaultColor: 'camel',
      colorImages: {
        camel: 'assets/images/camel-overshirt.jpg',
        sand: 'assets/images/camel-set-look.jpg'
      },
      variants: [
        { id: 801, color: 'camel', size: 'S', stock: 1, sku: 'BND-119-CML-S' },
        { id: 802, color: 'camel', size: 'M', stock: 3, sku: 'BND-119-CML-M' },
        { id: 803, color: 'camel', size: 'L', stock: 0, sku: 'BND-119-CML-L' },
        { id: 804, color: 'camel', size: 'XL', stock: 2, sku: 'BND-119-CML-XL' },
        { id: 805, color: 'sand', size: 'M', stock: 0, sku: 'BND-119-SND-M' },
        { id: 806, color: 'sand', size: 'L', stock: 2, sku: 'BND-119-SND-L' }
      ]
    }
  ],

  sampleOrders: [
    {
      orderNumber: 'BND-202611-0148',
      phone: '01012345678',
      customerName: 'كريم محمود',
      status: 'processing', // new | processing | shipped | delivered | cancelled
      paymentMethod: 'cod',
      paymentStatus: 'pending',
      total: 1455,
      createdAt: '2026-11-24 18:30',
      governorate: 'القاهرة',
      items: [
        { name: 'أوفرشيرت قطن تويل — قصّة ريلاكسد', colorName: 'جملي', size: 'L', qty: 1, price: 1390 }
      ]
    }
  ]
};
