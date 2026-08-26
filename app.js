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
// ==========================================
// MMK SMART ORDER - APP.JS
// Customer Shop + Cart + Owner Dashboard
// ==========================================

// ---------- PRODUCT DATA ----------

let products = [
    {
        id: 1,
        name: "Eggs",
        category: "Groceries",
        price: 45,
        stock: 20
    },
    {
        id: 2,
        name: "Cooking Oil 2L",
        category: "Groceries",
        price: 55,
        stock: 15
    },
    {
        id: 3,
        name: "Mealie Meal 25kg",
        category: "Groceries",
        price: 180,
        stock: 10
    },
    {
        id: 4,
        name: "Rice 10kg",
        category: "Groceries",
        price: 150,
        stock: 12
    },
    {
        id: 5,
        name: "Flour 10kg",
        category: "Groceries",
        price: 120,
        stock: 10
    },
    {
        id: 6,
        name: "Macaroni",
        category: "Groceries",
        price: 25,
        stock: 30
    },
    {
        id: 7,
        name: "Washing Powder 2kg",
        category: "Cleaning",
        price: 65,
        stock: 15
    },
    {
        id: 8,
        name: "Dishwasher Liquid",
        category: "Cleaning",
        price: 30,
        stock: 20
    },
    {
        id: 9,
        name: "Tissue",
        category: "Household",
        price: 45,
        stock: 25
    },
    {
        id: 10,
        name: "Fresh Milk",
        category: "Dairy",
        price: 25,
        stock: 20
    },
    {
        id: 11,
        name: "Inkomazi",
        category: "Dairy",
        price: 30,
        stock: 15
    },
    {
        id: 12,
        name: "Atchaar 5L",
        category: "Food",
        price: 120,
        stock: 8
    }
];


// ---------- CART ----------

let cart = [];


// ---------- LOAD SAVED DATA ----------

function loadData() {

    const savedCart = localStorage.getItem("mmkCart");
    const savedProducts = localStorage.getItem("mmkProducts");

    if (savedCart) {
        cart = JSON.parse(savedCart);
    }

    if (savedProducts) {
        products = JSON.parse(savedProducts);
    }
}


// ---------- SAVE DATA ----------

function saveData() {

    localStorage.setItem(
        "mmkCart",
        JSON.stringify(cart)
    );

    localStorage.setItem(
        "mmkProducts",
        JSON.stringify(products)
    );
}


// ---------- SHOW CUSTOMER / OWNER SECTION ----------

function showSection(sectionName) {

    const sections = document.querySelectorAll(".section");

    sections.forEach(function(section) {
        section.classList.add("hidden");
    });

    const selectedSection = document.getElementById(sectionName);

    if (selectedSection) {
        selectedSection.classList.remove("hidden");
    }

    if (sectionName === "shop") {
        renderProducts();
        renderCart();
    }

    if (sectionName === "owner") {
        updateDashboard();
        renderStockTable();
    }
}


// ---------- DISPLAY PRODUCTS ----------

function renderProducts() {

    const productsContainer =
        document.getElementById("products");

    if (!productsContainer) return;

    productsContainer.innerHTML = "";

    products.forEach(function(product) {

        const productCard = document.createElement("div");

        productCard.className = "product-card";

        productCard.innerHTML = `
            <h3>${product.name}</h3>

            <p>Category: ${product.category}</p>

            <p>
                <strong>R${product.price.toFixed(2)}</strong>
            </p>

            <p>
                Stock: ${product.stock}
            </p>

            <button
                onclick="addToCart(${product.id})"
                ${product.stock <= 0 ? "disabled" : ""}
            >
                ${product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
            </button>
        `;

        productsContainer.appendChild(productCard);
    });
}


// ---------- ADD PRODUCT TO CART ----------

