var taskIdCounter = 0;

var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var pageContentEl = document.querySelector("#page-content");

let taskFormHandler = (event) => {
    event.preventDefault();

    let taskNameInput = document.querySelector("input[name='task-name']").value;
    let taskTypeInput = document.querySelector("select[name='task-type']").value;

    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    formEl.reset();

    let isEdit = formEl.hasAttribute('data-task-id');
    
    if (isEdit) {
        let taskId = formEl.getAttribute('data-task-id');
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    } else {
        let taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput
        };

        createTaskEl(taskDataObj);
    }
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
    statusSelectEl.setAttribute('name', 'status-change');
    statusSelectEl.setAttribute('data-task-id', taskId);
    statusSelectEl.className = 'select-status';
    actionContainerEl.appendChild(statusSelectEl);

    let statusChoices = ['To Do', 'In Progress', 'Completed'];

    for (let i = 0; i < statusChoices.length; i++) {
        let statusOptionEl = document.createElement('option');
        statusOptionEl.setAttribute('value', statusChoices[i]);
        statusOptionEl.textContent = statusChoices[i];

        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;
};

let completeEditTask = (taskName, taskType, taskId) => {
    let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated");
    formEl.removeAttribute('data-task-id');
    document.querySelector('#save-task').textContent = "Add Task";
}

let taskButtonHandler = (e) => {
    let targetEl = e.target;

    if (targetEl.matches('.edit-btn')) {
        console.log('edit', targetEl)
        let taskId = targetEl.getAttribute('data-task-id');
        editTask(taskId);
    } else if (targetEl.matches('.delete-btn')) {
        console.log('delete', targetEl);
        let taskId = targetEl.getAttribute('data-task-id');
        deleteTask(taskId);
    }
}

let taskStatusChangeHandler = (event) => {
    console.log(event.target.value);

    let taskId = event.target.getAttribute('data-task-id');

    let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']")

    let statusValue = event.target.value.toLowerCase();

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    } else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    } else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }
}

let editTask = (taskId) => {
    console.log(taskId);

    let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    let taskName = taskSelected.querySelector('h3.task-name').textContent;
    let taskType = taskSelected.querySelector('span.task-type').textContent;

    document.querySelector("input[name='task-name']").value = taskName; 
    document.querySelector("select[name='task-type']").value = taskType;
    
    formEl.setAttribute("data-task-id", taskId);
    document.querySelector("#save-task").textContent = "Save Task";
}

let deleteTask = (taskId) => {
    console.log(taskId);
    let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};

formEl.addEventListener('submit', taskFormHandler);

pageContentEl.addEventListener('click', taskButtonHandler);

pageContentEl.addEventListener('change', taskStatusChangeHandler);

