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
    let filteredTasks = tasks

    if (currentFilter === 'ativas') {
    filteredTasks = tasks.filter(task => !task.completed)
    }

    if (currentFilter === 'completas') {
    filteredTasks = tasks.filter(task => task.completed)
    }
    tasksContainer.innerHTML = ''

    filteredTasks.forEach(task => {
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
    
    div.addEventListener('dblclick', () => {
      tasks = tasks.filter(t => t.id !== task.id)
      renderTasks()
    })

    tasksContainer.appendChild(div)
  })
}
filters.forEach(filterBtn => {
  filterBtn.addEventListener('click', () => {
    filters.forEach(btn => btn.classList.remove('active'))

    filterBtn.classList.add('active')

    const text = filterBtn.textContent.toLowerCase()

    if (text.includes('todas')) currentFilter = 'todas'
    if (text.includes('ativas')) currentFilter = 'ativas'
    if (text.includes('completas')) currentFilter = 'completas'

    renderTasks()
  })
})