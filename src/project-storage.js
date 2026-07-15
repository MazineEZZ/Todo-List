let projectsArray = [
    {
        id: crypto.randomUUID(),
        title: "Family"
    }, 
    {
        id: crypto.randomUUID(),
        title: "School"
    }
];

loadProjects();
saveProject();

function createProject(title, description) {
    return {
        id: crypto.randomUUID(),
        title,
        description
    }
}

function addProject(title, description) {
    const project = createProject(title.toLowerCase(), description);
    projectsArray.push(project);

    saveProject();

    return project;
}

function getProjectById(id) {
    return projectsArray.find(project => project.id === id);
}

function deleteProject(id) {
    const remainingProjects = projectsArray.filter(project => project.id !== id);
    
    projectsArray.length = 0;
    projectsArray.push(...remainingProjects)

    saveProject();
}

function updateProjectsArray() {
    saveProject();
}

function saveProject() {
    const projectsJSON = JSON.stringify(projectsArray);
    localStorage.setItem("projects", projectsJSON);
}

function loadProjects() {
    const projects = JSON.parse(localStorage.getItem("projects"));
    if (projects) {
        projectsArray.length = 0;

        projectsArray.push(...projects);
    }
    return;
}

export { projectsArray, addProject, getProjectById, updateProjectsArray, deleteProject };