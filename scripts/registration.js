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
  form.submit(); // Відправляємо форму
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

form.addEventListener("submit", function (event) {
  try {
    event.preventDefault(); // Зупиняємо відправку форми
    if (password.value !== passwordConfirmation.value) {
      message.textContent = "Паролі не збігаються!";
    } else {
      message.textContent = "";

      saveUserData();

      setTimeout(function () {
        messageModal.style.display = "flex";
      }, 0);

      setTimeout(function () {
        messageModal.style.display = "none";
        form.submit(); // Відправляємо форму
      }, 4000);
    }
  } catch (error) {
    console.error(error);
  }
});

async function hashPassword(password) {
  // Створюємо екземпляр алгоритму хешування SHA-256
  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(password)
  );

  // Конвертуємо отриманий буфер у шістнадцятковий рядок
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashedPassword = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  return hashedPassword;
}

async function saveUserData() {
  const hashedPassword = await hashPassword(password.value);

  let userData = {
    surname: surname.value,
    name: name.value,
    phone: phone.value,
    email: email.value,
    password: hashedPassword,
  };

  localStorage.setItem("user", JSON.stringify(userData));
}
