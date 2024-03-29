const ideaString = localStorage.getItem('idea');

let idea = {
    id: 0,
    imgSrc: "./imgs/idea-img.jpg",
    name: "Not Found",
    author: "Not Found",
    price: 0,
    phone: "",
    description: "Not Found",
};

if (ideaString) {
    idea = JSON.parse(ideaString);
}


const ideaImg = document.querySelector(".idea-img");

const ideaName = document.querySelector('.idea-name');
const ideaAuthor = document.querySelector('.idea-author');
const ideaPrice = document.querySelector('.idea-price');
const ideaDescription = document.querySelector('.idea-description');

const ideaPhone = document.querySelector('.idea-phone');


ideaImg.setAttribute("src", idea.imgSrc);
ideaImg.setAttribute("alt", idea.name);

ideaName.textContent = idea.name;
ideaAuthor.textContent = idea.author;
ideaPrice.textContent = idea.price > 0 ? idea.price + " грн." : "Безкоштовно";
ideaDescription.textContent = idea.description;

ideaPhone.textContent = idea.phone;