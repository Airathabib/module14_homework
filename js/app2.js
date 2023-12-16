const block = document.getElementById('app2');
const title = document.createElement('h2');
const btn = document.createElement('button');
const input = document.createElement('input');
const input2 = document.createElement('input');
const output = document.createElement('div');
const img = document.createElement('img');

title.classList.add('title');
input.classList.add('input', 'form-control', 'red');
input2.classList.add('input', 'form-control');
btn.classList.add('btn', 'btn-primary');
output.classList.add('output-block');
img.classList.add('hidden');


title.innerText = 'Задание 4';
input.placeholder = 'Введите ширину, число от 100 до 300';
input2.placeholder = 'Введите высоту, число от 100 до 300';
input.type = 'number';
input2.type = 'number';
btn.innerHTML = 'Нажми';
btn.type = 'submit';
img.alt = 'some image';

block.insertAdjacentElement('beforebegin', title);
block.insertAdjacentElement('afterbegin', btn);
block.insertAdjacentElement('afterbegin', input2);
block.insertAdjacentElement('afterbegin', input);
block.insertAdjacentElement('afterend', output);
output.insertAdjacentElement("afterend", img);

async function getImg(url) {
  return await fetch(url);
};

function getInputValue() {
  const url = `https://dummyimage.com/`;
  let value = +input.value;
  let value2 = +input2.value;
  output.innerHTML = '';
  if (!(value >= 100 && value <= 300 && value2 >= 100 && value2 <= 300)) {
    output.innerText = "«одно из чисел вне диапазона от 100 до 300»";
    img.classList.add('hidden');
    return;
  } else getImg(`${url}+${value}x${value2}/`)
    .then(response => img.src = response.url)
    .catch(error => console.log(error));
};


btn.addEventListener('click', e => {
  e.preventDefault();
  img.classList.remove('hidden');
  getInputValue();
});



