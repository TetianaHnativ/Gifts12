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
const ideaDescription = document.querySelector('.idea-description-list');

const ideaPhone = document.querySelector('.idea-phone');


ideaImg.setAttribute("src", idea.imgSrc);
ideaImg.setAttribute("alt", idea.name);

ideaName.textContent = idea.name;
ideaAuthor.textContent = idea.author;
ideaPrice.textContent = idea.price > 0 ? idea.price + " грн." : "Безкоштовно";

idea.description.forEach(element => {
    const li = document.createElement('li');
    li.classList.add("idea-description-item");
    li.textContent = element;
    ideaDescription.append(li);
});

ideaPhone.textContent = idea.phone;