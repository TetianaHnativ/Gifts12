import { gaps } from "../scripts/functions.js";

const messageAuthorization = document.getElementById("message-authorization");
const form = document.querySelector(".authorization");
const passwordLink = document.querySelector(".password-link");

const login = document.getElementById("login");
const password = document.getElementById("password");


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
const modalNumberConfirmation = document.getElementById(
  "modal-number-confirmation"
);
const modalPassword = document.getElementById("modal-password");
const modalPasswordConfirmation = document.getElementById(
  "modal-password-confirmation"
);

const buttonModalSend = document.getElementById("button-modal-send");
const buttonModalConfirmation = document.getElementById(
  "button-modal-confirmation"
);
const buttonModalSave = document.getElementById("button-modal-save");

const messageModalPassword = document.getElementById("message-modal-password");

modalFormSubmit.addEventListener("input", gaps);
modalEmail.addEventListener("blur", function () {
  modalEmail.value = modalEmail.value.trim(); // blur - втрата фокусу елементом
});

modalFormSubmit.addEventListener("submit", (event) => {
  event.preventDefault();
  if (event.submitter === buttonModalSend) {
    fetchFunction(sendEmail);
  }
  if (event.submitter === buttonModalConfirmation) {
    fetchFunction(numberChecking);
  }
  if (event.submitter === buttonModalSave) {
    fetchFunction(passwordChecking);
  }
});

authorizationCloseButton.addEventListener("click", function () {
  authorizationModal.style.display = "none";
  modalFormSubmit.reset();
  messageModalPassword.textContent = "";
});

function newPassword() {
  const changePassword = {
    email: modalEmail.value,
    numberConfirmation: modalNumberConfirmation.value,
    password: modalPassword.value,
    passwordConfirmation: modalPasswordConfirmation.value,
    action: "",
  };
  return changePassword;
}

function fetchFunction(myFunction) {
  const formData = newPassword();
  formData.action = myFunction.name;
  fetch("./phpDatabase/forgotPasswordDatabase.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(formData).toString(), // Кодуємо дані форми
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("status code:" + response.status);
      }
      return response.text();
    })
    .then((data) => {
      myFunction(data);
      //console.log(data); - перевірка
    })
    .catch((error) => {
      console.error("error: ", error);
    });
}

function sendEmail(data) {
  if (data.trim() === "wrong email") {
    messageModalPassword.textContent = "Електронна пошта неправильна!";

    modalNumberDisabled(true);
    modalPasswordDisabled(true);
  } else {
    messageModalPassword.textContent = "";
    modalNumberDisabled(false);
  }
}

function numberChecking(data) {
  if (data.trim() === "only email is right") {
    messageModalPassword.textContent = "Неправильне число!";
    modalPasswordDisabled(true);
  } else {
    messageModalPassword.textContent = "";
    modalPasswordDisabled(false);
  }
}

function passwordChecking(data) {
  if (data.trim() === "passwords wrong") {
    messageModalPassword.textContent = "Паролі не збігаються!";
  } else if (data.trim() === "successful") {
    messageModalPassword.textContent = "";
    ModalMessage("Ваш пароль оновлено!");
  }
}

function modalNumberDisabled(value) {
  modalNumberConfirmation.disabled = value;
  buttonModalConfirmation.disabled = value;
  if (value === true) modalNumberConfirmation.value = "";
}

function modalPasswordDisabled(value) {
  modalPassword.disabled = value;
  modalPasswordConfirmation.disabled = value;
  buttonModalSave.disabled = value;
  if (value === true) {
    modalPassword.value = "";
    modalPasswordConfirmation.value = "";
  }
}

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

  fetch("./phpDatabase/authorizationDatabase.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(user).toString(),
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
