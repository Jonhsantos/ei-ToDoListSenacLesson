// fazendo a seleção dos elementos do DOM
const input = document.querySelector('.add-task input');
const btnAdd = document.querySelector('.btn-add');
const tasksContainer = document.querySelector('.tasks');
const filters = document.querySelectorAll('.filter');

// array para armazenar as tarefas
let tasks = [];

// filtro padrão
let currentFilter = 'todas';

function addTask() {
  const text = input.value.trim()

  if (text === '') {
    return
  }

  const task = {
    id: Date.now(),
    text: text,
    completed: false
  }

  tasks.push(task)

  input.value = ''

  console.log(tasks)
  renderTasks()
}

btnAdd.addEventListener('click', addTask)

function renderTasks() {
  tasksContainer.innerHTML = ''

  tasks.forEach(task => {
    const div = document.createElement('div')

    div.classList.add('task')

    if (task.completed) {
      div.classList.add('completed')
    }

    div.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''}>
      <span>${task.text}</span>
    `
    const checkbox = div.querySelector('input')
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked
      renderTasks()
    })
    

    tasksContainer.appendChild(div)
  })
}