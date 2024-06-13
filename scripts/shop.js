let gifts = [];

const userInSystem = localStorage.getItem("user") || "";

const giftsList = document.querySelector(".gifts-list"); // сам список

// Валідація імпута пошуку
const searchInput = document.querySelector(".search");

function removeSpaces() {
  searchInput.value = searchInput.value.trim().replace(/\s+/g, " ");
}

window.addEventListener("pageshow", function () {
  searchInput.value = "";
});

fetch("./phpDatabase/shopDatabase.php")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    gifts = data;

    //console.log(gifts); // перевірка

    gifts.forEach((element) => {
      const li = document.createElement("li");
      li.classList.add("gifts-list-item");
      li.setAttribute("data-id", element.id);
      li.innerHTML = `<a href="./gift.html"
          ><img
            src=${element.img}
            alt=${element.name}
            class="gift-img"
        />
          <div class="gift-information">
            <h3 class="gift-name">${element.name}</h3>
            <p class="gift-category">${element.category}</p>
            <p class="gift-price">${element.price} грн.</p>
          </div>
        </a>`;
      giftsList.append(li);
    });

    const giftsListItem = document.querySelectorAll(".gifts-list-item"); // список усіх товарів

    giftsList.addEventListener("click", (evt) => {
      const giftsListItem = evt.target.closest(".gifts-list-item");
      const giftId = giftsListItem.getAttribute("data-id");

      const gift = gifts.find((element) => element.id === giftId);

      const giftString = JSON.stringify(gift);
      sessionStorage.setItem("gift", giftString);
    });

    //Кнопки-категорії
    const buttonsList = document.querySelector(".buttons-list");
    buttonsList.addEventListener("click", (evt) => {
      const shopButton = evt.target.closest(".shop-button");
      const categoryButton = shopButton.textContent;
      filterGifts(categoryButton);
    });

    const filterGifts = (filter) => {
      giftsListItem.forEach((gift) => {
        const categoryGift = gift.querySelector(".gift-category").textContent;
        if (filter !== "Усі" && categoryGift !== filter) {
          gift.style.display = "none";
        } else {
          gift.style.display = "flex";
        }
      });
      searchInput.value = "";
    };

    //Пошук товару по назві
    const searchButton = document.querySelector(".search-button");
    searchButton.addEventListener("click", () => {
      searchGift();
    });

    function searchGift() {
      const search = searchInput.value.toLowerCase();
      giftsListItem.forEach((gift) => {
        const giftName = gift
          .querySelector(".gift-name")
          .textContent.toLowerCase();
        if (giftName.includes(search)) {
          gift.style.display = "flex";
        } else {
          gift.style.display = "none";
        }
      });
    }

    //Cортування за ціною
    const sortList = document.querySelector(".sort-list");

    sortList.addEventListener("change", () => {
      sortItems();
    });

    function sortItems() {
      const sortValue = sortList.value;
      const giftsArray = Array.from(giftsListItem);

      function sortByPrice() {
        giftsArray.sort(function (a, b) {
          let priceA = parseInt(
            a.getElementsByClassName("gift-price")[0].innerText
          );
          let priceB = parseInt(
            b.getElementsByClassName("gift-price")[0].innerText
          );
          return priceA - priceB;
        });
      }

      if (sortValue === "cheap") {
        sortByPrice(); // Сортування від дешевих до дорогих
      } else if (sortValue === "expensive") {
        sortByPrice();
        giftsArray.reverse(); // Сортування від дорогих до дешевих
      }

      giftsList.innerHTML = "";
      giftsArray.forEach(function (item) {
        giftsList.appendChild(item);
      });
    }

    //Анкета
    const clickedButton = sessionStorage.getItem("clickedButton");

    if (clickedButton === "true") {
      // Очищення прапорця, що підтверджує перехід через клік на кнопку
      sessionStorage.removeItem("clickedButton");

      const questionnaireString = sessionStorage.getItem("filter");

      let questionnaireFilter = [];

      if (questionnaireString) {
        questionnaireFilter = JSON.parse(questionnaireString);
      }

      //console.log(questionnaireFilter); - перевірка 1

      let categories = [];

      if (questionnaireFilter) {
        if (questionnaireFilter.includes("male")) {
          categories.push("Для чоловіків");
        }
        if (questionnaireFilter.includes("female")) {
          categories.push("Для жінок");
        }
        if (questionnaireFilter.includes("child")) {
          categories.push("Для дітей");
        }
        if (questionnaireFilter.includes("elderly")) {
          categories.push("Для літніх людей");
        }
        if (
          questionnaireFilter.includes("office") ||
          questionnaireFilter.includes("child") ||
          questionnaireFilter.includes("blogging")
        ) {
          categories.push("Канцелярія");
        }
        if (
          questionnaireFilter.includes("technology") ||
          questionnaireFilter.includes("blogging")
        ) {
          categories.push("Техніка");
        }
        if (questionnaireFilter.includes("housekeeping")) {
          categories.push("Товари для дому");
        }
        if (
          questionnaireFilter.includes("christmas") ||
          questionnaireFilter.includes("st-valentine-day") ||
          questionnaireFilter.includes("st-nicholas-day")
        ) {
          categories.push("Свята");
        }
      } else {
        console.log("Користувач просто заходить на другу сторінку");
      }

      // console.log(categories); - перевірка 2

      const filterGiftsQuestionnaire = (categories) => {
        giftsListItem.forEach((gift) => {
          const categoryGift = gift.querySelector(".gift-category").textContent;
          if (categories.includes(categoryGift)) {
            gift.style.display = "flex";
          } else {
            gift.style.display = "none";
          }
        });
        searchInput.value = "";
      };

      filterGiftsQuestionnaire(categories);
    }
  })
  .catch((error) => {
    console.error("There has been a problem with your fetch operation:", error);
  });

// ----------------------------------------------- BASKET --------------------------------------------------------

const basketLink = document.querySelector(".basket-link");

const basketNumber = document.querySelector(".basket-number");

function basketFetch() {
  fetch("./phpDatabase/basketNumberDatabase.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ user: userInSystem }).toString(),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("status code:" + response.status);
      }
      return response.text();
    })
    .then((data) => {
      basketNumber.textContent = data;
    })
    .catch((error) => {
      console.error("error: ", error);
    });
}

if (userInSystem > 0) {
  basketLink.href = "./myAccount.html #basket";
  basketFetch();
} else {
  basketLink.href = "#";
  basketLink.addEventListener("click", () => {
    ModalMessage("Для переходу в кошик авторизуйтеся, будь ласка!");
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
