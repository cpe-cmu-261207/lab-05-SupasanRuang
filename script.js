const inputAdd = document.getElementById("input-add-todo");
const todoCtn = document.getElementById("todo-container");

inputAdd.onkeyup = (event) => {
  if (event.key !== "Enter") return;
  if (inputAdd.value == "") {
    alert("Todo cannot be empty");
    return;
  }
  addTodo(inputAdd.value, false);
};

function addTodo(title, completed) {
  //create a div that holds todo title, done button, delete button
  const div = document.createElement("div");
  div.className = "border-bottom p-1 py-2 fs-2 d-flex";

  //create span for showing title
  const span = document.createElement("span");
  span.innerText = title;
  span.style.textDecoration = completed ? "line-through" : "";
  span.className = "me-3";

  //create done button
  const doneBtn = document.createElement("button");
  doneBtn.innerText = "Done";
  doneBtn.className = "btn btn-success me-2";

  //create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.className = "btn btn-danger";

  //your code here

  //append todo to HTML...
  todoCtn.prepend(div);
  doneBtn.style.display = "none";
  deleteBtn.style.display = "none";
  div.append(span);
  div.append(doneBtn);
  div.append(deleteBtn);
  //define buttons event...
  div.onmouseover = () => {
    doneBtn.style.display = "";
    deleteBtn.style.display = "";
  };
  div.onmouseout = () => {
    doneBtn.style.display = "none";
    deleteBtn.style.display = "none";
  };
  deleteBtn.onclick = () => {
    todoCtn.removeChild(div);
    saveTodo();
  };
  doneBtn.onclick = () => {
    if (span.style.textDecoration === "line-through")
      span.style.textDecoration = "none";
    else {
      span.style.textDecoration = "line-through";
    }
    saveTodo();
  };
  inputAdd.value = "";
  saveTodo();
}

function saveTodo() {
  const data = [];
  for (const todoDiv of todoCtn.children) {
    const todoList = {};
    todoList.title = todoDiv.children[0].innerText;
    todoList.completed =
      todoDiv.children[0].style.textDecoration === "line-through";
    data.push(todoList);
  }
  data.reverse();
  const dataStr = JSON.stringify(data);
  localStorage.setItem("todolistData", dataStr);
}

function loadTodo() {
  const dataStr = localStorage.getItem("todolistData");
  const data = JSON.parse(dataStr);
  for (const todoOdj of data) {
    addTodo(todoOdj.title, todoOdj.completed);
  }
}

loadTodo();
