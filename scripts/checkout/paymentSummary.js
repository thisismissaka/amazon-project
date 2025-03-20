import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { cart } from "../../data/cart.js";
import { getProduct, products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";


export function renderPaymentSummary(){
    let totalQuantity = 0;
    let totalAmount = 0;
    let totalShipping = 0;

    cart.forEach((cartItem)=>{
        const itemQuantity = cartItem.quantity;
        totalQuantity += itemQuantity;

        const productId = cartItem.productId;

        const matchingProduct = getProduct(productId);

        let totalItemPrice = matchingProduct.priceCents * itemQuantity
        totalAmount += totalItemPrice;

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        totalShipping += deliveryOption.deliveryPrice;
    });
    
    const totalBeforeTax = totalAmount+totalShipping;
    const tax = totalBeforeTax * 0.1;
    const totalAfterTax = totalBeforeTax + tax;

    const paymentSummaryHTML = `
        <div class="payment-summary-title">
            Order Summary
        </div>
        <div class="payment-summary-row">
            <div>Items (${totalQuantity}):</div>
            <div class="payment-summary-money">$${formatCurrency(totalAmount)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(totalShipping)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(tax)}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalAfterTax)}</div>
        </div>
        <button class="place-order-button button-primary">
            Place your order
        </button>
    `;
    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
}