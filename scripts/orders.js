import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import formatCurrency from './utils/money.js';
import { getProduct, loadProductsFetch, products } from '../data/products.js';
import { orders } from '../data/orders.js';

async function generateOrderHTML(){

    await loadProductsFetch();

    let orderHTML = '';

    orders.forEach((order)=>{
        const orderId = order.id;
        const placedTime = order.orderTime;
        const total = order.totalCostCents;
        const orderPlacedDate = dayjs(placedTime).format('MMMM D');

        let orderedItemHTML = '';

        order.products.forEach((item)=>{

            let matchingItem = getProduct(item.productId);

            const time = item.estimatedDeliveryTime;
            const deliveryTime = dayjs(time).format('MMMM D');
            const {quantity} = item;


            orderedItemHTML += `
                <div class="order-details-grid">
                    <div class="product-image-container">
                        <img src=${matchingItem.image}>
                    </div>
                    <div class="product-details">
                        <div class="product-name">
                            ${matchingItem.name}
                        </div>
                        <div class="product-delivery-date">
                            Arriving on: ${deliveryTime}
                        </div>
                        <div class="product-quantity">
                            Quantity: ${quantity}
                        </div>
                        <button class="buy-again-button button-primary">
                            <img class="buy-again-icon" src="images/icons/buy-again.png">
                            <span class="buy-again-message">Buy it again</span>
                        </button>
                    </div>
                    <div class="product-actions">
                        <a href="tracking.html?orderId=123&productId=456">
                            <button class="track-package-button button-secondary">
                            Track package
                            </button>
                        </a>
                    </div>
                </div>
            `;
        });

        orderHTML += `

            <div class="order-container">
                <div class="order-header">
                    <div class="order-header-left-section">
                    <div class="order-date">
                        <div class="order-header-label">Order Placed:</div>
                        <div>${orderPlacedDate}</div>
                    </div>
                    <div class="order-total">
                        <div class="order-header-label">Total:</div>
                        <div>$${formatCurrency(total)}</div>
                    </div>
                    </div>

                    <div class="order-header-right-section">
                    <div class="order-header-label">Order ID:</div>
                    <div>${orderId}</div>
                    </div>
                </div>
                <div class="orders-grid js-orders-grid">
                    ${orderedItemHTML}
                </div>                
            </div>
        
        `;
    });

    document.querySelector('.js-orders-grid').innerHTML = orderHTML;
}

generateOrderHTML();

// export async function loadOrderPage() {
//     try {
//         await loadProductsFetch();
//         generateOrderHTML();
//     } catch (error) {
//         console.error("Error loading order page:", error);
//     }
// }
//loadOrderPage();

// document.addEventListener("DOMContentLoaded", () => {
//     loadOrderPage();
// });

