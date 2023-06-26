function editTodo(todo) {
    setEditState(todo, true);
    masonry();
}

function setEditState(todo, editing) {
    let titleElement = document.getElementById(todo.id + "_title");
    let bodyElement = document.getElementById(todo.id + "_description");

    let titleInputElement = document.getElementById(todo.id + "_title_edit");
    let bodyInputElement = document.getElementById(todo.id + "_description_edit");

    let editTodo = document.getElementById(todo.id + "_edit");
    let deleteTodo = document.getElementById(todo.id + "_delete");
    let completeTodo = document.getElementById(todo.id + "_complete");
    let incompleteTodo = document.getElementById(todo.id + "_incomplete");


    let saveEditTodo = document.getElementById(todo.id + "_edit_save");
    let cancelEditTodo = document.getElementById(todo.id + "_edit_cancel");

    titleInputElement.value = titleElement.innerText;
    bodyInputElement.value = bodyElement.innerText;

    titleElement.style.display = editing ? "none" : "block";
    bodyElement.style.display = editing ? "none" : "block";
    titleInputElement.style.display = editing ? "block" : "none";
    bodyInputElement.style.display = editing ? "block" : "none";
    editTodo.style.display = editing ? "none" : "block";
    deleteTodo.style.display = editing ? "none" : "block";
    completeTodo.style.display = (!editing && !todo.done) ? "block" : "none";
    incompleteTodo.style.display = (!editing && todo.done) ? "block" : "none";
    saveEditTodo.style.display = editing ? "block" : "none";
    cancelEditTodo.style.display = editing ? "block" : "none";
}

function editSave(todo) {
    let titleElement = document.getElementById(todo.id + "_title");
    let bodyElement = document.getElementById(todo.id + "_description");

    let titleInputElement = document.getElementById(todo.id + "_title_edit");
    let bodyInputElement = document.getElementById(todo.id + "_description_edit");
    if (typeof titleInputElement.value === "undefined" || titleInputElement.value.length == 0) {
        titleInputElement.classList.add('is-invalid');
        titleInputElement.classList.add('shake-horizontal');
        return;
    }
    
    todo.title = titleElement.innerText = titleInputElement.value;
    todo.description = bodyElement.innerText = bodyInputElement.value;

    if (todo.new) {
        delete todo.new;
        postTodo(todo)
    } else {
        putTodo(todo);
    }

    setEditState(todo, false);
    masonry();
}

function editCancel(todo) {
    if (todo.new == true) {
        removeTodo(todo);
        return;
    }
    setEditState(todo, false);
    masonry();
}

function createTodo() {
    let todosElement = document.getElementById("todos");
    let todo = {id: generateId(), title: '', description: '', done: false, new: true};
    todosElement.insertBefore(generateTodo(todo), todosElement.firstChild.nextSibling.nextSibling);
    setEditState(todo, true);
    masonry();
}

function completeTodo(todo) {
    todo.done = true;
    let todoCardElement = document.getElementById(todo.id + "_todo");
    let todoCompleteButtonElement = document.getElementById(todo.id + "_complete");
    let todoIncompleteButtonElement = document.getElementById(todo.id + "_incomplete");

    todoCardElement.classList.add('completed');
    todoCompleteButtonElement.style.display = 'none';
    todoIncompleteButtonElement.style.display = 'block';

    putTodo(todo);
}

function incompleteTodo(todo) {
    todo.done = false;

    let todoCardElement = document.getElementById(todo.id + "_todo");
    let todoCompleteButtonElement = document.getElementById(todo.id + "_complete");
    let todoIncompleteButtonElement = document.getElementById(todo.id + "_incomplete");
    
    todoCardElement.classList.remove('completed');
    todoCompleteButtonElement.style.display = 'block';
    todoIncompleteButtonElement.style.display = 'none';

    putTodo(todo);
}

function removeTodo(todo) {
    let todoCardElement = document.getElementById(todo.id + "_todo");
    todoCardElement.classList.add("swing-out-top-bck");
    setTimeout(
        () => {
            todoCardElement.remove();
            masonry();
            if (!todo.new) {
                deleteTodo(todo);
            }
        },
        510
    )
}

