function showThankYouPopup() {
  alert('Thank you for ordering with us!');
}

document.addEventListener("DOMContentLoaded", function() {
    // Retrieve data from localStorage
    const email = localStorage.getItem('email');
    const firstname = localStorage.getItem('firstname');
    const lastname = localStorage.getItem('lastname');
    const address = localStorage.getItem('address');
    const country = localStorage.getItem('country');
    const state = localStorage.getItem('state');
    const postcode = localStorage.getItem('postcode');
    const city = localStorage.getItem('city');
    const phone = localStorage.getItem('phone');

    // Display data in the invoice
    document.getElementById('emailDisplay').textContent = email;
    document.getElementById('nameDisplay').textContent = `${firstname} ${lastname}`;
    document.getElementById('addressDisplay').textContent = address;
    document.getElementById('countryDisplay').textContent = country;
    document.getElementById('stateDisplay').textContent = state;
    document.getElementById('postcodeDisplay').textContent = postcode;
    document.getElementById('cityDisplay').textContent = city;
    document.getElementById('phoneDisplay').textContent = phone;

    // Retrieve cart data from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const totalPrice = localStorage.getItem('totalPrice') || "$0.00";
    const invoiceContent = document.querySelector(".invoice-content");
    let total = 0;

    // If cart is empty, show a message
    if (cartItems.length === 0) {
        invoiceContent.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        let invoiceHTML = `
        <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#e1e1e1">
<tbody>
  <tr>
    <td>
      <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#ffffff">
        <tbody>
          <tr>
          <tr>
            <td>
              <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
                <tbody>
                  <tr>
                    <th style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; font-weight: normal; line-height: 1; vertical-align: top; padding: 0 10px 7px 0;" width="52%" align="left">
                      <b>Item<b>
                    </th>
                    <th style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; font-weight: normal; line-height: 1; vertical-align: top; padding: 0 0 7px;" align="left">
                      <b>Price</b>
                    </th>
                    <th style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; font-weight: normal; line-height: 1; vertical-align: top; padding: 0 0 7px;" align="center">
                      <b>Quantity</b>
                    </th>
                    <th style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #1e2b33; font-weight: normal; line-height: 1; vertical-align: top; padding: 0 0 7px;" align="right">
                      <b>Subtotal</b>
                    </th>
                  </tr>
                  <tr>
                    <td height="1" style="background: #bebebe;" colspan="4"></td>
                  </tr>
                  <tr>
                    <td height="10" colspan="4"></td>
                  </tr>
                                                   
        `;

        // Create cart item elements dynamically
        cartItems.forEach(item => {
            const price = parseFloat(item.price.replace(/[^0-9.-]+/g, "")); // Clean price value
            const itemTotal = price * (item.quantity || 1);
            total += itemTotal; // Add item total to grand total

            invoiceHTML += `              
                  <tr>
                    <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b;  line-height: 18px;  vertical-align: top; padding:10px 0;" class="article"><b>${item.title}</b></td>
                    <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e;  line-height: 18px;  vertical-align: top; padding:10px 0;">${price.toFixed(2)}</td>
                    <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e;  line-height: 18px;  vertical-align: top; padding:10px 0;" align="center">${item.quantity || 1}</td>
                    <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #1e2b33;  line-height: 18px;  vertical-align: top; padding:10px 0;" align="right">${itemTotal.toFixed(2)}</td>
                  </tr>

                  
            `;
        });

        // Close table
        invoiceHTML += `

        <tr>
                    <td height="1" colspan="4" style="border-bottom:1px solid #e4e4e4"></td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td height="20"></td>
          </tr>
        </tbody>
      </table>
    </td>
  </tr>
</tbody>
</table>
        <table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#e1e1e1">
          <tbody>
            <tr>
              <td>
                <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#ffffff">
                  <tbody>
                    <tr>
                      <td>

                        <!-- Table Total -->
                        <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
                          <tbody>
                          
                            <tr>
                              <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e; line-height: 22px; vertical-align: top; text-align:right; ">
                                Subtotal
                              </td>
                              <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e; line-height: 22px; vertical-align: top; text-align:right; white-space:nowrap;" width="80">
                                RM${total.toFixed(2)}
                              </td>
                            </tr>
                            <tr>
                              <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e; line-height: 22px; vertical-align: top; text-align:right; ">
                                Shipping 
                              </td>
                              <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e; line-height: 22px; vertical-align: top; text-align:right; ">
                                RM 10.00
                              </td>
                            </tr>                    
                    <tr>
                              <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #000; line-height: 22px; vertical-align: top; text-align:right; ">
                                <strong>Grand Total (Incl.Tax)</strong>
                              </td>
                              <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #000; line-height: 22px; vertical-align: top; text-align:right; ">
                                <strong>RM ${(total + 10).toFixed(2)}</strong>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <!-- /Table Total -->
                      </td>
                    </tr>
                  </tbody>
                </table>

        
        `;

        // Insert the generated invoice into the content div
        invoiceContent.innerHTML = invoiceHTML;
    }
  });

  function updateDateTime() {
    const currentDate = new Date();
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };

    // Get the current date and time
    const formattedDate = currentDate.toLocaleDateString('en-US', dateOptions);
    const formattedTime = currentDate.toLocaleTimeString('en-US', timeOptions);

    // Update the content of the #datetime element
    document.getElementById('datetime').textContent = `${formattedDate}, ${formattedTime}`;
  }

  // Update the date and time every second (1000 ms)
  setInterval(updateDateTime, 1000);
  
  // Call the function immediately to display the current date and time
  updateDateTime();

 