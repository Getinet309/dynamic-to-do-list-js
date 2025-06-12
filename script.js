document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText !== "") {
            // Create a new list item
            const listItem = document.createElement('li');
            listItem.textContent = taskText;

            // Create a remove button
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.className = 'remove-btn';

            // Add event listener to the remove button
            removeButton.onclick = function() {
                taskList.removeChild(listItem);
            };

            // Append the remove button to the list item
            listItem.appendChild(removeButton);

            // Append the list item to the task list
            taskList.appendChild(listItem);

            // Clear the task input field
            taskInput.value = "";
        } else {
            alert("Please enter a task.");
        }
    }

    // Add event listener for the "Add Task" button
    addButton.addEventListener('click', addTask);

    // Add event listener for the "Enter" key press in the input field
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
