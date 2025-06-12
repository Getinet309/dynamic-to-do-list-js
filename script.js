document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addButton = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTaskToDOM(taskText, false));
    }

    // Function to add a new task to the DOM
    function addTaskToDOM(taskText, saveToStorage = true) {
        if (taskText.trim() !== "") {
            const listItem = document.createElement('li');
            listItem.textContent = taskText;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.className = 'remove-btn';
            removeButton.onclick = function() {
                listItem.remove();
                updateLocalStorage();
            };

            listItem.appendChild(removeButton);
            taskList.appendChild(listItem);
            taskInput.value = '';

            if (saveToStorage) {
                updateLocalStorage();
            }
        } else {
            alert('Please enter a task!');
        }
    }

    // Function to update Local Storage with the current tasks
    function updateLocalStorage() {
        const tasks = Array.from(taskList.children).map(li => li.firstChild.textContent);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Event listener for adding a task
    addButton.addEventListener('click', () => {
        addTaskToDOM(taskInput.value);
    });

    // Event listener for adding a task by pressing Enter
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTaskToDOM(taskInput.value);
        }
    });

    // Load tasks from Local Storage when the page loads
    loadTasks();
});
