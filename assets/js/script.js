let taskIdCounter = 0;

let formEl = document.querySelector('#task-form');
let tasksToDoEl = document.querySelector('#tasks-to-do');
let pageContentEl = document.querySelector('#page-content');

let taskFormHandler = (event) => {
    event.preventDefault();

    let taskNameInput = document.querySelector("input[name='task-name']").value;
    let taskTypeInput = document.querySelector("select[name='task-type']").value;

    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    formEl.reset();

    let taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };
    
    createTaskEl(taskDataObj);
};

let createTaskEl = (taskDataObj) => {
    let listItemEl = document.createElement('li');
    listItemEl.className = 'task-item';

    listItemEl.setAttribute('data-task-id', taskIdCounter);

    let taskInfoEl = document.createElement('div');
    taskInfoEl.className = 'task-info';
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);

    let taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
    tasksToDoEl.appendChild(listItemEl);
    
    taskIdCounter++;
}

let createTaskActions = (taskId) => {
    let actionContainerEl = document.createElement('div');
    actionContainerEl.className = 'task-actions';

    let editButtonEl = document.createElement('button');
    editButtonEl.textContent = 'Edit';
    editButtonEl.className = 'btn edit-btn';
    editButtonEl.setAttribute('data-task-id', taskId);
    actionContainerEl.appendChild(editButtonEl);

    let deleteButtonEl = document.createElement('button');
    deleteButtonEl.textContent = 'Delete';
    deleteButtonEl.className = 'btn delete-btn';
    deleteButtonEl.setAttribute('data-task-id', taskId);
    actionContainerEl.appendChild(deleteButtonEl);

    let statusSelectEl = document.createElement('select');
    statusSelectEl.className = 'select-status';
    statusSelectEl.setAttribute = ('name', 'status-change');
    statusSelectEl.setAttribute = ('data-task-id', taskId);
    actionContainerEl.appendChild(statusSelectEl);

    let statusChoices = ['To Do', 'In Progress', 'Completed'];

    for (let i = 0; i < statusChoices.length; i++) {
        let statusOptionEl = document.createElement('option');
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute('value', statusChoices[i]);

        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;
};

let taskButtonHandler = (e) => {
    console.log(e.target);

    if(e.target.matches('.delete-btn')) {
        let taskId = e.target.getAttribute('data-task-id');
        deleteTask(taskId);
    }
}

let deleteTask = (taskId) => {
    let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};

formEl.addEventListener('submit', taskFormHandler);

pageContentEl.addEventListener('click', taskButtonHandler);