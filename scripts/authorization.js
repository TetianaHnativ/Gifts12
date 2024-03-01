const message = document.querySelector(".message");
const form = document.querySelector(".authorization");
const passwordLink = document.querySelector('.password-link');

const loginEnter = document.getElementById("login");
const passwordEnter = document.getElementById("password");

// Модальне вікно
const messageModal = document.getElementById("message-modal");
const messageCloseButton = document.getElementById("message-close-button");

messageCloseButton.addEventListener("click", function () {
    messageModal.style.display = "none";
    form.submit(); // Відправляємо форму
});

// Модальне вікно для відновлення паролю
const authorizationModal = document.getElementById('authorization-modal');
const authorizationCloseButton = document.getElementById("authorization-close-button");
const modalFormSubmit = document.querySelector(".modal-form-submit");
const modalEmail = document.getElementById("modal-email");

passwordLink.addEventListener("click", function () {
    authorizationModal.style.display = "flex";
});

authorizationCloseButton.addEventListener("click", function () {
    authorizationModal.style.display = "none";
});

function gaps(event) {
    if (event.target.value.includes(" ")) {
        event.target.value = event.target.value.replace(/\s/g, "");
    }
}

function trimEmail(event) {
    event.target.value = event.target.value.trim();
}

modalFormSubmit.addEventListener("input", gaps);

modalEmail.addEventListener("blur", trimEmail); // blur - втрата фокусу елементом


const userData = localStorage.getItem("user");

form.addEventListener("submit", async function (event) {
    event.preventDefault();
    if (userData) {
        const user = JSON.parse(userData);

        const loginUser = user.email;
        const passwordUser = user.password;

        await change(loginUser, passwordUser);
    } else {
        message.textContent = "Вас немає в системі, зареєструйтеся, будь ласка!";
    }
});

async function hashedPassword() {
    const hashedPassword = sha256(passwordEnter.value);
    return hashedPassword;
}

async function change(loginUser, passwordUser) {
    if (loginUser === loginEnter.value && passwordUser === (await hashedPassword())) {

        let userLogIn = {
            login: loginUser,
        };

        localStorage.setItem("userLogin", JSON.stringify(userLogIn));

        setTimeout(function () {
            messageModal.style.display = "flex";
        }, 0);

        setTimeout(function () {
            messageModal.style.display = "none";
            form.submit();
        }, 4000);
    } else {
        message.textContent = "Логін або пароль неправильні!";
    }
}