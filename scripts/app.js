let $list,
  $input,
  $addBtn,
  $doneBtn,
  $modalCancel,
  $currentValue,
  $ID,
  $elementID;

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
  $list = document.getElementById("list");
  $input = document.querySelector(".new_element_form__input").value;
  $addBtn = document.querySelector(".add_button");
  $doneBtn = document.querySelector(".done_button");
  $modalCancel = document.querySelector("#cancelTodo");
  $modalOk = document.querySelector("#acceptTodo");
}

function prepareDOMEvents() {
  $list.addEventListener("click", listClickManager);
  $addBtn.addEventListener("click", addTask);
  $modalCancel.addEventListener("click", closePopup);
  $modalOk.addEventListener("click", updateList);
}

function prepareInitialList() {
  initialList = fetch("http://195.181.210.249:3000/todo/")
    .then(res => {
      return res.json();
    })
    .then(data => {
      data.map(el => {
        addNewElementToList(el);
      });
    });
}

function addNewElementToList(title) {
  const newElement = createElement(title.title);

  newElement.innerHTML = `<span class="buttons_container">
  <button class='remove_btn' dataID=${title.id}>Remove</button>
  <button class='edit_btn'>Edit</button>
  <button class="done_btn">Done</button>
  </span>${title.title}`;

  $list.appendChild(newElement);
}

function createElement(title) {
  const id = IdGenerator();
  const newElement = document.createElement("li");
  newElement.setAttribute("id", id);
  newElement.innerText = title;

  return newElement;
}

function addTask(event) {
  event.preventDefault();
  let newTask = document.getElementsByClassName("new_element_form__input")[0]
    .value;

  if (newTask.trim() === "") {
    alert("Nie wygłupiaj się, przecież musisz coś zrobić...");
  } else {
    document.getElementsByClassName("new_element_form__input")[0].value = "";
    addNewElementToList({ title: newTask });
    const testData = { title: newTask };

    fetch("http://195.181.210.249:3000/todo/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(testData)
    }).then(res => {
      res
        .json()
        .then(data => {
          console.log("Success:", data);
        })
        .catch(err => {
          console.log("Error:", err);
        });
    });
    updateList();
  }
}

async function listClickManager(event) {
  if (event.target.className === "done_btn") {
    edit_el = document.getElementById(
      event.target.parentElement.parentElement.id
    );
    edit_el.classList.toggle("done");
  } else if (event.target.className === "remove_btn") {
    remove_el = document.getElementById(
      event.target.parentElement.parentElement.id
    );
    $list.removeChild(remove_el);

    $ID = event.target.getAttribute("dataID");

    await fetch("http://195.181.210.249:3000/todo/" + $ID, {
      method: "DELETE"
    })
      .then(res => {
        res.json();
      })
      .then(res => {
        console.log(res);
      });
  } else if (event.target.className === "edit_btn") {
    openPopup();
  }
}

function openPopup() {
  modal = document.getElementById("modalId");
  modal.classList.remove("modal");
  modal.classList.add("modal-content");

  currentValue =
    event.target.parentElement.parentElement.childNodes[1].nodeValue;

  document.getElementById("modal_input").value = currentValue;

  $elementID = event.target.previousElementSibling.getAttribute("dataid");
}

async function updateList(event) {
  const modal_input = document.getElementById("modal_input").value;
  const updatedTask = { title: modal_input };
  await fetch("http://195.181.210.249:3000/todo/" + $elementID, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedTask)
  }).then(() => {
    window.location.reload(true);
  });
}

function closePopup() {
  modal = document.getElementById("modalId");
  modal.classList.add("modal");
  modal.classList.remove("modal-content");
}

window.addEventListener("keydown", event => {
  if (event.keyCode === 13) {
    updateList();
    closePopup();
  } else if (event.keyCode === 27) {
    closePopup();
  }
});

document.addEventListener("DOMContentLoaded", main);
