const navbarNav = document.querySelector('.navbar-nav');
const hamburger = document.getElementById('hamburger-menu');

document.querySelector('#hamburger-menu').onclick = () => {
    navbarNav.classList.toggle('active');
}

document.addEventListener('click', function(e){
    if(!hamburger.contains(e.target) && !navbarNav.contains(e.target)){
        navbarNav.classList.remove('active');
    }
})