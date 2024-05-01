const questionnaireLinkButton = document.querySelector(".questionnaire-link");

const user = localStorage.getItem("user");

if (user) {
  questionnaireLinkButton.disabled = false;
} else {
  questionnaireLinkButton.disabled = true;
}

function questionnaireLink() {
  window.location.href = "questionnaire.html";
}