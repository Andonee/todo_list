// const myList = document.querySelector('ul');

// const initialList = fetch('http://195.181.210.249:3000/todo/').then((res) => {
//   return res.json();
// }).then((data) => {
//   data.map(el => {
//     console.log(el)
//   })
//   }
// )





// const list = [fetchedData]

let $list, $input, $addBtn, $removeBtn, $editBtn, $doneBtn, $modalCancel, $newValue, $currentValue
// const initialList = ['Dzisiaj robię usuwanie', 'Nakarm psa'];

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
  $list = document.getElementById('list');
  $input = document.querySelector('.new_element_form__input').value
  $addBtn = document.querySelector('.add_button')
  $doneBtn = document.querySelector('.done_button')
  $modalCancel = document.querySelector('#cancelTodo')
  $modalOk = document.querySelector('#acceptTodo')
}

function prepareDOMEvents() {
  $list.addEventListener('click', listClickManager);
  $addBtn.addEventListener('click', addTask)
  $modalCancel.addEventListener('click', closePopup)
  $modalOk.addEventListener('click', render)
}

function prepareInitialList() {
  // initialList.forEach(todo => {
  //   addNewElementToList(todo);
  // });
  initialList = fetch('http://195.181.210.249:3000/todo/').then((res) => {
  return res.json();
}).then((data) => {
  data.map(el => {
    addNewElementToList(el)
  })
  }
)
}
function addNewElementToList(title) {
  const newElement = createElement(title.title);

  newElement.innerHTML = `<span class="buttons_container">
  <button class='remove_btn' data-id=${title.id}>Remove</button>
  <button class='edit_btn'>Edit</button>
  <button class="done_btn">Done</button>
  </span>${title.title}`

  $list.appendChild(newElement);

}


function createElement(title) {
  const id = IdGenerator();
  const newElement = document.createElement('li');
  newElement.setAttribute("id", id);
  newElement.innerText = title;

  return newElement;
}

function addTask(e){
  e.preventDefault()
  let newTask = document.getElementsByClassName("new_element_form__input")[0]
    .value;
  // initialList.push(newTask)
  document.getElementsByClassName("new_element_form__input")[0].value = "";
  addNewElementToList({title: newTask})

  const testData = {title: newTask}

  fetch('http://195.181.210.249:3000/todo/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(testData)
  }).then((res) => {
    res.json()
  .then((data) => {
    console.log('Success:', data)
  }).catch((err) => {
    console.log('Error:', err)
  })})
}

async function listClickManager(event) {
  if(event.target.className === 'done_btn'){
    list_element = event.target.parentElement.parentElement
    edit_el = document.getElementById(event.target.parentElement.parentElement.id)
    edit_el.classList.toggle('done')
  }else if (event.target.className === 'remove_btn'){
    remove_el = document.getElementById(event.target.parentElement.parentElement.id)
    $list.removeChild(remove_el)

    const ID = event.target.getAttribute("data-id")


    await fetch('http://195.181.210.249:3000/todo/' + ID, {
      method: 'DELETE',
    }).then((res) => {
      res.json()
    }).then((res) => {
      console.log(res)
    })
    // console.log(event.target.getAttribute("data-id"))
    // const ID = await fetch('http://195.181.210.249:3000/todo/').then((res) => {
    //   return res.json();
    // }).then((data) => {
    //   // console.log(data)
    //   })



  }else if(event.target.className === 'edit_btn'){
    openPopup()

  }
}

function openPopup() {
  edit_el = document.querySelector(event.target.parentElement.parentElement.id)
  modal = document.getElementById('modalId')
  modal.classList.remove('modal')
  modal.classList.add('modal-content')

  currentValue = event.target.parentElement.parentElement.childNodes[1].nodeValue

  document.getElementById('modal_input').value = currentValue
}

async function render(){
  const data = {title: 'TEst'}
  const ID = event.target.getAttribute("data-id")
  await fetch('http://195.181.210.249:3000/todo/' + ID, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data, ID),
    }).then((res) => {
      res.json()
    }).then((res) => {
      console.log(res)
    })
  console.log(ID)
}

function closePopup() {
    modal = document.getElementById('modalId')
    modal.classList.add('modal')
    modal.classList.remove('modal-content')
}

document.addEventListener('DOMContentLoaded', main);
