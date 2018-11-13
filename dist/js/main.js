//Hamburger icon

document.getElementById('hamburger-nav').onclick = function(event){
    event.target.classList.toggle("active");
    document.getElementsByClassName('header-wrapper')[0].classList.toggle("active");
};
