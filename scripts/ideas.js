const ideas = [
    {
        id: 1,
        imgSrc: "./imgs/makaron-idea.jpg",
        name: "Макаруни",
        author: "Julia Divuk",
        price: 180,
        phone: "+380667833456",
        description: ["jhcjsdhjhcjsdhjhcjsdhjhcjsdhjhcjsdhjhcjsdhjhcjsdhjhcjsdhjhcjsdhjhcjsdhjhcjsdhjhcjsdhjhcjsdhjhcjsdhjhcjsdhjhcjsdhjhcjsdhjhcjsdh", "ndsivnsdivjhcjsdhjhcjsdh", "njdvkdsnvkdsfjhcjsdhn", "jvnvjfdnvjfdn", "jhcjhcjsdhjhcjsdhjhcjsdhjhcjsdhjsdh", "ndsivnsdiv", "njdvkdsnvkdsfn", "jvnvjfdnvjfdn"],
    },
    {
        id: 2,
        imgSrc: "./imgs/candles-idea.jpg",
        name: "Свічки",
        author: "Anna Ravna",
        price: 100,
        phone: "+380667833456",
        description: ["jhcjsdh", "ndsivnsdiv", "njdvkdsnvkdsfn", "jvnvjfdnvjfdn"],
    },
    {
        id: 3,
        imgSrc: "./imgs/soap-idea.jpg",
        name: "Мило",
        author: "Maria Naum",
        price: 0,
        phone: "+380667833456",
        description: ["jhcjsdh", "ndsivnsdiv", "njdvkdsnvkdsfn", "jvnvjfdnvjfdn", "jhcjsdh", "ndsivnsdiv", "njdvkdsnvkdsfn", "jvnvjfdnvjfdn", "jhcjsdh", "ndsivnsdiv", "njdvkdsnvkdsfn", "jvnvjfdnvjfdn"],
    },
    {
        id: 4,
        imgSrc: "./imgs/toys-idea.jpg",
        name: "М'які іграшки",
        author: "Tetiana Hnativ",
        price: 200,
        phone: "+380503388467",
        description: ["jhcjsdh", "ndsivnsdiv", "njdvkdsnvkdsfn", "jvnvjfdnvjfdn", "jhcjsdh", "ndsivnsdiv"],
    },
    {
        id: 5,
        imgSrc: "./imgs/makaron-idea.jpg",
        name: "Макаруни",
        author: "Julia Divuk",
        price: 0,
        phone: "",
        description: ["jhcjsdh", "ndsivnsdiv", "njdvkdsnvkdsfn", "jvnvjfdnvjfdn", "jhcjsdh"],
    },
    {
        id: 6,
        imgSrc: "./imgs/candles-idea.jpg",
        name: "Свічки",
        author: "Anna Ravna",
        price: 100,
        phone: "+380667833456",
        description: ["jhcjsdh", "ndsivnsdiv", "njdvkdsnvkdsfn"],
    },
    {
        id: 7,
        imgSrc: "./imgs/soap-idea.jpg",
        name: "Мило",
        author: "Maria Naum",
        price: 150,
        phone: "+380503388467",
        description: ["jhcjsdh", "ndsivnsdiv", "njdvkdsnvkdsfn", "jvnvjfdnvjfdn", "jhcjsdh", "ndsivnsdiv", "njdvkdsnvkdsfn", "jvnvjfdnvjfdn"],
    },
    {
        id: 8,
        imgSrc: "./imgs/toys-idea.jpg",
        name: "М'які іграшки",
        author: "Tetiana Hnativ",
        price: 0,
        phone: "",
        description: ["jhcjsdh", "ndsivnsdiv", "njdvkdsnvkdsfn", "jvnvjfdnvjfdn", "jhcjsdh", "ndsivnsdiv", "njdvkdsnvkdsfn", "jvnvjfdnvjfdn"],
    },
]

const ideasList = document.querySelector(".ideas-list");

