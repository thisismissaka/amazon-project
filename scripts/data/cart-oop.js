function Cart(localStorageKey){
  const cart = {
    cartItem: undefined,
  
    loadFromStorage() {
      this.cartItem = JSON.parse(localStorage.getItem(localStorageKey));
  
      if (!this.cartItem) {
        this.cartItem = [{
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 2,
          deliveryOptionId: '1'
        }, {
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 1,
          deliveryOptionId: '2'
        }];
      }
    },
  
    saveToStorage(){
        localStorage.setItem(localStorageKey, JSON.stringify(this.cartItem));
    },
  
    addToCart(productId){
  
      const quantityElement = document.querySelector(`.js-quantity-selector-${productId}`);
      const quantity = quantityElement ? Number(quantityElement.value) : 1; // Default to 1 if null; this line added because of the test
      let matchingItem;
  
      this.cartItem.forEach((cartItem)=>{
        if(productId===cartItem.productId){
          matchingItem = cartItem;
        }
      });
  
      if(matchingItem){
        matchingItem.quantity += quantity; 
      }else{        
        this.cartItem.push({
          productId,
          quantity,               
          deliveryOptionId: '1'
        });
      }
      this.saveToStorage();
    },
  
    removeFromCart(productId){
        const newCart = [];
  
        cart.forEach((cartItem)=>{
            if(cartItem.productId !== productId){
                newCart.push(cartItem);
            }
        });
        this.cartItem = newCart;
        this.saveToStorage();
    },
  
    caculateCartQuantity(){
        let cartQuantity = 0;
        this.cartItem.forEach((cartItem)=>{
            cartQuantity += cartItem.quantity;
        });
        return cartQuantity;
    },
  
    updateQuantity(productId, newQuantity){
        let matchingItem = 0;
  
        this.cartItem.forEach((cartItem)=>{
            if(productId===cartItem.productId){
                matchingItem = cartItem;
            }
        });
        matchingItem.quantity = newQuantity;
        this.saveToStorage();
    },
  
    updateDeliveryOptionId(productId, deliveryOptionId){
        let matchingItem;
      
        this.cartItem.forEach((cartItem)=>{
          if(productId===cartItem.productId){
            matchingItem = cartItem;
          }
        });
        matchingItem.deliveryOptionId = deliveryOptionId;
  
        this.saveToStorage();
    }
  }
  return cart;
}

const cart = Cart('cart-opp');
const businessCart = Cart('cart-business');

cart.loadFromStorage();
businessCart.loadFromStorage();

cart.addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');

console.log(cart);
console.log(businessCart);