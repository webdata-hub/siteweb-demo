/* =====================================================
   BANABANA — script.js
   Démo front-end : navigation, localisation Sénégal,
   commande, paiement, tableaux de bord restaurant/livreur.
   Toutes les données sont simulées en mémoire (pas de backend).
   ===================================================== */

/* ---------------------------------------------------
   1. DONNÉES : découpage administratif du Sénégal
   Région > Département > Arrondissement > Villes/Communes
   --------------------------------------------------- */
const SENEGAL = {
  "Dakar": {
    "Dakar": {
      "Almadies": ["Ngor", "Yoff", "Ouakam"],
      "Plateau": ["Plateau", "Médina"],
      "Parcelles Assainies": ["Parcelles Assainies", "Grand Yoff"]
    },
    "Pikine": {
      "Pikine Dagoudane": ["Pikine Nord", "Pikine Est", "Pikine Ouest"],
      "Guédiawaye": ["Golf Sud", "Sam Notaire", "Wakhinane Nimzatt"]
    },
    "Rufisque": {
      "Rufisque": ["Rufisque Nord", "Rufisque Est", "Rufisque Ouest"],
      "Bargny": ["Bargny", "Diamniadio"]
    }
  },
  "Thiès": {
    "Thiès": {
      "Thiès Nord": ["Thiès Nord", "Grand Standing"],
      "Thiès Sud": ["Thiès Sud", "Randoulène"]
    },
    "Mbour": {
      "Mbour": ["Saly Portudal", "Somone", "Mbour Centre", "Nianing"]
    },
    "Tivaouane": {
      "Tivaouane": ["Tivaouane", "Mékhé", "Pambal"]
    }
  },
  "Saint-Louis": {
    "Saint-Louis": {
      "Saint-Louis": ["Sor", "Nord", "Sud", "Guet Ndar"]
    },
    "Dagana": {
      "Dagana": ["Richard-Toll", "Dagana", "Rosso-Sénégal"]
    }
  },
  "Diourbel": {
    "Diourbel": {
      "Diourbel": ["Diourbel Centre", "Ndindy"]
    },
    "Touba": {
      "Mbacké": ["Touba Mosquée", "Darou Khoudoss", "Ndame"]
    }
  },
  "Ziguinchor": {
    "Ziguinchor": {
      "Ziguinchor": ["Grand Dakar Ziguinchor", "Kandé", "Néma"]
    }
  }
};

/* ---------------------------------------------------
   2. DONNÉES : restaurants & menus
   --------------------------------------------------- */
const RESTAURANTS = [
  {
    id: "r1", name: "Chez Pizza Yassa", emoji: "🍕", cover:"🍕",
    category:"Pizza", time:"20-30 min", rating:4.7, fastest:true,
    zone:"Almadies",
    menu:[
      {id:"m1", name:"Pizza Margherita", desc:"Tomate, mozzarella, basilic", price:5000, emoji:"🍕", cost:2200},
      {id:"m2", name:"Pizza 4 Fromages", desc:"Mozzarella, chèvre, gorgonzola, emmental", price:6500, emoji:"🍕", cost:3100},
      {id:"m3", name:"Pizza Poulet Fumé", desc:"Poulet, oignons caramélisés", price:6000, emoji:"🍕", cost:2800},
    ]
  },
  {
    id: "r2", name: "Burger House Dakar", emoji: "🍔", cover:"🍔",
    category:"Burger", time:"15-25 min", rating:4.5, fastest:true,
    zone:"Plateau",
    menu:[
      {id:"m4", name:"Menu Classic Burger", desc:"Burger bœuf + frites + Coca", price:4500, emoji:"🍔🥤🍟", cost:1900},
      {id:"m5", name:"Menu Double Cheese", desc:"Double steak, cheddar + frites + Coca", price:6000, emoji:"🍔🥤🍟", cost:2600},
      {id:"m6", name:"Menu Poulet Croustillant", desc:"Poulet pané + frites + Coca", price:5000, emoji:"🍔🥤🍟", cost:2100},
    ]
  },
  {
    id: "r3", name: "Le Jardin Vert", emoji: "🥗", cover:"🥗",
    category:"Salade", time:"15-20 min", rating:4.8, fastest:false,
    zone:"Ngor",
    menu:[
      {id:"m7", name:"Salade César Poulet", desc:"Poulet grillé, parmesan, croûtons", price:4000, emoji:"🥗", cost:1700},
      {id:"m8", name:"Salade Fraîcheur Légumes", desc:"Légumes de saison du marché", price:3000, emoji:"🥗", cost:1200},
      {id:"m9", name:"Bowl Quinoa & Avocat", desc:"Quinoa, avocat, tomates cerises", price:4500, emoji:"🥗", cost:2000},
    ]
  },
  {
    id: "r4", name: "Dibiterie Sénégal", emoji: "🍖", cover:"🍖",
    category:"Grillades", time:"25-35 min", rating:4.6, fastest:false,
    zone:"Sacré-Cœur",
    menu:[
      {id:"m10", name:"Dibi Mouton", desc:"Viande grillée, oignons, moutarde", price:5500, emoji:"🍖", cost:2600},
      {id:"m11", name:"Poulet Braisé", desc:"Poulet entier braisé, attiéké", price:6500, emoji:"🍗", cost:3000},
    ]
  },
  {
    id: "r5", name: "Thiéboudienne Express", emoji: "🍛", cover:"🍛",
    category:"Sénégalais", time:"20-30 min", rating:4.9, fastest:true,
    zone:"Médina",
    menu:[
      {id:"m12", name:"Thiéboudienne Rouge", desc:"Riz au poisson, légumes", price:3500, emoji:"🍛", cost:1500},
      {id:"m13", name:"Yassa Poulet", desc:"Poulet mariné, oignons, riz", price:3500, emoji:"🍛", cost:1500},
      {id:"m14", name:"Mafé Bœuf", desc:"Sauce arachide, riz blanc", price:3800, emoji:"🍛", cost:1650},
    ]
  },
  {
    id: "r6", name: "Frit'Land Snack", emoji: "🍟", cover:"🍟",
    category:"Snack", time:"10-20 min", rating:4.3, fastest:true,
    zone:"Sicap Liberté",
    menu:[
      {id:"m15", name:"Frites Sauce Fromagère", desc:"Frites maison, sauce cheddar", price:2000, emoji:"🍟", cost:800},
      {id:"m16", name:"Menu Hot-Dog Coca", desc:"Hot-dog + Coca-Cola", price:2500, emoji:"🌭🥤", cost:1050},
    ]
  }
];

