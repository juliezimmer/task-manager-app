// Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBrn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event Listeners
loadEventListeners();

// Load all event Listeners
function loadEventListeners() {
   // Add task event
   form.addEventListener('submit', addTask);
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

   // Clear Input
   taskInput.value = '';
   e.preventDefault();

}