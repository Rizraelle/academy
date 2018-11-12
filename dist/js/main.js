//Hamburger icon

document.getElementById('gamburger-nav').onclick = function(event){
    event.target.classList.toggle("active");
    document.getElementsByClassName('header-wrapper')[0].classList.toggle("active");
};
