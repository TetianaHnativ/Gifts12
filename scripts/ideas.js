const ideas = [
    {
        id: 1,
        imgSrc: "./imgs/makaron-idea.jpg",
        name: "Макаруни",
        author: "Julia Divuk",
        price: 180,
        phone: "+380667833456",
        description: `1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quisquam ipsam officiis nemo
        2. nesciunt quaerat, nam mollitia voluptatibus corrupti dolorem, doloribus reiciendis ea
        consequuntur
        3. at! Consequatur tempore ipsum ullam veniam.Lorem ipsum dolor sit amet consectetur adipisicing
        elit.
        4. Laborum quisquam ipsam officiis nemo
        5. nesciunt quaerat, nam mollitia voluptatibus corrupti dolorem, doloribus reiciendis ea
        consequuntur
        6. at! Consequatur tempore ipsum ullam veniam.Lorem ipsum dolor sit amet consectetur adipisicing
        elit. 
        7. Laborum quisquam ipsam officiis nemo
        8. nesciunt quaerat, nam mollitia voluptatibus corrupti dolorem, doloribus reiciendis ea
        consequuntur 
        9. at! Consequatur tempore ipsum ullam veniam.`,
    },
    {
        id: 2,
        imgSrc: "./imgs/candles-idea.jpg",
        name: "Свічки",
        author: "Anna Ravna",
        price: 100,
        phone: "+380667833456",
        description: `1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quisquam ipsam officiis nemo
        2. nesciunt quaerat, nam mollitia voluptatibus corrupti dolorem, doloribus reiciendis ea
        consequuntur
        3. at! Consequatur tempore ipsum ullam veniam.Lorem ipsum dolor sit amet consectetur adipisicing
        elit.`,
    },
    {
        id: 3,
        imgSrc: "./imgs/soap-idea.jpg",
        name: "Мило",
        author: "Maria Naum",
        price: 0,
        phone: "+380667833456",
        description: `1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quisquam ipsam officiis nemo
        2. nesciunt quaerat, nam mollitia voluptatibus corrupti dolorem, doloribus reiciendis ea
        consequuntur`,
    },
    {
        id: 4,
        imgSrc: "./imgs/toys-idea.jpg",
        name: "М'які іграшки",
        author: "Tetiana Hnativ",
        price: 200,
        phone: "+380503388467",
        description: `1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quisquam ipsam officiis nemo
        2. nesciunt quaerat, nam mollitia voluptatibus corrupti dolorem, doloribus reiciendis ea
        consequuntur
        3. at! Consequatur tempore ipsum ullam veniam.Lorem ipsum dolor sit amet consectetur adipisicing
        elit.
        4. Laborum quisquam ipsam officiis nemo
        5. nesciunt quaerat, nam mollitia voluptatibus corrupti dolorem, doloribus reiciendis ea
        consequuntur`,
    },
    {
        id: 5,
        imgSrc: "./imgs/makaron-idea.jpg",
        name: "Макаруни",
        author: "Julia Divuk",
        price: 0,
        phone: "",
        description: `1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quisquam ipsam officiis nemo
        2. nesciunt quaerat, nam mollitia voluptatibus corrupti dolorem, doloribus reiciendis ea
        consequuntur
        3. at! Consequatur tempore ipsum ullam veniam.Lorem ipsum dolor sit amet consectetur adipisicing
        elit.
        4. Laborum quisquam ipsam officiis nemo
        5. nesciunt quaerat, nam mollitia voluptatibus corrupti dolorem, doloribus reiciendis ea
        consequuntur
        6. at! Consequatur tempore ipsum ullam veniam.Lorem ipsum dolor sit amet consectetur adipisicing
        elit. 
        7. Laborum quisquam ipsam officiis nemo
        8. nesciunt quaerat, nam mollitia voluptatibus corrupti dolorem, doloribus reiciendis ea
        consequuntur 
        9. at! Consequatur tempore ipsum ullam veniam.`,
    },
    {
        id: 6,
        imgSrc: "./imgs/candles-idea.jpg",
        name: "Свічки",
        author: "Anna Ravna",
        price: 100,
        phone: "+380667833456",
        description: `1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quisquam ipsam officiis nemo
        2. nesciunt quaerat, nam mollitia voluptatibus corrupti dolorem, doloribus reiciendis ea
        consequuntur
        3. at! Consequatur tempore ipsum ullam veniam.Lorem ipsum dolor sit amet consectetur adipisicing
        elit.
        4. Laborum quisquam ipsam officiis nemo`,
    },
    {
        id: 7,
        imgSrc: "./imgs/soap-idea.jpg",
        name: "Мило",
        author: "Maria Naum",
        price: 150,
        phone: "+380503388467",
        description: `1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quisquam ipsam officiis nemo
        2. nesciunt quaerat, nam mollitia voluptatibus corrupti dolorem, doloribus reiciendis ea
        consequuntur`,
    },
    {
        id: 8,
        imgSrc: "./imgs/toys-idea.jpg",
        name: "М'які іграшки",
        author: "Tetiana Hnativ",
        price: 0,
        phone: "",
        description: ` 1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quisquam ipsam officiis nemo
        2. nesciunt quaerat, nam mollitia voluptatibus corrupti dolorem, doloribus reiciendis ea
        consequuntur
        3. at! Consequatur tempore ipsum ullam veniam.Lorem ipsum dolor sit amet consectetur adipisicing
        elit.
        4. Laborum quisquam ipsam officiis nemo
        5. nesciunt quaerat, nam mollitia voluptatibus corrupti dolorem, doloribus reiciendis ea
        consequuntur`,
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