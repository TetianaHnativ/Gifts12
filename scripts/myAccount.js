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

  oldPassword.value = "";
  newPassword.value = "";
  passwordConfirmation.value = "";
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

async function myAccountDataBase(server, myData) {
  try {
    const response = await fetch(`./myAccountDatabase/${server}.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(myData).toString(),
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

//-------------------------------------------------------------------------------------------------Модальне вікно message-------------------------------------------------------------------------------------------------
const messageModal = document.getElementById("message-modal");
const messageCloseButton = document.getElementById("message-close-button");
const messageTitle = document.getElementById("message-title");

const message = document.querySelector(".message");

messageCloseButton.addEventListener("click", function () {
  messageModal.style.display = "none";
  window.location.reload();
  dataForm.submit();
});

function ModalMessage(title, modal, titleModal) {
  setTimeout(function () {
    titleModal.textContent = title;
    modal.style.display = "flex";
  }, 0);

  setTimeout(function () {
    modal.style.display = "none";
    window.location.reload();
  }, 4000);
}

function Modal(title, modal, titleModal) {
  titleModal.textContent = title;
  modal.style.display = "flex";
}

//------------------------------------------------------------------------------------------------- delete items ---------------------------------------------------------------------------------------------------------
const deleteModal = document.getElementById("delete-modal");

const deleteTitle = document.getElementById("delete-title");

const deleteCloseButton = document.getElementById("delete-close-button");
const deleteItemButton = document.getElementById("delete-item-button");
const cancelItemButton = document.getElementById("cancel-item-button");

closeModal(deleteCloseButton, deleteModal);
closeModal(cancelItemButton, deleteModal);

function closeModal(button, form) {
  button.addEventListener("click", function () {
    form.style.display = "none";
  });
}

//-------------------------------------------------------------------------------------------------section id="favourites-gifts"-------------------------------------------------------------------------------------------------

let gifts = [];
let basket = [];

async function updateGiftsLists() {
  gifts = await myAccountDataBase("favouritesGiftDataBase", userData);
  basket = await myAccountDataBase("basketGiftsDataBase", userData);

  const favouritesGifts = document.getElementById("favourites-gifts-list"); // сам список

  if (gifts && gifts.length > 0) {
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

    const favouritesGiftsDelete = document.querySelectorAll(".favourites-gifts-delete");

    favouritesGiftsDelete.forEach(button => {
      button.addEventListener("click", (evt) => {
        const favouritesGiftsItem = evt.target.closest(".favourites-gifts-item");
        let giftId = 0;
        if (favouritesGiftsItem) giftId = favouritesGiftsItem.getAttribute("data-id");
        const gift = gifts.find((element) => element.id === giftId);

        //console.log(gift);

        Modal(`Чи дійсно хочете видалити подарунок "${gift.name}" з улюблених?`, deleteModal, deleteTitle);

        deleteItemButton.addEventListener("click", async function () {
          if (await myAccountDataBase("deleteDatabase", { id: gift.id, name: "favourite gift" }) === "deletion successful") {
            deleteModal.style.display = "none";
            ModalMessage("Подарунок видалено з улюблених!", messageModal, messageTitle);
          }
        })
      });
    });
  }

  //-------------------------------------------------------------------------------------------------section id="basket-gifts"-------------------------------------------------------------------------------------------------
  const basketGifts = document.getElementById("basket-gifts-list"); // сам список

  if (basket && basket.length > 0) {
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

    basketGifts.addEventListener("click", async function (evt) {
      const basketGiftsItem = evt.target.closest(".basket-gifts-item");
      let giftId = 0;
      if (basketGiftsItem) giftId = basketGiftsItem.getAttribute("data-id");
      const gift = basket.find((element) => element.id === giftId);

      const giftString = JSON.stringify(gift);
      sessionStorage.setItem("gift", giftString);
    });

    const basketGiftsDelete = document.querySelectorAll(".basket-delete");

    basketGiftsDelete.forEach(button => {
      button.addEventListener("click", (evt) => {
        const basketGiftsItem = evt.target.closest(".basket-gifts-item");
        let giftId = 0;
        if (basketGiftsItem) giftId = basketGiftsItem.getAttribute("data-id");
        const gift = basket.find((element) => element.id === giftId);

        //console.log(gift);

        Modal(`Чи дійсно хочете видалити подарунок "${gift.name}" з кошика?`, deleteModal, deleteTitle);

        deleteItemButton.addEventListener("click", async function () {
          if (await myAccountDataBase("deleteDatabase", { id: gift.id, name: "basket gift" }) === "deletion successful") {
            deleteModal.style.display = "none";
            ModalMessage("Подарунок видалено з кошика!", messageModal, messageTitle);
          }
        })
      });
    });
  }
}

updateGiftsLists();

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
      const data = await myAccountDataBase("myDataDatabase", userData);
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
      const data = await myAccountDataBase("savePasswordDatabase", userData);
      //console.log(data);
      return data;
    } catch (error) {
      console.error("error:", error);
    }
  }

  async function saveData() {
    try {
      const data = await myAccountDataBase("saveDataDatabase", userData);
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
        ModalMessage("Ваші дані оновлено!", messageModal, messageTitle);
        PasswordFields(true, "");
        oldPassword.value = "";
        newPassword.value = "";
        passwordConfirmation.value = "";
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

//-------------------------------------------------------------------------------------------------section id="my-ideas"-------------------------------------------------------------------------------------------------
let ownIdeas = [];

let ideas = [];

async function updateIdeasLists() {
  ownIdeas = await myAccountDataBase("myIdeasDataBase", userData);
  ideas = await myAccountDataBase("favouritesIdeaDataBase", userData);

  const myIdeas = document.getElementById("my-ideas-list"); // сам список

  if (ownIdeas && ownIdeas.length > 0) {

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
      <p class="idea-author my-idea-author">${element.surname} ${element.username}</p>
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

    const myIdeasDelete = document.querySelectorAll(".my-ideas-delete");

    myIdeasDelete.forEach(button => {
      button.addEventListener("click", (evt) => {
        const myIdeasItem = evt.target.closest(".my-ideas-item");
        let ideaId = 0;
        if (myIdeasItem) ideaId = myIdeasItem.getAttribute("data-id");
        const idea = ownIdeas.find((element) => element.id === ideaId);

        //console.log(idea);

        Modal(`Чи дійсно хочете видалити свою ідею "${idea.name}" усюди?`, deleteModal, deleteTitle);

        deleteItemButton.addEventListener("click", async function () {
          if (await myAccountDataBase("deleteDatabase", { id: idea.id, name: "my idea" }) === "deletion successful") {
            deleteModal.style.display = "none";
            ModalMessage("Вашу ідею видалено!", messageModal, messageTitle);
          }
        })
      });
    });
  }

  //-------------------------------------------------------------------------------------------------section id="favourites-ideas"-------------------------------------------------------------------------------------------------
  const favouritesIdeas = document.getElementById("favourites-ideas-list"); // сам список

  if (ideas && ideas.length > 0) {

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

    const favouritesIdeasDelete = document.querySelectorAll(".favourites-ideas-delete");

    favouritesIdeasDelete.forEach(button => {
      button.addEventListener("click", (evt) => {
        const favouritesIdeasItem = evt.target.closest(".favourites-ideas-item");
        let ideaId = 0;
        if (favouritesIdeasItem) ideaId = favouritesIdeasItem.getAttribute("data-id");
        const idea = ideas.find((element) => element.id === ideaId);

        //console.log(idea);

        Modal(`Чи дійсно хочете видалити ідею "${idea.name}" з улюблених?`, deleteModal, deleteTitle);

        deleteItemButton.addEventListener("click", async function () {
          if (await myAccountDataBase("deleteDatabase", { id: idea.id, name: "favourite idea" }) === "deletion successful") {
            deleteModal.style.display = "none";
            ModalMessage("Ідею видалено з улюблених!", messageModal, messageTitle);
          }
        })
      });
    });
  }
}

updateIdeasLists();