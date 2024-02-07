const menu = document.getElementById("menu");
const header = document.querySelector('header')
menu.addEventListener('click', (evt) => {
    evt.target.classList.toggle('fa-times');
    header.classList.toggle('toggle');
})

window.addEventListener('scroll', () => {
    menu.classList.remove('fa-times');
    header.classList.remove('toggle');
});
