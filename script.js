// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    /**
     * Function to add a new task to the list.
     */
    function addTask() {
        // Retrieve and trim the value from the task input field
        const taskText = taskInput.value.trim();

        // Check if taskText is not empty
        if (taskText === "") {
            alert("Please enter a task.");
            return; // Exit the function if the input is empty
        }

        // Create a new li element for the task
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create a new button element for removing the task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Assign an onclick event to the remove button
        removeButton.onclick = function() {
            taskList.removeChild(listItem); // Remove the li element from taskList
        };

        // Append the remove button to the li element
        listItem.appendChild(removeButton);

        // Append the li to the taskList
        taskList.appendChild(listItem);

        // Clear the task input field
        taskInput.value = "";
    }

    // Attach event listener to the "Add Task" button
    addButton.addEventListener('click', addTask);

    // Add event listener to the task input for 'keypress' to allow adding tasks with Enter key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Note: The instruction "Invoke the addTask function on DOMContentLoaded." seems contradictory
    // to typical to-do list behavior (where tasks are added by user interaction, not automatically
    // on page load). I will interpret this as setting up the event listeners on DOMContentLoaded,
    // which is already done above. If you truly meant to add a pre-defined task on load, please clarify.
});
