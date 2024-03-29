const messageAuthorization = document.getElementById("message-authorization");
const form = document.querySelector(".authorization");
const passwordLink = document.querySelector('.password-link');

const loginEnter = document.getElementById("login");
const passwordEnter = document.getElementById("password");

// Модальне вікно
const messageModal = document.getElementById("message-modal");
const messageCloseButton = document.getElementById("message-close-button");
const messageTitle = document.getElementById('message-title');

messageCloseButton.addEventListener("click", function () {
    messageModal.style.display = "none";
    form.submit(); // Відправляємо форму
    authorizationModal.submit();
});

// Модальне вікно для відновлення паролю
const authorizationModal = document.getElementById('authorization-modal');
const authorizationCloseButton = document.getElementById("authorization-close-button");
const modalFormSubmit = document.querySelector(".modal-form");
const modalPassword = document.getElementById("modal-password");
const messageModalPassword = document.getElementById("message-modal-password");

passwordLink.addEventListener("click", function () {
    authorizationModal.style.display = "flex";
});

authorizationCloseButton.addEventListener("click", function () {
    authorizationModal.style.display = "none";
    modalPassword.value = "";
    messageModalPassword.textContent = "";
});

function gaps(event) {
    if (event.target.value.includes(" ")) {
        event.target.value = event.target.value.replace(/\s/g, "");
    }
}

modalFormSubmit.addEventListener("input", gaps);

modalFormSubmit.addEventListener("submit", (event) => {
    event.preventDefault();
    if (modalPassword.value === "Tornado2003") {
        ModalMessage("Ваш пароль оновлено!");
    } else {
        messageModalPassword.textContent = "Пароль неправильний!";
    }
});


///////////////////////////////////////////////////

const userData = localStorage.getItem("user");

form.addEventListener("submit", async function (event) {
    event.preventDefault();
    if (userData) {
        const user = JSON.parse(userData);

        const loginUser = user.email;
        const passwordUser = user.password;

        await change(loginUser, passwordUser);
    } else {
        messageAuthorization.textContent = "Вас немає в системі, зареєструйтеся, будь ласка!";
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

        ModalMessage("Авторизація успішна!");
    } else {
        messageAuthorization.textContent = "Логін або пароль неправильні!";
    }
}

function ModalMessage(title) {
    setTimeout(function () {
        messageTitle.textContent = title;
        authorizationModal.style.display = "none";
        messageModal.style.display = "flex";
    }, 0);

    setTimeout(function () {
        messageModal.style.display = "none";
        form.submit();
        authorizationModal.submit();
    }, 4000);
}