export let orders;

loadOrdersFromStorage();

function loadOrdersFromStorage() {
  orders = JSON.parse(localStorage.getItem("orders")) || [];
}

function saveOrdersToStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}

export function addOrder(order) {
  orders.push(order);
  saveOrdersToStorage();
}
