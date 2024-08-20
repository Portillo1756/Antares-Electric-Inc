// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) ||[];
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  console.log(task)
  const taskCard = $("<div>")
  taskCard.attr("class", "card task-card draggable my-3")
  taskCard.attr("data-project-id", task.id)
  const cardHeader = $('<div>').addClass('card-header h4').text(task.taskTitle);
  const cardBody = $('<div>').addClass('card-body');
  const cardDescription = $('<p>').addClass('card-text').text(task.taskDescription);
  const cardDueDate = $('<p>').addClass('card-text').text(task.taskDueDate);
  const cardDeleteBtn = $('<button>')
    .addClass('btn btn-danger delete')
    .text('Delete')
    .attr('data-taskId', task.id)
  cardDeleteBtn.on('click', handleDeleteTask);
  taskCard.append(cardHeader)
  taskCard.append(cardBody)
  taskCard.append(cardDescription)
  taskCard.append(cardDueDate)
  taskCard.append(cardDeleteBtn)
  console.log(taskCard)
  return taskCard
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  const toDoList = $("#todo-cards")
  toDoList.empty()
  const progress = $("#in-progress-cards")
  progress.empty()
  const doneCard = $("#done-cards")
  doneCard.empty()
 
  // 
  for(let task of taskList) {
    if (task.status === "to-do") {
      toDoList.append(createTaskCard(task))
    } else if (task.status === "in-progress") {
      progress.append(createTaskCard(task))
    } else if (task.status === "done") {
      doneCard.append(createTaskCard(task))
    }
  }
  $( ".draggable").draggable({
    appendTo: "body", 
    revert: "invalid",
    stack: ".draggable",
    containment: "document"
  });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
  modal.style.display = "none";
  let id = Math.floor(Math.random()*100)
  const taskTitle = document.getElementById("task-title").value;
  const taskDescription = document.getElementById("description").value;
  const taskDueDate = document.getElementById("datePicker").value;
  const status = "to-do";
  const toDoObject = {taskTitle, taskDescription, taskDueDate, id, status}
  taskList.push(toDoObject)
  localStorage.setItem("tasks", JSON.stringify(taskList))
  createTaskCard(toDoObject)
  renderTaskList()
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
  const x = event.target.dataset.taskid
  let newTaskList = taskList.filter( task => task.id != x)
  localStorage.setItem('tasks', JSON.stringify(newTaskList))
  window.location.reload()
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  const status = event.target.id
  const TaskID = ui.draggable[0].dataset.projectId
  for(let task of taskList) {
    if (task.id === parseInt(TaskID)) {
      task.status = status
    }
  }
  localStorage.setItem('tasks', JSON.stringify(taskList) )
  renderTaskList()
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    $( "#datePicker" ).datepicker();
    $(".lane").droppable({
      accept: ".draggable",
      drop: handleDrop
    })
});

// if (Project.dueDate && project.status !== 'done')

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var button = document.getElementById ("button");

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

const summitButton = document.getElementById("Button");
  summitButton.addEventListener("click", handleAddTask)

  renderTaskList()