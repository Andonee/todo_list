// Tutaj dodacie zmienne globalne do przechowywania elementów takich jak np. lista czy input do wpisywania nowego todo
let $list, $input, $addBtn, $removeBtn, $editBtn
const initialList = ['Dzisiaj robię usuwanie', 'Nakarm psa'];

function main() {
  prepareDOMElements();
  prepareDOMEvents();
  prepareInitialList();
}

const IdGenerator = () => {
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};

function prepareDOMElements() {
  // To będzie idealne miejsce do pobrania naszych elementów z drzewa DOM i zapisanie ich w zmiennych
  $list = document.getElementById('list');
  $input = document.querySelector('.new_element_form__input').value
  $addBtn = document.querySelector('.add_button')
}

function prepareDOMEvents() {
  // Przygotowanie listenerów
  $list.addEventListener('click', listClickManager);
  $addBtn.addEventListener('click', addTask)
}

function prepareInitialList() {
  // Tutaj utworzymy sobie początkowe todosy. Mogą pochodzić np. z tablicy
  initialList.forEach(todo => {
    addNewElementToList(todo);
  });
}

function addNewElementToList(title   /* Title, author, id */) {
  //obsługa dodawanie elementów do listy
  // $list.appendChild(createElement('nowy', 2))
  const newElement = createElement(title);

  newElement.innerHTML = `<span class="buttons_container">
  <button>Remove</button>
  <button>Edit</button>
  <button>Done</button>
  </span>${title}`

  $list.appendChild(newElement);
}

function createElement(title /* Title, author, id */) {
  // Tworzyc reprezentacje DOM elementu return newElement
  // return newElement
  const id = IdGenerator();
  const newElement = document.createElement('li');
  newElement.setAttribute("id", id);
  newElement.innerText = title;

  return newElement;
}

function addTask(e){
  e.preventDefault()
  const id = IdGenerator();
  let newTask = document.getElementsByClassName("new_element_form__input")[0]
    .value;
  // const ul = document.getElementById("list");
  // const li = document.createElement("li");
  // li.innerHTML = `<span class="buttons_container">
  // <button>Remove</button>
  // <button>Edit</button>
  // <button>Done</button>
  // </span>`
  // li.setAttribute("id", id);
  // li.appendChild(document.createTextNode(newTask));
  // ul.appendChild(li);
  initialList.push(newTask)
  document.getElementsByClassName("new_element_form__input")[0].value = "";
  addNewElementToList(newTask)
}

function listClickManager(/* event- event.target */) {
  // Rozstrzygnięcie co dokładnie zostało kliknięte i wywołanie odpowiedniej funkcji
  // event.target.parentElement.id
  // if (event.target.className === 'edit') { editListElement(id) }
}

function openPopup() {
  // Otwórz popup
}

function closePopup() {
  // Zamknij popup
}

document.addEventListener('DOMContentLoaded', main);


























// let arr = [
//   "Pobawić się z Murzynkiem",
//   "Podokuczać Korelowi",
//   "Kupić chipcy Kamilci"
// ];

// let newArr = [];
// newArr.push(...arr);
// console.log(newArr);



// const AddTask = e => {
//   // e.preventDefault();
//   const id = IdGenerator();
//   let newTask = document.getElementsByClassName("new_element_form__input")[0]
//     .value;
//   const ul = document.getElementById("list");
//   const li = document.createElement("li");
//   const span = document.createElement("span");
//   const deleteBtn = document.createElement("button");
//   const editBtn = document.createElement("button");
//   const doneBtn = document.createElement("button");
//   li.setAttribute("id", id);
//   span.classList.add("buttons_container");
//   deleteBtn.textContent = "Remove";
//   editBtn.textContent = "Edit";
//   doneBtn.textContent = "Done";
//   span.append(deleteBtn, editBtn, doneBtn);
//   li.appendChild(span);
//   li.appendChild(document.createTextNode(newTask));
//   ul.appendChild(li);
//   arr.push(newTask);
//   document.getElementsByClassName("new_element_form__input")[0].value = "";

//   return newTask;
// };

// newArr.push(AddTask());
// console.log(newArr);

// const addListElement = list => {
//   newArr.map(el => {
//     let element.
//   });
// };

// addListElement(newArr);

// const addBtn = document
//   .getElementsByClassName("add_button")[0]
//   .addEventListener("click", AddTask);
