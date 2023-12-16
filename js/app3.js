const block = document.getElementById('app3');
const title = document.createElement('h2');
const form = document.createElement('form');
const btn = document.createElement('button');
const label = document.createElement('label');
const label2 = document.createElement('label');
const input = document.createElement('input');
const input2 = document.createElement('input');
const output = document.createElement('div');
const images = document.createElement('div');

title.classList.add('title');
form.classList.add('form-control');
input.classList.add('input', 'form-control');
input2.classList.add('input', 'form-control');
btn.classList.add('btn', 'btn-primary');
output.classList.add('output-block');
images.classList.add('images');

title.innerText = 'Задание 5';
label.innerText = "Номер страницы";
label2.innerText = "Лимит";
input.placeholder = 'Введите страницу, число от 1 до 10';
input2.placeholder = 'Введите лимит, число от 1до 10';
input.type = 'number';
input2.type = 'number';
btn.innerHTML = 'Запрос';
btn.type = 'submit';

block.insertAdjacentElement('beforebegin', title);
block.insertAdjacentElement('afterbegin', form);
form.insertAdjacentElement('afterbegin', btn);
form.insertAdjacentElement('beforebegin', label);
form.insertAdjacentElement('afterbegin', label2);
label.insertAdjacentElement('beforeend', input);
label2.insertAdjacentElement('beforeend', input2);
block.insertAdjacentElement('afterend', output);
output.insertAdjacentElement('afterend', images);

if (loadLocalStorage()) {
  output.innerText = 'Загружаем последние просмотренные картинки';
}

async function getImg(url) {
  return await fetch(url);
};

function getInputValue() {
  const pageNum = +input.value;
  const limit = +input2.value;
  const url = `https://jsonplaceholder.typicode.com/photos?`;
  const queries = {
    _page: input.value,
    _limit: input2.value,
  };
  const params = new URLSearchParams(queries);
  const fullUrl = url + "?" + params.toString();
  output.innerHTML = '';

  if ((pageNum < 1 || pageNum > 10 || isNaN(pageNum)) && (limit < 1 || limit > 10 || isNaN)) {
    output.innerText = "«Номер страницы и лимит вне диапазона от 1 до 10»";
    return;
  }
  if (pageNum < 1 || pageNum > 10) {
    output.innerText = "«Номер страницы вне диапазона от 1 до 10»";
    return;
  }
  if (limit < 1 || limit > 10) {
    output.innerText = "«Лимит вне диапазона от 1 до 10»";
    return;
  }

  else getImg(`${fullUrl}`)
    .then(response => response.json())
    .then(data => {
      displayRes(data);
      saveLocalStorage();
      output.innerText = "Картинки загружены";
    })
    .catch(error => console.error(`Ошибка ${error}`));
};

function displayRes(apiData) {
  let cards = '';
  apiData.forEach(item => {
    const cardBlock = `
    <div class="card">
        <img
          src="${item.url}"
          class="card-image"
        />
        <p>${item.title}</p>
      </div>
    `;
    cards = cards + cardBlock;
  });
  images.innerHTML = cards;
};

function saveLocalStorage() {
  localStorage.setItem('last-images', images.innerHTML);
}

function loadLocalStorage() {
  images.innerHTML = localStorage.getItem('last-images');
  return images.innerHTML.length > 0;
}

form.addEventListener('submit', e => {
  e.preventDefault();
  getInputValue();
});

