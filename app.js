// Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event Listeners
loadEventListeners();

// Load all event Listeners
function loadEventListeners() {
   // DOM load event
   // after the DOM has loaded, this gets all the tasks from local storage.
   document.addEventListener('DOMContentLoaded', getTasks);

   // Add task event listener
   form.addEventListener('submit', addTask);

   // Remove Task event listener
   taskList.addEventListener('click', removeTask);

   // clear all tasks event listener
   clearBtn.addEventListener('click', clearTasks);

   // filter task event 
   filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from local storage
function getTasks(){
   let tasks;
   // check  local storage for any tasks
   if (localStorage.getItem('tasks') === null){
      tasks = [];
   } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
   }
   
   // loop through each task in the array
   tasks.forEach(function (task){
      const li = document.createElement('li');
      li.className = 'collection-item';
      li.appendChild(document.createTextNode(task));
      const link = document.createElement('a');
      link.className = 'delete-item secondary-content';
      link.innerHTML = '<i class="fa fa-remove"></i>';
      li.appendChild(link);
      taskList.appendChild(li);
   });
}

// Add Task
// the event handler will take in an event object 
function addTask(e) {
   // if the "Add Task" button is clicked without any input, an alert pops up telling user to add a task.
   if (taskInput.value === '') {
      alert('Add a task');
   }
   // Create a list item/ an li element
   const li = document.createElement('li');
   
   // Add a class to the element
   // in materialize, the ul has a class name of collection, and the li have a class name of collection -item.  There are Materialize class names. 
   li.className = 'collection-item';
   
   // Create text node and append to the li
   // Whatever is put in the input field is passed to document.createTextNode().
   li.appendChild(document.createTextNode(taskInput.value));
   
   // Create a new link element (<a> tag)
   const link = document.createElement('a');

   // Add a class to the <a> tag
   // to get something to the right of a list item, 'secondary-content' must be the class name used in  materialize. 
   link.className = 'delete-item secondary-content';

   // Add icon html
   link.innerHTML = '<i class="fa fa-remove"></i>';

   // Append the link to li
   li.appendChild(link);
   taskList.appendChild(li);

   // adding task to local storage
   storeTask(taskInput.value);

   // Clear Input
   taskInput.value = '';
   e.preventDefault();
}

// Store task
function storeTask(task) {
   let tasks;
   // check  local storage for any tasks
   if (localStorage.getItem('tasks') === null){
      tasks = [];
   } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
   }
   // add the task to array in storage 
   tasks.push(task);
   localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
   // targeting the <a> tag link
   // when the "x" is clicked, the icon is targeted (the <i> tag). We need to target the parent, which is the <a> tag. 
   // this checks whether the parent element class list contains delete-item
   if (e.target.parentElement.classList.contains('delete-item')) {
      console.log(e.target); // <i class="fa fa-remove"></i>

      // confirmation
      if(confirm("Are you sure you want to delete this item?")) {
      
      // when the icon is clicked, the whole li should be removed, which is the parent of the parent of the icon. The parent of the icon is the <a> tag. The parent of the <a> tag is the <li>.
      e.target.parentElement.parentElement.remove();

      // remove from local storage
      // calls removeTaskFromStorage function
      removeTaskFromStorage(e.target.parentElement.parentElement);
      }
   }
}

// Remove from local storage
function removeTaskFromStorage(taskItem) {
   let tasks;
   // check  local storage for any tasks
   if (localStorage.getItem('tasks') === null){
      tasks = [];
   } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
   }
   tasks.forEach(function(task, index){
      // textContent is the actual text of the task
      if(taskItem.textContent === task) {
         tasks.splice(index, 1);
      }
   });
   // reset local storage after task has been removed.
   localStorage.setItem('tasks', JSON.stringify(tasks));
} 

// Clear tasks
function clearTasks() {
   // one way to clear task list
   // taskList.innerHTML = '';

   // use a while loop - this is actually a faster way to clear the task list
   // taskList.firstChild targets the firstChild of the taskList - the first task
   while (taskList.firstChild) { 
      taskList.removeChild(taskList.firstChild);
   }
   // calls clearTasksFromLocalStorage function
   clearTasksFromLocalStorage();
}  

// Clear Tasks From Local Storage
function clearTasksFromLocalStorage(){
   localStorage.clear();
}

// filter tasks function 
function filterTasks(e) {
   const text = e.target.value.toLowerCase();

   // target all of the li in the document to loop through
   // querySelectorAll returns a nodeList
   document.querySelectorAll('.collection-item').forEach(function(task){
      const item = task.firstChild.textContent;
      if (item.toLowerCase().indexOf(text) !== -1){
         task.style.display = 'block';
      } else {
         task.style.display = 'none';
      }
   });
}


