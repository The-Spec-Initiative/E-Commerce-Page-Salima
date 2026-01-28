const products = [
  {
    image: 'images/display1.png',
    title: 'jordan 1',
    price: 550,
  },
  {
    image: 'images/display2.png',
    title: 'airforce 1',
    price: 550,
  },
  {
    image: 'images/display3.png',
    title: 'nike blazers',
    price: 500,
  },
  {
    image: 'images/display4.png',
    title: 'adidas yeezy',
    price: 250,
  },
  {
    image: 'images/display5.png',
    title: 'nike dunk low',
    price: 350,
  },
];

const productsContainer = document.querySelector('.product-content');

products.forEach((product) => {
  const productBox = document.createElement('div');
  productBox.classList.add('product-box');

  productBox.innerHTML = `
    <div class="image-box">
      <img src="${product.image}" alt="${product.title}" />
    </div>

    <h2 class="product-title">${product.title}</h2>

    <div class="price-and-cart">
      <span class="price">$${product.price}</span>
      <i class="ri-shopping-bag-line add-cart"></i>
    </div>
  `;

  productsContainer.appendChild(productBox);
});
const cartIcon = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart');
const cartClose = document.querySelector('#cart-close');
cartIcon.addEventListener('click', () => cart.classList.add('active'));
cartClose.addEventListener('click', () => cart.classList.remove('active'));

const addCartButtons = document.querySelectorAll('.add-cart');
addCartButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const productBox = e.target.closest('.product-box');
    addToCart(productBox);
  });
});

const cartContent = document.querySelector('.cart-content');
const addToCart = (productBox) => {
  const productImg = productBox.querySelector('img').src;
  const productTitle = productBox.querySelector('.product-title').textContent;
  const productPrice = productBox.querySelector('.price').textContent;

  const cartItems = cartContent.querySelectorAll('.cart-product-title');
  for (let item of cartItems) {
    if (item.textContent === productTitle) {
      alert('This item is already added to the cart');
      return;
    }
  }

  const cartBox = document.createElement('div');
  cartBox.classList.add('cart-box');
  cartBox.innerHTML = `
   <img src="${productImg}" alt="" />
          <div class="cart-detail">
            <h2 class="cart-product-title">${productTitle}</h2>
            <span class="cart-price">${productPrice}</span>
            <div class="cart-quantity">
              <button id="increment">+</button>
              <span class="number">1</span>
              <button id="decrement">-</button>
            </div>
          </div>
          <i class="ri-delete-bin-line cart-remove"></i>
  `;

  cartContent.appendChild(cartBox);

  cartBox.querySelector('.cart-remove').addEventListener('click', () => {
    cartBox.remove();

    updateCartCount(-1);

    updateTotalPrice();
  });

  cartBox.querySelector('.cart-quantity').addEventListener('click', (e) => {
    const numberElement = cartBox.querySelector('.number');
    const decrementButton = cartBox.querySelector('#decrement');
    let quantity = Number(numberElement.textContent);
    if (e.target.id === 'decrement' && quantity > 1) {
      quantity--;
      if (quantity === 1) decrementButton.style.color = '#999';
    } else if (e.target.id === 'increment') {
      quantity++;
      decrementButton.style.color = '#333';
    }
    numberElement.textContent = quantity;
    updateTotalPrice();
  });
  updateCartCount(1);

  updateTotalPrice();
};

const updateTotalPrice = () => {
  const totalPriceElement = document.querySelector('.total-price');
  const cartBoxes = document.querySelectorAll('.cart-box');
  let total = 0;

  cartBoxes.forEach((cartBox) => {
    const priceElement = cartBox.querySelector('.cart-price');
    const quantityElement = cartBox.querySelector('.number');
    const price = priceElement.textContent.replace('$', '');
    const quantity = quantityElement.textContent;
    total += price * quantity;
  });
  totalPriceElement.textContent = `$${total}`;
};

let cartItemCount = 0;
const updateCartCount = (change) => {
  const cartItemCountBadge = document.querySelector('.cart-item-count');
  cartItemCount += change;
  if (cartItemCount > 0) {
    cartItemCountBadge.style.visibility = 'visible';
    cartItemCountBadge.textContent = cartItemCount;
  } else {
    cartItemCountBadge.style.visibility = 'hidden';
    cartItemCountBadge.textContent = '';
  }
};
const buyNowButton = document.querySelector('.btn-buy');
buyNowButton.addEventListener('click', () => {
  const cartBoxes = document.querySelectorAll('.cart-box');
  if (cartBoxes.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  cartBoxes.forEach((cartBox) => cartBox.remove());

  cartItemCount = 0;
  updateCartCount(0);
  updateTotalPrice();
  alert('Thank you for your purchase!');
});
