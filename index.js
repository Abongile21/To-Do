

/*------------------------- To-do list -----------------------------------*/



// document.getElementById('searchInput').addEventListener('input', function() {
//     let searchValue = this.value.trim().toLowerCase();
//     let tasks = document.querySelectorAll('#taskList li');
//     tasks.forEach(function(task) {
//         var taskText = task.textContent.trim().toLowerCase();
//         if (taskText.includes(searchValue)) {
//             task.style.display = 'block';
//         } else {
//             task.style.display = 'none';
//         }
//     });
// });



document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
  });
  
  // Save tasks to localStorage
function saveTasks() {
    let tasks = document.getElementById('taskList').innerHTML;
    localStorage.setItem('tasks', tasks);
}

// Load tasks from localStorage
function loadTasks() {
    let tasks = localStorage.getItem('tasks');
    if (tasks) {
        document.getElementById('taskList').innerHTML = tasks;
    }
}
  
document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
  });
  
  function saveTasks() {
    let tasks = document.getElementById('taskList').innerHTML;
    localStorage.setItem('tasks', tasks);
  }
  
  function loadTasks() {
    let tasks = localStorage.getItem('tasks');
    if (tasks) {
      document.getElementById('taskList').innerHTML = tasks;
      // Attach event listeners for existing tasks after loading from local storage
      attachTaskEventListeners();
    }
  }
  
  function attachTaskEventListeners() {
    let deleteButtons = document.querySelectorAll('.deleteBtn');
    deleteButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        let listItem = button.parentElement;
        listItem.remove();
        saveTasks(); // Save tasks after deletion
      });
    });
  }
  
  document.getElementById('addBtn').addEventListener('click', function() {
    let task = document.getElementById('inputTask').value.trim();
    let deadline = document.getElementById('inputDate').value.trim();
    let description = document.getElementById('description').value.trim();
  
    let today = new Date().toISOString().slice(0, 10);
  
    if (task !== '' && deadline !== '' && description !== '') {
      if (deadline >= today) {
        let li = document.createElement('li');
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', function() {
          li.classList.toggle('done', this.checked);
          saveTasks(); // Save tasks when checkbox state changes
        });
        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('deleteBtn'); // Add a class for targeting delete buttons
        deleteBtn.addEventListener('click', function() {
          li.remove();
          saveTasks(); // Save tasks after deletion
        });
  
        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(task + ' - ' + deadline + '\n\n' + description));
        li.appendChild(deleteBtn);
  
        let taskList = document.getElementById('taskList');
        taskList.insertBefore(li, taskList.firstChild);
  
        saveTasks(); // Save tasks after adding
        document.getElementById('inputTask').value = '';
        document.getElementById('inputDate').value = '';
  
        attachTaskEventListeners(); // Attach event listener to the new delete button
      } else {
        alert('Please select a deadline that is not before today.');
      }
    } else {
      alert('Answer all fields');
    }
  });
  