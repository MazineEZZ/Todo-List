let tasksArray = [
    {
        id: crypto.randomUUID(),
        title: "Go grocery shopping",
        description: "Buy milk, eggs, and vegetables",
        isComplete: false,
        priority: "medium",
        projectId: "inbox"
    },
    {
        id: crypto.randomUUID(),
        title: "Make lunch",
        description: "Vegetable stew",
        isComplete: false,
        priority: "high",
        projectId: "inbox"
    }
];

loadTasks();
saveTasks();

function createTODO(title, description, dueDate, priority, projectId) { // due dates and priorities come later
    const id = crypto.randomUUID()
    const isComplete = false;
    return {
        id, // Number/ID
        title, // String/Text
        description, // String/Text
        isComplete, // Boolean
        dueDate, // String
        priority, // String
        projectId, // Project ID
    };
}

function addTODO(obj) {
    const task = createTODO(obj.title, obj.description, obj.dueDate, obj.priority, obj.projectId)
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

function deleteProjectTasks(id) {
    tasksArray.forEach(task =>  task.projectId === id ? deleteTODO(task.id) : "");
}

function sortByDate() {
    return [...tasksArray].sort((a, b) => {
        let date1 = new Date(a.dueDate);
        let date2 = new Date(b.dueDate);

        return date1 - date2
    })
}

export { tasksArray, addTODO, deleteTODO, setTODOAsComplete, getTaskById, updateTasksArray, deleteProjectTasks, sortByDate };