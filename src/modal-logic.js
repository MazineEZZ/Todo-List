import { getDate } from "./utilities";
import { getTaskById, updateTasksArray } from "./todo-storage";
import { getProjectById, updateProjectsArray } from "./project-storage";

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

function updateDetails(id, newObj, type) {
    let obj;
    if (type == "task") {
        obj = getTaskById(id);
    } else if (type == "project") {
        obj = getProjectById(id);
    }

    obj.title = newObj.title;
    obj.description = newObj.description;
    
    if (type == "task") {
        obj.dueDate = newObj.dueDate;
        obj.priority = newObj.priority;
        updateTasksArray();
    } else if (type == "project") {
        updateProjectsArray();
    }

    console.log(obj);
}

function getModalDetails(type, subtype) {
    const titleInput = document.querySelector(`#${subtype}-${type}-title`);
    const descriptionInput = document.querySelector(`#${subtype}-${type}-desc`);
    
    const title = titleInput.value;
    const description = descriptionInput.value;
    
    if (type == "task") {
        const dueDateOption = document.querySelector(`#${subtype}-${type}-dueDate>.selected`);
        const priorityOption = document.querySelector(`#${subtype}-${type}-priority>.selected`)

        const dueDate = getDate(dueDateOption.id);
        const priority = priorityOption.id.split("-")[0];

        return { title, description, dueDate, priority };
    } else {
        return { title, description };
    }
}

function editObj(id, type, subtype) {
    const detailsObj = getModalDetails(type, subtype);
    detailsObj.id = id;

    if (detailsObj.title.trim() === "") {
        alert(`${type} title cannot be empty!`);
        return;
    }

    updateDetails(id, detailsObj, type);
    return detailsObj;
}

export { getModalDetails, updateDetails, removeModal, appendModal, editObj };