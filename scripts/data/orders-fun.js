import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export let orders = [];

await loadOrders();

export async function loadOrders(){
  await fetch('http://localhost:5000/orders').then((response)=>{
    return response.json();
  }).then((data=>{
    console.log(data);
    console.log(Array.isArray(data)); // returns true if it's an array

    orders = data;

    console.log('Orders loaded!');
  })).catch((error)=>{
    console.log(`${error}. Try again later!`);
  })
}

export async function addOrder(cart, totalPrice, placedAt){
    await fetch('http://localhost:5000/orders', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          orderedItems: cart,
          totalPrice: totalPrice,
          placedAt: placedAt
        })
    }).then(async(response)=>{
      const res = await response.json();
      console.log(res);
    }).catch((error)=>{
      console.log('Unexpected error. Please try again later.');
    });
}


export function getOrder(orderId) {
  return orders.find(order => order.orderId === parseInt(orderId));
}

export async function cancelOrder(id) {
  await fetch(`http://localhost:5000/orders/${id}`, {
    method: 'PATCH',
    headers:{
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      status: 'Cancelled'
    })
  }).then(async(response)=>{
    const res = await response.json();
    return {ok: response.ok, data: res};
  }).catch((error)=>{
    console.log('Unexpected error. Please try again later.');
  });
}

export function disableCancelledFun(order){
  if (order.status === 'Cancelled'){
    document.querySelector('.order-container').classList.add('fade-order-html');
  }
}

export function getArrivingDate(matchingProduct, placedTime){
  let time;
  
  if(matchingProduct==="1"){
      time = dayjs(placedTime).add(7, 'days');

  }else if(matchingProduct==="2"){
      time = dayjs(placedTime).add(3, 'days');
  }else{
      time = dayjs(placedTime).add(1, 'days');
  }
  return time;
}