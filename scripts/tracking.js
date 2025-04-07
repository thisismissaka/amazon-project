import { getProduct, loadProductsFetch } from "./data/products.js";
import { getArrivingDate, getOrder } from "./data/orders-fun.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { updateCartQuantity } from "./data/cart.js";

async function loadTrackingPage(){
    await loadProductsFetch();

    const url = new URL(window.location.href);
    const orderId = url.searchParams.get('orderId');
    const productId = url.searchParams.get('productId');

    const order = getOrder(orderId);

    const product = getProduct(parseInt(productId));

    let matchingItem;
    order.orderedItems.forEach((product) => {
        
        if(parseInt(productId)===product.productId){
            matchingItem = product;
        }
    });
    const arrivingTime = getArrivingDate(matchingItem.deliveryOptionId, order.placedAt).format('dddd, MMMM D');

    const today = dayjs();
    const orderTime = dayjs(order.placedAt);
    const deliveryTime = getArrivingDate(matchingItem.deliveryOptionId, order.placedAt);
    const percentProgress = ((today - orderTime) / (deliveryTime - orderTime)) * 100;

    let trackingHTML = `
        <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${arrivingTime}
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${matchingItem.quantity}
        </div>

        <img class="product-image" src=${product.image}>

        <div class="progress-labels-container">
          <div class="progress-label ${percentProgress<50 ? 'current-status': ''}">
            Preparing
          </div>
          <div class="progress-label ${percentProgress>=50 && percentProgress<100 ? 'current-status': ''}">
            Shipped
          </div>
          <div class="progress-label ${percentProgress>=100 ? 'current-status': ''}">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${percentProgress}%;"></div>
        </div>
      </div>
    `;
    document.querySelector('.js-tracking-main').innerHTML = trackingHTML;  
}

loadTrackingPage();
updateCartQuantity();