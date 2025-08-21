import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import '../data/cart-class.js';
// import '../data/car.js';
// import '../data/backend-practice.js';

  renderCheckoutHeader(); 
  renderOrderSummary();
  renderPaymentSummary();

// // Excercise backend practice
// import { loadProducts,loadProductsFetch } from "../data/products.js";
// import { loadCart } from "../data/cart.js";

// async function loadPage() {
//   await loadProductsFetch();

//   const value = await new Promise((resolve) => {
//     loadCart(() => {
//       resolve();
//     }); 
//   });

//   renderCheckoutHeader(); 
//   renderOrderSummary();
//   renderPaymentSummary();

//   return 'value2';
// }
// loadPage();

/*

Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    }); 
  })

]).then((values) => { // next step
  console.log(values)
  renderCheckoutHeader(); 
  renderOrderSummary();
  renderPaymentSummary();

}); 
*/

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve('value1');
  });

}).then((value) => {
  console.log(value)

  new Promise((resolve) => {
    loadCart(() => {
      resolve('value2');
    });
  });

}).then((value) => {
  console.log(value)
  renderCheckoutHeader(); 
  renderOrderSummary();
  renderPaymentSummary();
})
*/

/*
loadProducts(() => {
  loadCart(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  });
  
});
*/
