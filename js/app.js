// Задание 1
const parser = new DOMParser();

const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>

  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
  </list>
`;
const xmlDOM = parser.parseFromString(xmlString, "text/xml");


const listNode = xmlDOM.querySelector("list");
const studentNodes = [...listNode.querySelectorAll('student')];
const list = [];

studentNodes.forEach(studentNode => {
  const nameNode = studentNode.querySelector('name');
  const firstNode = studentNode.querySelector('first');
  const secondNode = studentNode.querySelector('second');
  const ageNode = studentNode.querySelector('age');
  const profNode = studentNode.querySelector('prof');
  const langAttr = nameNode.getAttribute('lang');

  list.push({
    first: firstNode.textContent,
    secondNode: secondNode.textContent,
    age: Number(ageNode.textContent),
    prof: profNode.textContent,
    lang: langAttr,
  });
});

const result = {
  list
};

console.log('result', result);

// Задание 2

const jsonString = ` {
  "list": [
    {
      "name": "Petr",
      "age": "20",
      "prof": "mechanic"
    },
    {
      "name": "Vova",
      "age": "60",
      "prof": "pilot"
    }
  ]
}`;

const jsObj = JSON.parse(jsonString);
jsObj.list.push();
console.log(jsObj);

// Задание 3

const block = document.getElementById('app');
const title = document.createElement('h2');
const btn = document.createElement('button');
const input = document.createElement('input');
const output = document.createElement('div');

title.classList.add('title');
input.classList.add('input', 'form-control');
btn.classList.add('btn', 'btn-primary');
output.classList.add('output-block');

title.innerText = 'Задание 3';
input.placeholder = 'Введите число от 1 до 10';
input.type = 'number';
btn.innerHTML = 'Нажми';
btn.type = 'submit';


block.insertAdjacentElement('beforebegin', title);
block.insertAdjacentElement('afterbegin', btn);
block.insertAdjacentElement('afterbegin', input);
block.insertAdjacentElement('afterend', output);

function getImage(url, cb) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  xhr.onload = () => {
    if (xhr.status !== 200) {
      console.log('Статус ответа', xhr.status);
    } else {
      const res = JSON.parse(xhr.response);
      if (cb) {
        cb(res);
      }
    };
  };
  xhr.onerror = () => {
    console.log('Ошибка! Статус ответа: ', xhr.status);
  };
  xhr.send();
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
  output.innerHTML = cards;
};

const getInputValue = () => {
  const url = `https://jsonplaceholder.typicode.com/photos?_limit=`;
  let value = +input.value;
  output.innerHTML = '';
  if (value < 1 || value > 10) {
    output.innerHTML = " «число вне диапазона от 1 до 10»";
  } else getImage(`${url} + ${value}}`, displayRes);
};

btn.addEventListener('click', e => {
  e.preventDefault();
  getInputValue();
});

export default displayRes;