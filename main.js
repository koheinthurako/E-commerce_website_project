import './style.scss';
import { removeLoaderUi, showLoaderUi } from './js/loader';
import { createItemUi } from './js/item';
import { addToCart } from './js/cart';

// type = module ရဲ့ Variable ကို Console မှပြန်ခေါ်ရင် Browser console မှ မသိနိုင်ပါ
let items = [];

//ဒါမျိုးရေးမှရမည်
// window.items = [];

export const itemRow = document.querySelector(".item-row");
export const cartBtn = document.querySelector(".cart-btn");
export const cartCounter = document.querySelector(".cart-counter");


showLoaderUi();
fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=> {
              items = json;
              items.forEach(item => {
                // console.log(item);
                itemRow.append(createItemUi(item));
              });
              // Pointer Event None ဆိုရင် Bootstrap မှာ pe-none ပါသည်
              removeLoaderUi();
            });

            // window.addToCart = event => {
            //   console.log("add to cart", event.target);
            // }

  // Event Delegation
  itemRow.addEventListener('click', e => {
    if(e.target.classList.contains('add-cart')) {
      addToCart(e);      
    }
  });
  
  