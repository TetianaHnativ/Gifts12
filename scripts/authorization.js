const messageAuthorization = document.getElementById("message-authorization");
const form = document.querySelector(".authorization");
const passwordLink = document.querySelector(".password-link");

const login = document.getElementById("login");
const password = document.getElementById("password");

function gaps(event) {
  if (event.target.value.includes(" ")) {
    event.target.value = event.target.value.replace(/\s/g, "");
  }
}

// Модальне вікно
const messageModal = document.getElementById("message-modal");
const messageCloseButton = document.getElementById("message-close-button");
const messageTitle = document.getElementById("message-title");

messageCloseButton.addEventListener("click", function () {
  messageModal.style.display = "none";
  form.submit();
  authorizationModal.submit();
});

// Модальне вікно для відновлення паролю
passwordLink.addEventListener("click", function () {
  authorizationModal.style.display = "flex";
});

const authorizationModal = document.getElementById("authorization-modal");
const authorizationCloseButton = document.getElementById(
  "authorization-close-button"
);
const modalFormSubmit = document.querySelector(".modal-form");

const modalEmail = document.getElementById("modal-email");
const modalPassword = document.getElementById("modal-password");
const modalPasswordConfirmation = document.getElementById(
  "modal-password-confirmation"
);
const modalNumberConfirmation = document.getElementById(
  "modal-number-confirmation"
);

const messageModalPassword = document.getElementById("message-modal-password");

modalFormSubmit.addEventListener("input", gaps);

modalEmail.addEventListener("blur", function () {
  modalEmail.value = modalEmail.value.trim(); // blur - втрата фокусу елементом
});

modalFormSubmit.addEventListener("submit", (event) => {
  event.preventDefault();
  newPassword();
});

function newPassword() {
  const changePassword = {
    email: modalEmail.value,
    password: modalPassword.value,
    //passwordConfirmation: modalPasswordConfirmation.value,
    //numberConfirmation: modalNumberConfirmation.value,
  };

  // Відправлення даних на сервер
  fetch("./phpDatabase/forgotPasswordDatabase.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(changePassword).toString(), // Кодуємо дані форми
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("status code:" + response.status);
      }
      return response.text();
    })
    .then((data) => {
      if (data.trim() === "email isn't registered") {
        messageModalPassword.textContent = "Електронна пошта неправильна!";
      } else if (data.trim() !== "wrong") {
        messageModalPassword.textContent = "Пароль неправильний!";
        console.log(data.trim());
      } else if (data.trim() === "successful") {
        messageModalPassword.textContent = "";
        ModalMessage("Ваш пароль оновлено!");
      }
    })
    .catch((error) => {
      console.error("error: ", error);
    });
}

authorizationCloseButton.addEventListener("click", function () {
  authorizationModal.style.display = "none";
  modalFormSubmit.reset();
  messageModalPassword.textContent = "";
});

///////////////////////////////////////////////////
form.addEventListener("input", gaps);

window.addEventListener("beforeunload", function () {
  form.reset(); // Очищаємо всі поля форми
});

login.addEventListener("blur", function () {
  login.value = login.value.trim(); // blur - втрата фокусу елементом
});

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  verification();
});

function verification() {
  const user = {
    email: login.value,
    password: password.value,
  };

  // Відправлення даних на сервер
  fetch("./phpDatabase/authorizationDatabase.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(user).toString(), // Кодуємо дані форми
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("status code:" + response.status);
      }
      return response.text();
    })
    .then((data) => {
      if (data.trim() === "user isn't registered") {
        messageAuthorization.textContent =
          "Вас немає в системі, зареєструйтеся, будь ласка!";
      } else if (data.trim() === "blocking") {
        messageAuthorization.textContent = "Ваш обліковий запис заблоковано";
      } else if (data.trim() === "wrong") {
        messageAuthorization.textContent = "Логін або пароль неправильні!";
      } else if (data.trim().split(",")[0] === "login successful") {
        localStorage.setItem("user", data.trim().split(",")[1]);
        messageAuthorization.textContent = "";
        ModalMessage("Авторизація успішна!");
      }
    })
    .catch((error) => {
      console.error("error: ", error);
    });
}

function ModalMessage(title) {
  setTimeout(function () {
    messageTitle.textContent = title;
    authorizationModal.style.display = "none";
    messageModal.style.display = "flex";
  }, 0);

  setTimeout(function () {
    messageModal.style.display = "none";
    form.reset();
    form.submit();
    authorizationModal.submit();
  }, 4000);
}
