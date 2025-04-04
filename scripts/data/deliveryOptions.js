import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


export const deliveryOptions = [{
    id: '1',
    deliveryTime: 7,
    deliveryPrice: 0
},{
    id: '2',
    deliveryTime: 3 ,
    deliveryPrice: 499
},{
    id: '3',
    deliveryTime: 1 ,
    deliveryPrice: 999
}];

export function getDeliveryOption(deliveryOptionId){
    let deliveryOption = '';

    deliveryOptions.forEach((option)=>{
        if(option.id===deliveryOptionId){
            deliveryOption = option;
        }
    });
    return deliveryOption;
}

export function calculateDeliveryDate(deliveryOption){
    let today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryTime, 'days');
    const deliveryDateString = deliveryDate.format('dddd, MMMM D');
    return deliveryDateString;
}