const CATEGORIES = ["Toutes", "Pizza", "Burger", "Salade", "Grillades", "Sénégalais", "Snack"];

/* ---------------------------------------------------
   3. DONNÉES SIMULÉES : livreurs, clients, commandes
   --------------------------------------------------- */
let LIVREURS = [
  {id:"l1", restaurantId:"r1", name:"Moussa Diop", phone:"77 123 45 67", zone:"Almadies", status:"disponible", note:4.8, courses:132},
  {id:"l2", restaurantId:"r1", name:"Ibrahima Ndiaye", phone:"70 234 56 78", zone:"Ngor", status:"en-course", note:4.6, courses:98},
  {id:"l3", restaurantId:"r2", name:"Awa Fall", phone:"78 345 67 89", zone:"Plateau", status:"disponible", note:4.9, courses:210},
  {id:"l4", restaurantId:"r3", name:"Cheikh Sarr", phone:"76 456 78 90", zone:"Ngor", status:"disponible", note:4.7, courses:64},
  {id:"l5", restaurantId:"r5", name:"Fatou Mbaye", phone:"77 567 89 01", zone:"Médina", status:"en-course", note:4.5, courses:150},
];

let CLIENTS = [
  {id:"c1", name:"Aminata Sow", phone:"77 111 22 33", orders:6, spent:31500, restaurantId:"r1"},
  {id:"c2", name:"Modou Ba", phone:"78 222 33 44", orders:3, spent:14500, restaurantId:"r1"},
  {id:"c3", name:"Khady Diallo", phone:"76 333 44 55", orders:9, spent:47000, restaurantId:"r2"},
  {id:"c4", name:"Ousmane Gueye", phone:"70 444 55 66", orders:2, spent:8000, restaurantId:"r3"},
  {id:"c5", name:"Bineta Camara", phone:"77 555 66 77", orders:5, spent:19500, restaurantId:"r5"},
];

let ORDERS = [
  {id:"CMD-1042", restaurantId:"r1", clientName:"Aminata Sow", items:[{name:"Pizza Margherita",qty:1,price:5000,cost:2200}], total:5000, payment:"wave", status:"livree", livreurId:"l1", zone:"Almadies", date:"Auj. 11:20"},
  {id:"CMD-1043", restaurantId:"r1", clientName:"Modou Ba", items:[{name:"Pizza 4 Fromages",qty:1,price:6500,cost:3100}], total:6500, payment:"cash", status:"en-livraison", livreurId:"l2", zone:"Ngor", date:"Auj. 11:52"},
  {id:"CMD-1044", restaurantId:"r2", clientName:"Khady Diallo", items:[{name:"Menu Double Cheese",qty:2,price:6000,cost:2600}], total:12000, payment:"orange", status:"en-preparation", livreurId:null, zone:"Plateau", date:"Auj. 12:05"},
  {id:"CMD-1045", restaurantId:"r3", clientName:"Ousmane Gueye", items:[{name:"Salade César Poulet",qty:1,price:4000,cost:1700}], total:4000, payment:"wave", status:"en-attente", livreurId:null, zone:"Ngor", date:"Auj. 12:10"},
  {id:"CMD-1046", restaurantId:"r5", clientName:"Bineta Camara", items:[{name:"Thiéboudienne Rouge",qty:2,price:3500,cost:1500}], total:7000, payment:"cash", status:"livree", livreurId:"l5", zone:"Médina", date:"Hier 19:40"},
];

let orderCounter = 1047;

let MESSAGES = [
  {id:"msg1", name:"Aissatou Ndoye", contact:"77 000 11 22", message:"Bonjour, est-ce que vous livrez à Ouakam le soir ?", date:"Hier", read:false},
  {id:"msg2", name:"Mamadou Faye", contact:"mamadou.faye@mail.com", message:"J'aimerais connaître les délais pour ajouter mon restaurant.", date:"Il y a 2 jours", read:true},
];
let messageCounter = 3;

/* ---------------------------------------------------
   4. ÉTAT DE L'APPLICATION
   --------------------------------------------------- */
const state = {
  address: null,          // {region, departement, arrondissement, ville, rue}
  currentRestaurant: null,
  cart: [],               // [{itemId, name, price, cost, qty}]
  activeCategory: "Toutes",
  currentDashboardRestaurantId: "r1",
  currentDashboardLivreurId: "l1",
  user: null,              // {phone, method, since} une fois connecté
  pendingAuth: null,       // {phone, method, code} pendant la vérification
  myOrders: [],            // commandes passées par l'utilisateur connecté
  isAdmin: false,
};

const ADMIN_CREDENTIALS = { username: "admin", password: "banabana2026" };

/* ---------------------------------------------------
   5. UTILITAIRES
   --------------------------------------------------- */
const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));
const fcfa = (n) => n.toLocaleString('fr-FR') + " FCFA";
const statusLabels = {
  "en-attente":"En attente", "en-preparation":"En préparation",
  "en-livraison":"En livraison", "livree":"Livrée",
  "disponible":"Disponible", "en-course":"En course"
};

function openOverlay(id){ $("#"+id).classList.add("is-active"); }
function closeOverlay(id){ $("#"+id).classList.remove("is-active"); }

