import { orders } from "../data/order.js";
import { calculateCartQuantity } from "../data/cart.js";

function getItemIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('itemId');
}

function renderTracking() {
  const itemId = getItemIdFromUrl();

  let foundItem = null;
  let parentOrder = null;

  // Cari item di semua order
  for (let order of orders) {
    const item = order.items.find(i => i.itemId === itemId);
    if (item) {
      foundItem = item;
      parentOrder = order;
      break;
    }
  }

  const container = document.querySelector('.order-tracking');

  if (!foundItem) {
    container.innerHTML = "<p>Product not found in any order.</p>";
    return;
  }

  const statusSteps = ["Preparing", "Shipped", "Delivered"];
  const status = foundItem.status || "Preparing";
  const currentStepIndex = statusSteps.indexOf(status);
  const progressPercent = ((currentStepIndex) / (statusSteps.length - 1)) * 100;

  container.innerHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      Arriving on ${foundItem.arrivingDate || "TBD"}
    </div>

    <div class="product-info">
      ${foundItem.product.name}
    </div>

    <div class="product-info">
      Quantity: ${foundItem.quantity}
    </div>

    <img class="product-image" src="${foundItem.product.image}">

    <div class="progress-labels-container">
      ${statusSteps.map(step => `
        <div class="progress-label ${step === status ? "current-status" : ""}">
          ${step}
        </div>
      `).join("")}
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar" style="width: ${progressPercent}%;"></div>
    </div>
  `;
}

// Update cart quantity di header
let updateCartquantity = () => {
  const cartQuantity = calculateCartQuantity();
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
};

updateCartquantity();
renderTracking();
