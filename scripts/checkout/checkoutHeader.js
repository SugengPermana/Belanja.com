import { cart } from "../../data/cart.js";

export function renderCheckoutHeader () {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  
  const checkoutHeaderHTML = `
    <div class="header-content">
        <div class="checkout-header-left-section">
          <a href="index.html">
            <img alt="" class="amazon-logo" src="images/belanja-web-logo.png">
            <img alt="" class="amazon-mobile-logo" src="images/belanja-mobile-logo.png">
          </a>
        </div>

        <div class="checkout-header-middle-section">
          Checkout (<a class="return-to-home-link js-return-to-home-link" 
            href="index.html">${cartQuantity} items</a>)
        </div>

        <div class="checkout-header-right-section">
          <img alt="icon checkout" src="images/icons/checkout-lock-icon.png">
        </div>
      </div>
    `;
    document.querySelector('.js-checkout-header').innerHTML = checkoutHeaderHTML;
}

