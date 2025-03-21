import { Product, Clothing, Appliance } from '../../data/products.js';

describe('test suite: Porduct Class', ()=>{
    let product;

    beforeEach(()=>{
        product = new Product({
            id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            image:"images/products/intermediate-composite-basketball.jpg",
            name:"Intermediate Size Basketball",
            rating:{
                stars: 4,
                count: 127
                },
            priceCents:2095,
            keywords: [
                "sports",
                "basketballs"
            ]
        });
    })

    it ('has the correct properties', ()=>{
        expect(product.id).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
        expect(product.image).toEqual("images/products/intermediate-composite-basketball.jpg");
        expect(product.name).toEqual("Intermediate Size Basketball");
    
    });
    it ('gets the stars url',()=>{
        expect(product.getStarsUrl()).toEqual('images/ratings/rating-40.png');

    });
    it('gets the price', () => {
        expect(product.getPrice()).toEqual('$20.95');
      });
    it('generates extra HTML', () => {
        expect(product.extraInfoHTML()).toBe('');
    });
});

describe('test suite: Clothing', ()=>{
    let clothing = new Clothing({
        id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
        image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
        name: "Adults Plain Cotton T-Shirt - 2 Pack",
        rating: {
          stars: 4.5,
          count: 56
        },
        priceCents: 799,
        keywords: [
          "tshirts",
          "apparel",
          "mens"
        ],
        type: "clothing",
        sizeChartLink: "images/clothing-size-chart.png"
    });
    it ('has the correct properties', ()=>{
        expect(clothing.sizeChartLink).toEqual("images/clothing-size-chart.png");
    });
    it ('has the correct methods', ()=>{
        expect(clothing.extraInfoHTML()).toContain(`<a href="images/clothing-size-chart.png" target="_blank">
    Size Chart</a>`);
    });
});

describe('test suite: Appliance', ()=>{
    let appliance = new Appliance({
        id: "54e0eccd-8f36-462b-b68a-8182611d9add",
        image: "images/products/black-2-slot-toaster.jpg",
        name: "2 Slot Toaster - Black",
        rating: {
          stars: 5,
          count: 2197
        },
        priceCents: 1899,
        keywords: [
          "toaster",
          "kitchen",
          "appliances"
        ],
        type: 'appliance',
        instructionsLink: 'images/appliance-instructions.png',
        warrantyLink: 'images/appliance-warranty.png'
      });
    it ('has the correct properties', ()=>{
        expect(appliance.instructionsLink).toEqual('images/appliance-instructions.png');
    });
    it ('has the correct methods', ()=>{
        expect(appliance.extraInfoHTML()).toContain(`<a href="images/appliance-instructions.png" target="_blank">
    Instructions</a>
     <a href="images/appliance-warranty.png" target="_blank">
    Warranty</a>`);
    });
})