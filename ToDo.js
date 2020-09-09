const todoinput = document.querySelector('.todo-input');
const todobtn = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');

todobtn.addEventListener('click', addToDo);
todoList.addEventListener('click', checkOrremove);

window.addEventListener("DOMContentLoaded", () => {

    if (localStorage.getItem('todos') != null) {

        let todos = JSON.parse(localStorage.getItem("todos"));

        for (let i = 0; i < todos.length; i++) {
            //main todo divs vontainer 
            let data = JSON.parse(localStorage.getItem("todos"))[i].todo;

            const todoDiv = document.createElement('div');
            todoDiv.classList.add('todo');

            const newTodo = document.createElement('li');

            newTodo.classList.add('todo-item');
            todoDiv.appendChild(newTodo);

            const completedBtn = document.createElement('button');
            completedBtn.innerHTML = "<i class='fas fa-check'></i>";
            completedBtn.classList.add('complete-btn');
            todoDiv.appendChild(completedBtn);

            const trashBtn = document.createElement('button');
            trashBtn.innerHTML = "<i class='fas fa-trash'></i>";
            trashBtn.classList.add('trash-btn');
            todoDiv.appendChild(trashBtn);

            todoList.appendChild(todoDiv);
            newTodo.innerText = data;

            if (JSON.parse(localStorage.getItem("todos"))[i].checked === true) {
                todoDiv.classList.add('done');
                completedBtn.style.backgroundColor = "lime";
                completedBtn.style.color = "white";
            }
        }
    }
});

function addToDo() {
    event.preventDefault();

    //if the imput is not blank
    if (!todoinput.value == '') {

        //main todo divs vontainer 
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        const newTodo = document.createElement('li');

        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        const completedBtn = document.createElement('button');
        completedBtn.innerHTML = "<i class='fas fa-check'></i>";
        completedBtn.classList.add('complete-btn');
        todoDiv.appendChild(completedBtn);

        const trashBtn = document.createElement('button');
        trashBtn.innerHTML = "<i class='fas fa-trash'></i>";
        trashBtn.classList.add('trash-btn');
        todoDiv.appendChild(trashBtn);

        todoList.appendChild(todoDiv);

        //storing and showing todos
        newTodo.innerText = todoinput.value;
        store(todoinput.value);

        //clearing input feild
        todoinput.value = '';

    }
}
function store(todo) {
    let todos;

    if (localStorage.getItem('todos') == null) {
        todos = [];
        todos.push({ "todo": todo, "checked": false });
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
        todos.push({ "todo": todo, "checked": false });

    }
    localStorage.setItem("todos", JSON.stringify(todos));


}
let goo = 1;
function checkOrremove() {
    let todo = event.target;

    if (todo.classList == 'trash-btn') {

        todo.parentElement.classList.add('remove');

        todo.parentElement.addEventListener('transitionend', () => {
            todo.parentElement.remove();

            let todos = JSON.parse(localStorage.getItem('todos'));
            for (let i = 0; i < todos.length; i++) {
                if (todos[i].todo === todo.parentElement.innerText) {
                    console.log(todo.parentElement.innerText)
                    todos.splice(i, 1);
                    localStorage.setItem('todos', JSON.stringify(todos));
                }
            }
        });
    }
    else if (todo.classList == 'complete-btn') {
        // todo.parentElement.classList.remove('done');


        let todos = JSON.parse(localStorage.getItem('todos'));

        for (let i = 0; i < todos.length; i++) {
            if (todos[i].todo == todo.parentElement.innerText) {
                if (todos[i].checked == true) {
                    todos[i].checked = false;
                    todo.parentElement.classList.remove('done');

                    todo.style.backgroundColor = "transparent";
                    todo.style.color = "black";
                    todo.style.border = '1px solid black';
                } else {
                    todos[i].checked = true;
                    todo.parentElement.classList.add('done');

                    todo.style.backgroundColor = "lime";
                    todo.style.color = "white";
                    todo.style.border = '2px solid limegreen';
                }
            }
            localStorage.setItem('todos', JSON.stringify(todos));

        }
    }
}