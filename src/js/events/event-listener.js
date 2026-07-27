import { appendModal, removeModal, updateDetails, getModalDetails, editObj } from "../logic/modal-logic.js";
import { toggleSelectedOption, toggleSelectedTab, getCurrentTab, capitalize, isProjectTab } from "../utils/utilities.js";
import { addProject, deleteProject, getProjectById, projectsArray } from "../storage/project-storage.js";
import { addTODO, deleteTODO, setTODOAsComplete, getTaskById } from "../storage/todo-storage.js";
import { renderAddProjectModal, renderAddTaskModal, renderEditProjectModal, renderEditTaskModal } from "../dom/render-modals.js";

function modifyModalBtn(target, refreshPage) {
    const modal = target.closest("[id$=-modal][class$=-dialog]");
    const type = modal.dataset.type;
    const subtype = modal.dataset.subtype;
    const id = modal.dataset.id;

    let obj;
    if (subtype === "add") {
        obj = getModalDetails(type, subtype);
        
        if (obj.title.trim() === "") {
            alert(`${capitalize(type)} Title cannot be empty!`);
            return;
        }       
        removeModal(modal);
        
        if (type == "task") {
            obj.projectId = getCurrentTab().dataset.id;
            
            addTODO(obj);
        } else if (type == "project") {
            addProject(obj);
        }
    } else if (subtype === "edit") {
        obj = editObj(id, type, subtype);
        
        if (obj.title.trim() === "") {
            alert(`${capitalize(type)} Title cannot be empty!`);
            return;
        }        
        removeModal(modal);
    }
    
    refresher(refreshPage)
}

function cancelModal(target) {
    const modal = target.closest("[id$=-modal][class$=-dialog]");
    const type = modal.dataset.type;
    const subtype = modal.dataset.subtype;
    
    removeModal(target.closest(`.${subtype}-${type}-dialog`));
}

function editProjectBtn(target) {
    let elmnt;
    if (target.id === "project-desc") {
        elmnt = getCurrentTab();
    } else {
        elmnt = target.closest(".project-tab");
    }
    const projectId = elmnt.dataset.id;
    const project = getProjectById(projectId);


    appendModal(renderEditProjectModal(project.id, project.title, project.description));
}

function editTaskBtn(target) {
    const taskId = target.closest(".task-item").dataset.id;
    const task = getTaskById(taskId);

    appendModal(renderEditTaskModal(task.id, task.title, task.description, task.dueDate, task.priority));
}

function refresher(refreshPage) {
    if (isProjectTab()) {
        refreshPage(getProjectById(getCurrentTab().dataset.id));
    } else {
        refreshPage();
    }
}

function deleteObjBtn(target, refreshPage) {
    let id;
    if (target.closest(".task-item")) {
        const task = target.closest(".task-item");
        id = task.dataset.id;
        deleteTODO(id);
        refresher(refreshPage);
    } else if (target.closest(".project-tab")) {
        const project = target.closest(".project-tab");
        id = project.dataset.id;
        deleteProject(id);
        // To Indicate that's its removed
        project.classList.add("removed");
        refreshPage();
    }
}

function markTaskComplete(target) {
    const taskId = target.closest(".task-item").dataset.id;

    setTODOAsComplete(taskId);
}

function loadPage(target, refreshPage) {
    const tab = target.closest(".tab");
    let project = false;

    toggleSelectedTab(tab);

    if (isProjectTab(tab)) {
        project = getProjectById(tab.dataset.id);
    }
    refreshPage(project);
}

function toggleElements(btn, ...elements) {
    if (btn.classList.contains("closed")) {
        btn.classList.remove("closed");
        elements.forEach((elmnt) => elmnt.classList.remove("closed"));
    } else {
        btn.classList.add("closed");
        elements.forEach((elmnt) => elmnt.classList.add("closed"));
    }
}

function handleScreenChange(e) {
    const sidebar = document.querySelector("#sidebar");
    const content = document.querySelector("#main-content");
    const toggleSidebarBtn = document.querySelector("#toggle-sidebar");

    if (e.matches) {
        sidebar.classList.add('closed');
        content.classList.add('closed');
        toggleSidebarBtn.classList.add('closed');
    } else {
        sidebar.classList.remove('closed');
        content.classList.remove('closed');
        toggleSidebarBtn.classList.remove('closed');
    }
}
export function setUpEventListeners(appContainer, modalContainer, refreshPage) {
    const mediaQuery = window.matchMedia('(max-width: 600px)');
    mediaQuery.addEventListener("change", handleScreenChange);

    appContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn") || e.target.classList.contains("delete-project-btn")) {
            deleteObjBtn(e.target, refreshPage);
        }
        
        if (e.target.classList.contains("mark-complete-btn")) {
            markTaskComplete(e.target);
            refresher(refreshPage);
        }
        if (e.target.classList.contains("edit-task-btn")) {
            editTaskBtn(e.target);
        }

        if (e.target.classList.contains("add-task-btn")) {
            appendModal(renderAddTaskModal());
        }

        if (e.target.closest(".tab") && ( e.target.tagName !== "BUTTON" || e.target.classList.contains("filter"))) {
            loadPage(e.target, refreshPage);
        }

        if (e.target.classList.contains("add-project-btn")) {
            appendModal(renderAddProjectModal())
        }

        if (e.target.classList.contains("edit-project-btn") || e.target.id === "project-desc") {
            editProjectBtn(e.target)
        }

        if (e.target.id === "toggle-sidebar") {
            const sidebar = document.querySelector("#sidebar");
            const content = document.querySelector("#main-content");

            toggleElements(e.target, sidebar, content);
        }

        if (e.target.id === "list-projects") {
                const projectContainer = document.querySelector(".projects-container");
            toggleElements(e.target, projectContainer);
        }
    });

    modalContainer.addEventListener("click" , (e) => {
        if (e.target.classList.contains("cancel-modal-btn")) {
            e.preventDefault();
            cancelModal(e.target);
        }
        
        if (e.target.classList.contains("save-modal-btn")) {
            e.preventDefault();
            modifyModalBtn(e.target, refreshPage);
        }
        
        if (e.target.classList.contains("add-modal-btn")) {
            e.preventDefault();
            modifyModalBtn(e.target, refreshPage);    
        }

        if (e.target.classList.contains("dueDate-option")) {
            toggleSelectedOption(e.target, "dueDate");
        }

        if (e.target.classList.contains("priority-option")) {
            toggleSelectedOption(e.target, "priority");
        }
    });
}