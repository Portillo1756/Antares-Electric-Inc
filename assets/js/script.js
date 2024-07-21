// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
// Todo: create a function to generate a unique task id
function generateTaskId() {
}
// Todo: create a function to create a task card
function createTaskCard(task) {
  const taskCard = document.createElement("div")
  taskCard.setAttribute("class", "card task-card draggable my-3")
  taskCard.setAttribute("data-project-id", task.id)
  const cardHeader = $('<div>').addClass('card-header h4').text(task.name);
  const cardBody = $('<div>').addClass('card-body');
  const cardDescription = $('<p>').addClass('card-text').text(task.type);
  const cardDueDate = $('<p>').addclass('card-text').tect(task.dueDate);
  const cardDeleteBtn = $('<button>')
    .addClass('btn btn-danger delete')
    .text('Delete')
    .attr('data-task-id', task.id)
  cardDeleteBtn.on('click', handleDeleteProject);
  return taskCard
}
// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
}
// Todo: create a function to handle adding a new task
function handleAddTask(event){
  modal.style.display = "none";
  const taskTitle = document.getElementById("task-title").value;
  const taskDescription = document.getElementById("description").value;
  const taskDueDate = document.getElementById("datePicker").value;
  const toDoObject = {taskTitle, taskDescription, taskDueDate}
  localStorage.setItem("tasks", JSON.stringify(toDoObject))
  createTaskCard(toDoObject)
}
// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
}
// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
}
// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    $( "#datePicker" ).datepicker();
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

// when the user press it it has to created the block
// button.onclick = function("task Description") {
//   if (event.target == "task description") {
//     modal.style.display = "block";
//   }
// }