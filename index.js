

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
const searchInput =document.getElementById('searchInput')


document.addEventListener('DOMContentLoaded', function() {
  loadTasks();
});

const saveTasks = () => {
  const tasks = document.getElementById('taskList').innerHTML;
  localStorage.setItem('tasks', tasks);
}

const loadTasks = () => {
  const tasks = localStorage.getItem('tasks');
  if (tasks) {
    document.getElementById('taskList').innerHTML = tasks;
    attachTaskEventListeners();
  }
}

const attachTaskEventListeners = () => {
  const deleteButtons = document.querySelectorAll('.deleteBtn');
  deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
      const listItem = button.parentElement;
      listItem.remove();
      saveTasks();
    });
  });
}

document.getElementById('addBtn').addEventListener('click', () => {
  const task = document.getElementById('inputTask').value.trim();
  const deadline = document.getElementById('inputDate').value.trim();
  const description = document.getElementById('description').value.trim();

  const today = new Date().toISOString().slice(0, 10);

  if (task !== '' && deadline !== '' && description !== '') {
    if (deadline >= today) {
      const li = document.createElement('li');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.addEventListener('change', () => {
        li.classList.toggle('done', checkbox.checked);
        saveTasks();
      });
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.classList.add('deleteBtn');
      deleteBtn.addEventListener('click', () => {
        li.remove();
        saveTasks();
      });

      li.appendChild(checkbox);
      li.appendChild(document.createTextNode(`${task} - ${deadline}\n\n${description}`));
      li.appendChild(deleteBtn);

      const taskList = document.getElementById('taskList');
      taskList.insertBefore(li, taskList.firstChild);

      saveTasks();
      document.getElementById('inputTask').value = '';
      document.getElementById('inputDate').value = '';

      attachTaskEventListeners();
    } else {
      alert('Please select a deadline that is not before today.');
    }
  } else {
    alert('Answer all fields');
  }
});

searchInput.addEventListener('input', function() {
    const searchQuery = this.value.trim().toLowerCase();
    const taskItems = document.querySelectorAll('#taskList li');
    taskItems.forEach(item => {
      const taskText = item.textContent.toLowerCase();
      if (taskText.includes(searchQuery)) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
});


