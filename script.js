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
     * It also manages saving tasks to Local Storage.
     *
     * @param {string} taskTextParam - The text of the task to add.
     * @param {boolean} [save=true] - A flag indicating whether to save the task to Local Storage.
     * Defaults to true, set to false when loading from storage.
     */
    function addTask(taskTextParam, save = true) {
        // Use the provided taskTextParam if available, otherwise get from input field
        const taskText = taskTextParam ? taskTextParam.trim() : taskInput.value.trim();

        // Check if the task text is empty
        if (taskText === "") {
            // Only alert if the task is being added manually (not loaded from storage)
            if (save) {
                alert("Please enter a task.");
            }
            return; // Exit the function if the input is empty
        }

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
            // Get the text of the task before removing the DOM element
            // We need to carefully extract the text content without the "Remove" button's text
            const textContentWithoutButton = listItem.firstChild.textContent.trim();

            // Remove the list item from the DOM
            taskList.removeChild(listItem);

            // Update Local Storage after removing from DOM
            let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            // Filter out the task that was just removed
            storedTasks = storedTasks.filter(task => task !== textContentWithoutButton);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        };

        // Append the newly created remove button to the list item
        listItem.appendChild(removeButton);

        // Append the fully constructed list item (with task text and remove button)
        // to the unordered list (taskList)
        taskList.appendChild(listItem);

        // Clear the task input field only if the task was added manually (not loaded)
        if (save) {
            taskInput.value = "";
        }

        // Save to Local Storage if the 'save' flag is true (i.e., not loading from storage)
        if (save) {
            let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    /**
     * Function to load tasks from Local Storage when the page loads.
     * It retrieves stored tasks and populates the DOM.
     */
    function loadTasks() {
        // Retrieve tasks from Local Storage; if none, initialize as an empty array
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        // Iterate over each stored task and add it to the DOM
        storedTasks.forEach(taskText => {
            // Call addTask with the task text and 'false' for 'save' to prevent re-saving
            addTask(taskText, false);
        });
    }

    // Attach event listener to the "Add Task" button
    // When the 'addButton' is clicked, the 'addTask' function will be executed.
    // We pass null for the taskTextParam as it will be read directly from the input.
    addButton.addEventListener('click', () => addTask(null, true));

    // Attach event listener to the 'taskInput' field for the 'keypress' event.
    // This allows users to add tasks by pressing the "Enter" key.
    taskInput.addEventListener('keypress', (event) => {
        // Check if the pressed key is 'Enter'
        if (event.key === 'Enter') {
            // If 'Enter' is pressed, execute the 'addTask' function
            // We pass null for the taskTextParam as it will be read directly from the input.
            addTask(null, true);
        }
    });

    // Invoke the loadTasks function when the DOM content is fully loaded.
    // This ensures that any previously saved tasks are displayed when the page opens.
    loadTasks();
});
