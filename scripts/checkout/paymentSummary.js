import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption,calculateDeliveryDate } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { addOrder } from "../../data/order.js";

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let ShippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    ShippingPriceCents += deliveryOption.priceCents
  });
  const totalBeforeTaxCents = productPriceCents + ShippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  let cartQuantity = 0;
  cart.forEach((cartItem) =>  {
    cartQuantity += cartItem.quantity;
  });

  const paymentSummaryHTML = `
    <div class="payment-summary-title">
        Order Summary
      </div>

      <div class="payment-summary-row">
        <div>Items (${cartQuantity}):</div>
        <div class="payment-summary-money js-payment-summary-shipping">
        $${formatCurrency(productPriceCents)}
        </div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">
        $${formatCurrency(ShippingPriceCents)}
        </div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">
        $${formatCurrency(totalBeforeTaxCents)}
        </div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">
        $${formatCurrency(taxCents)}
        </div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money js-payment-summary-total">
        $${formatCurrency(totalCents)}
        </div>
      </div>

      <button class="place-order-button button-primary order-button">
        Place your order
      </button>
  `
  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

  document.querySelector('.order-button').addEventListener('click', () => {
    if(cart.length === 0) {
      alert("Cart is empty!");
      return;
    }
    placeOrder();
  });

      function placeOrder() {
        const newOrder = {
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          items: cart.map(cartItem => {
      const product = getProduct(cartItem.productId);
      const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
      const arrivingDate = calculateDeliveryDate(deliveryOption);

      return {
        itemId: Date.now().toString() + Math.random().toString(36).slice(2), // buat tracking page nya
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        deliveryOptionId: cartItem.deliveryOptionId,
        arrivingDate, // <--- simpan hasil calculateDeliveryDate
        product: {
          name: product.name,
          image: product.image,
          priceCents: product.priceCents
        }
      };
    }),
    totalPriceCents: totalCents
  };

  addOrder(newOrder);
  
  // Kosongkan cart
  localStorage.setItem("cart", JSON.stringify([]));
  
  alert("Order Placed Successfully!");
  window.location.href = "./orders.html";
// redirect ke riwayat pesanan
      }
  }
