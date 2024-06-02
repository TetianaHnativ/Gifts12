//header
const menu = document.getElementById("menu");
const header = document.querySelector("header");
menu.addEventListener("click", (evt) => {
  evt.target.classList.toggle("fa-times");
  header.classList.toggle("toggle");
});

window.addEventListener("scroll", () => {
  menu.classList.remove("fa-times");
  header.classList.remove("toggle");
});

//data

let gifts = JSON.parse(localStorage.getItem('basket')) || [];
let shop = JSON.parse(localStorage.getItem('favouritesGifts')) || [];

async function myAccountDataBase(server, selectedList) {
  try {
    const response = await fetch(`./phpDatabase/${server}.php`);
    if (!response.ok) {
      throw new Error("status code: " + response.status);
    }
    const data = await response.json();
    return data.filter(obj => selectedList.includes(obj.id));
  } catch (error) {
    console.error("error:", error);
    return [];
  }
}

async function updateLists() {
  gifts = await myAccountDataBase("shopDatabase", gifts);
  shop = await myAccountDataBase("shopDatabase", shop);
  //section id="favourites-gifts"
  const favouritesGifts = document.getElementById("favourites-gifts-list"); // сам список

  gifts.forEach((element) => {
    const li = document.createElement("li");
    li.classList.add("favourites-gifts-item");
    li.setAttribute("data-id", element.id);
    li.innerHTML = `
  <button class="delete-button favourites-gifts-delete">x</button>
  <a class="gift-link" href="./gift.html"
      ><img
        src=${element.img}
        alt=${element.name}
        class="gift-img"
    />
      <div class="gift-information">
        <h3 class="gift-name favourites-gift-name">${element.name}</h3>
        <p class="gift-category favourites-gift-category">${element.category}</p>
        <p class="gift-price favourites-gift-price">${element.price} грн.</p>
      </div>
    </a>`;
    favouritesGifts.append(li);
  });

  const favouritesGiftsItem = document.querySelectorAll(".favourites-gifts-item"); // список усіх товарів

  favouritesGifts.addEventListener("click", (evt) => {
    const favouritesGiftsItem = evt.target.closest(".favourites-gifts-item");
    let giftId = 0;
    if (favouritesGiftsItem) giftId = favouritesGiftsItem.getAttribute("data-id");
    const gift = gifts.find((element) => element.id === giftId);
    const giftString = JSON.stringify(gift);
    sessionStorage.setItem("gift", giftString);
  });


  //section id="basket-gifts"
  const basketGifts = document.getElementById("basket-gifts-list"); // сам список

  shop.forEach((element) => {
    const li = document.createElement("li");
    li.classList.add("basket-gifts-item");
    li.setAttribute("data-id", element.id);
    li.innerHTML = `
  <button class="delete-button basket-delete">x</button>
  <a class="gift-link" href="./gift.html"
      ><img
        src=${element.img}
        alt=${element.name}
        class="gift-img"
    />
      <div class="gift-information">
        <h3 class="gift-name basket-name">${element.name}</h3>
        <p class="gift-category basket-category">${element.category}</p>
        <p class="gift-price basket-price">${element.price} грн.</p>
      </div>
    </a>`;
    basketGifts.append(li);
  });

  const basketGiftsItem = document.querySelectorAll(".basket-gifts-item"); // список усіх товарів

  basketGifts.addEventListener("click", (evt) => {
    const basketGiftsItem = evt.target.closest(".basket-gifts-item");
    let giftId = 0;
    if (basketGiftsItem) giftId = basketGiftsItem.getAttribute("data-id");
    const gift = shop.find((element) => element.id === giftId);
    const giftString = JSON.stringify(gift);
    sessionStorage.setItem("gift", giftString);
  });
}

updateLists();

