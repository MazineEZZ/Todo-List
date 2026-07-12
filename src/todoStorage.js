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

loadTasks();
saveTasks();

function createTODO(title, description) { // due dates and priorities come later
    const id = crypto.randomUUID()
    const isComplete = false;
    return { id, title, description, isComplete };
}

function addTODO(title, description) {
    tasksArray.push(createTODO(title, description));
    saveTasks();
}

function deleteTODO(id) {
    const remainingTasks = tasksArray.filter(task => task.id !== id);

    // To keep tasksArray in sync with index.js 
    tasksArray.length = 0;
    tasksArray.push(...remainingTasks)

    saveTasks();
}

function setTODOAsComplete(id) {
    tasksArray.forEach(task => {
        if (task.id === id) {
            task.isComplete = true;
        }
    })
    console.log(tasksArray);
    saveTasks();
}

function updateTasksArray() {
    saveTasks();
}

function getTaskById(id) {
    return tasksArray.find(task => task.id === id);
}

function saveTasks() {
    const tasksJSON = JSON.stringify(tasksArray);
    localStorage.setItem("tasks", tasksJSON);
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        tasksArray.length = 0;

        tasksArray.push(...tasks);
    }
    return;
}

export { tasksArray, addTODO, deleteTODO, setTODOAsComplete, getTaskById, updateTasksArray };