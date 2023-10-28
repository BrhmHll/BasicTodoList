onInit();
function onInit() {

    this.todoListContainer = document.querySelector(".todo-list");
    this.todoNameInput = document.querySelector(".todo-name-input");
    this.todoDateInput = document.querySelector(".todo-date-input");
    this.addTodoButton = document.querySelector(".add-button");

    // Define default values
    this.today = new Date();
    this.todoDateInput.value = getDateString(today);

    //Add event
    addTodoButton.addEventListener("click", addTodo);
    todoNameInput.addEventListener("keydown", (event) => event.code === 'Enter' ? addTodo() : null);

    //Render first view
    renderTodoList();
    setInterval(listenTodoListChanges, 10);

}

function listenTodoListChanges() {
    let todoListVersion = Number(localStorage.getItem("todoListVersion"));
    if (todoListVersion !== this.todoListVersion) {
        this.todoListVersion = todoListVersion;
        renderTodoList();
    }

}

function getTodoList() {
    let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
    return todoList;
}

function setTodoList(todoList) {
    localStorage.setItem("todoList", JSON.stringify(todoList));

    //Update TodoList Version
    let todoListVersion = Number(localStorage.getItem("todoListVersion")) || 0;
    todoListVersion++;
    localStorage.setItem("todoListVersion", todoListVersion);
}

function generateTodoId() {
    let todoId = Number(JSON.parse(localStorage.getItem("todoId"))) || 0;
    todoId++;
    localStorage.setItem("todoId", todoId.toString());
    return todoId;
}

function getDateString(date) {
    return date.toISOString().split("T")[0];
}

function renderTodoList() {
    let todoListContainerHTMLStr = "";
    let todoList = getTodoList();
    todoList.forEach((element) => {
        var todoItemHTMLStr =
            `<p>${element.name}</p>` +
            `<p>${element.date}</p>` +
            `<button class="delete-button flat-btn" onclick="deleteTodoItem(${element.id})">Delete</button>`;
        todoListContainerHTMLStr += todoItemHTMLStr;
    });
    todoListContainer.innerHTML = todoListContainerHTMLStr;
}

function addTodo() {
    let todoList = getTodoList();
    let todoItem = {
        id: generateTodoId(),
        name: todoNameInput.value,
        date: todoDateInput.value
    };
    if (todoItem.name !== "" && todoItem.date !== "") {
        todoList.push(todoItem);
        setTodoList(todoList);
        renderTodoList();
    } else {
        alert("Please fill all fields!");
    }
    clearFormFields();
    todoNameInput.focus();
}

function deleteTodoItem(id) {
    let todoList = getTodoList();
    let todoIndex = todoList.findIndex(t => t.id === id);
    todoList.splice(todoIndex, 1);
    setTodoList(todoList);
    renderTodoList();
    todoNameInput.focus();
}

function clearFormFields() {
    todoNameInput.value = "";
}