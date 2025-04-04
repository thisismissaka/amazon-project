import {formatCurrency} from "../utils/money.js";

export function getProduct(productId){
  let matchingProduct;

    products.forEach((product)=>{

        if(product.id===productId){
            matchingProduct = product;       
        }
    });
  return matchingProduct;
}

export class Product {
  id;
  image;
  name;
  stars;
  rating_count;
  priceCents;
  keywords;

  constructor(productDetails){
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.stars = productDetails.stars;
    this.rating_count = productDetails.rating_count;
    this.priceCents = productDetails.priceCents;
    this.keywords = productDetails.keywords;
  }

  getStarsUrl(){
    return `images/ratings/rating-${this.stars*10}.png`;
  }
  getPrice(){
    return `$${formatCurrency(this.priceCents)}`;
  }
  extraInfoHTML(){
    return '';
  }
}

export class Clothing extends Product{
  sizeChartLink;

  constructor(productDetails){
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHTML(){
    return `<a href="${this.sizeChartLink}" target="_blank">
    Size Chart</a>`;
  }
}

export class Appliance extends Product{
  instructionsLink;
  warrantyLink;

  constructor(productDetails){
    super(productDetails);
    this.instructionsLink = productDetails.instructionsLink;
    this.warrantyLink = productDetails.warrantyLink;
  }
  extraInfoHTML(){
    return `<a href="${this.instructionsLink}" target="_blank">
    Instructions</a>
     <a href="${this.warrantyLink}" target="_blank">
    Warranty</a>`;
  }
}

export let products = [];

export function loadProductsFetch(){
  const promise = fetch('http://localhost:5000/').then((response)=>{
    return response.json();
  }).then((productsData)=>{
    products = productsData.map((productDetails)=>{
      if(productDetails.type==='clothing'){
        return new Clothing(productDetails);
      }else if(productDetails.type==='appliance'){
        return new Appliance(productDetails);
      }
      return new Product(productDetails);
    });
    console.log('Products Loaded!');
    console.log(products);
  }).catch((error)=>{
    console.log('Unexpected error. Please try again later.');
  });
  return promise;
}
