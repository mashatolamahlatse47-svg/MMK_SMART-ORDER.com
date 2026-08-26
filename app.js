
// ============================================
// MMK SMART ORDER
// GROCERY ORDER + STOCK + SALES SYSTEM
// ============================================

let products = [
    {
        id: 1,
        name: "Eggs",
        category: "Groceries",
        cost: 35,
        price: 45,
        stock: 20
    },
    {
        id: 2,
        name: "Cooking Oil 2L",
        category: "Groceries",
        cost: 42,
        price: 55,
        stock: 15
    },
    {
        id: 3,
        name: "Mealie Meal 25kg",
        category: "Groceries",
        cost: 150,
        price: 180,
        stock: 10
    },
    {
        id: 4,
        name: "Rice 10kg",
        category: "Groceries",
        cost: 120,
        price: 150,
        stock: 12
    },
    {
        id: 5,
        name: "Flour 10kg",
        category: "Groceries",
        cost: 95,
        price: 120,
        stock: 10
    },
    {
        id: 6,
        name: "Macaroni",
        category: "Groceries",
        cost: 18,
        price: 25,
        stock: 30
    },
    {
        id: 7,
        name: "Washing Powder 2kg",
        category: "Cleaning",
        cost: 50,
        price: 65,
        stock: 15
    },
    {
        id: 8,
        name: "Dishwasher Liquid",
        category: "Cleaning",
        cost: 22,
        price: 30,
        stock: 20
    },
    {
        id: 9,
        name: "Tissue",
        category: "Household",
        cost: 35,
        price: 45,
        stock: 25
    },
    {
        id: 10,
        name: "Fresh Milk",
        category: "Dairy",
        cost: 18,
        price: 25,
        stock: 20
    },
    {
        id: 11,
        name: "Inkomazi",
        category: "Dairy",
        cost: 22,
        price: 30,
        stock: 15
    },
    {
        id: 12,
        name: "Atchaar 5L",
        category: "Food",
        cost: 90,
        price: 120,
        stock: 8
    }
];

let cart = [];
let orders = [];


// ============================================
// LOAD DATA
// ============================================

function loadData() {

    const savedProducts =
        localStorage.getItem("mmkProducts");

    const savedCart =
        localStorage.getItem("mmkCart");

    const savedOrders =
        localStorage.getItem("mmkOrders");

    if (savedProducts) {
        products = JSON.parse(savedProducts);
    }

    if (savedCart) {
        cart = JSON.parse(savedCart);
    }

    if (savedOrders) {
        orders = JSON.parse(savedOrders);
    }
}


// ============================================
// SAVE DATA
// ============================================

function saveData() {

    localStorage.setItem(
        "mmkProducts",
        JSON.stringify(products)
    );

    localStorage.setItem(
        "mmkCart",
        JSON.stringify(cart)
    );

    localStorage.setItem(
        "mmkOrders",
        JSON.stringify(orders)
    );
}


// ============================================
// SECTION NAVIGATION
// ============================================

function showSection(sectionName) {

    const sections =
        document.querySelectorAll(".section");

    sections.forEach(function(section) {

        section.classList.add("hidden");

    });

    const section =
        document.getElementById(sectionName);

    if (section) {

        section.classList.remove("hidden");

    }

    if (sectionName === "shop") {

        renderProducts();
        renderCart();

    }

    if (sectionName === "owner") {

        renderOwnerDashboard();

    }
}


// ============================================
// PRODUCTS
// ============================================

function renderProducts() {

    const container =
        document.getElementById("products");

    if (!container) return;

    container.innerHTML = "";

    products.forEach(function(product) {

        const card =
            document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `

            <h3>${product.name}</h3>

            <p>${product.category}</p>

            <h3>R${product.price.toFixed(2)}</h3>

            <p>
                Stock:
                <strong>${product.stock}</strong>
            </p>

            <button
                onclick="addToCart(${product.id})"
                ${product.stock <= 0 ? "disabled" : ""}
            >
                ${
                    product.stock <= 0
                    ? "Out of Stock"
                    : "Add to Cart"
                }
            </button>

        `;

        container.appendChild(card);

    });
}


// ============================================
// ADD TO CART
// ============================================

