import { caculateCartQuantity, cart, removeFromCart, updateQuantity } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrancy } from './utils.js';

let cartItemSummaryHTML = '';

cart.forEach((cartItem) =>{
    const productId = cartItem.productId;
    let matchingProduct;

    products.forEach((product)=>{

        if(product.id===productId){
            matchingProduct = product;
        }
    })
    
    cartItemSummaryHTML +=
        `
        <div class="cart-item-container js-class-item-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-price">
                    $${formatCurrancy(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label js-quantity-label"></span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-quantity" data-product-id ="${matchingProduct.id}">
                    Update
                    </span>
                    <input class="quantity-input js-quantity-input-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                    <span class="save-quantity-link link-primary js-save-quantity" data-product-id ="${matchingProduct.id}">
                    Save
                    </span>
                    <span class="delete-quantity-link link-primary js-remove-cartItem" data-product-id="${matchingProduct.id}">
                    Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                <div class="delivery-option">
                    <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                    <div class="delivery-option-date">
                        Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                        FREE Shipping
                    </div>
                    </div>
                </div>
                <div class="delivery-option">
                    <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                    <div class="delivery-option-date">
                        Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                        $4.99 - Shipping
                    </div>
                    </div>
                </div>
                <div class="delivery-option">
                    <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                    <div class="delivery-option-date">
                        Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                        $9.99 - Shipping
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    `;
});

document.querySelector('.js-cart-summary').innerHTML = cartItemSummaryHTML; 

document.querySelectorAll('.js-remove-cartItem').forEach((link)=>{
    link.addEventListener('click', ()=>{
        const productId = link.dataset.productId;
        removeFromCart(productId);

        const container = document.querySelector(`.js-class-item-container-${productId}`);
        container.remove();

        updateCartQuantity();
    });
});

function updateCartQuantity(){
  
    document.querySelector('.js-checkoutHeader-quantity').innerHTML = `${caculateCartQuantity()} items`; 
}

updateCartQuantity();

document.querySelectorAll('.js-update-quantity').forEach((link)=>{
    link.addEventListener('click', ()=>{
        const productId = link.dataset.productId;

        const container = document.querySelector(`.js-class-item-container-${productId}`);

        container.classList.add('is-editing-quantity');
    });
});

document.querySelectorAll('.js-save-quantity').forEach((link)=>{
    link.addEventListener('click', ()=>{
        const productId = link.dataset.productId;

        const container = document.querySelector(`.js-class-item-container-${productId}`);
        container.classList.remove('is-editing-quantity');

        const updatedQuantity = document.querySelector(`.js-quantity-input-${productId}`);
        const newQuantity = Number(updatedQuantity.value);

        if (newQuantity < 0 || newQuantity >= 1000) {
            alert('Quantity must be at least 0 and less than 1000');
            return;
        }

        updateQuantity(productId, newQuantity);

        const quantityLabel = document.querySelector('.js-quantity-label');
        quantityLabel.innerHTML =  newQuantity;

        updateCartQuantity();
    });
});