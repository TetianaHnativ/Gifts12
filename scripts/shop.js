const gifts = [{
    id: 1,
    imgSrc: "./imgs/bear-toy-img.jpg",
    name: "Плюшевий ведмедик",
    category: "Для дітей",
    price: "500 грн.",
    number: 10,
}, {
    id: 2,
    imgSrc: "./imgs/cup-home.jpg",
    name: "Чашка з блюдцем",
    category: "Товари для дому",
    price: "400 грн.",
    number: 20,
}, {
    id: 3,
    imgSrc: "./imgs/car-toy-img.jpg",
    name: "Іграшкова машинка",
    category: "Для дітей",
    price: "250 грн.",
    number: 30,
}, {
    id: 4,
    imgSrc: "./imgs/notebook3-office-img.jpg",
    name: "Блокнот і фломастери",
    category: "Канцелярія",
    price: "230 грн.",
    number: 40,
}, {
    id: 5,
    imgSrc: "./imgs/cube-toy-img.jpg",
    name: "Кубик Рубіка",
    category: "Для дітей",
    price: "200 грн.",
    number: 50,
}, {
    id: 6,
    imgSrc: "./imgs/perfume-woman-img.jpg",
    name: "Парфуми",
    category: "Для жінок",
    price: "3000 грн.",
    number: 60,
}, {
    id: 7,
    imgSrc: "./imgs/doll-toy-img.jpg",
    name: "Плюшева лялька",
    category: "Для дітей",
    price: "450 грн.",
    number: 0,
}, {
    id: 8,
    imgSrc: "./imgs/mascara-woman-img.jpg",
    name: "Туш для вій",
    category: "Для жінок",
    price: "280 грн.",
    number: 80,
}, {
    id: 9,
    imgSrc: "./imgs/cologne-man.jpg",
    name: "Одеколон",
    category: "Для чоловіків",
    price: "2500 грн.",
    number: 90,
}, {
    id: 10,
    imgSrc: "./imgs/Christmas-holidays-img.jpg",
    name: "Ялинкові прикраси",
    category: "Свята",
    price: "120 грн.",
    number: 100,
}, {
    id: 11,
    imgSrc: "./imgs/watch-man-img.jpg",
    name: "Чоловічий годинник",
    category: "Для чоловіків",
    price: "3000 грн.",
    number: 110,
}, {
    id: 12,
    imgSrc: "./imgs/eyeshadow-woman-img.jpg",
    name: "Тіні для очей",
    category: "Для жінок",
    price: "150 грн.",
    number: 120,
}, {
    id: 13,
    imgSrc: "./imgs/glasses-old.jpg",
    name: "Окуляри",
    category: "Для літніх людей",
    price: "2000 грн.",
    number: 0,
}, {
    id: 14,
    imgSrc: "./imgs/pendant-jewellery-img.jpg",
    name: "Кольє з підвіскою - зіркою",
    category: "Для жінок",
    price: "2000 грн.",
    number: 140,
}, {
    id: 15,
    imgSrc: "./imgs/threads-old.jpg",
    name: "Набір для в'язання",
    category: "Для літніх людей",
    price: "370 грн.",
    number: 150,
}, {
    id: 16,
    imgSrc: "./imgs/notebook2-office-img.jpg",
    name: "Канцелярський набір",
    category: "Канцелярія",
    price: "280 грн.",
    number: 160,
}, {
    id: 17,
    imgSrc: "./imgs/Christmas-holidays2-img.jpg",
    name: "Набір ялинкових прикрас",
    category: "Свята",
    price: "300 грн.",
    number: 170,
}, {
    id: 18,
    imgSrc: "./imgs/headphone2-technology-img.jpg",
    name: "Бездротові навушники",
    category: "Техніка",
    price: "1200 грн.",
    number: 180,
}, {
    id: 19,
    imgSrc: "./imgs/pencils-office-img.jpg",
    name: "Олівці",
    category: "Канцелярія",
    price: "100 грн.",
    number: 190,
}, {
    id: 20,
    imgSrc: "./imgs/Christmas-balloon-img.jpg",
    name: "Снігова кулька",
    category: "Свята",
    price: "380 грн.",
    number: 200,
}, {
    id: 21,
    imgSrc: "./imgs/camera-technology-img.jpg",
    name: "Фотоапарат",
    category: "Техніка",
    price: "1200 грн.",
    number: 210,
}, {
    id: 22,
    imgSrc: "./imgs/earrings-jewellery-img.jpg",
    name: "Сережки підвіски-перлинки",
    category: "Для жінок",
    price: "1500 грн.",
    number: 220,
}, {
    id: 23,
    imgSrc: "./imgs/Christmas-angel-img.jpg",
    name: "Різдвяний янгол",
    category: "Свята",
    price: "120 грн.",
    number: 230,
}, {
    id: 24,
    imgSrc: "./imgs/headphone-technology-img.jpg",
    name: "Навушники",
    category: "Техніка",
    price: "850 грн.",
    number: 240,
}, {
    id: 25,
    imgSrc: "./imgs/pan-home.jpg",
    name: "Каструля",
    category: "Товари для дому",
    price: "400 грн.",
    number: 250,
}, {
    id: 26,
    imgSrc: "./imgs/house-toy-img.jpg",
    name: "Ляльковий будиночок",
    category: "Для дітей",
    price: "800 грн.",
    number: 260,
}, {
    id: 27,
    imgSrc: "./imgs/powder-woman-img.jpg",
    name: "Пудра",
    category: "Для жінок",
    price: "300 грн.",
    number: 270,
}, {
    id: 28,
    imgSrc: "./imgs/tower-home.jpg",
    name: "Набір рушників",
    category: "Товари для дому",
    price: "250 грн.",
    number: 0,
}, {
    id: 29,
    imgSrc: "./imgs/notebook-office-img.jpg",
    name: "Записник з олівцем та калькулятором",
    category: "Канцелярія",
    price: "300 грн.",
    number: 290,
},]

const giftsList = document.querySelector(".gifts-list");

gifts.forEach(element => {
    const li = document.createElement('li');
    li.classList.add("gifts-list-item");
    li.setAttribute("data-id", element.id);
    li.innerHTML = `<a href="./gift.html"
    ><img
      src=${element.imgSrc}
      alt=${element.name}
      class="gift-img"
  />
  <h3 class="gift-name">${element.name}</h3>
  <p class="gift-category">${element.category}</p>
  <p class="gift-price">${element.price}</p></a>`
    giftsList.append(li);
});

const giftsListItem = document.querySelectorAll('.gifts-list-item');

giftsList.addEventListener('click', (evt) => {
    const giftsListItem = evt.target.closest('.gifts-list-item');
    const giftId = giftsListItem.getAttribute('data-id');

    /*const giftImg = giftsListItem.querySelector('img');
    const giftImgSrc = giftImg.getAttribute('src');

    const giftName = giftsListItem.querySelector('.gift-name').textContent;
    const giftCategory = giftsListItem.querySelector('.gift-category').textContent;
    const giftPrice = giftsListItem.querySelector('.gift-price').textContent;*/

    const gift = gifts.find(element => element.id === Number(giftId));
    const giftString = JSON.stringify(gift);
    localStorage.setItem('gift', giftString);
})