import { getProduct, loadProductsFetch } from "../data/products.js";
import { getOrder } from "../data/orders.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { updateCartQuantity } from "../data/cart.js";

async function loadTrackingPage(){
    await loadProductsFetch();

    const url = new URL(window.location.href);
    const orderId = url.searchParams.get('orderId');
    const productId = url.searchParams.get('productId');

    const order = getOrder(orderId);
    const product = getProduct(productId);

    const orderTime = dayjs(order.orderTime).format('dddd, MMMM D');

    let matchingItem;
    order.products.forEach((product) => {
        
        if(productId===product.productId){
            matchingItem = product;
        }
    });
    let trackingHTML = `
        <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${orderTime}
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${matchingItem.quantity}
        </div>

        <img class="product-image" src=${product.image}>

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
      </div>
    `;
    document.querySelector('.js-tracking-main').innerHTML = trackingHTML;
}

loadTrackingPage();
updateCartQuantity();