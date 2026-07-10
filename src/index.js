import { renderSidebar, renderContentView } from "./render.js";
import "./reset.css"
import "./styles.css";

// Global Variables
let tasksArray = [];

function createTODO(title, description) { // due dates and priority come later
    const id = crypto.randomUUID()
    const isComplete = false;
    return { id, title, description, isComplete};
}

function addTODO(title, description) {
    tasksArray.push(createTODO(title, description));
}

function listTODOs() {
}

function deleteTODO(id) {
    tasksArray = tasksArray.filter(task => task.id !== id);
}

function toggleCompleteTODO(id) {
    tasksArray.forEach(task => {
        if (task.id === id) {
            task.isComplete = !task.isComplete;
        }
    })
}

function refreshPage() {
    const appContainer = document.querySelector("#app-container");
    appContainer.removeChild(appContainer.querySelector("#main-content"));

    const contentView = renderContentView("Inbox", tasksArray);

    appContainer.appendChild(contentView);
}

function setUpEventListeners(appContainer) {
    appContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            const taskItem = e.target.closest(".task-item");
            const taskId = taskItem.dataset.id;

            deleteTODO(taskId);
            refreshPage();
        }
    });
}

function initializeApp() {
    document.body.replaceChildren();

    const appContainer = document.createElement("div");
    appContainer.classList.add("app-container");
    appContainer.setAttribute("id", "app-container");
    
    addTODO("Go grocery shopping", "Buy milk, eggs, and vegetables");
    addTODO("Make lunch", "Vegetable stew");
    
    const sidebar = renderSidebar();
    const contentView = renderContentView("Inbox", tasksArray);

    setUpEventListeners(appContainer);
    
    appContainer.appendChild(sidebar);
    appContainer.appendChild(contentView);
    
    document.body.appendChild(appContainer);
}

initializeApp();