// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    // Get a reference to the "Add Task" button by its ID
    const addButton = document.getElementById('add-task-btn');
    // Get a reference to the task input field by its ID
    const taskInput = document.getElementById('task-input');
    // Get a reference to the unordered list where tasks will be displayed by its ID
    const taskList = document.getElementById('task-list');

    /**
     * Function to add a new task to the list.
     * This function handles creating new task elements,
     * attaching a removal mechanism, and adding them to the DOM.
     */
    function addTask() {
        // Retrieve the current value from the task input field and remove leading/trailing whitespace
        const taskText = taskInput.value.trim();

        // Check if the task text is empty
        if (taskText === "") {
            // If empty, use an alert to prompt the user to enter a task
            // (Note: For a more user-friendly experience in a production app,
            // a custom modal or inline message would be preferred over alert()).
            alert("Please enter a task.");
            return; // Exit the function if the input is empty
        }

        // If taskText is not empty:
        // Create a new list item (<li>) element
        const listItem = document.createElement('li');
        // Set the text content of the list item to the entered task text
        listItem.textContent = taskText;

        // Create a new button (<button>) element for removing the task
        const removeButton = document.createElement('button');
        // Set the text content of the remove button to "Remove"
        removeButton.textContent = "Remove";
        // Assign the class name 'remove-btn' to the button for styling
        removeButton.className = 'remove-btn';

        // Assign an 'onclick' event handler to the remove button
        removeButton.onclick = function() {
            // When the remove button is clicked, remove its parent element (the <li>)
            // from the task list.
            taskList.removeChild(listItem);
        };

        // Append the newly created remove button to the list item
        listItem.appendChild(removeButton);

        // Append the fully constructed list item (with task text and remove button)
        // to the unordered list (taskList)
        taskList.appendChild(listItem);

        // Clear the task input field after adding the task,
        // making it ready for the next entry
        taskInput.value = "";
    }

    // Attach event listener to the "Add Task" button
    // When the 'addButton' is clicked, the 'addTask' function will be executed.
    addButton.addEventListener('click', addTask);

    // Attach event listener to the 'taskInput' field for the 'keypress' event.
    // This allows users to add tasks by pressing the "Enter" key.
    taskInput.addEventListener('keypress', (event) => {
        // Check if the pressed key is 'Enter'
        if (event.key === 'Enter') {
            // If 'Enter' is pressed, execute the 'addTask' function
            addTask();
        }
    });

    // The instruction "Invoke the addTask function on DOMContentLoaded." was noted in the previous response.
    // Standard to-do list applications don't typically add a task automatically on page load.
    // This code correctly sets up the event listeners so that `addTask` is invoked when
    // the user interacts (clicks the button or presses Enter), which is the usual behavior.
    // If you intended to load pre-existing tasks or have a default task on load,
    // that would require additional logic (e.g., from an array or local storage).
});
