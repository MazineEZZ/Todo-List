import { renderSidebar, renderContentView, renderEditTaskModal, renderAddTaskModal } from "./render.js";
import { tasksArray, addTODO, deleteTODO, setTODOAsComplete, getTaskById } from "./todoStorage.js";
import "./reset.css"
import "./styles.css";

// Global Variables
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

function getModalTaskDetails(type) {
    const titleInput = document.querySelector(`#${type}-task-title`);
    const descriptionInput = document.querySelector(`#${type}-task-desc`);

    const title = titleInput.value;
    const description = descriptionInput.value;

    return { title, description };
}

function addNewTask(title, desc) {
    addTODO(title, desc);
    refreshPage();
}

function setUpEventListeners(appContainer, modalContainer) {
    appContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            const taskId = e.target.closest(".task-item").dataset.id;

            deleteTODO(taskId);
            refreshPage();
        }

        if (e.target.classList.contains("mark-complete-btn")) {
            const taskId = e.target.closest(".task-item").dataset.id;

            setTODOAsComplete(taskId);
            refreshPage();
        }
        
        if (e.target.classList.contains("edit-task-btn")) {
            const taskId = e.target.closest(".task-item").dataset.id;
            const task = getTaskById(taskId);
        
            appendModal(renderEditTaskModal(task.id, task.title, task.description));
        }

        if (e.target.classList.contains("add-task-btn")) {
            appendModal(renderAddTaskModal());
        }
    });

    modalContainer.addEventListener("click" , (e) => {
        if (e.target.classList.contains("cancel-modal-btn")) {
            const taskModal = e.target.closest("[id$=task-modal]");
            const type = taskModal.dataset.type;
            const taskId = taskModal.dataset.id; 
            
            removeModal(e.target.closest(`.${type}-task-dialog`));
        }
        
        if (e.target.classList.contains("save-modal-btn")) {
            e.preventDefault();
            const taskModal = e.target.closest("[id$=task-modal]");
            const type = taskModal.dataset.type;
            const taskId = taskModal.dataset.id;

            const taskDetails = getModalTaskDetails(type);

            if (taskDetails.title.trim() === "") {
                alert("Task Title cannot be empty!");
                return;
            }
            
            updateTaskDetails(taskId, taskDetails);
            removeModal(taskModal);
            refreshPage();
        }

        if (e.target.classList.contains("add-modal-btn")) {
            e.preventDefault();
            const taskModal = e.target.closest("[id$=task-modal]");
            const type = taskModal.dataset.type;
            const taskTitle = document.querySelector(`#${type}-task-title`).value;
            const taskDescription = document.querySelector(`#${type}-task-desc`).value;

            if (taskTitle.trim() === "") {
                alert("Task Title cannot be empty!");
                return;
            }

            removeModal(taskModal);
            addNewTask(taskTitle, taskDescription);
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
    
    const sidebar = renderSidebar();
    const contentView = renderContentView("Inbox", tasksArray);

    setUpEventListeners(appContainer, modalContainer);
    
    appContainer.appendChild(sidebar);
    appContainer.appendChild(contentView);
    
    document.body.appendChild(appContainer);
}


initializeApp();