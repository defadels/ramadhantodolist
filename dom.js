// Document Object Model

// Kumpulkan semua UI elements

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const filterInput = document.querySelector("#filter-input");
const todoList = document.querySelector("#todo-list");
const clearButton = document.querySelector("#clear-todos") 

// Ini adalah kumpulan Event Listener
immidiateLoadEventListener();

function immidiateLoadEventListener() {

    // Mendapatkan todos dari local storage dan render di browser
    document.addEventListener("DOMContentLoaded", getTodos);

    // Ini adlaah event untuk menambahkan todo
    todoForm.addEventListener("submit", addTodo);

    //Ini adalah event untuk menghapus 1 todo
    todoList.addEventListener("click", deleteTodo);

    //Ini adalah event yang menghapus semua todo
    clearButton.addEventListener("click", clearTodos);

    //Ini adalah event untuk memfilter todos
    filterInput.addEventListener("keyup", filterTodos);

}

//Reusable Code
function createTodoElement(value) {
    
    // Membuat li element
    const li = document.createElement("li");

    //Menambahkan class pada element li
    li.className = "todo-item list-group-item d-flex justify-content-between align-items-center mb-1";


    //Menambahkan children kedalam element li
    li.appendChild(document.createTextNode(value));

    //Membuat delete button
    const a = document.createElement("a");

    // Memberi properti untuk element a
    a.href = "#";
    a.className = "badge badge-danger delete-todo";

    a.innerHTML = "Delete";

    //Menyelipkan element a ke li
    li.appendChild(a);

    //Memasukkan element li yang telah dibuat
    //dengan javascript ke dalam element todo list

    todoList.appendChild(li);

}

function getItemFromLocalStorage() {
    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    return todos;
}

// ini adalah DOM Functions

function getTodos() {
    const todos = getItemFromLocalStorage();

    todos.forEach((todo) => {

        createTodoElement(todo);

    })
}

function addTodo(e) {
    e.preventDefault();

    if (todoInput.value) {
    createTodoElement(todoInput.value);
    
    addTodoLocalStorage(todoInput.value)
    
    todoInput.value = "";

    } else {
        alert("Type the value to add your list! ")
    }
 
  
} 

function addTodoLocalStorage(todoInputValue) {
    const todos = getItemFromLocalStorage();

    todos.push(todoInputValue);

    localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteTodo(e) {
    e.preventDefault();

    if (e.target.classList.contains("delete-todo")) {
        if (confirm("Do you wanr to delete this list?")) {
            const parent = e.target.parentElement;

            parent.remove();

            deleteTodoLocalStorage(parent)
        }
        
    }
}

function deleteTodoLocalStorage(deletedElement) {
    const todos = getItemFromLocalStorage(); // menghapus elemetn parent todo 4 (li)
    
    todos.forEach((todo, index) => {

        if (deletedElement.firstChild.textContent === todo) {
            todos.splice(index, 1);
        }
    })
    
    localStorage.setItem("todos", JSON.stringify(todos));
}

function clearTodos() {

        if (confirm("Do you want to clear all of your list?")){
            todoList.innerHTML = "";

            clearTodosLocalStorage();
        }
        

}

function clearTodosLocalStorage() {
    localStorage.clear();
}

function filterTodos(e) {
    const filterText = e.target.value.toLowerCase();
    const todoItems = document.querySelectorAll(".todo-item");
    
    todoItems.forEach((item) => {
        const itemText = item.firstChild.textContent.toLowerCase();

        if (itemText.indexOf(filterText) !== -1) {
            item.setAttribute("style", "display: block");
        } else {
            item.setAttribute("style", "display: none !important");
        }        
        console.log(itemText);
    })
}

// Mengubah Class Element

const projectTitle = document.querySelector("#project-title");

projectTitle.setAttribute("style", "color: #fff !important");