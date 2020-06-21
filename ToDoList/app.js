var todoText = document.querySelector("#todoText");
var btnSubmit = document.querySelector("#btnSubmit");
var todoContainer = document.querySelector("#todoContainer");

var todoArray = JSON.parse(window.localStorage.getItem("todos"));
if (todoArray === null) {
  todoArray = [];
}
btnSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  todoArray.push(todoText.value);
  todoText.value = "";
  window.localStorage.setItem("todos", JSON.stringify(todoArray));
  renderTodos();
});
renderTodos();
function renderTodos() {
  todoContainer.innerHTML = "";
  var todos = JSON.parse(window.localStorage.getItem("todos"));
  if (todos === null) {
    todos = [];
  }
  for (var i = 0; i < todos.length; i++) {
    var todoH1 = document.createElement("h1");
    todoH1.textContent = todos[i];
    todoH1.setAttribute("data-id", i);
    console.log(todoH1);
    todoH1.addEventListener("click", function () {
      var todoId = parseInt(this.getAttribute("data-id"));
      console.log(todoId);
      todoArray.splice(todoId, 1);
      window.localStorage.setItem("todos", JSON.stringify(todoArray));
      renderTodos();
    });
    todoContainer.appendChild(todoH1);
  }
}
