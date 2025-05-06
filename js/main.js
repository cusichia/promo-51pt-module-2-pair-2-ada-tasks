'use strict';
// CONSTANTES

const listTasks = document.querySelector(".js_listTasks");

// ARRAYS
const tasks = [
    { name: "Recoger setas en el campo", completed: true, id: 1 },
    { name: "Comprar pilas", completed: true, id: 2 },
    { name: "Poner una lavadora de blancos", completed: true, id: 3 },
    {
      name: "Aprender cómo se realizan las peticiones al servidor en JavaScript",
      completed: false,
      id: 4,
    },
  ];

// BUCLES
/* for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    listTasks.innerHTML += `<li> ${task.name} </li>`;
  }; */

// FUNCIONES
function CompletedTask() {
    for (const task of tasks) {
        if (task.completed === true) {
            listTasks.innerHTML += `<li class="completedTask"> <input type="checkbox" id="${task.id}"> ${task.name}</li>`;  
      }
      else {
        listTasks.innerHTML += `<li> <input type="checkbox" id="${task.id}"> ${task.name} </li>`;
    }
  }
}

// LLAMAR FUNCIONES
CompletedTask()