function switchView(view){
  $$(".view").forEach(v => v.classList.remove("is-active"));
  $$(".nav-link").forEach(n => n.classList.remove("is-active"));
  if(view === "client"){
    $("#view-client").classList.add("is-active");
  } else if(view === "restaurant"){
    $("#view-restaurant").classList.add("is-active");
    renderDashboardRestaurant();
  } else if(view === "livreur"){
    $("#view-livreur").classList.add("is-active");
    renderDashboardLivreur();
  } else if(view === "menu"){
    $("#view-menu").classList.add("is-active");
  } else if(view === "account"){
    $("#view-account").classList.add("is-active");
    renderAccountView();
  } else if(view === "admin"){
    $("#view-admin").classList.add("is-active");
    renderAdminDashboard();
  }
  const navBtn = $(`.nav-link[data-view="${view}"]`);
  if(navBtn) navBtn.classList.add("is-active");
  window.scrollTo({top:0, behavior:"smooth"});
}

/* ---------------------------------------------------
   6. LOCALISATION (cascading selects)
   --------------------------------------------------- */
function fillSelect(select, options, placeholder){
  select.innerHTML = "";
  const ph = document.createElement("option");
  ph.value = ""; ph.textContent = placeholder; ph.disabled = true; ph.selected = true;
  select.appendChild(ph);
  options.forEach(opt => {
    const o = document.createElement("option");
    o.value = opt; o.textContent = opt;
    select.appendChild(o);
  });
}

function initLocationSelects(){
  const regionSelect = $("#select-region");
  fillSelect(regionSelect, Object.keys(SENEGAL), "Sélectionner une région");

  regionSelect.addEventListener("change", () => {
    const deps = Object.keys(SENEGAL[regionSelect.value] || {});
    fillSelect($("#select-departement"), deps, "Sélectionner un département");
    fillSelect($("#select-arrondissement"), [], "Sélectionner un arrondissement");
    fillSelect($("#select-ville"), [], "Sélectionner une ville/commune");
  });

  $("#select-departement").addEventListener("change", (e) => {
    const region = regionSelect.value;
    const arrs = Object.keys((SENEGAL[region] || {})[e.target.value] || {});
    fillSelect($("#select-arrondissement"), arrs, "Sélectionner un arrondissement");
    fillSelect($("#select-ville"), [], "Sélectionner une ville/commune");
  });

  $("#select-arrondissement").addEventListener("change", (e) => {
    const region = regionSelect.value;
    const dep = $("#select-departement").value;
    const villes = ((SENEGAL[region] || {})[dep] || {})[e.target.value] || [];
    fillSelect($("#select-ville"), villes, "Sélectionner une ville/commune");
  });
}

function validateLocation(){
  const region = $("#select-region").value;
  const departement = $("#select-departement").value;
  const arrondissement = $("#select-arrondissement").value;
  const ville = $("#select-ville").value;
  const rue = $("#input-rue").value.trim();

  if(!region || !departement || !arrondissement || !ville){
    alert("Merci de compléter région, département, arrondissement et ville.");
    return;
  }
  state.address = {region, departement, arrondissement, ville, rue};
  $("#location-label").textContent = `${ville}, ${arrondissement}`;
  $("#zone-label").textContent = ville;
  closeOverlay("overlay-location");
}

/* ---------------------------------------------------
   7. VUE CLIENT : catégories & restaurants
   --------------------------------------------------- */
function renderCategories(){
  const row = $("#category-row");
  row.innerHTML = "";
  CATEGORIES.forEach(cat => {
    const chip = document.createElement("button");
    chip.className = "category-chip" + (cat === state.activeCategory ? " is-active" : "");
    chip.textContent = cat;
    chip.addEventListener("click", () => {
      state.activeCategory = cat;
      renderCategories();
      renderRestaurants();
    });
    row.appendChild(chip);
  });
}

function renderRestaurants(searchTerm=""){
  const grid = $("#restaurant-grid");
  grid.innerHTML = "";
  const term = searchTerm.toLowerCase();

  const filtered = RESTAURANTS.filter(r => {
    const matchCat = state.activeCategory === "Toutes" || r.category === state.activeCategory;
    const matchSearch = !term || r.name.toLowerCase().includes(term) || r.category.toLowerCase().includes(term) ||
      r.menu.some(m => m.name.toLowerCase().includes(term));
    return matchCat && matchSearch;
  });

  if(filtered.length === 0){
    grid.innerHTML = `<p class="muted">Aucun restaurant ne correspond à ta recherche.</p>`;
    return;
  }

  filtered.forEach(r => {
    const card = document.createElement("button");
    card.className = "restaurant-card";
    card.innerHTML = `
      <div class="restaurant-cover">${r.cover}</div>
      <div class="restaurant-info">
        <h3>${r.name}</h3>
        <div class="restaurant-meta">
          <span>⭐ ${r.rating}</span>
          <span>${r.time}</span>
          <span>${r.category}</span>
        </div>
        <span class="restaurant-tag ${r.fastest ? 'badge-fastest' : ''}">${r.fastest ? "Livraison rapide" : "Zone : " + r.zone}</span>
      </div>`;
    card.addEventListener("click", () => openRestaurantMenu(r.id));
    grid.appendChild(card);
  });
}

function openRestaurantMenu(restaurantId){
  const r = RESTAURANTS.find(x => x.id === restaurantId);
  state.currentRestaurant = r;

  $("#menu-header").innerHTML = `
    <div class="menu-header-emoji">${r.emoji}</div>
    <div>
      <h2>${r.name}</h2>
      <div class="restaurant-meta">
        <span>⭐ ${r.rating}</span><span>${r.time}</span><span>${r.category}</span><span>Zone : ${r.zone}</span>
      </div>
    </div>`;

  const itemsWrap = $("#menu-items");
  itemsWrap.innerHTML = "";
  r.menu.forEach(item => {
    const el = document.createElement("div");
    el.className = "menu-item";
    el.innerHTML = `
      <div class="menu-item-emoji">${item.emoji}</div>
      <div class="menu-item-info">
        <h4>${item.name}</h4>
        <p class="muted" style="font-size:12px">${item.desc}</p>
        <p class="menu-item-price">${fcfa(item.price)}</p>
      </div>
      <button class="menu-item-add" aria-label="Ajouter ${item.name}">+</button>`;
    el.querySelector(".menu-item-add").addEventListener("click", () => addToCart(item, r));
    itemsWrap.appendChild(el);
  });

  switchView("menu");
}

