import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import formatCurrency from './utils/money.js';
import { getProduct, loadProductsFetch } from './data/products.js';
import { cancelOrder, getArrivingDate, orders } from './data/orders-fun.js';
import { addToCart } from './data/cart.js';
import { updateCartQuantity } from './data/cart.js';

generateOrderHTML();

async function generateOrderHTML(){
    await loadProductsFetch();

    let orderHTML = '';

    orders.forEach((order)=>{
        const orderId = order.orderId;
        const placedTime = order.placedAt;
        const total = order.totalPrice;
        let orderedItemHTML = '';
        const orderPlacedDate = dayjs(placedTime).format('MMMM D');

        let isCancelled;
        if(order.status==='Cancelled'){
            isCancelled = true;
        }else{
            isCancelled = false;
        }

        order.orderedItems.forEach((orderedItem)=>{

            let matchingItem = getProduct(orderedItem.productId);
            let time = getArrivingDate(orderedItem.deliveryOptionId, placedTime);

            const deliveryTime = dayjs(time).format('MMMM D');
            const {quantity} = orderedItem;

            const trackingLink = document.querySelectorAll(".product-actions a");
            trackingLink.href = `tracking.html?orderId=${orderId}&productId=${matchingItem.id}`;

            orderedItemHTML += `
                
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
                    <button class="buy-again-button button-primary js-buy-again-button" data-product-id="${matchingItem.id}">
                        <img class="buy-again-icon" src="images/icons/buy-again.png">
                        <span class="buy-again-message">Buy it again</span>
                    </button>
                </div>
                <div class="product-actions">
                    <a href=${trackingLink.href}>
                        <button class="track-package-button button-secondary">
                        Track package
                        </button>
                    </a>
                </div>
                
            `;
        });

        orderHTML += `
        
            <div class="order-container ${isCancelled? 'fade-order-html': ''}">
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
                    <div class="order-id">
                    <div class="order-header-label">Order ID:</div>
                    <div>${orderId}</div>
                    </div>
                    <div class="order-cancel">
                        <button class="cancel-order-button button-primary js-cancel-order" data-order-id="${orderId}">
                        ${isCancelled? 'Cancelled': 'Cancel order'}
                        </button>
                    </div>
                    </div>
                </div>
                <div class="order-details-grid">
                ${orderedItemHTML}
                </div>                
            </div>
        
        `;
    });

    document.querySelector('.js-orders-grid').innerHTML = orderHTML;

    document.querySelectorAll('.js-buy-again-button').forEach((button)=>{
        button.addEventListener('click', ()=>{

            const {productId} = button.dataset;
            addToCart(productId);   
            updateCartQuantity()  

            button.innerHTML = 'Added';
            setTimeout(()=>{
                button.innerHTML =`
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
                `;
            },1000);
        });
    });
    
    document.querySelectorAll('.js-cancel-order').forEach((button)=>{
        button.addEventListener('click', async()=>{
            const {orderId} = button.dataset;
            await cancelOrder(orderId);  
            
            button.innerHTML = 'Cancelled';

            document.querySelector('.order-container').classList.add('fade-order-html');
        })
    })

    updateCartQuantity();
}
