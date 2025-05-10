'use strict';
// CONSTANTES

const listTasks = document.querySelector(".js_listTasks");
const btnBuscar = document.querySelector(".js_buscarTask");
const inputBuscar = document.querySelector(".js_inputBuscar");
const textRecuentoTasks = document.querySelector(".js_recuentoTasks");
const btnAddTask = document.querySelector(".js_btnAdd");
const inputNuevaTask = document.querySelector(".js_inputNuevaTarea");

// VARIABLES SERVIDOR
const GITHUB_USER = "cusichia";
const SERVER_URL = `https://dev.adalab.es/api/todo/${GITHUB_USER}`;
const tasksLocalStorage = JSON.parse(localStorage.getItem("tasks"));


// ARRAYS
    /* const tasks = [
        { name: "Recoger setas en el campo", completed: true, id: 1 },
        { name: "Comprar pilas", completed: true, id: 2 },
        { name: "Poner una lavadora de blancos", completed: true, id: 3 },
        {
          name: "Aprender cómo se realizan las peticiones al servidor en JavaScript",
          completed: false,
          id: 4,
        },
      ]; */

let tasks = [];

// BUCLES
/* for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    listTasks.innerHTML += `<li> ${task.name} </li>`;
  }; */

// FUNCIONES

function pintarTasks(tasks) {
  listTasks.innerHTML = "";
    for (const task of tasks) {
        if (task.completed === true) {
            listTasks.innerHTML += `<li class="completedTask"> <input type="checkbox" checked id="${task.id}"> ${task.name}</li>`;  
      }
      else {
        listTasks.innerHTML += `<li> <input type="checkbox" id="${task.id}"> ${task.name} </li>`;
    }
  }
  
  const tasksCompleted = tasks.filter((task) => task.completed === true);
  const tasksNotCompleted = tasks.filter((task) => task.completed === false);
  textRecuentoTasks.innerHTML = `Tienes ${tasks.length} tareas, ${tasksCompleted.length} completadas y ${tasksNotCompleted.length} por realizar.`; // -> hay que poner siempre el .length para que calcule el numero de cada constante
}


function handleClickListTasks (event) {
  let clickedTask = parseInt(event.target.id);
  console.log(clickedTask);
  const taskFound = tasks.find((task) => task.id === clickedTask);
  console.log(taskFound);

  if (taskFound.completed === false) {
    taskFound.completed = true;
  } else {
    taskFound.completed = false;
  }
  pintarTasks(tasks);

}

function handleClickBuscarTask(event) {
  event.preventDefault();
  const inputBuscarValue = inputBuscar.value;
  //console.log(inputBuscarValue);
  listTasks.innerHTML = "";
  
  const taskFilter = tasks.filter((task) => 
    task.name.toLowerCase().includes(inputBuscarValue));
    //console.log(taskFilter);
    pintarTasks(taskFilter);
}

function handleClickAddTask(event) {
  event.preventDefault();
  const inputAddTaskValue = inputNuevaTask.value;
  console.log(inputAddTaskValue);
  const newTask = {
    name: inputAddTaskValue,
    completed: false,
  };
  tasks.push(newTask);
  console.log(tasks);

  pintarTasks(tasks);

  //Almacenar informacion en el local storage
  localStorage.setItem("tasks", JSON.stringify(tasks))

  //mandar datos a la API
    fetch(SERVER_URL, {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: {
            "Content-Type": "application/json"
        }
    });

}


// LLAMAR FUNCIONES
//pintarTasks(tasks); --> lo quito porque ya lo llamo en la función fetch

//EVENTOS
listTasks.addEventListener("click", handleClickListTasks);
btnBuscar.addEventListener("click", handleClickBuscarTask);
btnAddTask.addEventListener("click", handleClickAddTask);

// LLAMAR A LA API
if (tasksLocalStorage !== null) {
  pintarTasks(tasksLocalStorage); // lo que tengo almancedano en el localsorage
  tasks = tasksLocalStorage;
} else {
  fetch(SERVER_URL)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      pintarTasks(data.results); // llamo a la funcion pintar tasks porque es lo que quiero que se vea 
      tasks = data.results; // guardo el array de tareas en la variable tasks
      
      localStorage.setItem("tasks", JSON.stringify(tasks)); // guardo el array de tareas en el localstorage
    })
    .catch((error) => {
      console.error(error);
    });
  
}