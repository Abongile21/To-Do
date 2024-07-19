document.addEventListener('DOMContentLoaded', () => {
  const inputTask = document.getElementById('inputTask');
  const inputDate = document.getElementById('inputDate');
  const inputPriority = document.getElementById('inputPriority');
  const description = document.getElementById('description');
  const addBtn = document.getElementById('addBtn');
  const taskList = document.getElementById('taskList');
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const logoutBtn = document.getElementById('logoutBtn');

  
  const loadTasks = () => {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.forEach(task => createTaskElement(task));
  };

  
  const saveTasks = () => {
      const tasks = [];
      document.querySelectorAll('.task-item').forEach(taskItem => {
          const task = {
              title: taskItem.querySelector('h3').textContent,
              deadline: taskItem.querySelector('p').textContent,
              description: taskItem.querySelectorAll('p')[1].textContent,
              priority: taskItem.querySelector('.priority').textContent,
              reminder: taskItem.querySelector('.reminder-checkbox').checked,
              status: taskItem.querySelector('.status-select').value
          };
          tasks.push(task);
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  
  const addTask = () => {
      const task = inputTask.value.trim();
      const deadline = inputDate.value;
      const desc = description.value.trim();
      const priority = inputPriority.value;

      if (task && deadline && desc && priority) {
          const taskObj = {
              title: task,
              deadline: deadline,
              description: desc,
              priority: priority,
              reminder: false,
              status: 'Pending'
          };
          createTaskElement(taskObj);
          saveTasks();
          inputTask.value = '';
          inputDate.value = '';
          description.value = '';
          inputPriority.value = 'Priority';
      } else {
          alert('Please fill out all fields.');
      }
  };


  const createTaskElement = (task) => {
      const li = document.createElement('li');
      li.className = 'task-item bg-gray-100 p-4 rounded-lg shadow-md';
      li.innerHTML = `
          <h3 class="text-lg font-semibold">${task.title}</h3>
          <p class="text-sm text-gray-600">${task.deadline}</p>
          <p class="text-gray-800">${task.description}</p>
          <p class="priority text-sm text-gray-700 mb-2">${task.priority}</p>
          <label class="inline-flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" class="checkbox reminder-checkbox" ${task.reminder ? 'checked' : ''}>
              <span class="text-sm text-gray-700">Reminder</span>
          </label>
          <select class="select status-select mt-2 ">
              <option value="Pending" ${task.status === 'Pending' ? 'selected' : ''}>Pending</option>
              <option value="In Progress" ${task.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
              <option value="Completed" ${task.status === 'Completed' ? 'selected' : ''}>Completed</option>
          </select>
          <div class="mt-2 flex space-x-2">
              <button class="btn btn-sm btn-warning editBtn"><i class="fa-solid fa-pen"></i> Edit</button>
              <button class="btn btn-sm btn-error deleteBtn"><i class="fa-solid fa-trash"></i> Delete</button>
          </div>
      `;

      taskList.appendChild(li);

            li.querySelector('.editBtn').addEventListener('click', () => editTask(li, task));
      li.querySelector('.deleteBtn').addEventListener('click', () => deleteTask(li));
      li.querySelector('.reminder-checkbox').addEventListener('change', saveTasks);
      li.querySelector('.status-select').addEventListener('change', saveTasks);

     
      if (task.reminder) {
          const reminderTime = new Date(task.deadline).getTime() - Date.now();
          if (reminderTime > 0) {
              setTimeout(() => alert(`Reminder: ${task.title}`), reminderTime);
          }
      }
  };

    const editTask = (li, task) => {
      inputTask.value = task.title;
      inputDate.value = task.deadline;
      description.value = task.description;
      inputPriority.value = task.priority;
      deleteTask(li);
  };

  
  const deleteTask = (li) => {
      li.remove();
      saveTasks();
  };

  
  const searchTasks = () => {
      const searchTerm = searchInput.value.toLowerCase();
      const tasks = document.querySelectorAll('.task-item');

      tasks.forEach(task => {
          const taskText = task.querySelector('h3').textContent.toLowerCase();
          const taskDesc = task.querySelectorAll('p')[1].textContent.toLowerCase();

          if (taskText.includes(searchTerm) || taskDesc.includes(searchTerm)) {
              task.style.display = '';
          } else {
              task.style.display = 'none';
          }
      });
  };

  addBtn.addEventListener('click', addTask);
  searchBtn.addEventListener('click', searchTasks);
  searchInput.addEventListener('keyup', searchTasks);

 
  loadTasks();
});
