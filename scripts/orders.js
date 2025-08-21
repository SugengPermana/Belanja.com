import { orders } from "../data/order.js";
import { formatCurrency } from "./utils/money.js";
import { calculateCartQuantity,addToCart, cart } from "../data/cart.js";
import { products } from "../data/products.js";

function renderOrders() {
  let ordersHTML = "";

  orders.forEach(order => {
    let orderItemsHTML = "";

    order.items.forEach(item => {
      orderItemsHTML += `
        <div class="product-image-container">
          <img src="${item.product.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${item.product.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${item.arrivingDate || "TBD"}
          </div>
          <div class="product-quantity">
            Quantity: ${item.quantity}
          </div>
          <button class="buy-again-button button-primary js-buy-button" data-product-id="${item.productId}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html?itemId=${item.itemId}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `;
    });

    ordersHTML += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${new Date(order.createdAt).toLocaleDateString()}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalPriceCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        <div class="order-details-grid">
          ${orderItemsHTML}
        </div>
      </div>
    `;
  });

  document.querySelector(".orders-grid").innerHTML = ordersHTML;
}

let updateCartquantity = () => {
  const cartQuantity = calculateCartQuantity();
  
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

function attachBuyAgainEvents() {
  document.querySelectorAll('.js-buy-button').forEach(button => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      addToCart(productId, 1); // masukin produk ke cart
      updateCartquantity(); // refresh cart quantity di header
      
      const originalHTML = button.innerHTML;

      // fitur Added
      button.innerHTML = `
        <img class="buy-again-icon" src="images/icons/checkmark.png">
        <span class="buy-again-message">Added</span>
      `;
      setTimeout(() => {
        button.innerHTML = originalHTML;
      }, 1500);
    });
  });
};

updateCartquantity()

// initial render
renderOrders();
attachBuyAgainEvents();
