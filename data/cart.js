export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart'));

  if (!cart) {
    cart = [];
    console.log('Cart is empty!')
  }
}

export function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId){

  const quantityElement = document.querySelector(`.js-quantity-selector-${productId}`);
  const quantity = quantityElement ? Number(quantityElement.value) : 1; // Default to 1 if null; this line added because of the test
  let matchingItem;

  cart.forEach((cartItem)=>{
    if(productId===cartItem.productId){
      matchingItem = cartItem;
    }
  });

  if(matchingItem){
    matchingItem.quantity += quantity; 
  }else{        
    cart.push({
      productId,
      quantity,               
      deliveryOptionId: '1'
    });
  }
  saveToStorage();
}

export function removeFromCart(productId){
    const newCart = [];

    cart.forEach((cartItem)=>{
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    });
    cart = newCart;
    saveToStorage();
}

export function caculateCartQuantity(){
    let cartQuantity = 0;
    cart.forEach((cartItem)=>{
        cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
}

export function updateQuantity(productId, newQuantity){
    let matchingItem = 0;

    cart.forEach((cartItem)=>{
        if(productId===cartItem.productId){
            matchingItem = cartItem;
        }
    });
    matchingItem.quantity = newQuantity;
    saveToStorage();
}

export function updateDeliveryOptionId(productId, deliveryOptionId){
  let matchingItem;

  cart.forEach((cartItem)=>{
    if(productId===cartItem.productId){
      matchingItem = cartItem;
    }
  });

  if(!matchingItem){
    return;
  }
  
  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}

export function loadCart(fun){
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', ()=>{
    console.log(xhr.response);
    fun();
  });
  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}