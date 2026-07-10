import { renderSidebar, renderContentView } from "./render.js";
import "./reset.css"
import "./styles.css";

// Global Variables
let tasksArray = [];

function createTODO(title, description) { // due dates and priority come later
    const id = crypto.randomUUID()
    return { id, title, description };
}

function addTODO(title, description) {
    tasksArray.push(createTODO(title, description));
}

function listTODOs() {
}

function initializeApp() {
    const appContainer = document.createElement("div");
    appContainer.classList.add("app-container");
    appContainer.setAttribute("id", "app-container");
    
    addTODO("Go grocery shopping", "Buy milk, eggs, and vegetables");
    addTODO("Make lunch", "Vegetable stew");
    
    const sidebar = renderSidebar();
    const contentView = renderContentView("Inbox", tasksArray)
    
    appContainer.appendChild(sidebar);
    appContainer.appendChild(contentView);
    
    document.body.appendChild(appContainer);
}

initializeApp();

// DOM elements
const mainFilters = document.querySelectorAll(".filter");
