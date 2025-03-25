export class Cart {
  cart;
  #localStorageKey;

  constructor(localStorageKey){
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }
  
  #loadFromStorage() {
    this.cart = JSON.parse(localStorage.getItem(this.#localStorageKey));

    if (!this.cart) {
      this.cart= [];
      console.log('Cart is empty!');
    }
  }

  saveToStorage(){
      localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cart));
  }

  addToCart(productId){

    const quantityElement = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantity = quantityElement ? Number(quantityElement.value) : 1; // Default to 1 if null; this line added because of the test
    let matchingItem;

    this.cart.forEach((cartItem)=>{
      if(productId===cartItem.productId){
        matchingItem = cartItem;
      }
    });

    if(matchingItem){
      matchingItem.quantity += quantity; 
    }else{        
      this.cart.push({
        productId,
        quantity,               
        deliveryOptionId: '1'
      });
    }
    this.saveToStorage();
  }

  removeFromCart(productId){
      const newCart = [];

      cart.forEach((cartItem)=>{
          if(cartItem.productId !== productId){
              newCart.push(cartItem);
          }
      });
      this.cart = newCart;
      this.saveToStorage();
  }

  caculateCartQuantity(){
      let cartQuantity = 0;
      this.cart.forEach((cartItem)=>{
          cartQuantity += cartItem.quantity;
      });
      return cartQuantity;
  }

  updateQuantity(productId, newQuantity){
      let matchingItem = 0;

      this.cart.forEach((cartItem)=>{
          if(productId===cartItem.productId){
              matchingItem = cartItem;
          }
      });
      matchingItem.quantity = newQuantity;
      this.saveToStorage();
  }

  updateCartQuantity(){
    if(caculateCartQuantity()=== 0){
  
      document.querySelector('.js-cart-quantity').innerHTML = ' ';
  
    }else{
      
      document.querySelector('.js-cart-quantity').innerHTML = `${caculateCartQuantity()}`;
  
    }
  }

  updateDeliveryOptionId(productId, deliveryOptionId){
      let matchingItem;
    
      this.cart.forEach((cartItem)=>{
        if(productId===cartItem.productId){
          matchingItem = cartItem;
        }
      });

      if(!matchingItem){
        return;
      }

      matchingItem.deliveryOptionId = deliveryOptionId;

      this.saveToStorage();
  }
  
}

export async function loadCartFetch(){
  const response = await fetch('https://supersimplebackend.dev/cart');
  const text = await response.text();
  console.log(text);
  return text;
}

// const cart = new Cart('cart-oop');
// const businessCart = new Cart('cart-business');

// console.log(cart);
// console.log(businessCart);