ideas.forEach(element => {
    const li = document.createElement('li');
    li.classList.add("ideas-list-item");
    li.setAttribute("data-id", element.id);
    li.innerHTML = `<a href="./idea.html"
    ><img
      src=${element.imgSrc}
      alt=${element.name}
      class="idea-img"
  />
  <h3 class="idea-name">${element.name}</h3>
  <p class="idea-author">${element.author}</p>
  <p class="idea-price">${element.price ? element.price + " грн." : "Безкоштовно"} </p></a>`
    ideasList.append(li);
});

const ideasListItem = document.querySelectorAll('.ideas-list-item');

ideasList.addEventListener('click', (evt) => {
    const ideasListItem = evt.target.closest('.ideas-list-item');
    const ideaId = ideasListItem.getAttribute('data-id');

    const idea = ideas.find(element => element.id === Number(ideaId));
    const ideaString = JSON.stringify(idea);
    localStorage.setItem('idea', ideaString);
})

// Валідація імпута пошуку
const searchInput = document.querySelector(".search");

function removeSpaces() {
    searchInput.value = searchInput.value.trim().replace(/\s+/g, ' ');
}

window.addEventListener("pageshow", function () {
    searchInput.value = "";
});

//Пошук товару по назві
const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', () => {
    searchIdea();
})

function searchIdea() {
    const search = searchInput.value.toLowerCase();
    ideasListItem.forEach((idea) => {
        const ideaName = idea.querySelector('.idea-name').textContent.toLowerCase();
        if (ideaName.includes(search)) {
            idea.style.display = "flex";
        } else {
            idea.style.display = "none";
        }
    });
}

//Cортування за ціною
const sortList = document.querySelector(".sort-list");

sortList.addEventListener('change', () => {
    sortItems();
})

function sortItems() {
    const sortValue = sortList.value;
    const ideasArray = Array.from(ideasListItem);

    function sortByPrice() {
        ideasArray.sort(function (a, b) {
            let priceA = parseInt(
                a.getElementsByClassName("idea-price")[0].innerText
            ) ? parseInt(
                a.getElementsByClassName("idea-price")[0].innerText
            ) : 0;
            let priceB = parseInt(
                b.getElementsByClassName("idea-price")[0].innerText
            ) ? parseInt(
                b.getElementsByClassName("idea-price")[0].innerText
            ) : 0;
            return priceA - priceB;
        });
    }

    if (sortValue === "cheap") {
        sortByPrice(); // Сортування від дешевих до дорогих
    } else if (sortValue === "expensive") {
        sortByPrice();
        ideasArray.reverse(); // Зворотнє сортування, оскільки відбувається від дорогих до дешевих
    }

    ideasList.innerHTML = '';
    ideasArray.forEach(function (item) {
        ideasList.appendChild(item);
    });
}

//Модальне вікно
const modalContainer = document.querySelector(".modal-container");

const openModal = () => {
    modalContainer.style.display = "flex";
};

const closeModal = () => {
    modalContainer.style.display = "none";
};

const ideaForm = document.getElementById('idea-form');

let newIdea = {
    id: 100,
    imgSrc: "",
    name: "",
    author: "",
    price: "",
    phone: "",
    description: "",
}

let picture = "";
let name = "";
let author = "";
let price = "";
let phone = "";
let description = "";

ideaForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const id = 100;
    picture = document.getElementById("file-download").files[0];
    name = document.getElementById("name").value;
    author = "Tetiana Hnativ";
    price = document.getElementById("price").value;
    phone = document.getElementById("phone").value;
    description = document.getElementById("description").value;

    newIdea = {
        id: id,
        imgSrc: picture,
        name: name,
        author: author,
        price: price,
        phone: phone,
        description: description,
    }

    localStorage.setItem("newIdea", JSON.stringify(newIdea));

    let addIdea = JSON.parse(localStorage.getItem("newIdea"));

    if (addIdea) {
        if (addIdea.description) {
            addIdea.description = addIdea.description.split("\n");
        }
        ideas.push(addIdea);
    }

    console.log(ideas);
});


