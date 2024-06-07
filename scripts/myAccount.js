//-------------------------------------------------------------------------------------------------header-------------------------------------------------------------------------------------------------
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

window.addEventListener("beforeunload", function () {
  PasswordFields(true, "")

  form.submit();
});

const userTitle = document.querySelector(".user-title");

//-------------------------------------------------------------------------------------------------data-------------------------------------------------------------------------------------------------
let userData = {
  id: 0,
  username: "",
  surname: "",
  email: "",
  phone: "",
  oldPassword: "",
  newPassword: "",
  passwordConfirmation: "",
};

userData.id = JSON.parse(localStorage.getItem('user'));

async function myAccountDataBase(server) {
  try {
    const response = await fetch(`./myAccountDatabase/${server}.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(userData).toString(),
    });
    if (!response.ok) {
      throw new Error("status code: " + response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("error:", error);
    return error;
  }
}

//-------------------------------------------------------------------------------------------------section id="favourites-gifts"-------------------------------------------------------------------------------------------------

let gifts = [];
let basket = [];

async function updateLists() {
  gifts = await myAccountDataBase("shopDatabase");
  basket = await myAccountDataBase("shopDatabase");
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


  //-------------------------------------------------------------------------------------------------section id="basket-gifts"-------------------------------------------------------------------------------------------------
  const basketGifts = document.getElementById("basket-gifts-list"); // сам список

  basket.forEach((element) => {
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

//updateLists();

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


//-------------------------------------------------------------------------------------------------section id="my-data"-------------------------------------------------------------------------------------------------
const dataForm = document.querySelector(".my-data-form");

const surname = document.getElementById("surname");
const username = document.getElementById("name");
const phone = document.getElementById("phone");
const email = document.getElementById("login");
const oldPassword = document.getElementById("old-password");
const newPassword = document.getElementById("new-password");
const passwordConfirmation = document.getElementById("new-password-confirmation");

const confirmPasswordButton = document.querySelector(".confirm-button");
const submitButton = document.querySelector(".submit-button");

function gaps(event) {
  if (event.target.value.includes(" ")) {
    event.target.value = event.target.value.replace(/\s/g, "");
  }
}

dataForm.addEventListener("input", gaps);

email.addEventListener("blur", function () {
  email.value = email.value.trim(); // blur - втрата фокусу елементом
});

if (userData) {
  async function myData() {
    try {
      const data = await myAccountDataBase("myDataDatabase");
      // console.log(data);
      userTitle.textContent = data[0].surname + " " + data[0].username;

      surname.value = data[0].surname;
      username.value = data[0].username;
      phone.value = data[0].phone;
      email.value = data[0].email;

      userData.surname = data[0].surname;
      userData.username = data[0].username;
      userData.phone = data[0].phone;
      userData.email = data[0].email;
    } catch (error) {
      console.error("error:", error);
    }
  }

  async function myPassword() {
    try {
      const data = await myAccountDataBase("savePasswordDatabase");
      //console.log(data);
      return data;
    } catch (error) {
      console.error("error:", error);
    }
  }

  async function saveData() {
    try {
      const data = await myAccountDataBase("saveDataDatabase");
      //console.log(data);
      return data;
    } catch (error) {
      console.error("error:", error);
    }
  }

  myData();

  confirmPasswordButton.addEventListener("click", async function () {
    if (oldPassword.value) {
      userData.oldPassword = oldPassword.value;
      if (await myPassword() === "password right") {
        PasswordFields(false, "");
      } else {
        PasswordFields(true, "Старий пароль неправильний!");
        newPassword.value = "";
        passwordConfirmation.value = "";
      }
    } else {
      PasswordFields(true, "");
      newPassword.value = "";
      passwordConfirmation.value = "";
    }
  })

  dataForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    if (newPassword.value && passwordConfirmation.value && newPassword.value !== passwordConfirmation.value) {
      message.textContent = "Нові паролі не збігаються!";
    } else {
      message.textContent = "";

      userData.surname = surname.value;
      userData.username = username.value;
      userData.phone = phone.value;
      userData.email = email.value;
      userData.newPassword = newPassword.value;

      if (await saveData() === "success") {
        ModalMessage("Ваші дані оновлено!");
      }
    }

  })
}

function PasswordFields(value, mess) {
  message.textContent = mess;

  newPassword.disabled = value;
  passwordConfirmation.disabled = value;

  newPassword.required = !value;
  passwordConfirmation.required = !value;
  newPassword.required = !value;
  passwordConfirmation.required = !value;
}

//-------------------------------------------------------------------------------------------------Модальне вікно-------------------------------------------------------------------------------------------------
const messageModal = document.getElementById("message-modal");
const messageCloseButton = document.getElementById("message-close-button");
const messageTitle = document.getElementById("message-title");

const message = document.querySelector(".message");

messageCloseButton.addEventListener("click", function () {
  messageModal.style.display = "none";
  dataForm.submit();
});

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

//-------------------------------------------------------------------------------------------------section id="my-ideas"-------------------------------------------------------------------------------------------------
const myIdeas = document.getElementById("my-ideas-list"); // сам список

ownIdeas.forEach((element) => {
  const li = document.createElement("li");
  li.classList.add("my-ideas-item");
  li.setAttribute("data-id", element.id);
  li.innerHTML = `
  <button class="delete-button my-ideas-delete">x</button>
  <button class="edit-button my-ideas-edit"><i class="fas fa-pen"></i></button>
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


//-------------------------------------------------------------------------------------------------section id="favourites-ideas"-------------------------------------------------------------------------------------------------
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