function addToCart(productId) {

    const product = products.find(
        p => p.id === productId
    );

    if (!product) return;

    if (product.stock <= 0) {
        alert("Sorry, this product is out of stock.");
        return;
    }

    const existingItem = cart.find(
        item => item.id === productId
    );

    if (existingItem) {

        if (existingItem.quantity >= product.stock) {
            alert("You cannot add more than the available stock.");
            return;
        }

        existingItem.quantity++;

    } else {

        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    saveData();

    renderCart();

    alert(product.name + " added to your cart.");
}


// ---------- REMOVE FROM CART ----------

function removeFromCart(productId) {

    cart = cart.filter(
        item => item.id !== productId
    );

    saveData();

    renderCart();
}


// ---------- CHANGE CART QUANTITY ----------

function changeQuantity(productId, amount) {

    const item = cart.find(
        item => item.id === productId
    );

    if (!item) return;

    const product = products.find(
        p => p.id === productId
    );

    if (!product) return;

    item.quantity += amount;

    if (item.quantity <= 0) {

        removeFromCart(productId);
        return;
    }

    if (item.quantity > product.stock) {

        item.quantity = product.stock;

        alert("Maximum available stock reached.");
    }

    saveData();

    renderCart();
}


// ---------- DISPLAY CART ----------

function renderCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");

    if (!cartItems) return;

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

    } else {

        cart.forEach(function(item) {

            const itemTotal =
                item.price * item.quantity;

            total += itemTotal;

            const row =
                document.createElement("div");

            row.className = "cart-item";

            row.innerHTML = `
                <p>
                    <strong>${item.name}</strong>
                </p>

                <p>
                    R${item.price.toFixed(2)}
                    × ${item.quantity}
                    =
                    R${itemTotal.toFixed(2)}
                </p>

                <button
                    onclick="changeQuantity(${item.id}, -1)"
                >
                    −
                </button>

                <button
                    onclick="changeQuantity(${item.id}, 1)"
                >
                    +
                </button>

                <button
                    onclick="removeFromCart(${item.id})"
                >
                    Remove
                </button>
            `;

            cartItems.appendChild(row);
        });
    }

    if (cartTotal) {
        cartTotal.textContent =
            total.toFixed(2);
    }
}


// ---------- CALCULATE TOTAL ----------

function getCartTotal() {

    return cart.reduce(function(total, item) {

        return total +
            (item.price * item.quantity);

    }, 0);
}


// ---------- CHECKOUT ----------