/* ---------------------------------------------------
   8. PANIER
   --------------------------------------------------- */
function addToCart(item, restaurant){
  if(state.cart.length && state.cart[0].restaurantId !== restaurant.id){
    if(!confirm("Ton panier contient déjà des articles d'un autre restaurant. Vider le panier et continuer ?")) return;
    state.cart = [];
  }
  const existing = state.cart.find(c => c.itemId === item.id);
  if(existing){ existing.qty += 1; }
  else{
    state.cart.push({
      itemId:item.id, name:item.name, price:item.price, cost:item.cost,
      qty:1, restaurantId:restaurant.id, restaurantName:restaurant.name
    });
  }
  updateCartCount();
  renderCart();
}

function updateCartCount(){
  const count = state.cart.reduce((sum,c) => sum + c.qty, 0);
  $("#cart-count").textContent = count;
}

function renderCart(){
  const wrap = $("#cart-items");
  wrap.innerHTML = "";
  if(state.cart.length === 0){
    wrap.innerHTML = `<p class="cart-empty">Ton panier est vide pour l'instant.</p>`;
    $("#cart-total").style.display = "none";
    return;
  }
  $("#cart-total").style.display = "flex";

  state.cart.forEach(line => {
    const row = document.createElement("div");
    row.className = "cart-line";
    row.innerHTML = `
      <div>
        <div class="cart-line-name">${line.name}</div>
        <div class="cart-line-qty">${fcfa(line.price)} l'unité</div>
      </div>
      <div class="cart-line-controls">
        <button class="qty-btn" data-action="minus">-</button>
        <span>${line.qty}</span>
        <button class="qty-btn" data-action="plus">+</button>
      </div>`;
    row.querySelector('[data-action="minus"]').addEventListener("click", () => changeQty(line.itemId, -1));
    row.querySelector('[data-action="plus"]').addEventListener("click", () => changeQty(line.itemId, 1));
    wrap.appendChild(row);
  });

  const total = state.cart.reduce((sum,c) => sum + c.price * c.qty, 0);
  $("#cart-total").innerHTML = `<span>Total</span><span>${fcfa(total)}</span>`;
}

function changeQty(itemId, delta){
  const line = state.cart.find(c => c.itemId === itemId);
  if(!line) return;
  line.qty += delta;
  if(line.qty <= 0){ state.cart = state.cart.filter(c => c.itemId !== itemId); }
  updateCartCount();
  renderCart();
}

function confirmOrder(){
  if(state.cart.length === 0){ alert("Ajoute au moins un article à ton panier."); return; }
  if(!state.address){
    alert("Merci de renseigner ton adresse de livraison avant de commander.");
    openOverlay("overlay-location");
    return;
  }
  const payment = $('input[name="payment"]:checked').value;
  const phone = $("#input-phone").value.trim();
  if((payment === "wave" || payment === "orange") && !phone){
    alert("Merci de renseigner ton numéro Mobile Money.");
    return;
  }

  const restaurantId = state.cart[0].restaurantId;
  const total = state.cart.reduce((s,c) => s + c.price*c.qty, 0);
  const order = {
    id: "CMD-" + (orderCounter++),
    restaurantId,
    clientName: state.user ? "Client " + state.user.phone : "Client web (" + (state.address.ville) + ")",
    items: state.cart.map(c => ({name:c.name, qty:c.qty, price:c.price, cost:c.cost})),
    total,
    payment,
    status: "en-attente",
    livreurId: null,
    zone: state.address.arrondissement,
    date: "À l'instant"
  };
  ORDERS.unshift(order);
  if(state.user){ state.myOrders.unshift(order); }

  const paymentLabel = payment === "wave" ? "Wave" : payment === "orange" ? "Orange Money" : "à la livraison";
  $("#confirm-title").textContent = "Commande envoyée !";
  $("#confirm-text").textContent = `Commande ${order.id} envoyée à ${state.currentRestaurant ? state.currentRestaurant.name : "ton restaurant"}. Paiement ${paymentLabel}. Elle est visible dans le tableau de bord du restaurant.`;

  state.cart = [];
  updateCartCount();
  renderCart();
  closeOverlay("overlay-cart");
  openOverlay("overlay-confirm");
}

/* ---------------------------------------------------
   8b. REJOINDRE EN TANT QUE PARTENAIRE
   --------------------------------------------------- */
function showConfirm(title, text){
  $("#confirm-title").textContent = title;
  $("#confirm-text").textContent = text;
  openOverlay("overlay-confirm");
}

function submitRestaurantSignup(){
  const nom = $("#rs-nom").value.trim();
  const zone = $("#rs-zone").value.trim();
  const gerant = $("#rs-gerant").value.trim();
  const tel = $("#rs-tel").value.trim();
  if(!nom || !zone || !gerant || !tel){
    alert("Merci de remplir tous les champs pour envoyer ta demande.");
    return;
  }
  closeOverlay("overlay-signup-restaurant");
  showConfirm(
    "Demande envoyée !",
    `Merci ${gerant} ! Ta demande pour "${nom}" (${zone}) a bien été reçue. Notre équipe partenaires te contactera au ${tel} sous 48h pour finaliser l'ouverture de ton compte restaurant.`
  );
  $("#rs-nom").value = ""; $("#rs-zone").value = ""; $("#rs-gerant").value = ""; $("#rs-tel").value = "";
}

