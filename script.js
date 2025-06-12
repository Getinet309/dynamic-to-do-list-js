// Ensure the JavaScript code runs after the HTML document has fully loaded.
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM Elements:
    // Select the "Add Task" button
    const addButton = document.getElementById('add-task-btn');
    // Select the input field for tasks
    const taskInput = document.getElementById('task-input');
    // Select the unordered list that will display tasks
    const taskList = document.getElementById('task-list');

    // Create the addTask Function:
    // This function will be responsible for adding new tasks to the list.
    const addTask = () => {
        // Retrieve and trim the value from the task input field.
        const taskText = taskInput.value.trim();

        // Check if taskText is not empty.
        if (taskText === "") {
            // If it is empty, prompt the user to enter a task.
            alert("Please enter a task.");
            return; // Exit the function if no task is entered
        }

        // Task Creation:
        // Create a new li element.
        const listItem = document.createElement('li');
        // Set its textContent to taskText.
        listItem.textContent = taskText;

        // Create a new button element for removing the task.
        const removeButton = document.createElement('button');
        // Set its textContent to "Remove".
        removeButton.textContent = "Remove";
        // Give it a class name of 'remove-btn'.
        removeButton.className = 'remove-btn';

        // Assign an onclick event to the remove button that, when triggered,
        // removes the li element from taskList.
        removeButton.onclick = () => {
            taskList.removeChild(listItem);
        };

        // Append the remove button to the li element.
        listItem.appendChild(removeButton);
        // Append the li to taskList.
        taskList.appendChild(listItem);

        // Clear the task input field by setting taskInput.value to an empty string.
        taskInput.value = "";
    };

    // Attach Event Listeners:
    // Add an event listener to addButton that calls addTask when the button is clicked.
    addButton.addEventListener('click', addTask);

    // Add an event listener to taskInput for the 'keypress' event to allow
    // tasks to be added by pressing the “Enter” key.
    taskInput.addEventListener('keypress', (event) => {
        // Inside this event listener, check if event.key is equal to 'Enter'.
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