function checkOut() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }

    const total = getCartTotal();

    let orderMessage =
        "MMK SMART ORDER\n\n";

    orderMessage +=
        "ORDER ITEMS:\n";

    cart.forEach(function(item) {

        orderMessage +=
            `${item.name} x ${item.quantity} = R${(item.price * item.quantity).toFixed(
              // ==========================================
// MMK SMART ORDER - APP.JS
// Customer Shop + Cart + Owner Dashboard
// ==========================================

// ---------- PRODUCT DATA ----------

let products = [
    {
        id: 1,
        name: "Eggs",
        category: "Groceries",
        price: 45,
        stock: 20
    },
    {
        id: 2,
        name: "Cooking Oil 2L",
        category: "Groceries",
        price: 55,
        stock: 15
    },
    {
        id: 3,
        name: "Mealie Meal 25kg",
        category: "Groceries",
        price: 180,
        stock: 10
    },
    {
        id: 4,
        name: "Rice 10kg",
        category: "Groceries",
        price: 150,
        stock: 12
    },
    {
        id: 5,
        name: "Flour 10kg",
        category: "Groceries",
        price: 120,
        stock: 10
    },
    {
        id: 6,
        name: "Macaroni",
        category: "Groceries",
        price: 25,
        stock: 30
    },
    {
        id: 7,
        name: "Washing Powder 2kg",
        category: "Cleaning",
        price: 65,
        stock: 15
    },
    {
        id: 8,
        name: "Dishwasher Liquid",
        category: "Cleaning",
        price: 30,
        stock: 20
    },
    {
        id: 9,
        name: "Tissue",
        category: "Household",
        price: 45,
        stock: 25
    },
    {
        id: 10,
        name: "Fresh Milk",
        category: "Dairy",
        price: 25,
        stock: 20
    },
    {
        id: 11,
        name: "Inkomazi",
        category: "Dairy",
        price: 30,
        stock: 15
    },
    {
        id: 12,
        name: "Atchaar 5L",
        category: "Food",
        price: 120,
        stock: 8
    }
];


// ---------- CART ----------

let cart = [];


// ---------- LOAD SAVED DATA ----------

function loadData() {

    const savedCart = localStorage.getItem("mmkCart");
    const savedProducts = localStorage.getItem("mmkProducts");

    if (savedCart) {
        cart = JSON.parse(savedCart);
    }

    if (savedProducts) {
        products = JSON.parse(savedProducts);
    }
}


// ---------- SAVE DATA ----------

function saveData() {

    localStorage.setItem(
        "mmkCart",
        JSON.stringify(cart)
    );

    localStorage.setItem(
        "mmkProducts",
        JSON.stringify(products)
    );
}


// ---------- SHOW CUSTOMER / OWNER SECTION ----------

function showSection(sectionName) {

    const sections = document.querySelectorAll(".section");

    sections.forEach(function(section) {
        section.classList.add("hidden");
    });

    const selectedSection = document.getElementById(sectionName);

    if (selectedSection) {
        selectedSection.classList.remove("hidden");
    }

    if (sectionName === "shop") {
        renderProducts();
        renderCart();
    }

    if (sectionName === "owner") {
        updateDashboard();
        renderStockTable();
    }
}


// ---------- DISPLAY PRODUCTS ----------

function renderProducts() {

    const productsContainer =
        document.getElementById("products");

    if (!productsContainer) return;

    productsContainer.innerHTML = "";

    products.forEach(function(product) {

        const productCard = document.createElement("div");

        productCard.className = "product-card";

        productCard.innerHTML = `
            <h3>${product.name}</h3>

            <p>Category: ${product.category}</p>

            <p>
                <strong>R${product.price.toFixed(2)}</strong>
            </p>

            <p>
                Stock: ${product.stock}
            </p>

            <button
                onclick="addToCart(${product.id})"
                ${product.stock <= 0 ? "disabled" : ""}
            >
                ${product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
            </button>
        `;

        productsContainer.appendChild(productCard);
    });
}


// ---------- ADD PRODUCT TO CART ----------

function addToCart(productId) {

    const product = products.find(
        p => p.id === productId
    );

    if (!product) return;

    if (product.stock <= 0) {
        alert("Sorry, this product is out of stock.");
        return;
    }

    const existingItem = cart.find(
        item => item.id === productId
    );

    if (existingItem) {

        if (existingItem.quantity >= product.stock) {
            alert("You cannot add more than the available stock.");
            return;
        }

        existingItem.quantity++;

    } else {

        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    saveData();

    renderCart();

    alert(product.name + " added to your cart.");
}


// ---------- REMOVE FROM CART ----------

function removeFromCart(productId) {

    cart = cart.filter(
        item => item.id !== productId
    );

    saveData();

    renderCart();
}


// ---------- CHANGE CART QUANTITY ----------

function changeQuantity(productId, amount) {

    const item = cart.find(
        item => item.id === productId
    );

    if (!item) return;

    const product = products.find(
        p => p.id === productId
    );

    if (!product) return;

    item.quantity += amount;

    if (item.quantity <= 0) {

        removeFromCart(productId);
        return;
    }

    if (item.quantity > product.stock) {

        item.quantity = product.stock;

        alert("Maximum available stock reached.");
    }

    saveData();

    renderCart();
}


// ---------- DISPLAY CART ----------

function renderCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");

    if (!cartItems) return;

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

    } else {

        cart.forEach(function(item) {

            const itemTotal =
                item.price * item.quantity;

            total += itemTotal;

            const row =
                document.createElement("div");

            row.className = "cart-item";

            row.innerHTML = `
                <p>
                    <strong>${item.name}</strong>
                </p>

                <p>
                    R${item.price.toFixed(2)}
                    × ${item.quantity}
                    =
                    R${itemTotal.toFixed(2)}
                </p>

                <button
                    onclick="changeQuantity(${item.id}, -1)"
                >
                    −
                </button>

                <button
                    onclick="changeQuantity(${item.id}, 1)"
                >
                    +
                </button>

                <button
                    onclick="removeFromCart(${item.id})"
                >
                    Remove
                </button>
            `;

            cartItems.appendChild(row);
        });
    }

    if (cartTotal) {
        cartTotal.textContent =
            total.toFixed(2);
    }
}


// ---------- CALCULATE TOTAL ----------

function getCartTotal() {

    return cart.reduce(function(total, item) {

        return total +
            (item.price * item.quantity);

    }, 0);
}


// ---------- CHECKOUT ----------

function checkOut() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }

    const total = getCartTotal();

    let orderMessage =
        "MMK SMART ORDER\n\n";

    orderMessage +=
        "ORDER ITEMS:\n";

    cart.forEach(function(item) {

        orderMessage +=
            `${item.name} x ${item.quantity} = R${(item.price * item.quantity).toFixed(2)}\n`;
    });

    orderMessage +=
        `\nTOTAL: R${total.toFixed(2)}`;

    orderMessage +=
        "\n\nThank you for ordering from MMK Smart Order.";

    alert(orderMessage);

    // Reduce stock
    cart.forEach(function(item) {

        const product =
            products.find(p => p.id === item.id);

        if (product) {

            product.stock -= item.quantity;

            if (product.stock < 0) {
                product.stock = 0;
            }
        }
    });

    // Clear cart
    cart = [];

    saveData();

    renderProducts();
    renderCart();
    updateDashboard();
    renderStockTable();
}


// ---------- OWNER DASHBOARD ----------

function updateDashboard() {

    const productCount =
        document.getElementById("productCount");

    const stockValue =
        document.getElementById("stockValue");

    const salesValue =
        document.getElementById("salesValue");

    const profitValue =
        document.getElementById("profitValue");


    // Number of products
    if (productCount) {

        productCount.textContent =
            products.length;
    }


    // Total stock value
    const totalStockValue =
        products.reduce(function(total, product) {

            return total +
                (product.price * product.stock);

        }, 0);


    if (stockValue) {

        stockValue.textContent =
            "R" + totalStockValue.toFixed(2);
    }


    // Demo sales value
    const sales =
        Number(localStorage.getItem("mmkSales")) || 0;

    if (salesValue) {

        salesValue.textContent =
            "R" + sales.toFixed(2);
    }


    // Demo profit calculation
    const profit =
        Number(localStorage.getItem("mmkProfit")) || 0;

    if (profitValue) {

        profitValue.textContent =
            "R" + profit.toFixed(2);
    }
}


// ---------- STOCK TABLE ----------

function renderStockTable() {

    const table =
        document.getElementById("stockTable");

    if (!table) return;

    let html = `
        <table>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                </tr>
            </thead>
            <tbody>
    `;

    products.forEach(function(product) {

        html += `
            <tr>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>R${product.price.toFixed(2)}</td>
                <td>${product.stock}</td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    table.innerHTML = html;
}


// ---------- ADD NEW PRODUCT ----------

function addProduct() {

    const name =
        prompt("Enter product name:");

    if (!name) return;

    const category =
        prompt("Enter product category:");

    if (!category) return;

    const price =
        Number(prompt("Enter product price:"));

    if (isNaN(price) || price <= 0) {

        alert("Please enter a valid price.");

        return;
    }

    const stock =
        Number(prompt("Enter stock quantity:"));

    if (isNaN(stock) || stock < 0) {

        alert("Please enter a valid stock quantity.");

        return;
    }

    const newProduct = {

        id: Date.now(),

        name: name,

        category: category,

        price: price,

        stock: stock
    };

    products.push(newProduct);

    saveData();

    renderProducts();
    renderStockTable();
    updateDashboard();

    alert("Product added successfully.");
}


// ---------- SEARCH PRODUCTS ----------

function searchProducts() {

    const searchInput =
        document.getElementById("searchInput");

    if (!searchInput) return;

    const search =
        searchInput.value.toLowerCase();

    const productsContainer =
        document.getElementById("products");

    if (!productsContainer) return;

    productsContainer.innerHTML = "";

    const results =
        products.filter(function(product) {

            return product.name
                .toLowerCase()
                .includes(search);

        });

    results.forEach(function(product) {

        const card =
            document.createElement("div");

        card.className =
            "product-card";

        card.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.category}</p>
            <p>R${product.price.toFixed(2)}</p>
            <p>Stock: ${product.stock}</p>

            <button
                onclick="addToCart(${product.id})"
            >
                Add to Cart
            </button>
        `;

        productsContainer.appendChild(card);
    });
}


// ---------- START APP ----------

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadData();

        renderProducts();

        renderCart();

        updateDashboard();

        renderStockTable();

    }
);
displayProducts();

displayCart();

updateDashboard();
