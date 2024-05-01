// Поля для вводу
const surname = document.getElementById("surname");
const name = document.getElementById("name");
const phone = document.getElementById("phone");
const email = document.getElementById("login");
const password = document.getElementById("password");
const passwordConfirmation = document.getElementById("password-confirmation");

// Модальне вікно
const messageModal = document.getElementById("message-modal");
const modalCloseButton = document.querySelector(".modal-close-button");

modalCloseButton.addEventListener("click", function () {
  messageModal.style.display = "none";
  form.submit();
});

//Інші елементи форми
const registerButton = document.querySelector(".registration-button");
const message = document.querySelector(".message");
const form = document.querySelector(".registration");

function gaps(event) {
  if (event.target.value.includes(" ")) {
    event.target.value = event.target.value.replace(/\s/g, "");
  }
}

form.addEventListener("input", gaps);

email.addEventListener("blur", function () {
  email.value = email.value.trim(); // blur - втрата фокусу елементом
});

window.addEventListener("beforeunload", function () {
  form.reset(); // Очищаємо всі поля форми
});

form.addEventListener("submit", function (event) {
  try {
    event.preventDefault(); // Зупиняємо відправку форми
    if (password.value !== passwordConfirmation.value) {
      message.textContent = "Паролі не збігаються!";
    } else {
      message.textContent = "";

      saveUserData();
    }
  } catch (error) {
    console.error(error);
  }
});


async function saveUserData() {
  let userData = {
    surname: surname.value,
    name: name.value,
    phone: phone.value,
    email: email.value,
    password: password,
  };

  // Відправлення даних на сервер
  fetch("./phpDatabase/registrationDatabase.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(userData).toString(), // Кодуємо дані форми
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("status code:" + response.status);
      }
      return response.text();
    })
    .then((data) => {
      if (data.trim() === "email is already registered") {
        message.textContent =
          "Користувач з такою поштою вже зареєстрований у системі";
      } else if (data.trim() === "success") {
        message.textContent = "";

        setTimeout(function () {
          messageModal.style.display = "flex";
        }, 0);

        setTimeout(function () {
          messageModal.style.display = "none";
          form.reset();
          form.submit(); // Відправляємо форму
        }, 4000);
      }
    })
    .catch((error) => {
      console.error("error: ", error);
    });
}
