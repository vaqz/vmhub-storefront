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
function productIllustration(p) {
  const n = p.name.toLowerCase();
  const stroke = "#29364a";
  const blue = "#3b82f6";
  let art = "";
  if (n.includes("case")) {
    art = `<rect x="112" y="24" width="96" height="172" rx="20" fill="#f8fafc" stroke="${stroke}" stroke-width="4"/><rect x="120" y="32" width="80" height="156" rx="14" fill="#eaf2ff" stroke="#bfdbfe" stroke-width="2"/><rect x="130" y="42" width="34" height="34" rx="9" fill="#dbeafe" stroke="${stroke}" stroke-width="3"/><circle cx="141" cy="53" r="5" fill="${blue}"/><circle cx="154" cy="65" r="5" fill="${blue}"/><circle cx="141" cy="66" r="4" fill="${blue}"/>`;
    if (n.includes("clear")) art = art.replace('fill="#eaf2ff"', 'fill="#ffffff" fill-opacity=".36"').replace('stroke="#bfdbfe"', 'stroke="#93c5fd"');
    if (n.includes("magsafe")) art += `<circle cx="160" cy="124" r="24" fill="none" stroke="${blue}" stroke-width="5"/><path d="M160 100v48" stroke="${blue}" stroke-width="4" stroke-linecap="round"/>`;
  } else if (n.includes("tempered glass") || n.includes("screen protector") || n.includes("lens protector")) {
    art = n.includes("lens protector") ? `<circle cx="160" cy="110" r="58" fill="#f8fafc" stroke="${stroke}" stroke-width="4"/><circle cx="160" cy="110" r="42" fill="#e0f2fe" stroke="${blue}" stroke-width="4"/><circle cx="160" cy="110" r="25" fill="#334155"/><circle cx="151" cy="101" r="8" fill="#93c5fd"/>` : `<rect x="112" y="24" width="96" height="172" rx="18" fill="#f8fafc" stroke="${stroke}" stroke-width="4"/><rect x="120" y="32" width="80" height="156" rx="12" fill="#dff4ff" fill-opacity=".7" stroke="${blue}" stroke-width="2"/><path d="M130 55l58 90M144 42l49 76" stroke="#ffffff" stroke-width="5" stroke-linecap="round"/>`;
  } else if (n.includes("cable")) {
    art = `<path d="M105 75v55a55 55 0 0 0 110 0V90" fill="none" stroke="#e2e8f0" stroke-width="16" stroke-linecap="round"/><path d="M105 75v55a55 55 0 0 0 110 0V90" fill="none" stroke="${stroke}" stroke-width="3" stroke-linecap="round"/><rect x="91" y="46" width="28" height="34" rx="5" fill="#f8fafc" stroke="${stroke}" stroke-width="3"/><rect x="201" y="66" width="28" height="35" rx="5" fill="#f8fafc" stroke="${stroke}" stroke-width="3"/>`;
  } else if (n.includes("charger") || n.includes("adapter")) {
    art = `<rect x="119" y="55" width="82" height="108" rx="16" fill="#f8fafc" stroke="${stroke}" stroke-width="4"/><rect x="140" y="42" width="8" height="22" rx="2" fill="#94a3b8"/><rect x="170" y="42" width="8" height="22" rx="2" fill="#94a3b8"/><rect x="145" y="132" width="30" height="8" rx="4" fill="${blue}"/>`;
  } else if (n.includes("power bank")) {
    art = `<rect x="105" y="55" width="110" height="116" rx="18" fill="#f8fafc" stroke="${stroke}" stroke-width="4"/><rect x="143" y="43" width="34" height="8" rx="4" fill="#94a3b8"/><path d="M165 78l-24 40h20l-8 27 28-44h-20z" fill="${blue}"/>`;
  } else if (n.includes("earbud") || n.includes("earphone")) {
    art = `<rect x="108" y="100" width="104" height="70" rx="22" fill="#f8fafc" stroke="${stroke}" stroke-width="4"/><path d="M129 91v-25a19 19 0 0 1 38 0v18h-13V66a6 6 0 0 0-12 0v25zM174 91V66a19 19 0 0 1 38 0v25h-13V66a6 6 0 0 0-12 0v25z" fill="#ffffff" stroke="${stroke}" stroke-width="3" stroke-linejoin="round"/><path d="M139 145h42" stroke="${blue}" stroke-width="5" stroke-linecap="round"/>`;
  } else if (n.includes("stand") || n.includes("mount") || n.includes("holder")) {
    art = `<rect x="135" y="25" width="50" height="100" rx="10" fill="#f8fafc" stroke="${stroke}" stroke-width="4"/><rect x="142" y="33" width="36" height="83" rx="5" fill="#dbeafe"/><path d="M160 125v35l-28 15M160 160l28 15" fill="none" stroke="${stroke}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><rect x="111" y="174" width="98" height="12" rx="6" fill="#94a3b8"/><circle cx="160" cy="73" r="12" fill="${blue}"/>`;
  } else if (n.includes("otg") || n.includes("reader")) {
    art = `<rect x="112" y="80" width="96" height="60" rx="14" fill="#f8fafc" stroke="${stroke}" stroke-width="4"/><rect x="92" y="96" width="23" height="28" rx="4" fill="#94a3b8" stroke="${stroke}" stroke-width="3"/><rect x="205" y="96" width="26" height="28" rx="4" fill="#dbeafe" stroke="${stroke}" stroke-width="3"/><rect x="139" y="96" width="42" height="28" rx="5" fill="${blue}"/>`;
  } else if (n.includes("cleaning")) {
    art = `<rect x="111" y="79" width="34" height="86" rx="10" fill="#bfdbfe" stroke="${stroke}" stroke-width="3"/><rect x="116" y="60" width="24" height="23" rx="4" fill="#f8fafc" stroke="${stroke}" stroke-width="3"/><rect x="160" y="90" width="62" height="60" rx="12" fill="#f8fafc" stroke="${stroke}" stroke-width="3"/><path d="M171 105h40M171 118h32" stroke="${blue}" stroke-width="4" stroke-linecap="round"/>`;
  } else {
    art = `<rect x="112" y="24" width="96" height="172" rx="20" fill="#f8fafc" stroke="${stroke}" stroke-width="4"/><rect x="120" y="32" width="80" height="156" rx="14" fill="#dbeafe"/><circle cx="160" cy="110" r="24" fill="${blue}"/><path d="M149 110l8 8 15-17" fill="none" stroke="#ffffff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`;
  }
  return `<svg viewBox="0 0 320 220" role="img" aria-label="${p.name}" xmlns="http://www.w3.org/2000/svg"><rect width="320" height="220" fill="#ffffff"/><ellipse cx="160" cy="194" rx="66" ry="8" fill="#0f172a" opacity=".08"/>${art}</svg>`;
}
function productDescription(p) {
  const n = p.name.toLowerCase();
  if (n.includes("clear case")) return "A clear everyday case to show off your phone while helping protect it from scratches and scuffs.";
  if (n.includes("silicone case")) return "A soft-touch case with a comfortable feel for everyday use. Available fit depends on your phone model.";
  if (n.includes("shockproof")) return "A case designed with extra edge protection for everyday bumps. Ask us to check fit for your phone.";
  if (n.includes("magsafe")) return "A case designed for compatible magnetic accessories. Confirm your iPhone model before ordering.";
  if (n.includes("case")) return "An everyday protective case for selected phone models. Share your exact phone model so we can check compatibility.";
  if (n.includes("tempered glass")) return "Helps protect your screen from everyday scratches. Compatibility depends on your exact phone model.";
  if (n.includes("privacy screen")) return "A screen protector designed to make side viewing less visible. Please confirm your exact phone model.";
  if (n.includes("lens protector")) return "Helps shield your camera lenses from everyday scratches. Fit depends on your phone model.";
  if (n.includes("airpods protective")) return "Protective cover for your AirPods charging case. Please tell us your AirPods generation so we can check the fit."
  if (n.includes("cable")) return "Charge your device or connect it for data transfer. Available connector types and charging speeds depend on the model.";
  if (n.includes("adapter") || n.includes("charger")) return "A wall charger for everyday charging. Tell us your phone model so we can help check the right connector and power output.";
  if (n.includes("power bank")) return "Keep your phone powered while you’re out. Ask us about available capacities, ports and charging speeds.";
  if (n.includes("earphone") || n.includes("earbud")) return "For music, calls and everyday listening. Let us know whether you need a wired or wireless option.";
  if (n.includes("car phone mount")) return "Keep your phone in view while driving. Mounting style and phone fit depend on the selected model.";
  if (n.includes("desk phone stand")) return "A handy stand for viewing your phone on a desk, counter or bedside table.";
  if (n.includes("grip") || n.includes("ring holder")) return "Adds a more secure grip when holding your phone. Style and attachment type vary by item.";
  if (n.includes("otg")) return "Connect compatible USB accessories to your phone or tablet. Connector type depends on your device.";
  if (n.includes("card reader")) return "Transfer files from supported memory cards. Check the card format and connector your device needs.";
  if (n.includes("cleaning kit")) return "For routine cleaning of your phone and accessories. Kit contents may vary by supplier.";
  return "A practical mobile accessory for everyday use. Ask us about compatible options.";
}
function marketPriceRange(p) {
  const n = p.name.toLowerCase();
  if (n.includes("power bank")) return "₱350–₱1,200";
  if (n.includes("power adapter")) return "₱150–₱1,500";
  if (n.includes("charger")) return "₱80–₱500";
  if (n.includes("cable")) return "₱30–₱200";
  if (n.includes("wireless earbuds")) return "₱180–₱800";
  if (n.includes("wired earphones")) return "₱80–₱250";
  if (n.includes("airpods protective")) return "₱50–₱300";
  if (n.includes("privacy screen")) return "₱50–₱200";
  if (n.includes("tempered glass")) return "₱20–₱150";
  if (n.includes("lens protector")) return "₱30–₱150";
  if (n.includes("magsafe")) return "₱150–₱500";
  if (n.includes("shockproof")) return "₱70–₱300";
  if (n.includes("silicone case") || n.includes("clear case") || n.includes("case")) return "₱40–₱250";
  if (n.includes("car phone mount")) return "₱80–₱350";
  if (n.includes("desk phone stand")) return "₱30–₱200";
  if (n.includes("grip") || n.includes("ring holder")) return "₱30–₱180";
  if (n.includes("otg")) return "₱30–₱150";
  if (n.includes("card reader")) return "₱50–₱250";
  if (n.includes("cleaning kit")) return "₱50–₱200";
  return "₱30–₱300";
}
function peso(amount) {
  return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(amount);
}
function renderVmProducts() {
  const query = searchInput.value.trim().toLowerCase();
  const category = categoryInput.value;
  const filtered = vmProducts.filter(p => (category === 'all' || p.category === category) && (p.name + ' ' + p.brand).toLowerCase().includes(query));
  grid.innerHTML = filtered.map(p => {
    const idx = vmProducts.indexOf(p);
    return `<article class="product-card"><div class="product-art">${productIllustration(p)}</div><div class="product-info"><p class="product-type">${p.brand}</p><h3>${p.name}</h3><p>${productDescription(p)}</p><div class="product-price">Typical PH online price range: ${marketPriceRange(p)}</div><p class="price-note">Indicative market reference only; VM Hub price and stock are confirmed by message.</p><span class="availability-label">Availability confirmed on request</span><div class="product-buy"><label for="qty-${idx}">Qty</label><input id="qty-${idx}" class="qty-input" type="number" min="1" max="20" value="1" aria-label="Quantity for ${p.name}"><button class="button add-to-cart" type="button" data-index="${idx}">Add to order</button></div></div></article>`;
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
  let qty = 0;
  container.innerHTML = [...orderItems.entries()].map(([index, quantity]) => {
    const p = vmProducts[index];
    qty += quantity;
    return `<div class="cart-row"><span>${p.name} × ${quantity}</span><strong>Price to confirm</strong><button type="button" class="remove-item" data-index="${index}">Remove</button></div>`;
  }).join('') || '<p class="section-subtitle">Your list is empty. Add items above to request a price and availability.</p>';
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
document.querySelectorAll('.category-link[data-category]').forEach(link => {
  link.addEventListener('click', () => {
    categoryInput.value = link.dataset.category;
    searchInput.value = '';
    renderVmProducts();
    document.querySelectorAll('.category-link[data-category]').forEach(item => item.setAttribute('aria-pressed', String(item === link)));
  });
});
searchInput.addEventListener('input', renderVmProducts);
categoryInput.addEventListener('change', renderVmProducts);
renderVmProducts();
renderCart();
