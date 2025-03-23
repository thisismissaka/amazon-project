import { caculateCartQuantity, cart, removeFromCart, updateDeliveryOptionId, updateQuantity } from '../../data/cart.js';
import { getProduct, products } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { calculateDeliveryDate, deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';

export function renderOrderSummary(){

    let cartItemSummaryHTML = '';

    cart.forEach((cartItem) =>{
        const productId = cartItem.productId;
        const matchingProduct = getProduct(productId);

        const deliveryOptionId = cartItem.deliveryOptionId;
        const deliveryOption = getDeliveryOption(deliveryOptionId);

        const dateString = calculateDeliveryDate(deliveryOption);

        cartItemSummaryHTML +=
            `
            <div class="cart-item-container 
                js-cart-item-container js-cart-item-container-${matchingProduct.id}">
                <div class="delivery-date">
                    Delivery date: ${dateString}
                </div>

                <div class="cart-item-details-grid">
                    <img class="product-image"
                    src="${matchingProduct.image}">

                    <div class="cart-item-details">
                    <div class="product-name js-product-name-${matchingProduct.id}">
                        ${matchingProduct.name}
                    </div>
                    <div class="product-price js-product-price-${matchingProduct.id}">
                        ${matchingProduct.getPrice()}
                    </div>
                    <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                        <span>
                        Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}" >${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary js-update-quantity" data-product-id ="${matchingProduct.id}">
                        Update
                        </span>
                        <input class="quantity-input js-quantity-input-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                        <span class="save-quantity-link link-primary js-save-quantity" data-product-id ="${matchingProduct.id}">
                        Save
                        </span>
                        <span class="delete-quantity-link link-primary js-remove-cartItem js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                        Delete
                        </span>
                    </div>
                    </div>

                    <div class="delivery-options">
                        <div class="delivery-options-title">
                            Choose a delivery option:
                        </div>
                        ${deliveryOptionsHTML(matchingProduct, cartItem)}
                    </div>
                </div>
            </div>
        `;
    });

    function deliveryOptionsHTML(matchingProduct, cartItem){

        let optionsHTML = '';

        deliveryOptions.forEach((option) =>{
            const dateString = calculateDeliveryDate(option);

            const optionPrice = option.deliveryPrice===0 ? 'FREE': `$${formatCurrency(option.deliveryPrice)} -`;
            const isChecked = option.id === cartItem.deliveryOptionId;
        
            optionsHTML+= `
                
                <div class="delivery-option js-delivery-option js-delivery-option-${matchingProduct.id}-${option.id}"
                data-product-id ="${matchingProduct.id}" data-delivery-option-id="${option.id}">
                    <input type="radio" 
                    ${isChecked ? 'checked': ''}
                    class="delivery-option-input
                    js-input-${matchingProduct.id}-${option.id}"
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                        <div class="delivery-option-date">
                            ${dateString}
                        </div>
                        <div class="delivery-option-price">
                            ${optionPrice} Shipping
                        </div>
                    </div>
                </div>
                `;
        });
        return optionsHTML;
    }

    document.querySelector('.js-cart-summary').innerHTML = cartItemSummaryHTML; 

    document.querySelectorAll('.js-remove-cartItem').forEach((link)=>{
        link.addEventListener('click', ()=>{
            const productId = link.dataset.productId;
            removeFromCart(productId);

            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.remove();

            updateCartQuantity();

            renderOrderSummary();
            renderPaymentSummary();
        });
    });
    function updateCartQuantity() {
        const quantityElement = document.querySelector('.js-checkoutHeader-quantity');
    
        quantityElement.innerHTML = `${caculateCartQuantity()} items`;
    }
    
    updateCartQuantity();

    document.querySelectorAll('.js-update-quantity').forEach((link)=>{
        link.addEventListener('click', ()=>{
            const productId = link.dataset.productId;

            const container = document.querySelector(`.js-cart-item-container-${productId}`);

            container.classList.add('is-editing-quantity');
        });
    });

    document.querySelectorAll('.js-save-quantity').forEach((link)=>{
        link.addEventListener('click', ()=>{
            const productId = link.dataset.productId;

            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.classList.remove('is-editing-quantity');

            const updatedQuantity = document.querySelector(`.js-quantity-input-${productId}`);
            const newQuantity = Number(updatedQuantity.value);

            if (newQuantity < 0 || newQuantity >= 1000) {
                alert('Quantity must be at least 0 and less than 1000');
                return;
            }

            updateQuantity(productId, newQuantity);
            updateCartQuantity();
            renderOrderSummary();
            renderPaymentSummary();
        });
    });

    document.querySelectorAll('.js-delivery-option').forEach((element)=>{
        element.addEventListener('click', ()=>{
            const {productId, deliveryOptionId} = element.dataset;
            updateDeliveryOptionId(productId, deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
        });
    });
}
