let tasksArray = [
    {
        id: crypto.randomUUID(),
        title: "Go grocery shopping",
        description: "Buy milk, eggs, and vegetables",
        isComplete: false,
        project: "inbox"
    },
    {
        id: crypto.randomUUID(),
        title: "Make lunch",
        description: "Vegetable stew",
        isComplete: false,
        project: "inbox"
    }
];

loadTasks();
saveTasks();

function createTODO(title, description, dueDate, priority, project) { // due dates and priorities come later
    const id = crypto.randomUUID()
    const isComplete = false;
    return {
        id, // Number/ID
        title, // String/Text
        description, // String/Text
        isComplete, // Boolean
        dueDate, // String
        priority, // String
        project,
    };
}

function addTODO(title, description, dueDate, priority, project) {
    const task = createTODO(title, description, dueDate, priority, project.toLowerCase())
    tasksArray.push(task);

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