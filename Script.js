let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelector('.slides');
    const totalSlides = slides.children.length;
    currentSlide = (index + totalSlides) % totalSlides; // Loop back if out of bounds
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

setInterval(() => {
  nextSlide();
}, 3000);

const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");
const addCartButtons = document.querySelectorAll(".add-to-cart-btn");
const cartContent = document.querySelector(".cart-content");
const totalPriceElement = document.querySelector(".total-price");
const cartItemCountDot = document.querySelector(".cart-item-count");

cartIcon.addEventListener("click", () => cart.classList.add("active"));
cartClose.addEventListener("click", () => cart.classList.remove("active"));

addCartButtons.forEach(button => {
    button.addEventListener("click", event => {
        const item = event.target.closest(".item");
        if (item) {
            addToCart(item);
        }
    });
});

// Save the cart state to localStorage
const saveCartToLocalStorage = () => {
    const cartItems = [];
    const cartBoxes = document.querySelectorAll(".cart-box");
    cartBoxes.forEach(cartBox => {
        const productTitle = cartBox.querySelector(".cart-product-title").textContent;
        const productPrice = cartBox.querySelector(".cart-price").textContent;
        const productImgSrc = cartBox.querySelector(".cart-img").src;
        const quantity = parseInt(cartBox.querySelector(".number").textContent, 10);

        cartItems.push({ title: productTitle, price: productPrice, imgSrc: productImgSrc, quantity });
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

// Load the cart state from localStorage
const loadCartFromLocalStorage = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (cartItems && cartItems.length > 0) {
        cartItems.forEach(item => {
            addToCartFromStorage(item);
        });
        updateCartCount();
        updateTotalPrice();
    }
};

// Add item to cart (from shop or dynamically)
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

    // Event listeners for remove and quantity update
    cartBox.querySelector(".cart-remove").addEventListener("click", () => {
        cartBox.remove();
        saveCartToLocalStorage();
        updateCartCount();
        updateTotalPrice();
    });
    cartBox.querySelector(".cart-quantity").addEventListener("click", event => {
        const quantityElement = cartBox.querySelector(".number");
        let quantity = parseInt(quantityElement.textContent, 10);
        if (event.target.id === "decrement" && quantity > 1) {
            quantity--;
        } else if (event.target.id === "increment") {
            quantity++;
        }
        quantityElement.textContent = quantity;

        saveCartToLocalStorage();
        updateTotalPrice();
    });

    saveCartToLocalStorage();
    updateCartCount();
    updateTotalPrice();
};

// Create cart box from saved data in localStorage
const addToCartFromStorage = (item) => {
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

    // Event listeners for remove and quantity update
    cartBox.querySelector(".cart-remove").addEventListener("click", () => {
        cartBox.remove();
        saveCartToLocalStorage();
        updateCartCount();
        updateTotalPrice();
    });

    cartBox.querySelector(".cart-quantity").addEventListener("click", event => {
        const quantityElement = cartBox.querySelector(".number");
        let quantity = parseInt(quantityElement.textContent, 10);
        if (event.target.id === "decrement" && quantity > 1) {
            quantity--;
        } else if (event.target.id === "increment") {
            quantity++;
        }
        quantityElement.textContent = quantity;

        saveCartToLocalStorage();
        updateTotalPrice();
    });
};

// Update total price
const updateTotalPrice = () => {
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

// Update cart count
const updateCartCount = () => {
    const cartItems = cartContent.querySelectorAll(".cart-box");
    cartItemCountDot.textContent = cartItems.length;
    cartItemCountDot.style.visibility = cartItems.length > 0 ? "visible" : "hidden";
};

// Load cart from localStorage on page load
window.addEventListener("DOMContentLoaded", loadCartFromLocalStorage);


const buyNowButton = document.querySelector(".btn-buy");

buyNowButton.addEventListener("click", () => {
    const cartBoxes = document.querySelectorAll(".cart-box");
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
        document.body.classList.remove('theme1', 'theme2');
        // Add the selected theme class
        document.body.classList.add(themeName);
        // Hide the dropdown after selection
        document.getElementById('theme-dropdown').style.display = 'none';
    }

    document.addEventListener("DOMContentLoaded", function () {
        const form = document.getElementById("contactForm");
        let formSubmitted = false;

        form.addEventListener("submit", function (event) {
            if (formSubmitted) {
                event.preventDefault(); // Prevent resubmission
                alert("Your form has already been submitted.");
                return;
            }

            // Mark the form as submitted
            formSubmitted = true;

            // Optionally: Show a message to confirm submission
            alert("Form submitted successfully!");

            // Uncomment the line below if you want to prevent the actual form submission for testing:
            // event.preventDefault();
        });
    });
