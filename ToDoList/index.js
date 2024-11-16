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
    appendChildToElement(taskDoneCell,taskDoneCheckbox);

    let taskCell = createElement('td');
    taskCell.textContent = task;

    let deleteCell = createElement('td');
    let deleteButton = createElement('button');
    deleteButton.textContent = 'Delete Task';
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
        tasks.push(taskElt.value)
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
