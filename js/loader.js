export function showLoaderUi() {
    const loader = document.createElement('div');
    loader.classList.add("loader","animate__animated", "animate__fadeIn");
    loader.innerHTML = `<div class="d-flex bg-white  fixed-top justify-content-center min-vh-100 align-items-center">
        <div class="spinner-border text-primary data-loader" style="width: 3rem; height: 3rem;" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>`;
    document.body.append(loader);
  }
  
  export function removeLoaderUi() {
    const selectCurrentLoader = document.querySelector(".loader");
    selectCurrentLoader.classList.replace("animate__fadeIn", "animate__fadeOut");
    // DOM မှာ ပါလာသည့် animationend သည် document အတွင်းရှိ ဖမ်းထားတဲ့ကောင်ရဲ့ animation ကိုသိနိုင်သည်
    selectCurrentLoader.addEventListener( 'animationend' , _ => selectCurrentLoader.remove() );
  }