function addToCart(productId) {

    const product =
        products.find(
            p => p.id === productId
        );

    if (!product) return;

    if (product.stock <= 0) {

        alert("This product is out of stock.");

        return;
    }

    const existing =
        cart.find(
            item => item.id === productId
        );

    if (existing) {

        if (
            existing.quantity >=
            product.stock
        ) {

            alert(
                "You have reached the available stock."
            );

            return;
        }

        existing.quantity++;

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

}


// ============================================
// CART
// ============================================

function renderCart() {

    const container =
        document.getElementById("cartItems");

    const totalElement =
        document.getElementById("cartTotal");

    if (!container) return;

    container.innerHTML = "";

    let total = 0;

    cart.forEach(function(item) {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;

        const row =
            document.createElement("div");

        row.innerHTML = `

            <h3>${item.name}</h3>

            <p>
                R${item.price.toFixed(2)}
                ×
                ${item.quantity}
            </p>

            <button
                onclick="changeQuantity(
                    ${item.id},
                    -1
                )"
            >
                −
            </button>

            <button
                onclick="changeQuantity(
                    ${item.id},
                    1
                )"
            >
                +
            </button>

            <button
                onclick="removeFromCart(
                    ${item.id}
                )"
            >
                Remove
            </button>

            <hr>

        `;

        container.appendChild(row);

    });

    if (cart.length === 0) {

        container.innerHTML =
            "<p>Your cart is empty.</p>";

    }

    if (totalElement) {

        totalElement.textContent =
            total.toFixed(2);

    }

}


// ============================================
// CHANGE QUANTITY
// ============================================

function changeQuantity(
    productId,
    amount
) {

    const item =
        cart.find(
            i => i.id === productId
        );

    const product =
        products.find(
            p => p.id === productId
        );

    if (!item || !product) return;

    item.quantity += amount;

    if (item.quantity <= 0) {

        removeFromCart(productId);

        return;
    }

    if (
        item.quantity >
        product.stock
    ) {

        item.quantity =
            product.stock;

        alert(
            "You cannot order more than available stock."
        );

    }

    saveData();

    renderCart();

}


// ============================================
// REMOVE FROM CART
// ============================================

function removeFromCart(productId) {

    cart =
        cart.filter(
            item =>
                item.id !== productId
        );

    saveData();

    renderCart();

}


// ============================================
// CART TOTAL
// ============================================

function getCartTotal() {

    return cart.reduce(
        function(total, item) {

            return total +
                (
                    item.price *
                    item.quantity
                );

        },
        0
    );

}


// ============================================
// CHECKOUT
// ============================================

function checkOut() {

    if (cart.length === 0) {

        alert(
            "Please add products to your cart first."
        );

        return;

    }

    const customerName =
        prompt(
            "Enter customer name:"
        );

    if (!customerName) return;

    const phone =
        prompt(
            "Enter customer phone number:"
        );

    if (!phone) return;

    const address =
        prompt(
            "Enter delivery address:"
        );

    if (!address) return;


    const subtotal =
        getCartTotal();

    const deliveryFee = 30;

    const total =
        subtotal + deliveryFee;


    const orderNumber =
        "MMK-" +
        Date.now().toString().slice(-6);


    const order = {

        orderNumber:

            orderNumber,

        customer:

            customerName,

        phone:

            phone,

        address:

            address,

        items:

            JSON.parse(
                JSON.stringify(cart)
            ),

        subtotal:

            subtotal,

        delivery:

            deliveryFee,

        total:

            total,

        status:

            "New",

        date:

            new Date().toLocaleString()

    };


    orders.push(order);


    // ========================================
    // REDUCE STOCK
    // ========================================

    cart.forEach(function(item) {

        const product =
            products.find(
                p => p.id === item.id
            );

        if (product) {

            product.stock -=
                item.quantity;

            if (product.stock < 0) {

                product.stock = 0;

            }

        }

    });


    // CLEAR CART

    cart = [];


    saveData();

    renderProducts();

    renderCart();

    renderOwnerDashboard();


    alert(

        "ORDER SUCCESSFUL!\n\n" +

        "Order: " +
        orderNumber +

        "\nCustomer: " +
        customerName +

        "\nSubtotal: R" +
        subtotal.toFixed(2) +

        "\nDelivery: R" +
        deliveryFee.toFixed(2) +

        "\nTOTAL: R" +
        total.toFixed(2)

    );

}


// ============================================
// BUSINESS CALCULATIONS
// ============================================

function getStockValue() {

    return products.reduce(
        function(total, product) {

            return total +
                (
                    product.cost *
                    product.stock
                );

        },
        0
    );

}


function getSales() {

    return orders.reduce(
        function(total, order) {

            return total +
                order.total;

        },
        0
    );

}


function getProfit() {

    let profit = 0;

    orders.forEach(function(order) {

        order.items.forEach(function(item) {

            const product =
                products.find(
                    p => p.id === item.id
                );

            if (product) {

                const profitPerItem =
                    product.price -
                    product.cost;

                profit +=
                    profitPerItem *
                    item.quantity;

            }

        });

    });

    return profit;

}


// ============================================
// OWNER DASHBOARD
// ============================================

function renderOwnerDashboard() {

    const owner =
        document.getElementById("owner");

    if (!owner) return;


    const totalProducts =
        products.length;

    const totalStock =
        products.reduce(
            (total, product) =>
                total + product.stock,
            0
        );

    const stockValue =
        getStockValue();

    const sales =
        getSales();

    const profit =
        getProfit();

    const totalOrders =
        orders.length;

    const lowStock =
        products.filter(
            p =>
                p.stock > 0 &&
                p.stock <= 5
        );

    const outOfStock =
        products.filter(
            p =>
                p.stock <= 0
        );


    owner.innerHTML = `

        <h2>MMK Owner Dashboard</h2>

        <div class="dashboard">

            <div class="card">
                <h3>Products</h3>
                <strong>
                    ${totalProducts}
                </strong>
            </div>

            <div class="card">
                <h3>Total Stock</h3>
                <strong>
                    ${totalStock}
                </strong>
            </div>

            <div class="card">
                <h3>Stock Value</h3>
                <strong>
                    R${stockValue.toFixed(2)}
                </strong>
            </div>

            <div class="card">
                <h3>Total Orders</h3>
                <strong>
                    ${totalOrders}
                </strong>
            </div>

            <div class="card">
                <h3>Total Sales</h3>
                <strong>
                    R${sales.toFixed(2)}
                </strong>
            </div>

            <div class="card">
                <h3>Profit</h3>
                <strong>
                    R${profit.toFixed(2)}
                </strong>
            </div>

        </div>


        <h2>Stock Alerts</h2>

        <p>
            ⚠️ Low Stock:
            ${lowStock.length}
        </p>

        <p>
            ❌ Out of Stock:
            ${outOfStock.length}
        </p>


        <h2>Inventory</h2>

        <table>

            <thead>

                <tr>

                    <th>Product</th>

                    <th>Cost</th>

                    <th>Price</th>

                    <th>Stock</th>

                    <th>Status</th>

                </tr>

            </thead>

            <tbody>

                ${products.map(product => `

                    <tr>

                        <td>
                            ${product.name}
                        </td>

                        <td>
                            R${product.cost.toFixed(2)}
                        </td>

                        <td>
                            R${product.price.toFixed(2)}
                        </td>

                        <td>
                            ${product.stock}
                        </td>

                        <td>

                            ${
                                product.stock <= 0
                                ? "❌ OUT"
                                : product.stock <= 5
                                ? "⚠️ LOW"
                                : "✅ OK"
                            }

                        </td>

                    </tr>

                `).join("")}

            </tbody>

        </table>


        <h2>Recent Orders</h2>

        ${
            orders.length === 0

            ?

            "<p>No orders yet.</p>"

            :

            orders
            .slice()
            .reverse()
            .map(order => `

                <div class="card">

                    <h3>
                        ${order.orderNumber}
                    </h3>

                    <p>
                        Customer:
                        ${order.customer}
                    </p>

                    <p>
                        Phone:
                        ${order.phone}
                    </p>

                    <p>
                        Address:
                        ${order.address}
                    </p>

                    <p>
                        Status:
                        <strong>
                            ${order.status}
                        </strong>
                    </p>

                    <p>
                        Total:
                        <strong>
                            R${order.total.toFixed(2)}
                        </strong>
                    </p>

                    <small>
                        ${order.date}
                    </small>

                </div>

            `).join("")
        }

    `;

}


// ============================================
// ADD PRODUCT
// ============================================

function addProduct() {

    const name =
        prompt("Product name:");

    if (!name) return;

    const category =
        prompt("Category:");

    if (!category) return;

    const cost =
        Number(
            prompt(
                "Buying cost:"
            )
        );

    const price =
        Number(
            prompt(
                "Selling price:"
            )
        );

    const stock =
        Number(
            prompt(
                "Stock quantity:"
            )
        );


    if (
        isNaN(cost) ||
        isNaN(price) ||
        isNaN(stock)
    ) {

        alert(
            "Please enter valid numbers."
        );

        return;
    }


    products.push({

        id: Date.now(),

        name: name,

        category: category,

        cost: cost,

        price: price,

        stock: stock

    });


    saveData();

    renderProducts();

    renderOwnerDashboard();


    alert(
        "Product added successfully."
    );

}


// ============================================
// START APPLICATION
// ============================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadData();

        renderProducts();

        renderCart();

    }
);
