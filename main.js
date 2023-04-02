// Get the list element
let taskList = document.getElementById('task-list');

// Get the input and button elements
let newTaskInput = document.getElementById('new-task');
let addTaskButton = document.getElementById('add-task');

// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks on the page
function renderTasks() {
  // Clear the list
  taskList.innerHTML = '';

  // Render each task
  tasks.forEach(function(task, index) {
    let li = document.createElement('li');
    li.innerText = task.text;
    if (task.done) {
      li.classList.add('done');
    }

    let deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', function() {
      tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    });

    let doneButton = document.createElement('button');
    doneButton.innerText = 'Done';
    doneButton.addEventListener('click', function() {
      task.done = !task.done;
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    });

    li.appendChild(doneButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
}

// Add a new task
function addTask() {
  let taskText = newTaskInput.value.trim();
  if (taskText === '') {
    return;
  }
  tasks.push({ text: taskText, done: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));
  newTaskInput.value = '';
  renderTasks();
}

// Add event listener to the button
addTaskButton.addEventListener('click', function(event) {
  event.preventDefault();
  addTask();
});

// Render the tasks on the page
renderTasks();