function submitLivreurSignup(){
  const nom = $("#lv-nom").value.trim();
  const tel = $("#lv-tel").value.trim();
  const zone = $("#lv-zone").value.trim();
  if(!nom || !tel || !zone){
    alert("Merci de remplir tous les champs pour envoyer ta candidature.");
    return;
  }
  closeOverlay("overlay-signup-livreur");
  showConfirm(
    "Candidature envoyée !",
    `Merci ${nom} ! Ta candidature comme livreur sur la zone "${zone}" a bien été reçue. Notre équipe te contactera au ${tel} sous 48h pour l'étape de validation.`
  );
  $("#lv-nom").value = ""; $("#lv-tel").value = ""; $("#lv-zone").value = "";
}

/* ---------------------------------------------------
   8c. CONNEXION AVEC VALIDATION TÉLÉPHONE / WHATSAPP
   --------------------------------------------------- */
function sendVerificationCode(){
  const phone = $("#login-phone").value.trim();
  if(!phone){ alert("Merci de renseigner ton numéro de téléphone."); return; }
  const method = $('input[name="login-method"]:checked').value;
  const code = String(Math.floor(1000 + Math.random() * 9000));
  state.pendingAuth = {phone, method, code};

  const methodLabel = method === "whatsapp" ? "WhatsApp" : "SMS";
  $("#otp-sent-text").textContent = `Un code à 4 chiffres a été envoyé par ${methodLabel} au ${phone}. (Démo — ton code est : ${code})`;
  $("#otp-code").value = "";

  closeOverlay("overlay-login");
  openOverlay("overlay-otp");
}

function verifyCode(){
  if(!state.pendingAuth){ return; }
  const input = $("#otp-code").value.trim();
  if(input !== state.pendingAuth.code){
    alert("Code incorrect, réessaie.");
    return;
  }
  state.user = {
    phone: state.pendingAuth.phone,
    method: state.pendingAuth.method,
    since: "Aujourd'hui"
  };
  state.pendingAuth = null;
  state.myOrders = [];
  updateAccountUI();
  closeOverlay("overlay-otp");
  showConfirm("Connexion réussie !", `Bienvenue sur Banabana. Ton espace personnel est prêt.`);
}

function resendCode(){
  if(!state.pendingAuth) return;
  const code = String(Math.floor(1000 + Math.random() * 9000));
  state.pendingAuth.code = code;
  const methodLabel = state.pendingAuth.method === "whatsapp" ? "WhatsApp" : "SMS";
  $("#otp-sent-text").textContent = `Nouveau code envoyé par ${methodLabel} au ${state.pendingAuth.phone}. (Démo — ton code est : ${code})`;
}

function logoutUser(){
  state.user = null;
  state.myOrders = [];
  updateAccountUI();
  switchView("client");
}

function updateAccountUI(){
  const loggedIn = !!state.user;
  $("#btn-login").classList.toggle("is-hidden", loggedIn);
  $("#account-box").classList.toggle("is-hidden", !loggedIn);
  if(loggedIn){
    const initial = state.user.phone.replace(/\D/g,"").slice(-2) || "C";
    $("#account-avatar").textContent = initial;
    $("#account-label").textContent = state.user.phone;
  }
}

function renderAccountView(){
  if(!state.user) return;
  const initial = state.user.phone.replace(/\D/g,"").slice(-2) || "C";
  $("#account-header-avatar").textContent = initial;
  $("#account-header-name").textContent = "Mon espace";
  $("#account-header-phone").textContent = state.user.phone;

  $("#account-info-phone").textContent = state.user.phone;
  $("#account-info-method").textContent = state.user.method === "whatsapp" ? "WhatsApp" : "SMS";
  $("#account-info-since").textContent = state.user.since;

  $("#account-address").innerHTML = state.address
    ? `<p>${state.address.rue ? state.address.rue + ", " : ""}${state.address.ville}</p><p class="muted" style="font-size:12px">${state.address.arrondissement}, ${state.address.departement}, ${state.address.region}</p>`
    : `<p class="account-empty">Aucune adresse enregistrée pour l'instant.</p>`;

  $("#table-my-orders").innerHTML = `
    <thead><tr><th>Commande</th><th>Restaurant</th><th>Articles</th><th>Paiement</th><th>Montant</th><th>Statut</th></tr></thead>
    <tbody>${state.myOrders.map(o => {
      const rest = RESTAURANTS.find(r => r.id === o.restaurantId);
      const paymentLabel = o.payment === "wave" ? "Wave" : o.payment === "orange" ? "Orange Money" : "Cash";
      return `<tr>
        <td>${o.id}</td><td>${rest ? rest.name : "—"}</td>
        <td>${o.items.map(i=>`${i.qty}× ${i.name}`).join(", ")}</td>
        <td>${paymentLabel}</td><td>${fcfa(o.total)}</td><td>${statusPill(o.status)}</td>
      </tr>`;
    }).join("") || `<tr><td colspan="6" class="muted">Tu n'as pas encore passé de commande.</td></tr>`}</tbody>`;
}

/* ---------------------------------------------------
   8d. ESPACE ADMIN (connexion + statistiques globales)
   --------------------------------------------------- */
function adminLogin(){
  const username = $("#admin-username").value.trim();
  const password = $("#admin-password").value;
  if(username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password){
    state.isAdmin = true;
    $("#admin-login-error").style.display = "none";
    $("#admin-username").value = "";
    $("#admin-password").value = "";
    closeOverlay("overlay-admin-login");
    switchView("admin");
  } else {
    $("#admin-login-error").style.display = "block";
  }
}

function adminLogout(){
  state.isAdmin = false;
  switchView("client");
}

