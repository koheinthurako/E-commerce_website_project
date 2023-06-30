import { cartBtn, cartCounter } from "../main";

export const cartCounterUpdate = function() {
    console.log(cartCounter.innerText);
    cartCounter.innerText = parseInt(cartCounter.innerText) + 1;
};

export const addToCart = function(e) {
    let currentItemCard = e.target.closest('.item-card');
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
      }, 500);

      cartBtn.addEventListener('animationend', _ => {
        cartBtn.classList.remove("animate__tada");
    });

};