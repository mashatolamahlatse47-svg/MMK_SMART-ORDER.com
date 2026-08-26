// ===============================
// MMK SMARTORDER
// ===============================

// BUSINESS PRODUCTS

let products = [

  {
    id: 1,
    name: "Rice 10kg",
    buyPrice: 180,
    sellPrice: 220,
    stock: 25,
    lowStock: 5
  },

  {
    id: 2,
    name: "Cooking Oil 2L",
    buyPrice: 50,
    sellPrice: 65,
    stock: 20,
    lowStock: 5
  },

  {
    id: 3,
    name: "Eggs",
    buyPrice: 45,
    sellPrice: 60,
    stock: 30,
    lowStock: 10
  },

  {
    id: 4,
    name: "Mealie Meal 25kg",
    buyPrice: 220,
    sellPrice: 270,
    stock: 15,
    lowStock: 5
  },

  {
    id: 5,
    name: "Tissue",
    buyPrice: 35,
    sellPrice: 45,
    stock: 12,
    lowStock: 5
  }

];


// CUSTOMER CART

let cart = [];


// ===============================
// SHOW SECTION
// ===============================

function showSection(section) {

  document.getElementById("shop")
    .classList.add("hidden");

  document.getElementById("owner")
    .classList.add("hidden");

  document.getElementById(section)
    .classList.remove("hidden");

}


// ===============================
// DISPLAY PRODUCTS
// ===============================

function displayProducts() {

  const container =
    document.getElementById("products");

  container.innerHTML = "";

  products.forEach(product => {

    container.innerHTML += `

      <div class="product">

        <h3>${product.name}</h3>

        <p>Price:
          <strong>R${product.sellPrice.toFixed(2)}</strong>
        </p>

        <p>
          Available: ${product.stock}
        </p>

        <button
          onclick="addToCart(${product.id})"
          ${product.stock <= 0 ? "disabled" : ""}
        >
          Add to Cart
        </button>

      </div>

    `;

  });

}


// ===============================
// ADD TO CART
// ===============================

function addToCart(id) {

  const product =
    products.find(p => p.id === id);

  if (!product || product.stock <= 0) {
    alert("Product is out of stock.");
    return;
  }

  const existing =
    cart.find(item => item.id === id);

  if (existing) {

    if (existing.quantity < product.stock) {
      existing.quantity++;
    }

  } else {

    cart.push({
      id: id,
      quantity: 1
    });

  }

  displayCart();

}


// ===============================
// DISPLAY CART
// ===============================

function displayCart() {

  const container =
    document.getElementById("cartItems");

  container.innerHTML = "";

  let total = 0;

  cart.forEach(item => {

    const product =
      products.find(p => p.id === item.id);

    const itemTotal =
      product.sellPrice * item.quantity;

    total += itemTotal;

    container.innerHTML += `

      <div>

        ${product.name}

        × ${item.quantity}

        = R${itemTotal.toFixed(2)}

        <button onclick="removeFromCart(${item.id})">
          Remove
        </button>

      </div>

    `;

  });

  document.getElementById("cartTotal")
    .textContent = total.toFixed(2);

}


// ===============================
// REMOVE FROM CART
// ===============================

function removeFromCart(id) {

  cart =
    cart.filter(item => item.id !== id);

  displayCart();

}


// ===============================
// CHECKOUT
// ===============================

function checkout() {

  if (cart.length === 0) {

    alert("Your cart is empty.");

    return;

  }

  let total = 0;

  cart.forEach(item => {

    const product =
      products.find(p => p.id === item.id);

    product.stock -= item.quantity;

    total +=
      product.sellPrice *
      item.quantity;

  });

  alert(
    "Order placed successfully!\n\n" +
    "Total: R" +
    total.toFixed(2)
  );

  cart = [];

  displayProducts();
  displayCart();
  updateDashboard();

}


// ===============================
// OWNER STOCK TABLE
// ===============================

function displayStock() {

  const table =
    document.getElementById("stockTable");

  table.innerHTML = "";

  products.forEach(product => {

    const profit =
      product.sellPrice -
      product.buyPrice;

    const status =
      product.stock <= product.lowStock
        ? `<span class="low">LOW STOCK</span>`
        : `<span class="good">OK</span>`;

    table.innerHTML += `

      <tr>

        <td>${product.name}</td>

        <td>R${product.buyPrice.toFixed(2)}</td>

        <td>R${product.sellPrice.toFixed(2)}</td>

        <td>${product.stock}</td>

        <td>R${profit.toFixed(2)}</td>

        <td>${status}</td>

      </tr>

    `;

  });

}


// ===============================
// AUTOMATIC DASHBOARD CALCULATIONS
// ===============================

function updateDashboard() {

  let stockValue = 0;

  let potentialProfit = 0;

  products.forEach(product => {

    stockValue +=
      product.buyPrice *
      product.stock;

    potentialProfit +=
      (product.sellPrice -
       product.buyPrice) *
      product.stock;

  });


  document.getElementById("productCount")
    .textContent = products.length;

  document.getElementById("stockValue")
    .textContent =
    stockValue.toFixed(2);

  document.getElementById("profitValue")
    .textContent =
    potentialProfit.toFixed(2);

  displayStock();

}


// ===============================
// START SYSTEM
// ===============================

displayProducts();

displayCart();

updateDashboard();