function renderAdminDashboard(){
  const totalRevenue = ORDERS.reduce((s,o) => s + o.total, 0);
  const totalCost = ORDERS.reduce((s,o) => s + o.items.reduce((s2,i) => s2 + i.cost*i.qty, 0), 0);
  const totalMargin = totalRevenue - totalCost;
  const marginPct = totalRevenue ? Math.round((totalMargin/totalRevenue)*100) : 0;

  $("#admin-stat-grid").innerHTML = `
    <div class="stat-card"><p class="stat-label">Restaurants</p><p class="stat-value">${RESTAURANTS.length}</p></div>
    <div class="stat-card"><p class="stat-label">Livreurs</p><p class="stat-value">${LIVREURS.length}</p></div>
    <div class="stat-card"><p class="stat-label">Clients suivis</p><p class="stat-value">${CLIENTS.length}</p></div>
    <div class="stat-card"><p class="stat-label">Commandes (plateforme)</p><p class="stat-value">${ORDERS.length}</p></div>
    <div class="stat-card"><p class="stat-label">Chiffre d'affaires total</p><p class="stat-value">${fcfa(totalRevenue)}</p></div>
    <div class="stat-card"><p class="stat-label">Marge nette totale</p><p class="stat-value">${fcfa(totalMargin)}</p><p class="stat-sub">${marginPct}% de marge</p></div>
  `;

  $("#table-admin-restaurants").innerHTML = `
    <thead><tr><th>Restaurant</th><th>Catégorie</th><th>Commandes</th><th>Chiffre d'affaires</th><th>Marge</th><th>Livreurs</th></tr></thead>
    <tbody>${RESTAURANTS.map(r => {
      const orders = ORDERS.filter(o => o.restaurantId === r.id);
      const revenue = orders.reduce((s,o) => s + o.total, 0);
      const cost = orders.reduce((s,o) => s + o.items.reduce((s2,i) => s2 + i.cost*i.qty, 0), 0);
      const livreursCount = LIVREURS.filter(l => l.restaurantId === r.id).length;
      return `<tr>
        <td>${r.name}</td><td>${r.category}</td><td>${orders.length}</td>
        <td>${fcfa(revenue)}</td><td>${fcfa(revenue - cost)}</td><td>${livreursCount}</td>
      </tr>`;
    }).join("")}</tbody>`;

  renderAdminMessages();
}

function renderAdminMessages(){
  const unreadCount = MESSAGES.filter(m => !m.read).length;
  $("#msg-count-badge").textContent = unreadCount > 0 ? `${unreadCount} non lu${unreadCount > 1 ? "s" : ""}` : "";

  $("#table-admin-messages").innerHTML = `
    <thead><tr><th>Nom</th><th>Contact</th><th>Message</th><th>Date</th><th>Statut</th><th>Actions</th></tr></thead>
    <tbody>${MESSAGES.map(m => `
      <tr class="${m.read ? '' : 'msg-row-unread'}">
        <td>${m.name}</td>
        <td>${m.contact}</td>
        <td style="max-width:280px">${m.message}</td>
        <td>${m.date}</td>
        <td><span class="status-pill ${m.read ? 'status-lu' : 'status-non-lu'}">${m.read ? 'Lu' : 'Non lu'}</span></td>
        <td>
          <div class="msg-actions">
            <button onclick="toggleMessageRead('${m.id}')">${m.read ? 'Marquer non lu' : 'Marquer lu'}</button>
            <button class="msg-delete" onclick="deleteMessage('${m.id}')">Supprimer</button>
          </div>
        </td>
      </tr>`).join("") || `<tr><td colspan="6" class="muted">Aucun message reçu pour l'instant.</td></tr>`}</tbody>`;
}

function toggleMessageRead(id){
  const msg = MESSAGES.find(m => m.id === id);
  if(msg){ msg.read = !msg.read; renderAdminMessages(); }
}

function deleteMessage(id){
  if(!confirm("Supprimer définitivement ce message ?")) return;
  MESSAGES = MESSAGES.filter(m => m.id !== id);
  renderAdminMessages();
}

function submitContactMessage(){
  const name = $("#contact-nom").value.trim();
  const contact = $("#contact-contact").value.trim();
  const message = $("#contact-message").value.trim();
  if(!name || !contact || !message){
    alert("Merci de remplir tous les champs avant d'envoyer ton message.");
    return;
  }
  MESSAGES.unshift({
    id: "msg" + (messageCounter++),
    name, contact, message,
    date: "À l'instant",
    read: false
  });
  closeOverlay("overlay-contact");
  showConfirm("Message envoyé !", `Merci ${name}, ton message a bien été transmis à notre équipe. Nous te répondrons rapidement au ${contact}.`);
  $("#contact-nom").value = ""; $("#contact-contact").value = ""; $("#contact-message").value = "";
}

/* ---------------------------------------------------
   9. DASHBOARD RESTAURANT
   --------------------------------------------------- */
function populateRestaurantSelect(){
  const select = $("#dash-restaurant-select");
  select.innerHTML = "";
  RESTAURANTS.forEach(r => {
    const o = document.createElement("option");
    o.value = r.id; o.textContent = r.name;
    select.appendChild(o);
  });
  select.value = state.currentDashboardRestaurantId;
  select.addEventListener("change", () => {
    state.currentDashboardRestaurantId = select.value;
    renderDashboardRestaurant();
  });
}

function statusPill(status){
  return `<span class="status-pill status-${status}">${statusLabels[status] || status}</span>`;
}

