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

const gifts = [
  {
    id: 1,
    imgSrc: "./imgs/bear-toy-img.jpg",
    name: "Плюшевий ведмедик",
    category: "Для дітей",
    price: 500,
    number: 10,
  },
  {
    id: 2,
    imgSrc: "./imgs/cup-home.jpg",
    name: "Чашка з блюдцем",
    category: "Товари для дому",
    price: 400,
    number: 20,
  },
  {
    id: 21,
    imgSrc: "./imgs/camera-technology-img.jpg",
    name: "Фотоапарат",
    category: "Техніка",
    price: 1200,
    number: 210,
  },
  {
    id: 12,
    imgSrc: "./imgs/eyeshadow-woman-img.jpg",
    name: "Тіні для очей",
    category: "Для жінок",
    price: 150,
    number: 120,
  },
  {
    id: 4,
    imgSrc: "./imgs/notebook3-office-img.jpg",
    name: "Блокнот і фломастери",
    category: "Канцелярія",
    price: 230,
    number: 40,
  },
  {
    id: 5,
    imgSrc: "./imgs/cube-toy-img.jpg",
    name: "Кубик Рубіка",
    category: "Для дітей",
    price: 200,
    number: 50,
  },
  {
    id: 6,
    imgSrc: "./imgs/perfume-woman-img.jpg",
    name: "Парфуми",
    category: "Для жінок",
    price: 3000,
    number: 60,
  },
  {
    id: 10,
    imgSrc: "./imgs/Christmas-holidays-img.jpg",
    name: "Ялинкові прикраси",
    category: "Свята",
    price: 120,
    number: 100,
  },
  {
    id: 3,
    imgSrc: "./imgs/car-toy-img.jpg",
    name: "Іграшкова машинка",
    category: "Для дітей",
    price: 250,
    number: 30,
  },
  {
    id: 14,
    imgSrc: "./imgs/pendant-jewellery-img.jpg",
    name: "Срібне кольє з блакитним фіанітом",
    category: "Для жінок",
    price: 2000,
    number: 140,
  },
];

const shop = [
  {
    id: 25,
    imgSrc: "./imgs/pan-home.jpg",
    name: "Каструля",
    category: "Товари для дому",
    price: 400,
    number: 250,
  },
  {
    id: 24,
    imgSrc: "./imgs/headphone-technology-img.jpg",
    name: "Навушники",
    category: "Техніка",
    price: 850,
    number: 240,
  },
  {
    id: 30,
    imgSrc: "./imgs/stikers-office-img.jpg",
    name: "Набір зі стікерів із записничком",
    category: "Канцелярія",
    price: 80,
    number: 290,
  },
  {
    id: 8,
    imgSrc: "./imgs/mascara-woman-img.jpg",
    name: "Туш для вій",
    category: "Для жінок",
    price: 280,
    number: 80,
  },
  {
    id: 7,
    imgSrc: "./imgs/doll-toy-img.jpg",
    name: "Плюшева лялька",
    category: "Для дітей",
    price: 450,
    number: 0,
  },
  {
    id: 19,
    imgSrc: "./imgs/pencils-office-img.jpg",
    name: "Олівці",
    category: "Канцелярія",
    price: 100,
    number: 190,
  },
  {
    id: 22,
    imgSrc: "./imgs/earrings-jewellery-img.jpg",
    name: "Сережки з камінням",
    category: "Для жінок",
    price: 500,
    number: 220,
  },
  {
    id: 26,
    imgSrc: "./imgs/house-toy-img.jpg",
    name: "Ляльковий будиночок",
    category: "Для дітей",
    price: 800,
    number: 260,
  },
  {
    id: 23,
    imgSrc: "./imgs/Christmas-angel-img.jpg",
    name: "Різдвяний янгол",
    category: "Свята",
    price: 120,
    number: 230,
  },
  {
    id: 27,
    imgSrc: "./imgs/powder-woman-img.jpg",
    name: "Пудра",
    category: "Для жінок",
    price: 300,
    number: 270,
  },
  {
    id: 29,
    imgSrc: "./imgs/notebook-office-img.jpg",
    name: "Записник з олівцем та калькулятором",
    category: "Канцелярія",
    price: 300,
    number: 290,
  },
];

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
        src=${element.imgSrc}
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
  const gift = gifts.find((element) => element.id === Number(giftId));
  const giftString = JSON.stringify(gift);
  localStorage.setItem("gift", giftString);
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
        src=${element.imgSrc}
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
  const gift = shop.find((element) => element.id === Number(giftId));
  const giftString = JSON.stringify(gift);
  localStorage.setItem("gift", giftString);
});

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
    src=${element.imgSrc}
    alt=${element.name}
    class="idea-img"
    />
    <div class="idea-information">
      <h3 class="idea-name my-idea-name">${element.name}</h3>
      <p class="idea-author my-idea-author">${element.author}</p>
      <p class="idea-price my-idea-price">${
        element.price ? element.price + " грн." : "Безкоштовно"
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
  const idea = ideas.find((element) => element.id === Number(ideaId));
  const ideaString = JSON.stringify(idea);
  localStorage.setItem("idea", ideaString);
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
    src=${element.imgSrc}
    alt=${element.name}
    class="idea-img"
    />
    <div class="idea-information">
      <h3 class="idea-name favourites-idea-name">${element.name}</h3>
      <p class="idea-author favourites-idea-author">${element.author}</p>
      <p class="idea-price favourites-idea-price">${
        element.price ? element.price + " грн." : "Безкоштовно"
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
  const idea = ideas.find((element) => element.id === Number(ideaId));
  const ideaString = JSON.stringify(idea);
  localStorage.setItem("idea", ideaString);
});
