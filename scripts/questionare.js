let user = 0;

user = parseInt(localStorage.getItem("user"));

const questionnaireButton = document.querySelector(".questionnaire-button");

let questionnaire = {};

const filter = [];

questionnaireButton.addEventListener("click", (evt) => {
  evt.preventDefault();

  questionnaire = {
    user: user,
  };

  radioButton("receiver");
  radioButton("age");
  radioButton("occasion");
  radioButton("interests");

  // Відправлення даних на сервер
  fetch("./phpDatabase/questionnaireDatabase.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded", 
    },
    body: new URLSearchParams(questionnaire).toString(),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text(); 
    })
    .then((data) => {
      console.log(data); 
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation: ",
        error
      );
    });

  const filterString = JSON.stringify(filter);
  sessionStorage.setItem("filter", filterString);

  // Збереження прапорця, що підтверджує перехід через клік на кнопку
  sessionStorage.setItem("clickedButton", "true");

  window.location.href = "./shop.html";
});

function radioButton(buttonName) {
  const radioButtons = document.querySelectorAll(
    `input[type="radio"][name=${buttonName}]`
  );

  let selectedRadioButton;

  radioButtons.forEach((radioButton) => {
    if (radioButton.checked) {
      selectedRadioButton = radioButton;
    }
  });

  const selectedValue = selectedRadioButton.value;
  const selectedText = selectedRadioButton.nextSibling.textContent.trim();

  switch (buttonName) {
    case "receiver":
      filter[0] = selectedValue;
      break;
    case "age":
      filter[1] = selectedValue;
      break;
    case "occasion":
      filter[2] = selectedValue;
      break;
    case "interests":
      filter[3] = selectedValue;
      break;
    default:
      console.log("Жодна радіокнопка не вибрана");
      break;
  }

  questionnaire[buttonName] = selectedText;
}
