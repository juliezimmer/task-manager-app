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
   // Add task event listener
   form.addEventListener('submit', addTask);

   // Remove Task event listener
   taskList.addEventListener('click', removeTask);

   // clear all tasks event listener
   clearBtn.addEventListener('click', clearTasks);

   // filter task event 
   filter.addEventListener('keyup', filterTasks);
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
      }
   }
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


