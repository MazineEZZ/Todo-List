import { renderSidebar, renderContentView, renderEditTaskModal } from "./render.js";
import "./reset.css"
import "./styles.css";

// Global Variables
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

function refreshPage() {
    const appContainer = document.querySelector("#app-container");
    appContainer.removeChild(appContainer.querySelector("#main-content"));

    const contentView = renderContentView("Inbox", tasksArray);

    appContainer.appendChild(contentView);
}

function appendModal(modal) {
    const modalContainer = document.querySelector("#modal-container");
    modalContainer.appendChild(modal);
    modal.showModal();
}

function removeModal(modal) {
    const modalContainer = document.querySelector("#modal-container");
    modal.close();
    modalContainer.replaceChildren();
}

function updateTaskDetails(id, newTask) {
    const task = getTaskById(id);
    task.title = newTask.title;
    task.description = newTask.description;
}

function getModalTaskDetails() {
    const titleInput = document.querySelector("#edit-task-title");
    const descriptionInput = document.querySelector("#edit-task-desc");

    const title = titleInput.value;
    const description = descriptionInput.value;

    return { title, description };
}

function setUpEventListeners(appContainer, modalContainer) {
    appContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            const taskItem = e.target.closest(".task-item");
            const taskId = taskItem.dataset.id;

            deleteTODO(taskId);
            refreshPage();
        }

        if (e.target.classList.contains("mark-complete-btn")) {
            const taskItem = e.target.closest(".task-item");
            const taskId = taskItem.dataset.id;

            setTODOAsComplete(taskId);
            refreshPage();
        }
        
        if (e.target.classList.contains("edit-task-btn")) {
            const taskItem = e.target.closest(".task-item");
            const taskId = taskItem.dataset.id;
            const task = getTaskById(taskId);
        
            appendModal(renderEditTaskModal(task.id, task.title, task.description));
        }
    });

    modalContainer.addEventListener("click" , (e) => {
        if (e.target.classList.contains("cancel-modal-btn")) {
            removeModal(e.target.closest(".edit-task-dialog"));
        }
        
        if (e.target.classList.contains("save-modal-btn")) {
            e.preventDefault();
            const editTaskModal = e.target.closest("#edit-task-modal");
            const taskId = editTaskModal.dataset.id;

            updateTaskDetails(taskId, getModalTaskDetails());
            removeModal(editTaskModal);
            refreshPage();
        }
    });
}

function initializeModalContainer() {
    const modalContainer = document.createElement("div");
    modalContainer.classList.add("modal-container");
    modalContainer.setAttribute("id", "modal-container");

    document.body.appendChild(modalContainer);

    return modalContainer;
}

function initializeApp() {
    const modalContainer = initializeModalContainer();

    const appContainer = document.createElement("div");
    appContainer.classList.add("app-container");
    appContainer.setAttribute("id", "app-container");
    
    addTODO("Go grocery shopping", "Buy milk, eggs, and vegetables");
    addTODO("Make lunch", "Vegetable stew");
    
    const sidebar = renderSidebar();
    const contentView = renderContentView("Inbox", tasksArray);

    setUpEventListeners(appContainer, modalContainer);
    
    appContainer.appendChild(sidebar);
    appContainer.appendChild(contentView);
    
    document.body.appendChild(appContainer);
}


initializeApp();