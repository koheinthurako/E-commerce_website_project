import { cartBox, cartBtn, cartCounter, cartNumber, items, total } from "../main";
import Swal from 'sweetalert2';

export const cartCounterUpdate = function() {
  cartCounter.innerText = parseInt(cartCounter.innerText) + 1;
  cartNumber.innerText = cartCounter.innerText;
};

export const cartNumberRemove = function() {
  let cartCounter = document.querySelector(".cart-counter");
  let cartNumber = document.querySelector(".cart-number");
  cartNumber.innerHTML -= 1;
  cartCounter.innerHTML = cartNumber.innerHTML;
};

export const costTotal = function() {
  let all = document.querySelectorAll('.cart-cost');
  total.innerHTML = [...all].reduce( (pv, cv) => pv + parseFloat(cv.innerHTML) ,0).toFixed(2);
};

window.inc = function(event, price) {
  let currentCard = event.target.closest(".item-in-cart");
  let cartQuantity = currentCard.querySelector(".cart-quantity");
  let cartCost = currentCard.querySelector(".cart-cost");
  cartQuantity.valueAsNumber += 1;
  cartCost.innerText = (cartQuantity.valueAsNumber * price).toFixed(2);
  costTotal();
};

window.dec = function(event, price) {
  let currentCard = event.target.closest(".item-in-cart");
  let cartQuantity = currentCard.querySelector(".cart-quantity");
  let cartCost = currentCard.querySelector(".cart-cost");
  if(cartQuantity.valueAsNumber > 1) {
    cartQuantity.valueAsNumber -= 1;
  }
  cartCost.innerText = (cartQuantity.valueAsNumber * price).toFixed(2);
  costTotal();
};

window.delCart = function(event) {
  let currentCard = event.target.closest(".item-in-cart");
  Swal.fire({
    title: 'Are you sure?',
    text: "Wanna cancel this item",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#171717',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes'
  }).then((result) => {
    if (result.isConfirmed) {
      currentCard.classList.add("animate__animated", "animate__headShake");
      setTimeout(() => {
        currentCard.remove();
        costTotal();
        cartNumberRemove();
      }, 1000);
    }
  })
};

export const createItemInCart =  function({id, title, price, image}) {
  const div = document.createElement('div');
  div.classList.add("item-in-cart", "bg-white", "shadow-sm");
  div.innerHTML = `
    <div class="p-3 rounded mb-3">
      <div class="d-flex justify-content-between align-items-start">
        <div class="mb-3">
          <img src="${image}" class="cart-item-img">
        </div>
        <button class="btn btn-danger btn-sm cartDelBtn" onclick="delCart(event)">Delete</button>
      </div>
      
      <p class="fw-bold small">${title}</p>
      <div class="row justify-content-between align-items-center">
        <div class="col-4">
          <p class="mb-0 fw-bold">$ <span class="cart-cost">${price}</span></p>
        </div>
        <div class="col-6">
          <div class="cart-item-quantity input-group input-group-sm">
            <button class="btn btn-secondary" onclick="dec(event, ${price})">
              <i class="bi bi-dash pe-none"></i>
            </button>
            <input type="number" class="form-control text-end cart-quantity" value="1" onchange="changeQuantity(${price})">
            <button class="btn btn-secondary" onclick="inc(event, ${price})">
              <i class="bi bi-plus pe-none"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    
  `;
  cartBox.append(div);

};

window.changeQuantity = function(price) {
  // const listItem = this.parentElement;
  const listItem = document.querySelector('.cart-quantity').parentElement.parentElement.parentElement;
  const number = listItem.querySelector('.cart-cost');
  const quantity = document.querySelector('.cart-quantity').value;
  let cartQuantity = document.querySelector(".cart-quantity");

  cartQuantity.value = quantity;
  
  if(!isNaN(quantity) && quantity > 0) {
    number.innerHTML = (price * quantity).toFixed(2);
  }

  costTotal();
  
}

export const addToCart = function(e) {
    let currentItemCard = e.target.closest('.item-card');
    let itemId = currentItemCard.getAttribute("item-id");
    let itemDetail = items.find(item => item.id === parseInt(itemId));
    let currentImg = currentItemCard.querySelector(".item-img");

    // let newImg = document.createElement('img');

    // Image() = web API
    let newImg = new Image();
    newImg.src = currentImg.src;
    newImg.style.position = "fixed";
    newImg.style.transition = 0.7 + "s";
    newImg.style.height = 120 + "px";
    newImg.style.zIndex = 2000;
    // getBoundingClientRect သည် document အတွင်းရှိ ပုံရဲ့ တည်နေရာကို ဖမ်းပေးနိုင်သော Web API ဖြစ်သည်
    newImg.style.top = currentImg.getBoundingClientRect().top + "px";
    newImg.style.left = currentImg.getBoundingClientRect().left + "px";

    document.body.append(newImg);

    setTimeout( _ => {
      newImg.style.height = 0 + "px";
      newImg.style.transform = "rotate(360deg)";
      newImg.style.top = (cartBtn.getBoundingClientRect().top+10)+ "px";
      newImg.style.left = (cartBtn.getBoundingClientRect().left+30) + "px";
    }, 10);

    setTimeout( _ => {
      cartBtn.classList.add("animate__tada");
      cartCounterUpdate();
      newImg.remove();
      createItemInCart(itemDetail);
      costTotal();
    }, 500);

    cartBtn.addEventListener('animationend', _ => {
      cartBtn.classList.remove("animate__tada");
    });


};