function drawTodos(todos) {
    drawCreateNewTodo();

    let todosElement = document.getElementById("todos");
    for (const todo of todos) {
        todosElement.appendChild(generateTodo(todo));
    }

    masonry();
}

function masonry() {
    let masonry = new Masonry(
        '#todos', 
        {
        }
    );
}

function drawCreateNewTodo() {
    let todosElement = document.getElementById("todos");

    let todoCardWrapperElement = document.createElement("div");
    todoCardWrapperElement.className = "col-sm-6 col-md-4 col-lg-3 py-3";

    let todoCardElement = document.createElement("div");
    todoCardElement.className = "card new-todo";
    todoCardElement.addEventListener(
        'click',
        () => {
            createTodo();
        }
    )

    let todoCardBodyElement = document.createElement("div");
    todoCardBodyElement.className = "card-body";
    todoCardBodyElement.innerHTML = `<i class="bi bi-plus-lg"></i>`;

    todoCardElement.appendChild(todoCardBodyElement);

    todoCardWrapperElement.appendChild(todoCardElement);

    todosElement.appendChild(todoCardWrapperElement);
}

function generateTodo(todo) {
    let todoCardWrapperElement = document.createElement("div");
    todoCardWrapperElement.id = todo.id + "_todo";
    todoCardWrapperElement.className = "col-sm-6 col-md-4 col-lg-3 py-3";

    if (todo.done) {
        todoCardWrapperElement.classList.add("completed");
    }

    let todoCardElement = document.createElement("div");
    if (todo.new) {
        todoCardElement.className = "card swing-in-top-fwd";
    } else {
        todoCardElement.className = "card";
    }

    let todoCardBodyElement = document.createElement("div");
    todoCardBodyElement.className = "card-body";

    let todoCardTitleElement = document.createElement("h5");
    todoCardTitleElement.className = "card-title";
    todoCardTitleElement.innerText = todo.title;
    todoCardTitleElement.id = todo.id + "_title";

    let todoCardTitleInputElement = document.createElement("input");
    todoCardTitleInputElement.id = todo.id + "_title_edit";
    todoCardTitleInputElement.className = "form-control mb-3";
    todoCardTitleInputElement.style.display = "none";
    todoCardTitleInputElement.type = "text";
    todoCardTitleInputElement.value = todo.title;
    todoCardTitleInputElement.placeholder = "Title";
    todoCardTitleInputElement.addEventListener(
        'change',
        () => {
            todoCardTitleInputElement.classList.remove('is-invalid');
            todoCardTitleInputElement.classList.remove('shake-horizontal');
        }
    )

    let todoCardTextElement = document.createElement("p");
    todoCardTextElement.className = "card-text";
    todoCardTextElement.innerText = todo.description;
    todoCardTextElement.id = todo.id + "_description";

    let todoCardTextInputElement = document.createElement("textarea");
    todoCardTextInputElement.id = todo.id + "_description_edit";
    todoCardTextInputElement.className = "form-control mb-3";
    todoCardTextInputElement.style.display = "none";
    todoCardTextInputElement.style.resize = "none";
    todoCardTextInputElement.rows = "5";
    todoCardTextInputElement.value = todo.description;
    todoCardTextInputElement.placeholder = "Description";
    
    let todoCardButtonWrapperElement = document.createElement("div");

    let todoCardCheckButtonElement = document.createElement("a");
    todoCardCheckButtonElement.id = todo.id + "_complete";
    todoCardCheckButtonElement.style.display = todo.done ? "none" : "block";
    todoCardCheckButtonElement.className = "ms-1 float-start text-success";
    todoCardCheckButtonElement.innerHTML = `<i class="bi bi-square"></i>`;
    todoCardCheckButtonElement.addEventListener(
        'click',
        () => {
            completeTodo(todo);
        }
    )

    let todoCardUncheckButtonElement = document.createElement("a");
    todoCardUncheckButtonElement.id = todo.id + "_incomplete";
    todoCardUncheckButtonElement.style.display = todo.done ? "block" : "none";
    todoCardUncheckButtonElement.className = "ms-1 float-start text-success";
    todoCardUncheckButtonElement.innerHTML = `<i class="bi bi-check-square"></i>`;
    todoCardUncheckButtonElement.addEventListener(
        'click',
        () => {
            incompleteTodo(todo);
        }
    )

    let todoCardEditButtonElement = document.createElement("a");
    todoCardEditButtonElement.id = todo.id + "_edit";
    todoCardEditButtonElement.className = "ms-1 float-end text-primary";
    todoCardEditButtonElement.innerHTML = `<i class="bi bi-pencil-square"></i>`;
    todoCardEditButtonElement.addEventListener(
        'click',
        () => {
            editTodo(todo);
        }
    )

    let todoCardEditSaveButtonElement = document.createElement("a");
    todoCardEditSaveButtonElement.id = todo.id + "_edit_save";
    todoCardEditSaveButtonElement.className = "ms-1 float-end text-success";
    todoCardEditSaveButtonElement.style.display = "none";
    todoCardEditSaveButtonElement.innerHTML = `<i class="bi bi-save"></i>`;
    todoCardEditSaveButtonElement.addEventListener(
        'click',
        () => {
            editSave(todo);
        }
    )

    let todoCardEditCancelButtonElement = document.createElement("a");
    todoCardEditCancelButtonElement.id = todo.id + "_edit_cancel";
    todoCardEditCancelButtonElement.className = "ms-1 float-end text-secondary";
    todoCardEditCancelButtonElement.style.display = "none";
    todoCardEditCancelButtonElement.innerHTML = `<i class="bi bi-x-lg"></i>`;
    todoCardEditCancelButtonElement.addEventListener(
        'click',
        () => {
            editCancel(todo);
        }
    )

    let todoCardDeleteButtonElement = document.createElement("a");
    todoCardDeleteButtonElement.id = todo.id + "_delete";
    todoCardDeleteButtonElement.className = "ms-1 float-end text-danger";
    todoCardDeleteButtonElement.innerHTML = `<i class="bi bi-trash"></i>`;
    todoCardDeleteButtonElement.addEventListener(
        'click',
        () => {
            removeTodo(todo);
        }
    )

    todoCardBodyElement.appendChild(todoCardTitleElement);
    todoCardBodyElement.appendChild(todoCardTitleInputElement);
    todoCardBodyElement.appendChild(todoCardTextElement);
    todoCardBodyElement.appendChild(todoCardTextInputElement);

    todoCardButtonWrapperElement.appendChild(todoCardCheckButtonElement);
    todoCardButtonWrapperElement.appendChild(todoCardUncheckButtonElement);
    
    todoCardButtonWrapperElement.appendChild(todoCardDeleteButtonElement);
    todoCardButtonWrapperElement.appendChild(todoCardEditButtonElement);
    todoCardButtonWrapperElement.appendChild(todoCardEditCancelButtonElement);
    todoCardButtonWrapperElement.appendChild(todoCardEditSaveButtonElement);

    todoCardBodyElement.appendChild(todoCardButtonWrapperElement);

    todoCardElement.appendChild(todoCardBodyElement);

    todoCardWrapperElement.appendChild(todoCardElement);

    return todoCardWrapperElement;
}

function generateId() {
	let result  = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	const charactersLength = characters.length;
	for (let i = 0; i < 10; i++ ) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

function showToastMessage(message) {
    let toastContainerElement = document.getElementById('toasts');

    let toastElement = document.createElement('div');
    toastElement.className = "toast show";
    toastElement.setAttribute('role', 'alert');
    toastElement.setAttribute('aria-live', 'assertive');
    toastElement.setAttribute('aria-live', 'assertive');
    toastElement.setAttribute('aria-atomic', 'true');

    let toastHeaderElement = document.createElement('div');
    toastHeaderElement.className = "toast-header";
    toastHeaderElement.innerHTML = `
        <strong class="me-auto">Message</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    `;

    let toastBodyElement = document.createElement('div');
    toastBodyElement.className = "toast-body";
    toastBodyElement.innerText = message;

    toastElement.appendChild(toastHeaderElement);
    toastElement.appendChild(toastBodyElement);

    toastContainerElement.appendChild(toastElement);

    // init toasts
    let toastElementList = [].slice.call(document.querySelectorAll('.toast'))
    toastElementList.map(function (toastEl) {
        return new bootstrap.Toast(toastEl, {})
    })
}