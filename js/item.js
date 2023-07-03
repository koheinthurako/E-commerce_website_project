import { excerpt } from "./utilities";

export const createItemUi = function({id, title, image, description, price}) {
    let itemDiv = document.createElement('div');
        itemDiv.classList.add("col-md-6", "col-lg-4", "animate__animated", "animate__bounceIn");
        itemDiv.innerHTML =   `
            <div class="card item-card" item-id="${id}">
            <div class="card-body d-flex flex-column"> 
                <div class="mb-3">
                <img src="${image}" class="item-img">
                </div>
                <p class="card-title fw-bold text-truncate">${title}</p>
                <p class="card-text small">
                ${excerpt(description)}
                </p>
                <div class="d-flex mt-auto justify-content-between justify-content-center align-items-center">
                <p class="fw-bold mb-0">$ ${price}</p>
                <button class="btn btn-outline-primary add-cart">
                    <i class="bi bi-cart-plus pe-none"></i>
                    Add Cart
                </button>
                </div>
            </div>
            </div>`;

            return itemDiv;
};