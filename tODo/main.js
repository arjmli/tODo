var root = document.getElementById('root')
root.classList.add('root')

function createEl(name, tag, parent) {
  var name = document.createElement(tag)
  parent.appendChild(name)

  return name
}

var mainHeader = createEl('mainHeader', 'h1', root)
mainHeader.textContent = 'tODo'
mainHeader.classList.add('main-header')

var mainContainer = createEl('mainContainer', 'div', root)
mainContainer.classList.add('main-container', 'primary-radius')

var tagName = createEl('tagName', 'span', root)
tagName.classList.add('tag-name')
tagName.textContent = 'Designed with ❤️ by Alireza Jamali'

var headerContainer = createEl('headerContainer', 'div', mainContainer)
headerContainer.classList.add('header-container', 'primary-radius')

var headerTextBar = createEl('headerTextBar', 'span', headerContainer)
headerTextBar.classList.add('header-text-bar', 'primary-radius')

var textBar = createEl('textBar', 'span', headerTextBar)
var date  = new Date()
var todaysDate = date.toDateString()
textBar.textContent = todaysDate
textBar.classList.add('text-bar')

var headerQoute = createEl('headerQoute', 'h3', headerContainer)
headerQoute.classList.add('header-qoute')
headerQoute.textContent = "Worrying is like Paying a debt you don’t owe."

var todoContainer = createEl('todoContainer', 'div', mainContainer)
todoContainer.classList.add('todo-container', 'primary-radius')

var form = createEl('form', 'form', todoContainer)
form.classList.add('form')

var taskContainer = createEl('taskContainer', 'div', form)
taskContainer.classList.add('task-container')

var ol = createEl('ol', 'ol', taskContainer)
ol.classList.add('ol')

var inputContainer = createEl('inputContainer', 'div', form)
inputContainer.classList.add('input-container')

var input = createEl('input', 'input', inputContainer)
input.setAttribute('placeholder', 'Write your tasks here...')
input.classList.add('input', 'primary-radius')

var addBtn = createEl('addBtn', 'button', inputContainer)
addBtn.textContent = '+'
addBtn.setAttribute('action', 'submit')
addBtn.classList.add('add-btn')

form.addEventListener('submit', function(e) {
  e.preventDefault()
    var inputValue = input.value

    if (inputValue === '') return

    addTask(inputValue)
    saveTask(inputValue)

    input.value = ''
})

function addTask (value) {
  var li = createEl('li', 'li', ol)
  li.textContent = value
  li.classList.add('li', 'primary-radius')
  var taskBtnContainer = createEl('taskBtnContainer', 'div', li)
  taskBtnContainer.classList.add('task-btn-container')
  deleteTask(taskBtnContainer, li)
  checkTask(taskBtnContainer, li)
}

function deleteTask(parent, li) {
  var removeBtn = createEl('removeBtn', 'span', parent)
  removeBtn.textContent = 'remove'
  removeBtn.classList.add('btn-remove', 'margin-right--sm')

  removeBtn.addEventListener('click', function(e) {
    li.remove()
    removeTask(e.target.parentElement.parentElement.firstChild.textContent)
  })
}

function checkTask(parent, li) {
  var checkBtn = createEl('checkBtn', 'span', parent)
  checkBtn.textContent = 'Done'
  checkBtn.classList.add('btn-check')

  checkBtn.addEventListener('click', function() {
    li.style.opacity = '25%'
    checkBtn.textContent = ''
  })
}

function getTasks() {
  var tasks = localStorage.getItem('tasks')

  return tasks ? JSON.parse(tasks) : []
}

function saveTask(value) {
  var tasks = getTasks()
  tasks.push(value)
  saveTasks(tasks)
}

function saveTasks (tasks) {
  var tasksJson = JSON.stringify(tasks)
  localStorage.setItem('tasks', tasksJson)
}

function removeTask(value) {
  var tasks = getTasks()
  var newTasks = tasks.filter(function(el) {
    return el !== value
  })

  saveTasks(newTasks)
}

function loadTasks() {
  var tasks = getTasks()

  tasks.forEach(function(task) {
    addTask(task)
  })
}

loadTasks()