function renderDashboardRestaurant(){
  const restaurantId = state.currentDashboardRestaurantId;
  const restaurant = RESTAURANTS.find(r => r.id === restaurantId);
  const orders = ORDERS.filter(o => o.restaurantId === restaurantId);
  const livreurs = LIVREURS.filter(l => l.restaurantId === restaurantId);
  const clients = CLIENTS.filter(c => c.restaurantId === restaurantId);

  const revenue = orders.reduce((s,o) => s + o.total, 0);
  const totalCost = orders.reduce((s,o) => s + o.items.reduce((s2,i) => s2 + i.cost*i.qty, 0), 0);
  const margin = revenue - totalCost;
  const marginPct = revenue ? Math.round((margin/revenue)*100) : 0;

  // Stats overview
  $("#stat-grid").innerHTML = `
    <div class="stat-card"><p class="stat-label">Commandes</p><p class="stat-value">${orders.length}</p><p class="stat-sub">${restaurant.name}</p></div>
    <div class="stat-card"><p class="stat-label">Chiffre d'affaires</p><p class="stat-value">${fcfa(revenue)}</p><p class="stat-sub">Toutes commandes</p></div>
    <div class="stat-card"><p class="stat-label">Marge nette</p><p class="stat-value">${fcfa(margin)}</p><p class="stat-sub">${marginPct}% de marge</p></div>
    <div class="stat-card"><p class="stat-label">Livreurs actifs</p><p class="stat-value">${livreurs.length}</p><p class="stat-sub">${livreurs.filter(l=>l.status==='disponible').length} disponibles</p></div>
    <div class="stat-card"><p class="stat-label">Clients</p><p class="stat-value">${clients.length}</p><p class="stat-sub">Clients suivis</p></div>
  `;

  // Recent orders table (mini)
  const recent = orders.slice(0,5);
  $("#table-recent-orders").innerHTML = `
    <thead><tr><th>Commande</th><th>Client</th><th>Montant</th><th>Statut</th></tr></thead>
    <tbody>${recent.map(o => `
      <tr><td>${o.id}</td><td>${o.clientName}</td><td>${fcfa(o.total)}</td><td>${statusPill(o.status)}</td></tr>
    `).join("") || `<tr><td colspan="4" class="muted">Aucune commande</td></tr>`}</tbody>`;

  // Livreurs mini list
  $("#livreur-mini-list").innerHTML = livreurs.map(l => `
    <li>
      <div class="livreur-avatar">${l.name.split(" ").map(w=>w[0]).join("")}</div>
      <div class="livreur-mini-info">
        <div class="livreur-mini-name">${l.name}</div>
        <div class="livreur-mini-zone">Zone : ${l.zone}</div>
      </div>
      ${statusPill(l.status)}
    </li>`).join("") || `<li class="muted">Aucun livreur</li>`;

  // Full orders table
  $("#table-all-orders").innerHTML = `
    <thead><tr><th>Commande</th><th>Client</th><th>Articles</th><th>Zone</th><th>Paiement</th><th>Montant</th><th>Livreur</th><th>Statut</th></tr></thead>
    <tbody>${orders.map(o => {
      const liv = LIVREURS.find(l => l.id === o.livreurId);
      const paymentLabel = o.payment === "wave" ? "Wave" : o.payment === "orange" ? "Orange Money" : "Cash";
      return `<tr>
        <td>${o.id}</td><td>${o.clientName}</td>
        <td>${o.items.map(i=>`${i.qty}× ${i.name}`).join(", ")}</td>
        <td>${o.zone}</td><td>${paymentLabel}</td><td>${fcfa(o.total)}</td>
        <td>${liv ? liv.name : "—"}</td><td>${statusPill(o.status)}</td>
      </tr>`;
    }).join("") || `<tr><td colspan="8" class="muted">Aucune commande</td></tr>`}</tbody>`;

  // Livreurs table
  $("#table-livreurs").innerHTML = `
    <thead><tr><th>Nom</th><th>Téléphone</th><th>Zone</th><th>Courses</th><th>Note</th><th>Statut</th></tr></thead>
    <tbody>${livreurs.map(l => `
      <tr><td>${l.name}</td><td>${l.phone}</td><td>${l.zone}</td><td>${l.courses}</td><td>⭐ ${l.note}</td><td>${statusPill(l.status)}</td></tr>
    `).join("") || `<tr><td colspan="6" class="muted">Aucun livreur</td></tr>`}</tbody>`;

  // Clients table
  $("#table-clients").innerHTML = `
    <thead><tr><th>Nom</th><th>Téléphone</th><th>Commandes</th><th>Total dépensé</th></tr></thead>
    <tbody>${clients.map(c => `
      <tr><td>${c.name}</td><td>${c.phone}</td><td>${c.orders}</td><td>${fcfa(c.spent)}</td></tr>
    `).join("") || `<tr><td colspan="4" class="muted">Aucun client</td></tr>`}</tbody>`;

  // Marge panel
  $("#marge-stat-grid").innerHTML = `
    <div class="stat-card"><p class="stat-label">Chiffre d'affaires</p><p class="stat-value">${fcfa(revenue)}</p></div>
    <div class="stat-card"><p class="stat-label">Coût matières / plats</p><p class="stat-value">${fcfa(totalCost)}</p></div>
    <div class="stat-card"><p class="stat-label">Marge nette</p><p class="stat-value">${fcfa(margin)}</p><p class="stat-sub">${marginPct}%</p></div>
  `;
  $("#table-marge").innerHTML = `
    <thead><tr><th>Commande</th><th>Chiffre d'affaires</th><th>Coût</th><th>Marge</th></tr></thead>
    <tbody>${orders.map(o => {
      const cost = o.items.reduce((s,i) => s + i.cost*i.qty, 0);
      return `<tr><td>${o.id}</td><td>${fcfa(o.total)}</td><td>${fcfa(cost)}</td><td>${fcfa(o.total-cost)}</td></tr>`;
    }).join("") || `<tr><td colspan="4" class="muted">Aucune commande</td></tr>`}</tbody>`;
}

function initDashboardNav(){
  $$(".dash-nav-link").forEach(btn => {
    btn.addEventListener("click", () => {
      $$(".dash-nav-link").forEach(b => b.classList.remove("is-active"));
      $$(".dash-panel").forEach(p => p.classList.remove("is-active"));
      btn.classList.add("is-active");
      $("#panel-" + btn.dataset.panel).classList.add("is-active");
    });
  });
}

/* ---------------------------------------------------
   10. DASHBOARD LIVREUR
   --------------------------------------------------- */
