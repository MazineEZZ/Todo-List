import { pad, getDate, toggleSelectedOption, getDueDateOption, toggleSelectedTab } from "./utilities.js"
import { tasksArray, addTODO, deleteTODO, setTODOAsComplete, getTaskById, updateTasksArray } from "./todo-storage.js";
import { projectsArray, addProject, getProjectById } from "./project-storage.js";
import { removeModal, appendModal, editObj, getModalDetails } from "./modal-logic.js";
import { renderSidebar, renderContentView, renderEditTaskModal, renderAddTaskModal, renderAddProjectModal, renderEditProjectModal } from "./render-hub.js";
import "./reset.css"
import "./styles.css";

function refreshPage(projectId false) {
    const appContainer = document.querySelector("#app-container");

    const selectedTab = getCurrentTab();
    
    appContainer.replaceChildren();
    
    const sidebar = renderSidebar(projectsArray);
    
    if (projectId) {
        // Exact Match Selector for id, to prevent a bug that has to do with a selector starting with a number
        const projectDOM = sidebar.querySelector(`#[id=${project.id}]`);
        toggleSelectedTab(projectDOM);
    } else {
        toggleSelectedTab(sidebar.querySelector(`[data-id=${selectedTab.dataset.id}]`));
    }

    const tabName = selectedTab.dataset.id;
    const contentView = renderContentView(tabName, tasksArray, project.description);

    appContainer.appendChild(sidebar);
    appContainer.appendChild(contentView);
}

function addNewTask(task) {
    addTODO(
        task.title,
        task.description,
        task.dueDate,
        task.priority,
        task.project
    );
}

function addNewProject(project) {
    addProject(
        project.title,
        project.description,
    );
}

function getCurrentTab() {
    return document.querySelector(".navigation .selected");
}

function isProjectTab(element) { 
    if (element) {
        return Array.from(element.classList).includes("project-tab");
    }
    return Array.from(getCurrentTab().classList).includes("project-tab");
}

function setUpEventListeners(appContainer, modalContainer) {
    appContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            const taskId = e.target.closest(".task-item").dataset.id;

            deleteTODO(taskId);
            refreshPage();
        
        if (e.target.classList.contains("mark-complete-btn")) {
            const taskId = e.target.closest(".task-item").dataset.id;

            setTODOAsComplete(taskId);
            refreshPage();
        }
        if (e.target.classList.contains("edit-task-btn")) {
            const taskId = e.target.closest(".task-item").dataset.id;
            const task = getTaskById(taskId);
            appendModal(renderEditTaskModal(task.id, task.title, task.description, task.dueDate, task.priority));
        }

        if (e.target.classList.contains("add-task-btn")) {
            appendModal(renderAddTaskModal());
        }

        if (e.target.classList.contains("tab")) {
            toggleSelectedTab(e.target);
            refreshPage();
        
        if (e.target.classList.contains("add-project-btn")) {
            appendModal(renderAddProjectModal())
        }
    });

    modalContainer.addEventListener("click" , (e) => {
        if (e.target.classList.contains("cancel-modal-btn")) {
            e.preventDefault();
            const modal = e.target.closest("[id$=-modal][class$=-dialog]");
            const type = modal.dataset.type;
            const subtype = modal.dataset.subtype;
            
            removeModal(e.target.closest(`.${subtype}-${type}-dialog`));
        }
        
        if (e.target.classList.contains("save-modal-btn")) {
            e.preventDefault();
            const modal = e.target.closest("[id$=-modal][class$=-dialog]");
            const type = modal.dataset.type;
            const subtype = modal.dataset.subtype;
            const id = modal.dataset.id;
            const detailsObj = editObj(id, type, subtype);
            
            if (detailsObj.title.trim() === "") {
                return;
            }
            
            removeModal(modal);
            refreshPage();
        
        if (e.target.classList.contains("add-modal-btn")) {
            e.preventDefault();
            const tabName = getCurrentTab().dataset.id;
            const modal = e.target.closest("[id$=-modal][class$=-dialog]");
            const type = modal.dataset.type;
            const subtype = modal.dataset.subtype;
            const newObj = getModalDetails(type, subtype);

            if (newObj.title.trim() === "") {
                alert("Task Title cannot be empty!");
                return;
            }
            
            removeModal(modal);

            if (type == "task") {
                newObj.project = tabName;
                
                addNewTask(newObj);
                refreshPage();
            } else if (type == "project") {
                addNewProject(newObj);
                refreshPage(newObj)
            }
            
        }

        if (e.target.classList.contains("dueDate-option")) {
            toggleSelectedOption(e.target, "dueDate");
        }

        if (e.target.classList.contains("priority-option")) {
            toggleSelectedOption(e.target, "priority");
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
    
    const sidebar = renderSidebar(projectsArray);
    const contentView = renderContentView("inbox", tasksArray);
    
    const defaultTab = sidebar.querySelector('[data-id="inbox"]');
    toggleSelectedTab(defaultTab);
    
    setUpEventListeners(appContainer, modalContainer);
    
    appContainer.appendChild(sidebar);
    appContainer.appendChild(contentView);
    
    document.body.appendChild(appContainer);
}

initializeApp();