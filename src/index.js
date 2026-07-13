import { renderSidebar, renderContentView, renderEditTaskModal, renderAddTaskModal, pad } from "./render.js";
import { tasksArray, addTODO, deleteTODO, setTODOAsComplete, getTaskById, updateTasksArray } from "./todoStorage.js";
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
    task.dueDate = newTask.dueDate;

    updateTasksArray();
}

function getModalTaskDetails(type) {
    const titleInput = document.querySelector(`#${type}-task-title`);
    const descriptionInput = document.querySelector(`#${type}-task-desc`);
    const dueDateOption = document.querySelector(`#${type}-task-dueDate>.selected`);

    const title = titleInput.value;
    const description = descriptionInput.value;
    const dueDate = getDate(dueDateOption.id);

    return { title, description, dueDate };
}

function getDate(option) {
    const months31 = [1, 3, 5, 7, 8, 10, 12];
    const months30 = [4, 6, 9, 11];

    const now = new Date();
    let year = now.getFullYear();    
    let month = now.getMonth() + 1;
    let day = now.getDate();

    if (option.match("today")) {
        return `${year}-${pad(month)}-${pad(day)}`;
    } else if (option.match("tmrw")) {
        let nextDay = day + 1;

        if (month == 2) {
            const maxFeb = isLeapYear(year) ? 29 : 28;
            if (nextDay > maxFeb) {
                nextDay = 1;
                month++;
            } 
        } else if (months30.includes(month)) {
            if (nextDay > 30) {
                nextDay = 1;
                month++;
            }
        } else if (months31.includes(month)) {
            if (nextDay > 31) {
                nextDay = 1;
                month++;
            }
        }

        if (month > 12) {
            month = 1;
            year++;
        }

        return `${year}-${pad(month)}-${pad(nextDay)}`;
    }
}

function isLeapYear(year) {
    return (!(year % 4)) ? ((!(year % 100)) ? !(year % 400) : true ): false;
}

function addNewTask(title, desc, dueDate) {
    addTODO(title, desc, dueDate);
    refreshPage();
}

function toggleDueDateOption(option) {
    const options = document.querySelectorAll(".dueDate-option");

    options.forEach(opt => {
        opt.classList.remove("selected");
    })

    option.classList.add("selected");
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
        
            appendModal(renderEditTaskModal(task.id, task.title, task.description, task.dueDate));
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
            const newTask = getModalTaskDetails(type);

            if (newTask.title.trim() === "") {
                alert("Task Title cannot be empty!");
                return;
            }

            removeModal(taskModal);
            addNewTask(...Object.values(newTask));
        }

        if (e.target.classList.contains("dueDate-option")) {
            toggleDueDateOption(e.target);
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