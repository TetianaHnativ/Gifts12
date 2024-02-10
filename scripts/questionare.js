//Додати user, id можна зробити автоматичним в БД

const questionnaireButton = document.querySelector('.questionnaire-button');
const questionnaire = {}
const filter = [];

questionnaireButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    radioButton('receiver');
    radioButton('age');
    radioButton('occasion');
    radioButton('interests');

    const questionnaireString = JSON.stringify(questionnaire);
    localStorage.setItem('questionnaire', questionnaireString);

    const filterString = JSON.stringify(filter);
    localStorage.setItem('filter', filterString);

    // Збереження прапорця, що підтверджує перехід через клік на кнопку
    sessionStorage.setItem('clickedButton', 'true');
    // Перенаправлення на другу сторінку
    window.location.href = './shop.html';
});


function radioButton(buttonName) {
    // Отримуємо всі елементи з типом input та типом "radio" з вказаним іменем
    const radioButtons = document.querySelectorAll(`input[type="radio"][name=${buttonName}]`);

    // Шукаємо вибрану радіокнопку
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



