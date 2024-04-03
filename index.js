document.addEventListener('DOMContentLoaded', function () {
    const signUpForm = document.getElementById('sign-up');

    signUpForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Get user input
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Perform validation (e.g., check if fields are not empty)
        if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
            alert('Please enter all fields.');
            return;
        }

        // Save user data to local storage
        const userData = { name, email, password };
        localStorage.setItem('userData', JSON.stringify(userData));

        // Redirect to sign-in page
        window.location.href = 'signin.html';
    });
});

// ----------------------Login---------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
    const signInForm = document.getElementById('sign-in-form');

    signInForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Get user input
        const email = document.getElementById('signInEmail').value;
        const password = document.getElementById('signInPassword').value;

        // Perform validation (e.g., check if fields are not empty)
        if (email.trim() === '' || password.trim() === '') {
            alert('Please enter both email and password.');
            return;
        }

        // Retrieve user data from local storage
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
            // Check if the provided email and password match the saved data
            if (email === userData.email && password === userData.password) {
                // Store authentication status in local storage
                localStorage.setItem('isLoggedIn', true);
                // Redirect to the to-do list or home page
                window.location.href = 'index.html';
            } else {
                alert('Authentication failed. Please check your credentials.');
            }
        } else {
            alert('User data not found. Please sign up first.');
            // Redirect to sign-up page
            window.location.href = 'signup.html';
        }
    });
});
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
      d

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


