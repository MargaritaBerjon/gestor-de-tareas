'use strict'
// Variables
const tasksList = document.querySelector('.js-task-list');
const button = document.querySelector('.button');
const task = document.querySelector('.js-task-content');


paintFromLocalStorage();
//Event Listener

button.addEventListener('click', paintTask);
tasksList.addEventListener('click', removeTask);

//Funciones

function paintTask(ev) {
  ev.preventDefault();
  const li = document.createElement('li');
  const removeTaskButton = document.createElement('a');
  removeTaskButton.classList.add('remove-task');
  li.innerHTML = task.value;
  removeTaskButton.innerHTML = 'X'
  tasksList.appendChild(li);
  li.appendChild(removeTaskButton);
  setToLocalStorage(task.value);
}

function paintFromLocalStorage() {
  let tasks;
  tasks = getFromLocalStorage();
  tasks.forEach(task => {
    const li = document.createElement('li');
    const removeTaskButton = document.createElement('a');
    removeTaskButton.classList.add('remove-task');
    li.innerHTML = task;
    removeTaskButton.innerHTML = 'X'
    tasksList.appendChild(li);
    li.appendChild(removeTaskButton)
  }
  )
}

function removeTask(ev) {
  ev.preventDefault();
  if (ev.target.className === 'remove-task') {
    ev.target.parentElement.remove()
    cleanLocalStorage(ev.target.parentElement.innerText);
  }

}

function setToLocalStorage(task) {
  let tasks;
  tasks = getFromLocalStorage();
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getFromLocalStorage() {
  let tasks = [];
  if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  } else {
    tasks = [];
  }
  return tasks;
}


function cleanLocalStorage(task) {
  let tasks;
  let taskToRemove;
  //Para eliminar la X
  taskToRemove = task.substring(0, task.length - 1);
  tasks = getFromLocalStorage();
  tasks.forEach((task, index) => {
    if (taskToRemove === task) {
      tasks.splice(index, 1);
    }
  })
  localStorage.setItem('tasks', JSON.stringify(tasks));
}