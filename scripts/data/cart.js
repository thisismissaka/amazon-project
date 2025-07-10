export let cart = [];

export  function loadCartFetch(){
  const promise =  fetch('http://localhost:5000/cart').then((response)=>{
    return response.json();
  }).then((data)=>{

    cart = data;

    if (!cart) {
      cart = [];
    }

  }).catch((error)=>{
    console.log('Unexpected error in cart db. Please try again later.');
  });

  return promise;
}

export async function addToCart(productId){

  const quantityElement = document.querySelector(`.js-quantity-selector-${productId}`);
  const quantity = quantityElement ? Number(quantityElement.value) : 1; // Default to 1 if null; this line added because of the test

  await fetch('http://localhost:5000/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      productId: productId,
      quantity: quantity,
      deliveryOptionId: '1'
    })
  }).then((response)=>{
    return response.json();
  }).then((cartData)=>{
    cart = cartData;
  });
}

export async function removeFromCart(productId){
    await fetch('http://localhost:5000/cart',{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        productId ? {productId}: {}
      )
    }).then((response)=>{
      return response.json();
    }).then((cartData)=>{
      cart = cartData;
    });
}

export function caculateCartQuantity(){
    let cartQuantity = 0;
    if(!cart){
    }
    cart.forEach((cartItem)=>{
        cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
}

export async function updateQuantity(productId, quantity){
  await fetch('http://localhost:5000/cart/updateQuantity', {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json'},
    body: JSON.stringify({
      productId,
      quantity
    })
  }).then((response)=>{
    return response.json();
  }).then((cartData)=>{
    cart = cartData;
  });
}

export function updateCartQuantity(){
  const quantity = caculateCartQuantity();

  const cartQuantityElements = document.querySelectorAll('.js-cart-quantity');

  cartQuantityElements.forEach(cartQuantityElement => {
    if(quantity === 0){
      cartQuantityElement.innerHTML = ' ';
    }else{
      cartQuantityElement.innerHTML = `${quantity}`;
    }
  });
}

export async function updateDeliveryOptionId(productId, deliveryOptionId){
  await fetch('http://localhost:5000/cart/UpdateDeliveryOptionId', {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json'},
    body: JSON.stringify({
      productId,
      deliveryOptionId
    })
  }).then((response)=>{
    return response.json();
  }).then((cartData)=>{
    cart = cartData;
  });
}
