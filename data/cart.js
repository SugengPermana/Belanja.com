import { validDeliveryOption } from "./deliveryOptions.js";
export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart'));

    if(!cart) {
      cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1',
    }, {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2',
    }];
  }
}


function saveStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

export let addToCart = (productId, quantity = 1) => {
  let matchingItem;

    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
      
      if (matchingItem) {
        matchingItem.quantity += quantity;
      } else {
        cart.push({
        productId: productId,
        quantity: quantity, 
        deliveryOptionId: '1'
      });
    }
    saveStorage();
  }

  export function calculateCartQuantity () {
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
  }

  export function updateQuantity(productId, newQuantity) {
    let matchingItem;

    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
    matchingItem.quantity = newQuantity;
    saveStorage();
  }

  export function removeFromCart(productId) {
    const newCart = [];
      
      cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      });

      cart = newCart;
      saveStorage();
  }

  export function updateDeliveryOption(productId,deliveryOptionId) {
    let matchingItem;

    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
    if(!matchingItem) {
      return;
    }
    if(!validDeliveryOption(deliveryOptionId)) {
      return;
    }
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveStorage();
  }