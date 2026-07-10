let tasksArray = [];

function createTODO(title, description) { // due dates and priorities come later
    const id = crypto.randomUUID()
    const isComplete = false;
    return { id, title, description, isComplete};
}

function addTODO(title, description) {
    tasksArray.push(createTODO(title, description));
}

function deleteTODO(id) {
    tasksArray = tasksArray.filter(task => task.id !== id);
}

function setTODOAsComplete(id) {
    tasksArray.forEach(task => {
        if (task.id === id) {
            task.isComplete = true;
        }
    })
    console.log(tasksArray);
}

function getTaskById(id) {
    return tasksArray.find(task => task.id === id);
}

export { tasksArray, addTODO, deleteTODO, setTODOAsComplete, getTaskById };