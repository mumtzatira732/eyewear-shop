 
 
 function saveData(event) {
    event.preventDefault();

    // Save form data to localStorage
    const email = document.getElementById('email').value;
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const address = document.getElementById('address').value;
    const country = document.getElementById('country').value;
    const state = document.getElementById('state').value;
    const postcode = document.getElementById('postcode').value;
    const city = document.getElementById('city').value;
    const phone = document.getElementById('phone').value;

    localStorage.setItem('email', email);
    localStorage.setItem('firstname', firstname);
    localStorage.setItem('lastname', lastname);
    localStorage.setItem('address', address);
    localStorage.setItem('country', country);
    localStorage.setItem('state', state);
    localStorage.setItem('postcode', postcode);
    localStorage.setItem('city', city);
    localStorage.setItem('phone', phone);

    // Phone number regex: simple validation (example for 10 digits)
   // Phone number regex for the format 019-6592189
    const phoneRegex = /^\d{3}-\d{7}$/;

    if (!phoneRegex.test(phone)) {
        alert("Please enter a valid phone number (e.g., 019-6592189).");
        return; // Stop the form from submitting if validation fails
    }

    // Redirect to invoice.html
    window.location.href = 'Invoice.html';
  }



  document.addEventListener("DOMContentLoaded", function() {
    // Retrieve cart data from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const totalPrice = localStorage.getItem('totalPrice') || "$0.00";
    const cartList = document.querySelector(".cart-list");
    const totalPriceElement = document.getElementById("total-price");
    const totalItemsElement = document.getElementById("total-items"); // Assuming you have an element for the total items count
  
    const shippingFee = 10;  // RM10 shipping fee
    let total = 0;
    let totalItems = 0; // Variable to store total item count
  
    // If cart is empty, show a message
    if (cartItems.length === 0) {
        cartList.innerHTML = "<p>Your cart is empty.</p>";
        totalItemsElement.textContent = "0"; // Show 0 items in the cart if empty
    } else {
        // Create cart item elements dynamically
        cartItems.forEach(item => {
            const cartItemElement = document.createElement("div");
            cartItemElement.classList.add("cart-item");
  
            cartItemElement.innerHTML = `
                <div>
                    <h6 class="my-0">${item.title}</h6>
                </div>
                
                <div>Quantity: ${item.quantity || 1}</div>  <!-- Show quantity here -->
                <span class="text-muted">${(parseFloat(item.price.replace(/[^0-9.-]+/g, "")) * (item.quantity || 1)).toFixed(2)}</span>
                
            `;
  
            cartList.appendChild(cartItemElement);
  
            // Parse the price value, assuming it may include a '$' or other currency symbol
            const price = parseFloat(item.price.replace(/[^0-9.-]+/g, "")); // Remove non-numeric characters except '.' and '-'
            
            total += price * (item.quantity || 1); // Use quantity for the total price calculation
            totalItems += item.quantity || 1;  // Add item quantity to totalItems
        });
  
        // Add shipping fee to the total price
        total += shippingFee;
  
        // Update total price with shipping fee
        totalPriceElement.textContent = `RM ${total.toFixed(2)}`;  // Display the total price including shipping fee
  
        // Update total items count
        totalItemsElement.textContent = totalItems;
  
        // Update the shipping fee in the list item if it exists
        const shippingItem = document.querySelector(".shipping-fee"); // Target the shipping fee item
        if (shippingItem) {
            shippingItem.textContent = `RM ${shippingFee.toFixed(2)}`;
        }
    }

    const submitButton = document.querySelector("#submit-button"); // Replace with your actual submit button's ID or class

function checkCartStatus() {
    if (cartItems.length === 0) {
        // If the cart is empty
        submitButton.disabled = true; // Disable the submit button
        submitButton.classList.add("disabled"); // Optional: Add a class for visual feedback
    } else {
        // If the cart is not empty
        submitButton.disabled = false; // Enable the submit button
        submitButton.classList.remove("disabled");
    }
}

// Event listener for the submit button
submitButton.addEventListener("click", (event) => {
    if (cartItems.length === 0) {
        event.preventDefault(); // Prevent the form submission or any action
        alert("Your cart is empty. Please add items to the cart before proceeding.");
    }
});

// Check cart status on page load and whenever items are added/removed
window.addEventListener("DOMContentLoaded", checkCartStatus);
cartContent.addEventListener("DOMSubtreeModified", checkCartStatus); // Recheck whenever the cart content changes
  });

  function goBack() {
    // Navigate to the previous page in the browser history
    if (document.referrer) {
        // Check if there's a referrer (previous page)
        history.back();
    } else {
        // Fallback: Navigate directly to the shop page
        window.location.href = 'shop.html'; // Replace 'shop.html' with your shop page URL
    }
}
