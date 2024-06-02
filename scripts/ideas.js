let ideas = [];

let user = 0;

user = parseInt(localStorage.getItem("user"));

function gaps(inputElement) {
  if (inputElement.value.includes(" ")) {
    inputElement.value = inputElement.value.replace(/\s/g, "");
  }
}

const ideasList = document.querySelector(".ideas-list");

// Валідація імпута пошуку
const searchInput = document.querySelector(".search");

function removeSpaces(inputElement) {
  inputElement.value = inputElement.value.trim().replace(/\s+/g, " ");
}

window.addEventListener("pageshow", function () {
  searchInput.value = "";
});

fetch("./phpDatabase/ideasDatabase.php")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    ideas = data;

    ideas.forEach((element) => {
      const li = document.createElement("li");
      li.classList.add("ideas-list-item");
      li.setAttribute("data-id", element.id);
      li.innerHTML = `<a href="./idea.html"
    ><img
      src=${element.img}
      alt=${element.name}
      class="idea-img"
  />
  <h3 class="idea-name">${element.name}</h3>
  <p class="idea-author">${element.surname} ${element.username}</p>
  <p class="idea-price">${
    element.price ? element.price + " грн." : "Безкоштовно"
  } </p></a>`;
      ideasList.append(li);
    });

    const ideasListItem = document.querySelectorAll(".ideas-list-item");

    ideasList.addEventListener("click", (evt) => {
      const ideasListItem = evt.target.closest(".ideas-list-item");
      const ideaId = ideasListItem.getAttribute("data-id");

      const idea = ideas.find((element) => element.id === ideaId);
      sessionStorage.setItem("idea", JSON.stringify(idea));
    });

    //Пошук товару по назві
    const searchButton = document.querySelector(".search-button");
    searchButton.addEventListener("click", () => {
      searchIdea();
    });

    function searchIdea() {
      const search = searchInput.value.toLowerCase();
      ideasListItem.forEach((idea) => {
        const ideaName = idea
          .querySelector(".idea-name")
          .textContent.toLowerCase();
        if (ideaName.includes(search)) {
          idea.style.display = "flex";
        } else {
          idea.style.display = "none";
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
      const ideasArray = Array.from(ideasListItem);

      function sortByPrice() {
        ideasArray.sort(function (a, b) {
          let priceA = parseInt(
            a.getElementsByClassName("idea-price")[0].innerText
          )
            ? parseInt(a.getElementsByClassName("idea-price")[0].innerText)
            : 0;
          let priceB = parseInt(
            b.getElementsByClassName("idea-price")[0].innerText
          )
            ? parseInt(b.getElementsByClassName("idea-price")[0].innerText)
            : 0;
          return priceA - priceB;
        });
      }

      if (sortValue === "cheap") {
        sortByPrice(); // Сортування від дешевих до дорогих
      } else if (sortValue === "expensive") {
        sortByPrice();
        ideasArray.reverse(); // Зворотнє сортування, оскільки відбувається від дорогих до дешевих
      }

      ideasList.innerHTML = "";
      ideasArray.forEach(function (item) {
        ideasList.appendChild(item);
      });
    }
  })
  .catch((error) => {
    console.error("There has been a problem with your fetch operation:", error);
  });

//Модальне вікно-повідомлення
const messageModal = document.getElementById("message-modal");

const modalTitleMessage = document.getElementById("modal-title-message");

const messageCloseModal = document.getElementById("close-modal-message");
messageCloseModal.addEventListener("click", () => closeModal(messageModal));

//Модальне вікно додавання ідеї
const addIdeaModal = document.getElementById("add-idea-modal");

const addIdeaButton = document.getElementById("add-idea");
const closeModalIdea = document.getElementById("close-modal-idea");

addIdeaButton.addEventListener("click", () => {
  if (user > 0) {
    openModal(addIdeaModal);
  } else {
    openModal(messageModal);
    modalTitleMessage.textContent =
      "Для додавання ідеї авторизуйтеся в системі!";
  }
});

closeModalIdea.addEventListener("click", () => closeModal(addIdeaModal));

const openModal = (modal) => {
  modal.style.display = "flex";
};

const closeModal = (modal) => {
  modal.style.display = "none";
};

const ideaForm = document.getElementById("idea-form");

let newIdea = {
  img: "",
  name: "",
  author: user,
  price: 0,
  phone: "",
  description: "",
};

let picture = "./imgs/idea-img.jpg";
let name = "";
let price = 0;
let phone = "";
let description = "";

ideaForm.addEventListener("submit", (e) => {
  e.preventDefault();

  picture = document.getElementById("imageUrl").value;
  name = document.getElementById("name").value;
  price = document.getElementById("price").value;
  phone = document.getElementById("phone").value;
  description = document.getElementById("description").value;

  newIdea = {
    img: picture || "./imgs/idea-img.jpg",
    name: name,
    author: user,
    price: parseFloat(price) || 0,
    phone: phone,
    description: description,
  };

  //console.log(newIdea); - перевірка

  fetch("./phpDatabase/addIdeaDatabase.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(newIdea).toString(),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("status code:" + response.status);
      }
      return response.text();
    })
    .then((data) => {
      console.error(data);
      if (data.trim() === "success") {
        addIdeaModal.style.display = "none";
        setTimeout(function () {
          messageModal.style.display = "flex";
          modalTitleMessage.textContent = "Вашу ідею додано!";
        }, 0);

        setTimeout(function () {
          messageModal.style.display = "none";
          ideaForm.reset();
          ideaForm.submit(); // Відправляємо форму
        }, 4000);
      }
    })
    .catch((error) => {
      console.error("error: ", error);
    });
});
