import { pad, getDate, toggleSelectedOption, getDueDateOption, toggleSelectedTab, capitalize } from "./utilities.js"
import { tasksArray, addTODO, deleteTODO, setTODOAsComplete, getTaskById, updateTasksArray } from "./todo-storage.js";
import { projectsArray, addProject, getProjectById, deleteProject } from "./project-storage.js";
import { removeModal, appendModal, editObj, getModalDetails } from "./modal-logic.js";
import { renderSidebar, renderContentView, renderEditTaskModal, renderAddTaskModal, renderAddProjectModal, renderEditProjectModal } from "./render-hub.js";
import "./reset.css";
import "./styles.css";

function refreshPage(project = false) {
    const appContainer = document.querySelector("#app-container");

    const selectedTab = getCurrentTab();
    
    appContainer.replaceChildren();
    
    const sidebar = renderSidebar(projectsArray);

    let tabName;

    console.log(project);
    if (project.id) {
        // Exact Match Selector for id, to prevent a bug that has to do with a selector starting with a number
        const projectDOM = sidebar.querySelector(`[data-id="${project.id}"]`);
        toggleSelectedTab(projectDOM);
        tabName = projectDOM.dataset.title;
    } else if (!(Array.from(selectedTab.classList).includes("removed"))) {
        tabName = selectedTab.dataset.title;
        toggleSelectedTab(sidebar.querySelector(`[data-title="${tabName}"]`));
    } else {
        tabName = appContainer.dataset.defaultTab;
        toggleSelectedTab(sidebar.querySelector(`[data-title="${tabName}"]`));
    }

    const contentView = renderContentView(tabName, tasksArray, project);

    appContainer.appendChild(sidebar);
    appContainer.appendChild(contentView);
}

function addNewTask(task) {
    return addTODO(
        task.title,
        task.description,
        task.dueDate,
        task.priority,
        task.projectId
    );
}

function addNewProject(project) {
    return addProject(
        project.title,
        project.description,
    );
}

function getCurrentTab() {
    return document.querySelector(".navigation .selected");
}

function isProjectTab(element = false) { 
    if (element) {
        return Array.from(element.classList).includes("project-tab");
    }
    return Array.from(getCurrentTab().classList).includes("project-tab");
}

function setUpEventListeners(appContainer, modalContainer) {
    appContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn") || e.target.classList.contains("delete-project-btn")) {
            let id;
            if (e.target.closest(".task-item")) {
                const task = e.target.closest(".task-item");
                id = task.dataset.id;
                deleteTODO(id);
                if (isProjectTab()) {
                    refreshPage(getProjectById(getCurrentTab().dataset.id));
                } else {
                    refreshPage();
                }
            } else if (e.target.closest(".project-tab")) {
                const project = e.target.closest(".project-tab");
                id = project.dataset.id;
                deleteProject(id);
                // To Indicate that's its removed
                project.classList.add("removed");
                refreshPage();
            }
        }
        
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

        if (e.target.closest(".tab") && ( e.target.tagName !== "BUTTON" || e.target.classList.contains("filter"))) {
            const tab = e.target.closest(".tab");
            let project = false;

            toggleSelectedTab(tab);

            if (isProjectTab(tab)) {
                project = getProjectById(tab.dataset.id);
            }
            refreshPage(project);
        }

        if (e.target.classList.contains("add-project-btn")) {
            appendModal(renderAddProjectModal())
        }

        if (e.target.classList.contains("edit-project-btn")) {
            const projectId = e.target.closest(".project-tab").dataset.id;
            const project = getProjectById(projectId);

            appendModal(renderEditProjectModal(project.id, project.title, project.description));
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
            
            if (type == "project") {
                refreshPage(detailsObj);
                return;
            }
            refreshPage();
        }
        
        if (e.target.classList.contains("add-modal-btn")) {
            e.preventDefault();
            const tabName = getCurrentTab().dataset.title;
            const modal = e.target.closest("[id$=-modal][class$=-dialog]");
            const type = modal.dataset.type;
            const subtype = modal.dataset.subtype;
            let newObj = getModalDetails(type, subtype);

            if (newObj.title.trim() === "") {
                alert(`${capitalize(type)} Title cannot be empty!`);
                return;
            }
            
            removeModal(modal);

            if (type == "task") {
                newObj.projectId = getCurrentTab().dataset.id;
                
                newObj = addNewTask(newObj);
            } else if (type == "project") {
                newObj = addNewProject(newObj);
            }

            if (isProjectTab()) {
                refreshPage(getProjectById(getCurrentTab().dataset.id));
                return;
            }
            refreshPage();
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
    
    appContainer.dataset.defaultTab = "inbox";
    const defaultTab = sidebar.querySelector(`[data-title=${appContainer.dataset.defaultTab}]`);
    toggleSelectedTab(defaultTab);
    
    setUpEventListeners(appContainer, modalContainer);
    
    appContainer.appendChild(sidebar);
    appContainer.appendChild(contentView);
    document.body.appendChild(appContainer);
}

initializeApp();