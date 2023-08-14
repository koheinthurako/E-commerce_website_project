import './style.scss';
import { removeLoaderUi, showLoaderUi } from './js/loader';
import { createItemUi } from './js/item';
import { addToCart, costTotal } from './js/cart';
import * as bootstrap from 'bootstrap';
import Swal from 'sweetalert2';

// type = module ရဲ့ Variable ကို Console မှပြန်ခေါ်ရင် Browser console မှ မသိနိုင်ပါ
export let items = [];

//ဒါမျိုးရေးမှရမည်
// window.items = [];

export const itemRow = document.querySelector(".item-row");
export const cartBtn = document.querySelector(".cart-btn");
export const cartCounter = document.querySelector(".cart-counter");
export const cartNumber = document.querySelector(".cart-number");
export const cartBox = document.querySelector("#cartBox");
export const total = document.querySelector("#total");
export const printBtn = document.querySelector(".printBtn");
export const delAllBtn = document.querySelector("#delAllBtn");



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


  

  printBtn.addEventListener('click', function() {
    if(parseFloat(total.innerHTML) > 0) {
      Swal.fire({
        title: '?Are you sure',
        text: "Wanna checkout all of these items",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#171717',
        cancelButtonColor: '#d33',
        confirmButtonText: '!Yes, I will'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            '!Congratulation',
            'We will send you more details later.',
            'success'
          );

          setTimeout(() => {
             location.reload();
          }, 2000);


        }
      })

    }
  });


  // printBtn.addEventListener('animationend', _ => document.querySelector("#cartBox").remove());
  

//   export const printCost = function() {
//   Swal.fire({
//     title: 'Are you sure?',
//     text: "You won't be able to revert this!",
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#3085d6',
//     cancelButtonColor: '#d33',
//     confirmButtonText: 'Yes, delete it!'
//   }).then((result) => {
//     if (result.isConfirmed) {
//       Swal.fire(
//         'Deleted!',
//         'Your file has been deleted.',
//         'success'
//       )
//     }
//   })
// };
  