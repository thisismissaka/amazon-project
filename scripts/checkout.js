import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCartFetch } from "../data/cart.js";
//import "../data/cart-class.js";
//import  { Car } from "../data/car.js";
//import { xhr } from "../data/backend-practice.js";

async function loadPage(){
    try{
        await Promise.all([
            loadProductsFetch(),
            loadCartFetch()
        ]);
    }catch(error){
        console.log('Unexpected error. Please try again later.');
    }
    renderOrderSummary();
    renderPaymentSummary();
}

loadPage();


/*
loadProducts(()=>{
    renderOrderSummary();
    renderPaymentSummary();
});
*/
/*
async function loadPage(){
    try{
        //throw ('Error');
        await loadProductsFetch();
        await loadCartFetch();
        
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
*/

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
