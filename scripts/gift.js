const giftString = sessionStorage.getItem("gift");

let gift = {
  id: 0,
  img: "./imgs/gift-img.jpg",
  name: "Not Found",
  category: "Not Found",
  price: 0,
  number: 0,
};

let user = 0;

user = parseInt(localStorage.getItem("user")) || 0;

if (giftString) {
  gift = JSON.parse(giftString);
}

const giftImg = document.querySelector(".gift-img");

const giftName = document.querySelector(".gift-name");
const giftCategory = document.querySelector(".gift-category");
const giftPrice = document.querySelector(".gift-price");

const giftAvailability = document.querySelector(".gift-availability");

giftImg.setAttribute("src", gift.img);
giftImg.setAttribute("alt", gift.name);

giftName.textContent = gift.name;
giftCategory.textContent = gift.category;
giftPrice.textContent = gift.price + " грн.";

const giftBasket = document.querySelector(".gift-basket");
const giftSelected = document.querySelector(".gift-selected");

const basket = JSON.parse(localStorage.getItem("basket")) || [];
const favourites = JSON.parse(localStorage.getItem("favouritesGifts")) || [];

giftBasket.addEventListener("click", () => {
  if (user !== 0) {
    addToListGift(
      "basketDatabase.php",
      "Подарунок додано до кошика!",
      "кошика"
    );
  } else {
    ModalMessage("Авторизуйтеся, будь ласка!");
  }
});

giftSelected.addEventListener("click", () => {
  if (user !== 0) {
    addToListGift(
      "favouritesGiftDatabase.php",
      "Подарунок додано до списку улюблених!",
      "списку улюблених"
    );
  } else {
    ModalMessage("Авторизуйтеся, будь ласка!");
  }
});

function addToListGift(file, message, messageWord) {
  const favouriteGift = {
    name: "gift",
    gift: gift.id,
    user: user,
  };

  fetch(`./phpDatabase/${file}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(favouriteGift).toString(),
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
        ModalMessage(`Подарунок вже доданий до ${messageWord}!`);
      }
    })
    .catch((error) => {
      console.error("error: ", error);
    });
}

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
