const ideaString = sessionStorage.getItem('idea');

let idea = {
    id: 0,
    imgSrc: "./imgs/idea-img.jpg",
    name: "Not Found",
    author: "Not Found",
    price: 0,
    phone: "",
    description: "Not Found",
};

let user = 0;

user = parseInt(localStorage.getItem("user")) || 0;

if (ideaString) {
    idea = JSON.parse(ideaString);
}


const ideaImg = document.querySelector(".idea-img");

const ideaName = document.querySelector('.idea-name');
const ideaAuthor = document.querySelector('.idea-author');
const ideaPrice = document.querySelector('.idea-price');
const ideaDescription = document.querySelector('.idea-description-list');

const ideaPhone = document.querySelector('.idea-phone');


ideaImg.setAttribute("src", idea.img);
ideaImg.setAttribute("alt", idea.name);

ideaName.textContent = idea.name;
ideaAuthor.textContent = `${idea.surname} ${idea.username}`;
ideaPrice.textContent = idea.price > 0 ? idea.price + " грн." : "Безкоштовно";

const description = idea.description.split("\n");

description.forEach(element => {
    const li = document.createElement('li');
    li.classList.add("idea-description-item");
    li.textContent = element;
    ideaDescription.append(li);
});

ideaPhone.textContent = idea.phone;

const ideaSelectedButton = document.querySelector(".idea-selected");

ideaSelectedButton.addEventListener("click", () => {
    if (user !== 0) {
        addToListGift("favouritesIdeaDatabase.php", "Ідею додано до списку улюблених!");
    } else {
        ModalMessage("Авторизуйтеся, будь ласка!");
    }
});

function addToListGift(file, message) {
    const favouriteIdea = {
        name: "idea",
        idea: idea.id,
        user: user,
    };

    fetch(`./phpDatabase/${file}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(favouriteIdea).toString(),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("status code:" + response.status);
            }
            return response.text();
        })
        .then((data) => {
            if (data.trim() === "added") {
                ModalMessage(message);
            } else if (data.trim() === "already exists") {
                ModalMessage(`Ідею вже додано до списку улюблених!`);
            }
        })
        .catch((error) => {
            console.error("error: ", error);
        });
}

// Модальне вікно
const messageModal = document.getElementById("message-modal");
const messageCloseButton = document.getElementById("message-close-button");
const messageTitle = document.getElementById("message-title");

messageCloseButton.addEventListener("click", function () {
    messageModal.style.display = "none";
});


function ModalMessage(title) {
    setTimeout(function () {
        messageTitle.textContent = title;
        messageModal.style.display = "flex";
    }, 0);

    setTimeout(function () {
        messageModal.style.display = "none";
    }, 4000);
}