import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
//import "../data/cart-class.js";
//import  { Car } from "../data/car.js";
//import { xhr } from "../data/backend-practice.js";


loadProducts(()=>{
    renderOrderSummary();
    renderPaymentSummary();
});
