let tasksArray = [
    {
        id: crypto.randomUUID(),
        title: "Go grocery shopping",
        description: "Buy milk, eggs, and vegetables",
        isComplete: false,
    },
    {
        id: crypto.randomUUID(),
        title: "Make lunch",
        description: "Vegetable stew",
        isComplete: false,
    }
];

loadTasksArray();
updateTasksArray();

function createTODO(title, description) { // due dates and priorities come later
    const id = crypto.randomUUID()
    const isComplete = false;
    return { id, title, description, isComplete };
}

function addTODO(title, description) {
    tasksArray.push(createTODO(title, description));
    updateTasksArray();
}

function deleteTODO(id) {
    tasksArray = tasksArray.filter(task => task.id !== id);

    updateTasksArray();
}

function setTODOAsComplete(id) {
    tasksArray.forEach(task => {
        if (task.id === id) {
            task.isComplete = true;
        }
    })
    console.log(tasksArray);
    updateTasksArray();
}

function getTaskById(id) {
    return tasksArray.find(task => task.id === id);
}

function updateTasksArray() {
    const tasksJSON = JSON.stringify(tasksArray);
    localStorage.setItem("tasks", tasksJSON);
}

function loadTasksArray() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        tasksArray.length = 0;

        tasksArray.push(...tasks);
    }
    return;
}

export { tasksArray, addTODO, deleteTODO, setTODOAsComplete, getTaskById };