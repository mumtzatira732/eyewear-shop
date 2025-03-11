const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");

cartIcon.addEventListener("click", () => cart.classList.add("active"));
cartClose.addEventListener("click", () => cart.classList.remove("active"));

const addCartButtons = document.querySelectorAll(".add-to-cart-btn");

addCartButtons.forEach(button => {
    button.addEventListener("click", event => {
        const item = event.target.closest(".item");
        if (item) {
            addToCart(item);
        }
    });
});

const cartContent = document.querySelector(".cart-content");

// Save the cart state to localStorage
const saveCartToLocalStorage = () => {
    const cartItems = [];
    const cartBoxes = document.querySelectorAll(".cart-box");
    cartBoxes.forEach(cartBox => {
        const productTitle = cartBox.querySelector(".cart-product-title").textContent;
        const productPrice = cartBox.querySelector(".cart-price").textContent;
        const productImgSrc = cartBox.querySelector(".cart-img").src;
        const quantity = isNaN(parseInt(cartBox.querySelector(".number").textContent, 10)) ? 1 : parseInt(cartBox.querySelector(".number").textContent, 10);

        cartItems.push({ title: productTitle, price: productPrice, imgSrc: productImgSrc, quantity });
    });

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

// Load the cart state from localStorage
const loadCartFromLocalStorage = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (cartItems && cartItems.length > 0) {
        cartItems.forEach(item => {
            const cartBox = document.createElement("div");
            cartBox.classList.add("cart-box");
            cartBox.innerHTML = `
                <img src="${item.imgSrc}" class="cart-img">
                <div class="cart-detail">
                    <h2 class="cart-product-title">${item.title}</h2>
                    <span class="cart-price">${item.price}</span>
                    <div class="cart-quantity">
                        <button id="decrement">-</button>
                        <span class="number">${item.quantity}</span>
                        <button id="increment">+</button>
                    </div>
                </div>
                <i class="ri-delete-bin-line cart-remove"></i>
            `;

            cartContent.appendChild(cartBox);

            // Add event listeners for remove and quantity update
            cartBox.querySelector(".cart-remove").addEventListener("click", () => {
                cartBox.remove();
                updateCartCount(-item.quantity);
                saveCartToLocalStorage();
                updateTotalPrice();
            });

            cartBox.querySelector(".cart-quantity").addEventListener("click", event => {
                const numberElement = cartBox.querySelector(".number");
                const decrementButton = cartBox.querySelector("#decrement");
                let quantity = parseInt(numberElement.textContent, 10);

                if (event.target.id === "decrement" && quantity > 1) {
                    quantity--;
                    decrementButton.style.color = quantity === 1 ? "#999" : "#333";

                } else if (event.target.id === "increment") {
                    quantity++;
                    decrementButton.style.color = "#333";
                }
                numberElement.textContent = quantity;

                updateTotalPrice();
                saveCartToLocalStorage();
            });

            updateCartCount(item.quantity);
        });

        updateTotalPrice();
    }
};

// Add this to load the cart on page refresh
window.addEventListener("DOMContentLoaded", loadCartFromLocalStorage);

const addToCart = item => {
    const productImgSrc = item.querySelector(".default-image").src;
    const productTitle = item.querySelector("p").textContent;
    const productPrice = item.querySelector(".price-cart span").textContent;
    // Check if the product is already in the cart
    const cartItems = cartContent.querySelectorAll(".cart-product-title");
    for (let cartItem of cartItems) {
        if (cartItem.textContent === productTitle) {
            alert("This item is already in the cart.");
            return;
        }
    }

    // Create a new cart box
    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");
    cartBox.innerHTML = `
        <img src="${productImgSrc}" class="cart-img">
        <div class="cart-detail">
            <h2 class="cart-product-title">${productTitle}</h2>
            <span class="cart-price">${productPrice}</span>
            <div class="cart-quantity">
                <button id="decrement">-</button>
                <span class="number">1</span>
                <button id="increment">+</button>
            </div>
        </div>
        <i class="ri-delete-bin-line cart-remove"></i>
    `;

    cartContent.appendChild(cartBox);

    // Add event listeners for remove and quantity update
    cartBox.querySelector(".cart-remove").addEventListener("click", () => {
        cartBox.remove();

        updateCartCount(-1);

        saveCartToLocalStorage();

        updateTotalPrice();
    });

    cartBox.querySelector(".cart-quantity").addEventListener("click", event => {
        const numberElement = cartBox.querySelector(".number");
        const decrementButton = cartBox.querySelector("#decrement");
        let quantity = parseInt(numberElement.textContent, 10);

        if (event.target.id === "decrement" && quantity > 1) {
            quantity--;
            decrementButton.style.color = quantity === 1 ? "#999" : "#333";

        } else if (event.target.id === "increment") {
            quantity++;
            decrementButton.style.color = "#333";
        }
        numberElement.textContent = quantity;

        updateTotalPrice();
        saveCartToLocalStorage();
    });

    updateCartCount(1);
    saveCartToLocalStorage();

    updateTotalPrice();
};

