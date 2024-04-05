// document.addEventListener('DOMContentLoaded', function () {
//   const signUp = document.getElementById('signUpBtn');

//   signUpForm.addEventListener('click', function (event) {
//       event.preventDefault(); 
//       const name = document.getElementById('name').value;
//       const email = document.getElementById('email').value;
//       const password = document.getElementById('password').value;

      
//       if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
//           alert('Please enter all fields.');
//           return;
//       }

      
//       const userData = { name, email, password };
//       localStorage.setItem('userData', JSON.stringify(userData));

//       window.location.href = 'signin.html';
//   });
// });

// // ----------------------Login---------------------------------------------------

// document.addEventListener('DOMContentLoaded', function () {
//   const signInForm = document.getElementById('signinBtn');

//   signInForm.addEventListener('click', function (event) {
//       event.preventDefault(); 
//       const email = document.getElementById('signInEmail').value;
//       const password = document.getElementById('signInPassword').value;
//       if (email.trim() === '' || password.trim() === '') {
//           alert('Please enter both email and password.');
//           return;
//       }
//             const userData = JSON.parse(localStorage.getItem('userData'));
//       if (userData) {
          
//           if (email === userData.email && password === userData.password) {
//                            localStorage.setItem('isLoggedIn', true);
//                             window.location.href = 'index.html';
//           } else {
//               alert('Authentication failed. Please check your credentials.');
//           }
//       } else {
//           alert('User data not found. Please sign up first.');
//                     window.location.href = 'signup.html';
//       }
//   });
// });
/*---------------------------logout-------------------------------------*/
document.getElementById('logout-icon').addEventListener('click', () => {
  window.location.href = 'signin.html';
});
/*------------------------- To-do list -----------------------------------*/
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
let task = document.getElementById('inputTask').value.trim();
let deadline = document.getElementById('inputDate').value.trim();
let description = document.getElementById('description').value.trim();

const today = new Date().toISOString().slice(0, 10);
if (task !== '' && deadline !== '' && description !== '') {
  if (deadline >= today) {
    const li = document.createElement('li');
    const taskDiv = document.createElement('div')
    taskDiv.innerHTML = 
    `<blockquote>
    <strong>${task}</strong><br>
    ${description}<br><br>
    By: ${deadline}<br><br>
    </blockquote>`
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', () => {
      li.classList.toggle('done', checkbox.checked);
      saveTasks();
    });
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '❌';
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.addEventListener('click', () => {
      li.remove();
      saveTasks();
    });

    const space = document.createElement('span');
    space.textContent = '     ';


    const editBtn = document.createElement('button');
    editBtn.textContent = '✏️';
    editBtn.classList.add('editBtn');
    editBtn.addEventListener('click', () => {
      let updatedTaskTitle = prompt('Enter updated task title:', task);
      let updatedDescription = prompt('Enter updated description:', description);
      let updatedDeadline = prompt('Enter updated deadline (YYYY-MM-DD):', deadline);

      if (updatedTaskTitle && updatedDescription && updatedDeadline) {
        task = updatedTaskTitle;
        description = updatedDescription;
        deadline = updatedDeadline;

        taskDiv.innerHTML = 
        `<blockquote>
        <strong>${task}</strong><br>
        ${description}<br><br>
        By: ${deadline}<br><br>
        </blockquote>`;

       
        saveTasks();
      }
    });


    li.appendChild(checkbox);
    li.appendChild(taskDiv);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    li.appendChild(space);

    const taskList = document.getElementById('taskList');
    taskList.insertBefore(li, taskList.firstChild);

    saveTasks();
    document.getElementById('inputTask').value = '';
    document.getElementById('inputDate').value = '';
    document.getElementById('description').value='';

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