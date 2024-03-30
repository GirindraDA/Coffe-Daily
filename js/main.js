const navbarNav = document.querySelector('.navbar-nav');
const hamburger = document.getElementById('hamburger-menu');
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');
const searchBtn = document.querySelector('#search-button');

const shoppingCartBtn = document.getElementById('shopping-cart-button');
const shoppingCart = document.querySelector('.shopping-cart');

const itemDetailModal = document.querySelector('#item-detail-modal');
const itemDetailButtons = document.querySelectorAll('.item-detail-button');
const closeIconModal = document.querySelector('.modal .close-icon');

document.querySelector('#hamburger-menu').onclick = () => {
    navbarNav.classList.toggle('active');
}

document.addEventListener('click', function(e){
    if(!hamburger.contains(e.target) && !navbarNav.contains(e.target)){
        navbarNav.classList.remove('active');
    }

    if(!searchBtn.contains(e.target) && !searchForm.contains(e.target)){
        searchForm.classList.remove('active');
    }

    if(!shoppingCartBtn.contains(e.target) && !shoppingCart.contains(e.target)){
        shoppingCart.classList.remove('active');
    }
});

//parameter event adalah parameter yang merujuk ke dirinya sendiri.
document.querySelector('#search-button').onclick = (event) => {
    event.preventDefault();
    searchForm.classList.toggle('active');
    searchBox.focus();
}

shoppingCartBtn.addEventListener('click', function(event){
    event.preventDefault();
    shoppingCart.classList.toggle('active');
});

itemDetailButtons.forEach((btn) => {
    btn.addEventListener('click', function(event){
        event.preventDefault();
        itemDetailModal.style.display = 'flex'; 
    });
});


closeIconModal.addEventListener('click', function(event){
    event.preventDefault();
    itemDetailModal.style.display = 'none';
 });

window.onclick = (event) => {
    if(event.target === itemDetailModal){
        itemDetailModal.style.display = 'none';
    }
}