//To calculate total price
const updateTotalPrice = () => {
    const totalPriceElement = document.querySelector(".total-price");
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    let total = 0;

    cartBoxes.forEach(cartBox => {
        const priceElement = cartBox.querySelector(".cart-price");
        const quantityElement = cartBox.querySelector(".number");
        const price = parseFloat(priceElement.textContent.replace("MYR", "").trim());
        const quantity = parseInt(quantityElement.textContent, 10);
        total += price * quantity;
    });

    totalPriceElement.textContent = `MYR ${total.toFixed(2)}`;
};

//Update cart number
let cartItemCount = 0;
const updateCartCount = change => {
    const cartItemCountDot = document.querySelector(".cart-item-count");
    cartItemCount += change;
    if (cartItemCount > 0) {
        cartItemCountDot.style.visibility = "visible";
        cartItemCountDot.textContent = cartItemCount;
    } else {
        cartItemCountDot.style.visibility = "hidden";
        cartItemCountDot.textContent = cartItemCount;
    }
};

//buy now button
const buyNowButton = document.querySelector(".btn-buy");

buyNowButton.addEventListener("click", () => {
    const cartBoxes = document.querySelectorAll(".cart-box");
    
    // Check if the cart is empty
    if (cartBoxes.length === 0) {
        alert("Your cart is empty! Please add items to proceed.");
        return; // Prevent the action if the cart is empty
    }

    const cartItems = Array.from(cartBoxes).map(cartBox => ({
        title: cartBox.querySelector(".cart-product-title").textContent,
        price: cartBox.querySelector(".cart-price").textContent,
        quantity: isNaN(parseInt(cartBox.querySelector(".number").textContent, 10)) ? 1 : parseInt(cartBox.querySelector(".number").textContent, 10),
    }));

    const totalPrice = document.querySelector(".total-price").textContent;

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("totalPrice", totalPrice);

    window.location.href = "Form.html";
});

function toggleDropdown() {
    const dropdown = document.getElementById('theme-dropdown');
    // Toggle display between 'none' and 'block'
    if (dropdown.style.display === 'none') {
        dropdown.style.display = 'block';
    } else {
        dropdown.style.display = 'none';
    }
}

function applyTheme(themeName) {
    // Remove any existing theme classes
    document.body.classList.remove('theme1', 'theme2', 'theme3');
    // Add the selected theme class
    document.body.classList.add(themeName);
    // Hide the dropdown after selection
    document.getElementById('theme-dropdown').style.display = 'none';
}

function searchProducts() {
    const searchQuery = document.getElementById('search-input').value.toLowerCase();
    const productContainers = document.querySelectorAll('.containerP');
    let productFound = false;

    productContainers.forEach(container => {
        const productTitle = container.querySelector('.down-content p').textContent.toLowerCase();

        if (productTitle.includes(searchQuery)) {
            container.style.display = ''; // Show the product
            productFound = true;
        } else {
            container.style.display = 'none'; // Hide the product
        }
    });

    // Check if no products were found
    if (!productFound) {
        alert('Product not found'); // Show an alert
        // Optionally, you can display a message on the page instead of an alert
        document.getElementById('no-products-message').style.display = 'block';
    } else {
        // Hide the "Product not found" message if products are found
        document.getElementById('no-products-message').style.display = 'none';
    }
}

// Add event listener for the Enter key
document.getElementById('search-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        searchProducts();
    }
});

