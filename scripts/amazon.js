import { cart, addToCart, calculateCartQuantity, updateQuantity } from "../data/cart.js";
// practice load products
import { products} from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

// Function to render products based on search filter
function renderProducts(productsToRender = products) {
  let productsHTML = '';

  productsToRender.forEach((product) => {
    productsHTML += `
        <div class="product-container">
            <div class="product-image-container">
              <img alt="icon amazon-logo" class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img alt="icon amazon-logo" class="product-rating-stars"
                src="${product.getStarUrl()}">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
              ${product.getPrice()}
            </div>

            <div class="product-quantity-container">
              <select class="js-quantity-selector" data-product-id="${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart">
              <img alt="icon amazon-logo" src="images/icons/checkmark.png">
              Added
              </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
              Add to Cart
            </button>
          </div>`;
  });
  
  document.querySelector('.js-products-grid').innerHTML = productsHTML;
}

// Function to filter products based on search keyword
function filterProducts(searchKeyword) {
  if (!searchKeyword.trim()) {
    return products; // ngembaliin product jika di seacrh bar nya kosong
  }

  const keyword = searchKeyword.toLowerCase();
  
  return products.filter(product => {
    // Search in product name
    const nameMatch = product.name.toLowerCase().includes(keyword);
    
    // Search in keywords array
    const keywordsMatch = product.keywords && product.keywords.some(k => 
      k.toLowerCase().includes(keyword)
    );
    
    return nameMatch || keywordsMatch;
  });
}

// Function to handle search
function handleSearch() {
  const searchInput = document.querySelector('.js-search-bar');
  const searchKeyword = searchInput.value;
  
  const filteredProducts = filterProducts(searchKeyword);
  renderProducts(filteredProducts);
  
  // Re-attach event listeners for add to cart buttons
  attachAddToCartListeners();
}

// Function to attach add to cart event listeners
export function attachAddToCartListeners() {
  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      const productContainer = button.closest('.product-container');
      const select = productContainer.querySelector('.js-quantity-selector');
      const selectQuantity = Number(select.value);
      
      addToCart(productId, selectQuantity); 
      updateCartquantity();

      const addedMessage = productContainer.querySelector('.added-to-cart')
      addedMessage.classList.add('show');

      setTimeout(() => {
        addedMessage.classList.remove('show');
      }, 1500);
    });
  });
}

// Initial render
renderProducts();
attachAddToCartListeners();

// Search event listeners
const searchInput = document.querySelector('.js-search-bar');
const searchButton = document.querySelector('.js-search-button');

// Search on Enter key
searchInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    handleSearch();
  }
});

// Search on button click
searchButton.addEventListener('click', handleSearch);

// Search on input clear (real-time)
searchInput.addEventListener('input', (event) => {
  if (event.target.value === '') {
    renderProducts();
    attachAddToCartListeners();
  }
});

export let updateCartquantity = () => {
  const cartQuantity = calculateCartQuantity();
  
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

updateCartquantity();
