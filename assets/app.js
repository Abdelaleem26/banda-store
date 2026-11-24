document.addEventListener('alpine:init', () => {
  Alpine.data('bandaStore', () => ({
    // Catalog & Reference Data
    categories: window.BANDA_DATA.categories,
    colors: window.BANDA_DATA.colors,
    sizes: window.BANDA_DATA.sizes,
    shippingZones: window.BANDA_DATA.shippingZones,
    freeShippingThreshold: window.BANDA_DATA.freeShippingThreshold,

    products: [],
    orders: [],

    // Filters
    filters: {
      q: '',
      category: 'all',
      size: 'all',
      color: 'all',
      maxPrice: 3000,
      inStockOnly: true,
      sort: 'featured'
    },

    // Card active color state
    cardColors: {},

    // Modals & Drawers
    mobileMenuOpen: false,
    cartOpen: false,
    quickViewOpen: false,
    checkoutOpen: false,
    confirmationOpen: false,
    trackingOpen: false,

    // Active QuickView selection
    activeProduct: null,
    selectedColor: null,
    selectedSize: null,
    selectedQty: 1,

    // Cart & Shipping
    cart: [],
    selectedZoneId: 1,

    // Checkout form
    checkout: {
      customerName: '',
      phone: '',
      altPhone: '',
      zoneId: 1,
      city: '',
      address: '',
      notes: '',
      paymentMethod: 'cod',
      paymentReference: ''
    },
    checkoutError: '',

    // Confirmation & Countdown
    confirmedOrder: null,
    receiptPreviewUrl: null,
    receiptUploaded: false,
    reservationSecondsLeft: 7200,
    reservationTimer: null,

    // Order Tracking
    trackQuery: { orderNumber: '', phone: '' },
    trackedOrder: null,
    trackError: '',

    // Toast notification
    toast: { show: false, text: '' },

    init() {
      this.loadState();
      this.products.forEach((p) => {
        this.cardColors[p.id] = p.defaultColor;
      });
    },

    loadState() {
      const savedStock = localStorage.getItem('banda_proto_stock_v1');
      const baseProducts = JSON.parse(JSON.stringify(window.BANDA_DATA.products));

      if (savedStock) {
        try {
          const stockMap = JSON.parse(savedStock);
          baseProducts.forEach((p) => {
            p.variants.forEach((v) => {
              if (typeof stockMap[v.id] === 'number') {
                v.stock = stockMap[v.id];
              }
            });
          });
        } catch (_) {}
      }
      this.products = baseProducts;

      const savedCart = localStorage.getItem('banda_proto_cart_v1');
      if (savedCart) {
        try { this.cart = JSON.parse(savedCart); } catch (_) { this.cart = []; }
      }

      const savedOrders = localStorage.getItem('banda_proto_orders_v1');
      if (savedOrders) {
        try {
          this.orders = JSON.parse(savedOrders);
        } catch (_) {
          this.orders = [...window.BANDA_DATA.sampleOrders];
        }
      } else {
        this.orders = [...window.BANDA_DATA.sampleOrders];
      }
    },

    saveStock() {
      const map = {};
      this.products.forEach((p) => p.variants.forEach((v) => { map[v.id] = v.stock; }));
      localStorage.setItem('banda_proto_stock_v1', JSON.stringify(map));
    },

    saveCart() {
      localStorage.setItem('banda_proto_cart_v1', JSON.stringify(this.cart));
    },

    saveOrders() {
      localStorage.setItem('banda_proto_orders_v1', JSON.stringify(this.orders));
    },

    resetDemoData() {
      localStorage.removeItem('banda_proto_stock_v1');
      localStorage.removeItem('banda_proto_cart_v1');
      localStorage.removeItem('banda_proto_orders_v1');
      this.loadState();
      this.showToast('تمت استعادة المخزون والبيانات التجريبية بنجاح');
    },

    showToast(text) {
      this.toast.text = text;
      this.toast.show = true;
      setTimeout(() => { this.toast.show = false; }, 2800);
    },

    // Helpers
    formatPrice(val) {
      return Number(val).toLocaleString('ar-EG') + ' ج.م';
    },

    effectivePrice(product) {
      return product.salePrice ?? product.basePrice;
    },

    discountPercent(product) {
      if (!product.salePrice || product.salePrice >= product.basePrice) return 0;
      return Math.round(((product.basePrice - product.salePrice) / product.basePrice) * 100);
    },

    colorObj(colorId) {
      return this.colors.find((c) => c.id === colorId) || { id: colorId, name: colorId, hex: '#333' };
    },

    productColors(product) {
      const ids = [...new Set(product.variants.map((v) => v.color))];
      return ids.map((id) => {
        const totalStock = product.variants
          .filter((v) => v.color === id)
          .reduce((sum, v) => sum + v.stock, 0);
        return { ...this.colorObj(id), totalStock };
      });
    },

    cardImage(product) {
      const col = this.cardColors[product.id] || product.defaultColor;
      return product.colorImages[col] || Object.values(product.colorImages)[0];
    },

    productTotalStock(product) {
      return product.variants.reduce((sum, v) => sum + v.stock, 0);
    },

    lowStockMessage(product) {
      const activeCol = this.cardColors[product.id] || product.defaultColor;
      const inStock = product.variants.filter((v) => v.color === activeCol && v.stock > 0);
      if (!inStock.length) return null;
      const minStock = Math.min(...inStock.map((v) => v.stock));
      if (minStock <= 2) {
        return minStock === 1 ? 'آخر قطعة متوفرة' : 'باقي قطعتين فقط';
      }
      return null;
    },

    // Filtered Catalog
    get filteredProducts() {
      let list = this.products.filter((p) => {
        const price = this.effectivePrice(p);
        if (price > this.filters.maxPrice) return false;
        if (this.filters.category !== 'all' && p.category !== this.filters.category) return false;

        if (this.filters.q.trim()) {
          const term = this.filters.q.trim().toLowerCase();
          const matchName = p.name.toLowerCase().includes(term);
          const matchCode = p.modelCode.toLowerCase().includes(term);
          if (!matchName && !matchCode) return false;
        }

        if (this.filters.inStockOnly && this.productTotalStock(p) === 0) return false;

        if (this.filters.size !== 'all' || this.filters.color !== 'all') {
          const matchVariant = p.variants.some((v) => {
            const okSize = this.filters.size === 'all' || v.size === this.filters.size;
            const okColor = this.filters.color === 'all' || v.color === this.filters.color;
            const okStock = !this.filters.inStockOnly || v.stock > 0;
            return okSize && okColor && okStock;
          });
          if (!matchVariant) return false;
        }

        return true;
      });

      if (this.filters.sort === 'price_asc') {
        list.sort((a, b) => this.effectivePrice(a) - this.effectivePrice(b));
      } else if (this.filters.sort === 'price_desc') {
        list.sort((a, b) => this.effectivePrice(b) - this.effectivePrice(a));
      } else if (this.filters.sort === 'new') {
        list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      }

      return list;
    },

    selectCategoryFromHome(catId) {
      this.filters.category = catId;
      document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
    },

    clearFilters() {
      this.filters = {
        q: '',
        category: 'all',
        size: 'all',
        color: 'all',
        maxPrice: 3000,
        inStockOnly: true,
        sort: 'featured'
      };
    },

    // Quick View / Product Details Modal
    openQuickView(product) {
      this.activeProduct = product;
      const preferredColor = this.cardColors[product.id] || product.defaultColor;
      this.selectedColor = preferredColor;
      this.pickFirstAvailableSize();
      this.selectedQty = 1;
      this.quickViewOpen = true;
    },

    selectModalColor(colorId) {
      this.selectedColor = colorId;
      this.pickFirstAvailableSize();
      this.selectedQty = 1;
    },

    pickFirstAvailableSize() {
      if (!this.activeProduct) return;
      const variants = this.activeProduct.variants.filter((v) => v.color === this.selectedColor);
      const avail = variants.find((v) => v.stock > 0);
      this.selectedSize = avail ? avail.size : (variants[0]?.size || null);
    },

    get activeColorVariants() {
      if (!this.activeProduct || !this.selectedColor) return [];
      const order = { S: 1, M: 2, L: 3, XL: 4, XXL: 5 };
      return this.activeProduct.variants
        .filter((v) => v.color === this.selectedColor)
        .sort((a, b) => (order[a.size] || 99) - (order[b.size] || 99));
    },

    get activeVariant() {
      if (!this.activeProduct) return null;
      return this.activeProduct.variants.find(
        (v) => v.color === this.selectedColor && v.size === this.selectedSize
      ) || null;
    },

    get activeImage() {
      if (!this.activeProduct) return '';
      return this.activeProduct.colorImages[this.selectedColor] || Object.values(this.activeProduct.colorImages)[0];
    },

    addToCart(openCheckoutImmediately = false) {
      const variant = this.activeVariant;
      if (!variant || variant.stock <= 0) {
        this.showToast('هذا المقاس غير متوفر حالياً');
        return;
      }

      const existing = this.cart.find((c) => c.variantId === variant.id);
      const currentInCart = existing ? existing.qty : 0;

      if (currentInCart + this.selectedQty > variant.stock) {
        this.showToast(`المتاح في المخزن لهذا المتغير ${variant.stock} قطعة فقط`);
        return;
      }

      if (existing) {
        existing.qty += this.selectedQty;
      } else {
        this.cart.push({
          variantId: variant.id,
          productId: this.activeProduct.id,
          modelCode: this.activeProduct.modelCode,
          name: this.activeProduct.name,
          colorId: variant.color,
          colorName: this.colorObj(variant.color).name,
          size: variant.size,
          sku: variant.sku,
          unitPrice: this.effectivePrice(this.activeProduct),
          image: this.activeImage,
          qty: this.selectedQty
        });
      }

      this.saveCart();
      this.quickViewOpen = false;

      if (openCheckoutImmediately) {
        this.openCheckout();
      } else {
        this.cartOpen = true;
        this.showToast('تمت إضافة القطعة إلى السلة');
      }
    },

    // Cart Operations
    get cartCount() {
      return this.cart.reduce((sum, item) => sum + item.qty, 0);
    },

    get cartSubtotal() {
      return this.cart.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);
    },

    get selectedZone() {
      return this.shippingZones.find((z) => z.id === Number(this.selectedZoneId)) || this.shippingZones[0];
    },

    get currentShippingFee() {
      if (this.cart.length === 0) return 0;
      if (this.cartSubtotal >= this.freeShippingThreshold) return 0;
      return this.selectedZone.fee;
    },

    get cartTotal() {
      return this.cartSubtotal + this.currentShippingFee;
    },

    getVariantStock(variantId) {
      for (const p of this.products) {
        const found = p.variants.find((v) => v.id === variantId);
        if (found) return found.stock;
      }
      return 0;
    },

    updateCartQty(index, delta) {
      const item = this.cart[index];
      if (!item) return;
      const next = item.qty + delta;
      if (next <= 0) {
        this.cart.splice(index, 1);
      } else {
        const stock = this.getVariantStock(item.variantId);
        if (next > stock) {
          this.showToast(`الحد الأقصى المتاح بالمخزن: ${stock} قطعة`);
          return;
        }
        item.qty = next;
      }
      this.saveCart();
    },

    removeCartItem(index) {
      this.cart.splice(index, 1);
      this.saveCart();
    },

    // Checkout & Atomic Stock Deduction Simulation
    openCheckout() {
      if (this.cart.length === 0) {
        this.showToast('السلة فارغة — أضف قطعاً أولاً');
        return;
      }
      this.checkout.zoneId = this.selectedZoneId;
      this.checkoutError = '';
      this.cartOpen = false;
      this.checkoutOpen = true;
    },

    submitOrder() {
      this.checkoutError = '';
      const name = this.checkout.customerName.trim();
      const phone = this.checkout.phone.trim();
      const city = this.checkout.city.trim();
      const address = this.checkout.address.trim();

      if (name.length < 3) {
        this.checkoutError = 'من فضلك اكتب اسمك بالكامل.';
        return;
      }
      if (!/^01[0125][0-9]{8}$/.test(phone)) {
        this.checkoutError = 'رقم الموبايل يجب أن يكون 11 رقم ويبدأ بـ 010 أو 011 أو 012 أو 015.';
        return;
      }
      if (city.length < 2 || address.length < 6) {
        this.checkoutError = 'يرجى كتابة المدينة والعنوان بالتفصيل لتسهيل التوصيل.';
        return;
      }

      // Check real-time stock before deducting
      for (const item of this.cart) {
        const stock = this.getVariantStock(item.variantId);
        if (stock < item.qty) {
          this.checkoutError = `عذراً، المتاح من "${item.name} (${item.size})" أصبح ${stock} قطعة فقط.`;
          return;
        }
      }

      // Atomic stock deduction
      for (const item of this.cart) {
        for (const p of this.products) {
          const v = p.variants.find((vr) => vr.id === item.variantId);
          if (v) {
            v.stock -= item.qty;
          }
        }
      }
      this.saveStock();

      this.selectedZoneId = this.checkout.zoneId;
      const zone = this.selectedZone;
      const orderNum = 'BND-202611-' + String(Math.floor(1000 + Math.random() * 8999));

      const newOrder = {
        orderNumber: orderNum,
        phone,
        customerName: name,
        status: 'new',
        paymentMethod: this.checkout.paymentMethod,
        paymentStatus: this.checkout.paymentMethod === 'cod' ? 'pending' : 'awaiting_verification',
        subtotal: this.cartSubtotal,
        shippingFee: this.currentShippingFee,
        total: this.cartTotal,
        createdAt: new Date().toLocaleString('ar-EG'),
        governorate: zone.name,
        address: `${city} - ${address}`,
        items: this.cart.map((c) => ({
          name: c.name,
          colorName: c.colorName,
          size: c.size,
          qty: c.qty,
          price: c.unitPrice
        }))
      };

      this.orders.unshift(newOrder);
      this.saveOrders();

      this.confirmedOrder = newOrder;
      this.receiptPreviewUrl = null;
      this.receiptUploaded = false;
      this.cart = [];
      this.saveCart();

      this.checkoutOpen = false;
      this.confirmationOpen = true;

      if (newOrder.paymentMethod !== 'cod') {
        this.startReservationCountdown(7200); // 2 hours
      }
    },

    startReservationCountdown(seconds) {
      if (this.reservationTimer) clearInterval(this.reservationTimer);
      this.reservationSecondsLeft = seconds;
      this.reservationTimer = setInterval(() => {
        if (this.reservationSecondsLeft > 0) {
          this.reservationSecondsLeft--;
        } else {
          clearInterval(this.reservationTimer);
        }
      }, 1000);
    },

    get formattedCountdown() {
      const h = Math.floor(this.reservationSecondsLeft / 3600);
      const m = Math.floor((this.reservationSecondsLeft % 3600) / 60);
      const s = this.reservationSecondsLeft % 60;
      const pad = (n) => String(n).padStart(2, '0');
      return `${pad(h)}:${pad(m)}:${pad(s)}`;
    },

    copyText(text, label) {
      navigator.clipboard?.writeText(String(text));
      this.showToast(`تم نسخ ${label}`);
    },

    handleReceiptSelect(event) {
      const file = event.target.files?.[0];
      if (!file) return;
      this.receiptPreviewUrl = URL.createObjectURL(file);
      this.receiptUploaded = true;
      // Extend reservation from 2h to 12h once receipt is attached
      this.startReservationCountdown(43200);
      this.showToast('تم إرفاق الإيصال وتمديد حجز القطع إلى 12 ساعة للمراجعة');
    },

    // Order Tracking
    openTracking(prefillOrder = null) {
      this.trackError = '';
      this.trackedOrder = null;
      if (prefillOrder) {
        this.trackQuery.orderNumber = prefillOrder.orderNumber;
        this.trackQuery.phone = prefillOrder.phone;
        this.searchOrder();
      }
      this.trackingOpen = true;
    },

    fillSampleTrack() {
      const sample = this.orders[0];
      if (!sample) return;
      this.trackQuery.orderNumber = sample.orderNumber;
      this.trackQuery.phone = sample.phone;
      this.searchOrder();
    },

    searchOrder() {
      this.trackError = '';
      const num = this.trackQuery.orderNumber.trim().toUpperCase();
      const ph = this.trackQuery.phone.trim();
      const found = this.orders.find(
        (o) => o.orderNumber.toUpperCase() === num && o.phone === ph
      );
      if (!found) {
        this.trackedOrder = null;
        this.trackError = 'لم يتم العثور على طلب مطابق لرقم الطلب ورقم الموبايل.';
        return;
      }
      this.trackedOrder = found;
    },

    statusStepIndex(status) {
      const map = { new: 1, processing: 2, shipped: 3, delivered: 4, cancelled: 0 };
      return map[status] ?? 1;
    },

    statusLabel(status) {
      const labels = {
        new: 'طلب جديد — بانتظار التأكيد',
        processing: 'جاري التجهيز والتغليف',
        shipped: 'تم التسليم لشركة الشحن',
        delivered: 'تم التوصيل بنجاح',
        cancelled: 'ملغي'
      };
      return labels[status] || status;
    }
  }));
});
