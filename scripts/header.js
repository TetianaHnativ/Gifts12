const loginLink = document.querySelector(".login-link");

let myUser = 0;

myUser = parseInt(localStorage.getItem("user")) || 0;

if (myUser) {
    loginLink.textContent = "Profile";
    loginLink.href = "myAccount.html";
} else {
    loginLink.textContent = "Login";
    loginLink.href = "authorization.html";
}
