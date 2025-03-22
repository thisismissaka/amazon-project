import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import "../data/cart-class.js";
//import  { Car } from "../data/car.js";
//import { xhr } from "../data/backend-practice.js";

/*
loadProducts(()=>{
    renderOrderSummary();
    renderPaymentSummary();
});
*/

async function loadPage(){
    try{
        //throw ('Error');
        await loadProductsFetch();

        await new Promise ((resolve, reject)=>{
            //throw('Error1');
            loadCart(()=>{
            //reject('Error3');
            resolve();
        });
        });
    }catch(error){
        console.log('Unexpected error. Please try again later.');
    }
    renderOrderSummary();
    renderPaymentSummary();
}

loadPage();

/*
Promise.all([
    loadProductsFetch(),

    new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        });
    })
]).then((values)=>{
    console.log(values);
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
new Promise((resolve)=>{
    loadProducts(()=>{
    resolve();
    });
}).then(()=>{
    return new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        });
    });
}).then(()=>{
    renderOrderSummary();
    renderPaymentSummary();
});
*/