const ideas = [
  {
    id: 1,
    imgSrc: "./imgs/makaron-idea.jpg",
    name: "Макаруни",
    author: "Julia Divuk",
    price: 180,
    phone: "+380667833456",
    description: [
      "jhcjsdhjhcjsdhjhcjsdhjhcjsdhjhcjsdhjhcjsdhjhcjsdhjhcjsdhjhcjsdhjhcjsdhjhcjsdhjhcjsdhjhcjsdhjhcjsdhjhcjsdhjhcjsdhjhcjsdhjhcjsdh",
      "ndsivnsdivjhcjsdhjhcjsdh",
      "njdvkdsnvkdsfjhcjsdhn",
      "jvnvjfdnvjfdn",
      "jhcjhcjsdhjhcjsdhjhcjsdhjhcjsdhjsdh",
      "ndsivnsdiv",
      "njdvkdsnvkdsfn",
      "jvnvjfdnvjfdn",
    ],
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
    description: [
      "jhcjsdh",
      "ndsivnsdiv",
      "njdvkdsnvkdsfn",
      "jvnvjfdnvjfdn",
      "jhcjsdh",
      "ndsivnsdiv",
      "njdvkdsnvkdsfn",
      "jvnvjfdnvjfdn",
      "jhcjsdh",
      "ndsivnsdiv",
      "njdvkdsnvkdsfn",
      "jvnvjfdnvjfdn",
    ],
  },
  {
    id: 4,
    imgSrc: "./imgs/toys-idea.jpg",
    name: "М'які іграшки",
    author: "Tetiana Hnativ",
    price: 200,
    phone: "+380503388467",
    description: [
      "jhcjsdh",
      "ndsivnsdiv",
      "njdvkdsnvkdsfn",
      "jvnvjfdnvjfdn",
      "jhcjsdh",
      "ndsivnsdiv",
    ],
  },
  {
    id: 5,
    imgSrc: "./imgs/makaron-idea.jpg",
    name: "Макаруни",
    author: "Julia Divuk",
    price: 0,
    phone: "",
    description: [
      "jhcjsdh",
      "ndsivnsdiv",
      "njdvkdsnvkdsfn",
      "jvnvjfdnvjfdn",
      "jhcjsdh",
    ],
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
    description: [
      "jhcjsdh",
      "ndsivnsdiv",
      "njdvkdsnvkdsfn",
      "jvnvjfdnvjfdn",
      "jhcjsdh",
      "ndsivnsdiv",
      "njdvkdsnvkdsfn",
      "jvnvjfdnvjfdn",
    ],
  },
  {
    id: 8,
    imgSrc: "./imgs/toys-idea.jpg",
    name: "М'які іграшки",
    author: "Tetiana Hnativ",
    price: 0,
    phone: "",
    description: [
      "jhcjsdh",
      "ndsivnsdiv",
      "njdvkdsnvkdsfn",
      "jvnvjfdnvjfdn",
      "jhcjsdh",
      "ndsivnsdiv",
      "njdvkdsnvkdsfn",
      "jvnvjfdnvjfdn",
    ],
  },
];

const ownIdeas = [
  {
    id: 4,
    imgSrc: "./imgs/toys-idea.jpg",
    name: "М'які іграшки",
    author: "Tetiana Hnativ",
    price: 200,
    phone: "+380503388467",
    description: [
      "jhcjsdh",
      "ndsivnsdiv",
      "njdvkdsnvkdsfn",
      "jvnvjfdnvjfdn",
      "jhcjsdh",
      "ndsivnsdiv",
    ],
  },
  {
    id: 8,
    imgSrc: "./imgs/toys-idea.jpg",
    name: "М'які іграшки",
    author: "Tetiana Hnativ",
    price: 0,
    phone: "",
    description: [
      "jhcjsdh",
      "ndsivnsdiv",
      "njdvkdsnvkdsfn",
      "jvnvjfdnvjfdn",
      "jhcjsdh",
      "ndsivnsdiv",
      "njdvkdsnvkdsfn",
      "jvnvjfdnvjfdn",
    ],
  },
];


//section id="my-data"
const dataForm = document.querySelector(".my-data-form");

const surname = document.getElementById("surname");
const name = document.getElementById("name");
const phone = document.getElementById("phone");
const email = document.getElementById("login");
const oldPassword = document.getElementById("old-password");
const newPassword = document.getElementById("new-password");

const confirmPasswordButton = document.querySelector(".confirm-button");

function gaps(event) {
  if (event.target.value.includes(" ")) {
    event.target.value = event.target.value.replace(/\s/g, "");
  }
}

dataForm.addEventListener("input", gaps);

email.addEventListener("blur", function () {
  email.value = email.value.trim(); // blur - втрата фокусу елементом
});

let userData = JSON.parse(localStorage.getItem("user"));

if (userData) {
  surname.value = userData.surname;
  name.value = userData.name;
  phone.value = userData.phone;
  email.value = userData.email;
}


// Модальне вікно
const messageModal = document.getElementById("message-modal");
const messageCloseButton = document.getElementById("message-close-button");
const messageTitle = document.getElementById("message-title");

