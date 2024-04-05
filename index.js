document.addEventListener('DOMContentLoaded', function () {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  const renderTasks = (tasksArray) => {
    const sortedTasks = tasksArray ? tasksArray.slice().sort((a, b) => new Date(a.deadline) - new Date(b.deadline)) : tasks.slice().sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    sortedTasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <blockquote>
          <strong>${task.title}</strong><br>
          ${task.description}<br><br>
          Deadline: ${task.deadline}<br><br>
          Reminder: ${task.reminder ? task.reminder : 'Not set'}<br><br>
          <button class="editBtn" onclick="editTask(${index})">Edit</button>
          <button class="deleteBtn" onclick="deleteTask(${index})">Delete</button>
        </blockquote>
      `;
      taskList.appendChild(li);
    });

    attachTaskEventListeners();
  }

  const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  const editTask = (index) => {
    const newTitle = prompt('Enter new title:', tasks[index].title);
    if (newTitle !== null && newTitle.trim() !== '') {
      tasks[index].title = newTitle.trim();
      saveTasks();
      renderTasks();
    }
  }

  const deleteTask = (index) => {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }

  const attachTaskEventListeners = () => {
    const editButtons = document.querySelectorAll('button.editBtn');
    const deleteButtons = document.querySelectorAll('button.deleteBtn');

    editButtons.forEach(button => {
      button.addEventListener('click', () => {
        const listItem = button.parentElement;
        const index = Array.from(listItem.parentNode.children).indexOf(listItem);
        editTask(index);
      });
    });

    deleteButtons.forEach(button => {
      button.addEventListener('click', () => {
        const listItem = button.parentElement;
        const index = Array.from(listItem.parentNode.children).indexOf(listItem);
        deleteTask(index);
      });
    });
  }

  document.getElementById('addBtn').addEventListener('click', () => {
    const task = document.getElementById('inputTask').value.trim();
    const deadline = document.getElementById('inputDate').value.trim();
    const description = document.getElementById('description').value.trim();
    const reminder = document.getElementById('reminder').value.trim(); // Added reminder input

    const today = new Date().toISOString().slice(0, 10);

    if (task && deadline && description && deadline >= today) {
      tasks.push({ title: task, deadline, description, reminder });
      saveTasks();
      renderTasks();
    } else {
      alert('Please fill in all fields with valid data.');
    }
  });

  document.getElementById('searchInput').addEventListener('input', function() {
    const searchQuery = this.value.trim().toLowerCase();
    const filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(searchQuery));
    renderTasks(filteredTasks);
  });

  document.getElementById('sortBtn').addEventListener('click', () => {
    renderTasks();
  });

  renderTasks();

  function signUp() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    users.push({ name, email, password, tasks: [] });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Sign up successful! You can now sign in.');
  }

  function signIn() {
    const email = document.getElementById('signInEmail').value;
    const password = document.getElementById('signInPassword').value;
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      tasks.splice(0, tasks.length, ...user.tasks);
      renderTasks();
    } else {
      alert('Invalid credentials. Please try again.');
    }
  }

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser) {
    tasks.splice(0, tasks.length, ...currentUser.tasks);
    renderTasks();
  }

  // Function to check reminders
  const checkReminders = () => {
    const now = new Date();
    tasks.forEach(task => {
      if (task.reminder && new Date(task.reminder) <= now) {
        alert(`Reminder: ${task.title}`);
      }
    });
  }

  // Check reminders every minute
  setInterval(checkReminders, 86400000);
});
