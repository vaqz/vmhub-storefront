// Product categories are a starting point. Confirm current stock, exact compatibility, and selling price with VM Hub before accepting orders.
const vmProducts = [
  { brand: "Apple Cases", name: "Clear Case — iPhone 11 family", category: "cases", status: "quote" },
  { brand: "Apple Cases", name: "Clear Case — iPhone 12 family", category: "cases", status: "quote" },
  { brand: "Apple Cases", name: "Clear Case — iPhone 13 family", category: "cases", status: "quote" },
  { brand: "Apple Cases", name: "Clear Case — iPhone 14 family", category: "cases", status: "quote" },
  { brand: "Apple Cases", name: "Clear Case — iPhone 15 family", category: "cases", status: "quote" },
  { brand: "Apple Cases", name: "Clear Case — iPhone 16 family", category: "cases", status: "quote" },
  { brand: "Apple Cases", name: "Case — iPhone 17 family (exact model required)", category: "cases", status: "quote" },
  { brand: "Apple Cases", name: "Silicone Case — supported iPhone models", category: "cases", status: "quote" },
  { brand: "Apple Cases", name: "Shockproof Case — supported iPhone models", category: "cases", status: "quote" },
  { brand: "Apple Cases", name: "MagSafe-compatible Case — supported iPhone models", category: "cases", status: "quote" },
  { brand: "Apple Protection", name: "Tempered Glass — supported iPhone models", category: "protection", status: "quote" },
  { brand: "Apple Protection", name: "Privacy Screen Protector — supported iPhone models", category: "protection", status: "quote" },
  { brand: "Apple Protection", name: "Camera Lens Protector — supported iPhone models", category: "protection", status: "quote" },
  { brand: "Apple Accessories", name: "AirPods Protective Case — generation required", category: "audio", status: "quote" },
  { brand: "Apple Charging", name: "USB-C Charging Cable", category: "charging", status: "quote" },
  { brand: "Apple Charging", name: "USB-C Power Adapter", category: "charging", status: "quote" },
  { brand: "Samsung", name: "Galaxy A-series Case — exact model required", category: "cases", status: "quote" },
  { brand: "Samsung", name: "Galaxy S-series Case — exact model required", category: "cases", status: "quote" },
  { brand: "Samsung", name: "Tempered Glass — supported Galaxy models", category: "protection", status: "quote" },
  { brand: "Samsung", name: "Camera Lens Protector — supported Galaxy models", category: "protection", status: "quote" },
  { brand: "Xiaomi / Redmi", name: "Case — exact model required", category: "cases", status: "quote" },
  { brand: "Xiaomi / Redmi", name: "Tempered Glass — exact model required", category: "protection", status: "quote" },
  { brand: "OPPO", name: "Case — exact model required", category: "cases", status: "quote" },
  { brand: "OPPO", name: "Tempered Glass — exact model required", category: "protection", status: "quote" },
  { brand: "vivo", name: "Case — exact model required", category: "cases", status: "quote" },
  { brand: "vivo", name: "Tempered Glass — exact model required", category: "protection", status: "quote" },
  { brand: "realme", name: "Case — exact model required", category: "cases", status: "quote" },
  { brand: "realme", name: "Tempered Glass — exact model required", category: "protection", status: "quote" },
  { brand: "Universal", name: "USB-C Cable — specs to be confirmed", category: "charging", status: "quote" },
  { brand: "Universal", name: "Lightning-compatible Cable — specs to be confirmed", category: "charging", status: "quote" },
  { brand: "Universal", name: "Wall Charger — output/specification to be confirmed", category: "charging", status: "quote" },
  { brand: "Universal", name: "Power Bank — capacity and ports to be confirmed", category: "power", status: "quote" },
  { brand: "Universal", name: "Wired Earphones — connector required", category: "audio", status: "quote" },
  { brand: "Universal", name: "Wireless Earbuds — model/specs to be confirmed", category: "audio", status: "quote" },
  { brand: "Universal", name: "Car Phone Mount", category: "mounts", status: "quote" },
  { brand: "Universal", name: "Adjustable Desk Phone Stand", category: "mounts", status: "quote" },
  { brand: "Universal", name: "Phone Grip / Ring Holder", category: "mounts", status: "quote" },
  { brand: "Universal", name: "OTG Adapter — connector required", category: "connectivity", status: "quote" },
  { brand: "Universal", name: "Memory Card Reader — connector required", category: "connectivity", status: "quote" },
  { brand: "Universal", name: "Phone Cleaning Kit", category: "care", status: "quote" },
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
    return `<article class="product-card"><div class="product-art" aria-hidden="true"><svg viewBox="0 0 80 80" fill="none"><rect x="23" y="7" width="34" height="66" rx="8" stroke="currentColor" stroke-width="3"/><rect x="29" y="14" width="12" height="12" rx="3" stroke="currentColor" stroke-width="2"/><path d="M36 64h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></div><div class="product-info"><p class="product-type">${p.brand}</p><h3>${p.name}</h3><p>Ask us to confirm the exact model, current availability and price before ordering.</p><div class="product-price">Message for current price</div><span class="availability-label">Availability confirmed on request</span><div class="product-buy"><label for="qty-${idx}">Qty</label><input id="qty-${idx}" class="qty-input" type="number" min="1" max="20" value="1" aria-label="Quantity for ${p.name}"><button class="button add-to-cart" type="button" data-index="${idx}">Add to order</button></div></div></article>`;
  }).join('');
  countLabel.textContent = `${filtered.length} items shown`;
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
    return `<div class="cart-row"><span>${p.name} × ${quantity}</span><strong>Price to confirm</strong><button type="button" class="remove-item" data-index="${index}">Remove</button></div>`;
  }).join('') || '<p class="section-subtitle">Your order list is empty. Add products above to request availability.</p>';
  totalLabel.textContent = orderItems.size ? "Confirming price with VM Hub" : "—";
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
    return `- ${p.name} | Qty: ${quantity} | Price: please confirm`;
  });
  const total = [...orderItems.entries()].reduce((sum, [index, quantity]) => sum + vmProducts[index].price * quantity, 0);
  const message = [
    'VM HUB — PRODUCT AVAILABILITY / ORDER REQUEST',
    'Thanks for contacting VM Hub. This is an inquiry, not a confirmed order.',
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
    'Prices: please confirm current selling price for each item',
    'Delivery / courier fee: to be confirmed where applicable',
    'Pickup arrangements: confirm location, schedule, and readiness before visiting',
    'Supplier sourcing: availability, final price, and realistic lead time must be confirmed first',
    'Final total: to be confirmed by VM Hub',
    '',
    'Notes: ' + (form.get('notes') || 'None'),
    '',
    'Please confirm current stock or sourcing availability, exact compatibility, final price, delivery fee if any, and estimated fulfillment time.'
  ].join('\n');
  window.open('https://wa.me/639481467951?text=' + encodeURIComponent(message), '_blank', 'noopener');
});
searchInput.addEventListener('input', renderVmProducts);
categoryInput.addEventListener('change', renderVmProducts);
renderVmProducts();
renderCart();