const message = document.querySelector(".message");

messageCloseButton.addEventListener("click", function () {
  messageModal.style.display = "none";
  dataForm.submit(); // Відправляємо форму
});

confirmPasswordButton.addEventListener("click", async function () {
  if (oldPassword.value) {
    try {
      const oldPasswordHash = await hashedPassword(oldPassword.value);
      if (oldPasswordHash === userData.password) {
        message.textContent = "";
        newPassword.disabled = false;
      } else {
        message.textContent = "Старий пароль неправильний!";
        newPassword.disabled = true;
        newPassword.value = "";
      }
    } catch (error) {
      console.error("Помилка при обчисленні хешу старого пароля:", error);
    }
  } else {
    newPassword.disabled = true;
    newPassword.value = "";
    message.textContent = "";
  }
  //WebStudio2003
});

dataForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  messageModal.style.display = "flex";
  userData.surname = surname.value;
  userData.name = name.value;
  userData.phone = phone.value;
  userData.email = email.value;
  if (newPassword.value) {
    userData.password = await hashedPassword(newPassword.value);
  }
  localStorage.setItem("user", JSON.stringify(userData));
  newPassword.value = "";
  oldPassword.value = "";
  newPassword.disabled = true;
  ModalMessage("Дані збережено!");
});

async function hashedPassword(value) {
  const hashedPassword = sha256(value);
  return hashedPassword;
}

function ModalMessage(title) {
  setTimeout(function () {
    messageTitle.textContent = title;
    messageModal.style.display = "flex";
  }, 0);

  setTimeout(function () {
    messageModal.style.display = "none";
    dataForm.submit();
  }, 4000);
}


//section id="my-ideas"
const myIdeas = document.getElementById("my-ideas-list"); // сам список

ownIdeas.forEach((element) => {
  const li = document.createElement("li");
  li.classList.add("my-ideas-item");
  li.setAttribute("data-id", element.id);
  li.innerHTML = `
  <button class="delete-button my-ideas-delete">x</button>
  <a class="idea-link" href="./idea.html">
    <img
    src=${element.img}
    alt=${element.name}
    class="idea-img"
    />
    <div class="idea-information">
      <h3 class="idea-name my-idea-name">${element.name}</h3>
      <p class="idea-author my-idea-author">${element.author}</p>
      <p class="idea-price my-idea-price">${element.price ? element.price + " грн." : "Безкоштовно"
    } 
      </p>
    </div>
  </a>`;
  myIdeas.append(li);
});

const myIdeasItem = document.querySelectorAll(".favourites-ideas-item"); // список усіх товарів

myIdeas.addEventListener("click", (evt) => {
  const myIdeasItem = evt.target.closest(".my-ideas-item");
  let ideaId = 0;
  if (myIdeasItem) ideaId = myIdeasItem.getAttribute("data-id");
  const idea = ideas.find((element) => element.id === ideaId);
  const ideaString = JSON.stringify(idea);
  sessionStorage.setItem("idea", ideaString);
});


//section id="favourites-ideas"
const favouritesIdeas = document.getElementById("favourites-ideas-list"); // сам список

ideas.forEach((element) => {
  const li = document.createElement("li");
  li.classList.add("favourites-ideas-item");
  li.setAttribute("data-id", element.id);
  li.innerHTML = `
  <button class="delete-button favourites-ideas-delete">x</button>
  <a class="idea-link" href="./idea.html">
    <img
    src=${element.img}
    alt=${element.name}
    class="idea-img"
    />
    <div class="idea-information">
      <h3 class="idea-name favourites-idea-name">${element.name}</h3>
      <p class="idea-author favourites-idea-author">${element.author}</p>
      <p class="idea-price favourites-idea-price">${element.price ? element.price + " грн." : "Безкоштовно"
    } 
      </p>
    </div>
  </a>`;
  favouritesIdeas.append(li);
});

const favouritesIdeasItem = document.querySelectorAll(".favourites-ideas-item"); // список усіх товарів

favouritesIdeas.addEventListener("click", (evt) => {
  const favouritesIdeasItem = evt.target.closest(".favourites-ideas-item");
  let ideaId = 0;
  if (favouritesIdeasItem) ideaId = favouritesIdeasItem.getAttribute("data-id");
  const idea = ideas.find((element) => element.id === ideaId);
  const ideaString = JSON.stringify(idea);
  sessionStorage.setItem("idea", ideaString);
});
