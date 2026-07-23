import { renderContentView } from "../dom/render-content";
import { deleteProjectTasks } from "./todo-storage";

let projectsArray = [
    {
        id: crypto.randomUUID(),
        title: "Family",
        color: "red"
    }, 
    {
        id: crypto.randomUUID(),
        title: "School",
        color: "yellow"
    }
];

loadProjects();
saveProject();

function createProject(title, description, color=false) {
    return {
        id: crypto.randomUUID(),
        title,
        description,
        color
    }
}

function addProject(obj) {
    const project = createProject(obj.title.toLowerCase(), obj.description);
    projectsArray.push(project);

    saveProject();
}

function getProjectById(id) {
    return projectsArray.find(project => project.id === id);
}

function deleteProject(id) {
    const remainingProjects = projectsArray.filter(project => project.id !== id);
    
    projectsArray.length = 0;
    projectsArray.push(...remainingProjects)

    deleteProjectTasks(id);

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