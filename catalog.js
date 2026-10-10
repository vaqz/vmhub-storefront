// Indicative proposed retail prices in PHP, based on publicly visible Philippine retail/marketplace listings reviewed in October 2026.
// These are planning prices, not verified VM Hub inventory, supplier costs, or confirmed current selling prices.
// Keep listings as quote-request only until stock, exact compatibility, quality/specification, and price are confirmed.
const vmProducts = [
  { brand: "Apple Cases", name: "Clear Case — iPhone 11 family", category: "cases", price: 149, status: "quote" },
  { brand: "Apple Cases", name: "Clear Case — iPhone 12 family", category: "cases", price: 149, status: "quote" },
  { brand: "Apple Cases", name: "Clear Case — iPhone 13 family", category: "cases", price: 149, status: "quote" },
  { brand: "Apple Cases", name: "Clear Case — iPhone 14 family", category: "cases", price: 159, status: "quote" },
  { brand: "Apple Cases", name: "Clear Case — iPhone 15 family", category: "cases", price: 179, status: "quote" },
  { brand: "Apple Cases", name: "Clear Case — iPhone 16 family", category: "cases", price: 199, status: "quote" },
  { brand: "Apple Cases", name: "Case — iPhone 17 family (exact model required)", category: "cases", price: 249, status: "quote" },
  { brand: "Apple Cases", name: "Silicone Case — supported iPhone models", category: "cases", price: 179, status: "quote" },
  { brand: "Apple Cases", name: "Shockproof Case — supported iPhone models", category: "cases", price: 249, status: "quote" },
  { brand: "Apple Cases", name: "MagSafe-compatible Case — supported iPhone models", category: "cases", price: 299, status: "quote" },
  { brand: "Apple Protection", name: "Tempered Glass — supported iPhone models", category: "protection", price: 99, status: "quote" },
  { brand: "Apple Protection", name: "Privacy Screen Protector — supported iPhone models", category: "protection", price: 199, status: "quote" },
  { brand: "Apple Protection", name: "Camera Lens Protector — supported iPhone models", category: "protection", price: 99, status: "quote" },
  { brand: "Apple Accessories", name: "AirPods Protective Case — generation required", category: "audio", price: 149, status: "quote" },
  { brand: "Apple Charging", name: "USB-C Charging Cable", category: "charging", price: 149, status: "quote" },
  { brand: "Apple Charging", name: "USB-C Power Adapter", category: "charging", price: 399, status: "quote" },
  { brand: "Samsung", name: "Galaxy A-series Case — exact model required", category: "cases", price: 149, status: "quote" },
  { brand: "Samsung", name: "Galaxy S-series Case — exact model required", category: "cases", price: 199, status: "quote" },
  { brand: "Samsung", name: "Tempered Glass — supported Galaxy models", category: "protection", price: 99, status: "quote" },
  { brand: "Samsung", name: "Camera Lens Protector — supported Galaxy models", category: "protection", price: 99, status: "quote" },
  { brand: "Xiaomi / Redmi", name: "Case — exact model required", category: "cases", price: 149, status: "quote" },
  { brand: "Xiaomi / Redmi", name: "Tempered Glass — exact model required", category: "protection", price: 99, status: "quote" },
  { brand: "OPPO", name: "Case — exact model required", category: "cases", price: 149, status: "quote" },
  { brand: "OPPO", name: "Tempered Glass — exact model required", category: "protection", price: 99, status: "quote" },
  { brand: "vivo", name: "Case — exact model required", category: "cases", price: 149, status: "quote" },
  { brand: "vivo", name: "Tempered Glass — exact model required", category: "protection", price: 99, status: "quote" },
  { brand: "realme", name: "Case — exact model required", category: "cases", price: 149, status: "quote" },
  { brand: "realme", name: "Tempered Glass — exact model required", category: "protection", price: 99, status: "quote" },
  { brand: "Universal", name: "USB-C Cable — specs to be confirmed", category: "charging", price: 99, status: "quote" },
  { brand: "Universal", name: "Lightning-compatible Cable — specs to be confirmed", category: "charging", price: 129, status: "quote" },
  { brand: "Universal", name: "Wall Charger — output/specification to be confirmed", category: "charging", price: 249, status: "quote" },
  { brand: "Universal", name: "Power Bank — capacity and ports to be confirmed", category: "power", price: 499, status: "quote" },
  { brand: "Universal", name: "Wired Earphones — connector required", category: "audio", price: 129, status: "quote" },
  { brand: "Universal", name: "Wireless Earbuds — model/specs to be confirmed", category: "audio", price: 399, status: "quote" },
  { brand: "Universal", name: "Car Phone Mount", category: "mounts", price: 199, status: "quote" },
  { brand: "Universal", name: "Adjustable Desk Phone Stand", category: "mounts", price: 99, status: "quote" },
  { brand: "Universal", name: "Phone Grip / Ring Holder", category: "mounts", price: 79, status: "quote" },
  { brand: "Universal", name: "OTG Adapter — connector required", category: "connectivity", price: 99, status: "quote" },
  { brand: "Universal", name: "Memory Card Reader — connector required", category: "connectivity", price: 149, status: "quote" },
  { brand: "Universal", name: "Phone Cleaning Kit", category: "care", price: 99, status: "quote" },
];
const grid = document.getElementById('product-grid');
const searchInput = document.getElementById('product-search');
const categoryInput = document.getElementById('product-filter');
const countLabel = document.getElementById('product-count');
const orderItems = new Map();
function peso(amount) {
  return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(amount);
}
function renderVmProducts() {
  const query = searchInput.value.trim().toLowerCase();
  const category = categoryInput.value;
  const filtered = vmProducts.filter(p => (category === 'all' || p.category === category) && (p.name + ' ' + p.brand).toLowerCase().includes(query));
  grid.innerHTML = filtered.map(p => {
    const idx = vmProducts.indexOf(p);
    return `<article class="product-card"><div class="product-art" aria-hidden="true"><svg viewBox="0 0 80 80" fill="none"><rect x="23" y="7" width="34" height="66" rx="8" stroke="currentColor" stroke-width="3"/><rect x="29" y="14" width="12" height="12" rx="3" stroke="currentColor" stroke-width="2"/><path d="M36 64h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></div><div class="product-info"><p class="product-type">${p.brand}</p><h3>${p.name}</h3><p>Indicative price only. Exact model, quality, availability, and final price must be confirmed before order acceptance.</p><div class="product-price">Indicative retail: ${peso(p.price)}</div><span class="availability-label">Quote request · stock unverified</span><div class="product-buy"><label for="qty-${idx}">Qty</label><input id="qty-${idx}" class="qty-input" type="number" min="1" max="20" value="1" aria-label="Quantity for ${p.name}"><button class="button add-to-cart" type="button" data-index="${idx}">Add to order</button></div></div></article>`;
  }).join('');
  countLabel.textContent = `${filtered.length} of ${vmProducts.length} planned listings shown`;
  grid.querySelectorAll('.add-to-cart').forEach(button => button.addEventListener('click', () => {
    const index = Number(button.dataset.index);
    const quantity = Math.max(1, Math.min(20, Number(document.getElementById('qty-' + index).value) || 1));
    orderItems.set(index, (orderItems.get(index) || 0) + quantity);
    renderCart();
    document.getElementById('order-cart').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));
}
function renderCart() {
  const container = document.getElementById('cart-items');
  const totalLabel = document.getElementById('cart-total');
  const count = document.getElementById('cart-count');
  let total = 0;
  let qty = 0;
  container.innerHTML = [...orderItems.entries()].map(([index, quantity]) => {
    const p = vmProducts[index];
    total += p.price * quantity;
    qty += quantity;
    return `<div class="cart-row"><span>${p.name} × ${quantity}</span><strong>${peso(p.price * quantity)}</strong><button type="button" class="remove-item" data-index="${index}">Remove</button></div>`;
  }).join('') || '<p class="section-subtitle">Your order list is empty. Add products above to request availability.</p>';
  totalLabel.textContent = peso(total);
  count.textContent = String(qty);
  container.querySelectorAll('.remove-item').forEach(button => button.addEventListener('click', () => {
    orderItems.delete(Number(button.dataset.index));
    renderCart();
  }));
}
document.getElementById('order-form').addEventListener('submit', event => {
  event.preventDefault();
  if (!orderItems.size) { alert('Please add at least one product to your order list.'); return; }
  const form = new FormData(event.target);
  const lines = [...orderItems.entries()].map(([index, quantity]) => {
    const p = vmProducts[index];
    return `- ${p.name} | Qty: ${quantity} | Indicative ${peso(p.price * quantity)}`;
  });
  const total = [...orderItems.entries()].reduce((sum, [index, quantity]) => sum + vmProducts[index].price * quantity, 0);
  const message = [
    'VM HUB — PRODUCT AVAILABILITY / ORDER REQUEST',
    'This is a request only, not a confirmed purchase.',
    '',
    'Customer: ' + form.get('customer_name'),
    'Mobile: ' + form.get('mobile'),
    'Email: ' + (form.get('email') || 'Not provided'),
    'Fulfillment method: ' + form.get('fulfillment'),
    'Delivery address / pickup details: ' + form.get('delivery_address'),
    'Phone model / compatibility notes: ' + (form.get('compatibility') || 'Not provided'),
    '',
    'Requested items:',
    ...lines,
    'Indicative subtotal (not final): ' + peso(total),
    'Delivery / courier fee: to be confirmed where applicable',
    'Pickup arrangements: confirm location, schedule, and readiness before visiting',
    'Supplier sourcing: availability, final price, and realistic lead time must be confirmed first',
    'Final total: to be confirmed by VM Hub',
    '',
    'Notes: ' + (form.get('notes') || 'None'),
    '',
    'Please confirm stock or supplier availability, exact compatibility, final price, fulfillment fee if any, and realistic delivery/pickup/sourcing timing before payment.'
  ].join('\n');
  window.open('https://wa.me/639481467951?text=' + encodeURIComponent(message), '_blank', 'noopener');
});
searchInput.addEventListener('input', renderVmProducts);
categoryInput.addEventListener('change', renderVmProducts);
renderVmProducts();
renderCart();
