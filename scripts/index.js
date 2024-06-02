const questionnaireLinkButton = document.querySelector(".questionnaire-link");

const user = localStorage.getItem("user");

//Модальне вікно-повідомлення
const messageModal = document.getElementById("message-modal");

const messageCloseModal = document.getElementById("close-modal-message");

messageCloseModal.addEventListener(
  "click",
  () => (messageModal.style.display = "none")
);

questionnaireLinkButton.addEventListener("click", () => {
  if (user) {
    questionnaireLink();
  } else {
    showMessage();
  }
});

function questionnaireLink() {
  window.location.href = "questionnaire.html";
}

function showMessage() {
  setTimeout(function () {
    messageModal.style.display = "flex";
  }, 0);

  setTimeout(function () {
    messageModal.style.display = "none";
  }, 4000);
}

