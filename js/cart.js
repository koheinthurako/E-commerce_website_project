import { cartBox, cartBtn, cartCounter, cartNumber, delAllBtn, items, total } from "../main";
import Swal from 'sweetalert2';

export const addToCart = function(e) {
  let currentItemCard = e.target.closest('.item-card');
  let itemId = currentItemCard.getAttribute("item-id");
  let itemDetail = items.find(item => item.id === parseInt(itemId));
  let currentImg = currentItemCard.querySelector(".item-img");

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

export const createItemInCart =  function({id, title, price, image}) {
  const div = document.createElement('div');
  div.classList.add("item-in-cart", "bg-white", "shadow-sm", "p-4", "mb-3");
  // div.innerHTML = `
  //   <div class="p-3 rounded mb-3">
  //     <div class="d-flex justify-content-between align-items-start">
  //       <div class="mb-3">
  //         <img src="${image}" class="cart-item-img">
  //       </div>
  //       <button class="btn btn-danger btn-sm cartDelBtn" onclick="delCart(event)">Delete</button>
  //     </div>
      
  //     <p class="fw-bold small">${title}</p>
  //     <div class="row justify-content-between align-items-center">
  //       <div class="col-4">
  //         <p class="mb-0 fw-bold">$ <span class="cart-cost">${price}</span></p>
  //       </div>
  //       <div class="col-6">
  //         <div class="cart-item-quantity input-group input-group-sm">
  //           <button class="btn btn-secondary" onclick="dec(event, ${price})">
  //             <i class="bi bi-dash pe-none"></i>
  //           </button>
  //           <input type="number" class="form-control text-end cart-quantity" value="1" onchange="changeQuantity(${price})">
  //           <button class="btn btn-secondary" onclick="inc(event, ${price})">
  //             <i class="bi bi-plus pe-none"></i>
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
    
  // `;
  
  let div1 = document.createElement('div');
  let div2 = document.createElement('div');
  let div3 = document.createElement('div');
  let div4 = document.createElement('div');
  let div5 = document.createElement('div');
  let div6 = document.createElement('div');
  let div7 = document.createElement('div');
  let img = document.createElement('img');
  let delBtn = document.createElement('button');
  let addBtn = document.createElement('button');
  let minusBtn = document.createElement('button');
  let p1 = document.createElement('p');
  let p2 = document.createElement('p');
  let span = document.createElement('span');
  let i1 = document.createElement('i');
  let i2 = document.createElement('i');
  let input = document.createElement('input');

  div1.classList.add("p3", "rounded");
  div2.classList.add("d-flex", "justify-content-between", "align-items-start");
  div3.classList.add("mb-3");
  img.classList.add("cart-item-img");
  img.src = image;
  delBtn.classList.add("btn", "btn-danger", "btn-sm");
  delBtn.innerHTML = "Delete";

  p1.classList.add("fw-bold", "small");
  p1.innerHTML = title;

  div4.classList.add("row", "justify-content-between", "align-items-center");
  div5.classList.add("col-4");
  p2.classList.add("mb-0", "fw-bold");
  p2.innerText = "$ ";
  span.classList.add("cart-cost");
  span.innerText = price;

  p2.append(span);

  div6.classList.add("col-6");
  div7.classList.add("cart-item-quantity", "input-group", "input-group-sm");
  minusBtn.classList.add("btn", "btn-secondary");
  i1.classList.add("bi", "bi-dash", "pe-none");
  input.classList.add("form-control", "text-end", "cart-quantity");
  input.value = 1;
  addBtn.classList.add("btn", "btn-secondary");
  i2.classList.add("bi", "bi-plus", "pe-none");


  div3.append(img);
  div2.append(div3);
  div2.append(delBtn);

  addBtn.append(i2);
  minusBtn.append(i1);
  div7.append(minusBtn, input, addBtn);
  div6.append(div7);
  div5.append(p2);

  div4.append(div5, div6);

  div1.append(div2, p1, div4);

  div.append(div1);
  div.setAttribute("cart-id", id);

  cartBox.append(div);

  delBtn.addEventListener('click', delCart);
  addBtn.addEventListener('click',addQuatity);
  input.addEventListener('input', changeQuantity);
  minusBtn.addEventListener('click', minusQuantity);

};

function delCart() {
  let current = this.parentNode.parentNode.parentNode;
  Swal.fire({
    title: '?Are you sure',
    text: "Wanna cancel this item",
    icon: 'question',
    confirmButtonColor: '#BB2D3B',
    cancelButtonColor: '#171717',
    confirmButtonText: 'Yes',
    showCancelButton: true
  }).then((result) => {
    if (result.isConfirmed) {
      current.classList.add("animate__animated", "animate__headShake");
      setTimeout(() => {
        current.remove();
        costTotal();
        cartNumberRemove();
      }, 1000);
    }
  })
}

function addQuatity() {
  let current = this.parentNode.parentNode.parentNode.parentNode.parentNode;
  let cartId = current.getAttribute("cart-id");
  let itemDetail = items.find(item => item.id === parseInt(cartId));
  let cartQuantity = current.querySelector(".cart-quantity");
  let cartCost = current.querySelector(".cart-cost");
  let quantity = parseFloat(cartQuantity.value);
  quantity += 1;
  cartQuantity.value = quantity;
  cartCost.innerText = (itemDetail.price * quantity).toFixed(2);
  costTotal();
}

function changeQuantity() {
  let current = this.parentNode.parentNode.parentNode.parentNode.parentNode;
  let cartId = current.getAttribute("cart-id");
  let itemDetail = items.find(item => item.id === parseInt(cartId));
  let cartQuantity = current.querySelector(".cart-quantity");
  let cartCost = current.querySelector(".cart-cost");
  let quantity = parseFloat(cartQuantity.value);
  if(!isNaN(quantity) && quantity > 0) {
    cartQuantity.value = quantity;
    cartCost.innerText = (itemDetail.price * quantity).toFixed(2);
    costTotal();
  }
}

function minusQuantity() {
  let current = this.parentNode.parentNode.parentNode.parentNode.parentNode;
  let cartId = current.getAttribute("cart-id");
  let itemDetail = items.find(item => item.id === parseInt(cartId));
  let cartQuantity = current.querySelector(".cart-quantity");
  let cartCost = current.querySelector(".cart-cost");
  let quantity = parseFloat(cartQuantity.value);
  // quantity += 1;
  if(!isNaN(quantity) && quantity > 1) {
    quantity -= 1;
    cartQuantity.value = quantity;
    cartCost.innerText = (itemDetail.price * quantity).toFixed(2);
    costTotal();
  }
}