function populateLivreurSelect(){
  const select = $("#dash-livreur-select");
  select.innerHTML = "";
  LIVREURS.forEach(l => {
    const o = document.createElement("option");
    o.value = l.id; o.textContent = l.name + " — " + RESTAURANTS.find(r=>r.id===l.restaurantId).name;
    select.appendChild(o);
  });
  select.value = state.currentDashboardLivreurId;
  select.addEventListener("change", () => {
    state.currentDashboardLivreurId = select.value;
    renderDashboardLivreur();
  });
}

function renderDashboardLivreur(){
  const livreurId = state.currentDashboardLivreurId;
  const livreur = LIVREURS.find(l => l.id === livreurId);
  const courses = ORDERS.filter(o => o.livreurId === livreurId);
  const livrees = courses.filter(o => o.status === "livree").length;

  $("#livreur-stat-grid").innerHTML = `
    <div class="stat-card"><p class="stat-label">Statut</p><p class="stat-value">${statusLabels[livreur.status]}</p></div>
    <div class="stat-card"><p class="stat-label">Courses au total</p><p class="stat-value">${livreur.courses}</p></div>
    <div class="stat-card"><p class="stat-label">Livrées aujourd'hui</p><p class="stat-value">${livrees}</p></div>
    <div class="stat-card"><p class="stat-label">Note moyenne</p><p class="stat-value">⭐ ${livreur.note}</p></div>
  `;

  $("#table-livreur-courses").innerHTML = `
    <thead><tr><th>Commande</th><th>Restaurant</th><th>Zone</th><th>Montant</th><th>Statut</th></tr></thead>
    <tbody>${courses.map(o => {
      const rest = RESTAURANTS.find(r => r.id === o.restaurantId);
      return `<tr><td>${o.id}</td><td>${rest.name}</td><td>${o.zone}</td><td>${fcfa(o.total)}</td><td>${statusPill(o.status)}</td></tr>`;
    }).join("") || `<tr><td colspan="5" class="muted">Aucune course assignée pour le moment</td></tr>`}</tbody>`;
}

/* ---------------------------------------------------
   11. INITIALISATION
   --------------------------------------------------- */
function init(){
  initLocationSelects();
  renderCategories();
  renderRestaurants();
  populateRestaurantSelect();
  populateLivreurSelect();
  initDashboardNav();
  renderCart();
  updateAccountUI();

  // Navigation principale
  $$(".nav-link").forEach(btn => {
    btn.addEventListener("click", () => switchView(btn.dataset.view));
  });
  $("#btn-go-home").addEventListener("click", () => switchView("client"));
  $("#btn-back-restaurants").addEventListener("click", () => switchView("client"));

  // Localisation
  $("#btn-open-location").addEventListener("click", () => openOverlay("overlay-location"));
  $("#btn-validate-location").addEventListener("click", validateLocation);

  // Panier
  $("#btn-cart").addEventListener("click", () => openOverlay("overlay-cart"));
  $("#btn-confirm-order").addEventListener("click", confirmOrder);

  // Fermeture des overlays
  $$("[data-close-overlay]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const overlay = e.target.closest(".overlay");
      if(overlay) overlay.classList.remove("is-active");
    });
  });
  $$(".overlay").forEach(ov => {
    ov.addEventListener("click", (e) => { if(e.target === ov) ov.classList.remove("is-active"); });
  });

  // Recherche
  $("#btn-search").addEventListener("click", () => renderRestaurants($("#restaurant-search").value));
  $("#restaurant-search").addEventListener("keydown", (e) => {
    if(e.key === "Enter") renderRestaurants(e.target.value);
  });

  // Rejoindre en tant que partenaire
  $("#btn-partner").addEventListener("click", () => openOverlay("overlay-partner"));
  $("#choice-order").addEventListener("click", () => { closeOverlay("overlay-partner"); switchView("client"); });
  $("#choice-restaurant").addEventListener("click", () => { closeOverlay("overlay-partner"); openOverlay("overlay-signup-restaurant"); });
  $("#choice-livreur").addEventListener("click", () => { closeOverlay("overlay-partner"); openOverlay("overlay-signup-livreur"); });
  $("#btn-submit-restaurant").addEventListener("click", submitRestaurantSignup);
  $("#btn-submit-livreur").addEventListener("click", submitLivreurSignup);

  // Connexion avec validation téléphone / WhatsApp
  $("#btn-login").addEventListener("click", () => openOverlay("overlay-login"));
  $("#btn-send-code").addEventListener("click", sendVerificationCode);
  $("#btn-verify-code").addEventListener("click", verifyCode);
  $("#btn-resend-code").addEventListener("click", resendCode);
  $("#btn-account").addEventListener("click", () => switchView("account"));
  $("#btn-logout").addEventListener("click", logoutUser);

  // Espace admin
  $("#btn-admin-login").addEventListener("click", adminLogin);
  $("#btn-admin-logout").addEventListener("click", adminLogout);

  // Accès admin caché : Ctrl + Alt + A (n'apparaît nulle part sur le site public)
  document.addEventListener("keydown", (e) => {
    if(e.ctrlKey && e.altKey && e.key.toLowerCase() === "a"){
      e.preventDefault();
      if(state.isAdmin){ switchView("admin"); }
      else { openOverlay("overlay-admin-login"); }
    }
  });

  // Nous contacter
  $("#link-contact").addEventListener("click", (e) => {
    e.preventDefault();
    openOverlay("overlay-contact");
  });
  $("#btn-submit-contact").addEventListener("click", submitContactMessage);

  // Bannière cookies
  setTimeout(() => $("#cookie-banner").classList.add("is-active"), 900);
  $("#btn-cookie-accept").addEventListener("click", () => $("#cookie-banner").classList.remove("is-active"));
  $("#btn-cookie-config").addEventListener("click", () => alert("Configuration des cookies — écran de démonstration."));
  $("#footer-cookie-config").addEventListener("click", (e) => {
    e.preventDefault();
    $("#cookie-banner").classList.add("is-active");
  });
}

document.addEventListener("DOMContentLoaded", init);
