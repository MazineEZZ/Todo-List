let projectsArray = [
    {
        id: crypto.randomUUID(),
        name: "Family"
    }, 
    {
        id: crypto.randomUUID(),
        name: "School"
    }
];

function createProject(name, description) {
    return {
        id: crypto.randomUUID(),
        name,
        description
    }
}

function addProject(name, description) {
    const project = createProject(name.toLowerCase(), description);
    projectsArray.push(project);
}

function getProjectById(id) {
    return projectsArray.find(project => project.id === id);
}

function updateProjectsArray() {
    return;
}

export { projectsArray, addProject, getProjectById, updateProjectsArray };