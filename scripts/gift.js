const giftString = localStorage.getItem('gift');

let gift = {
    id: 0,
    imgSrc: "./imgs/hero-img.jpg",
    name: "Not Found",
    category: "Not Found",
    price: "Not Found",
    number: 0,
};

if (giftString) {
    gift = JSON.parse(giftString);
}


const giftImg = document.querySelector(".gift-img");

const giftName = document.querySelector('.gift-name');
const giftCategory = document.querySelector('.gift-category');
const giftPrice = document.querySelector('.gift-price');

const giftAvailability = document.querySelector('.gift-availability');

giftImg.setAttribute("src", gift.imgSrc);
giftImg.setAttribute("alt", gift.name);

giftName.textContent = gift.name;
giftCategory.textContent = gift.category;
giftPrice.textContent = gift.price;

const giftBasket = document.querySelector(".gift-basket");

if (gift.number > 0) {
    giftAvailability.textContent = "У наявності";
    giftAvailability.style.color = "#038cff";

    giftBasket.disabled = false; // не обов'язково
} else {
    giftAvailability.textContent = "Немає в наявності";
    giftAvailability.style.color = "#FF0000";

    giftBasket.disabled = true;
    giftBasket.style.backgroundColor = "#CCCCCC";
    giftBasket.style.borderColor = "#CCCCCC";
}






