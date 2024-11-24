// check if there are already tasks exist
function checkTasks(){
    return window.localStorage.length ;
}

function createElement(elementName,elementText='',id=''){
    let elt = document.createElement(elementName);
    elt.textContent = elementText;
    if (id) elt.id = id;
    return elt
}

function appendChildToElement(parent,child){
    parent.appendChild(child);
}

function createTasksTable(){
    let body = document.getElementById('main');

    let table = createElement('table');
    let tableHead = createElement('thead');
    let taskStatus = createElement('th');
    let taskHead = createElement('th','Task');
    let deleteTask = createElement('th');

    let tableBody = createElement('tbody','',id='table-body'); 

    appendChildToElement(tableHead,taskStatus);
    appendChildToElement(tableHead,taskHead);
    appendChildToElement(tableHead,deleteTask);
    appendChildToElement(table,tableHead);
    appendChildToElement(table,tableBody)
    appendChildToElement(body,table);
}

function createTaskRow(tableBody,task){
    let taskDoneCell = createElement('td');
    let taskDoneCheckbox = createElement('input');
    taskDoneCheckbox.type='checkbox';
    if (task.completed) {
        taskDoneCheckbox.checked = true;
        taskDoneCheckbox.disabled = true;
    }
    taskDoneCheckbox.onclick = function(event) {
        if (event.target.value)  {
            taskDoneCheckbox.disabled = true;
            task.completed = true;
            console.log(task);
            setTaskToCompleted(task)
        }
    }
    appendChildToElement(taskDoneCell,taskDoneCheckbox);

    let taskCell = createElement('td');
    taskCell.textContent = task.message;

    let deleteCell = createElement('td');
    let deleteButton = createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function(event) {
        tableBody.removeChild(this.closest('tr'));
        deleteTaskFromLocalStorage(task.message);
    }
    appendChildToElement(deleteCell,deleteButton)

    let tableRow = createElement('tr');
    appendChildToElement(tableRow,taskDoneCell);
    appendChildToElement(tableRow,taskCell);
    appendChildToElement(tableRow,deleteCell);
    appendChildToElement(tableBody,tableRow);
}

function addTaskToLocalStorage(){
    const taskElt = document.getElementById('task');
    const tasks = JSON.parse(window.localStorage['tasks']);
    if (taskElt.value)
        tasks.push({completed:false,message:taskElt.value})
    window.localStorage['tasks'] = JSON.stringify(tasks);
}


function deleteTaskFromLocalStorage(deleteTask) {
    const tasks = JSON.parse(window.localStorage['tasks']);
    window.localStorage['tasks'] = JSON.stringify(tasks.filter(task => task.message != deleteTask));
}

function setTaskToCompleted(updateTask) {
    let tasks = JSON.parse(window.localStorage['tasks']);
    console.log(tasks);
    tasks = tasks.map(task => (task.message === updateTask.message)?updateTask:task);
    console.log(tasks);
    window.localStorage['tasks'] = JSON.stringify(tasks);
}

function initiateLocalStorage(){
    if (!(Object.keys(window.localStorage).includes('tasks')))
        window.localStorage['tasks'] = '[]';
}

function listTasks() {
    const tasks = JSON.parse(window.localStorage['tasks']);
    const tableBody = document.getElementById('table-body');
    for (let task of tasks) createTaskRow(tableBody,task);
}

initiateLocalStorage()
createTasksTable();
listTasks();


let addButton = document.getElementById('task-submit-button');
addButton.onclick = (event) => {
    event.preventDefault();
    addTaskToLocalStorage();
    window.location.reload();
}
let clearButton = document.getElementById('task-clear-button');
clearButton.onclick = (event) => {
    event.preventDefault();
    localStorage.clear();
    window.location.reload();
}

