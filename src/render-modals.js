import { getDueDateOption, pad } from "./utilities";

function renderModalTitle(title) {
    const modalTitle = document.createElement("h1");
    modalTitle.classList.add("modal-title");
    modalTitle.textContent = title;

    return modalTitle;
}

function renderModalMetadata(type, subtype, title = "", description = "") {
    // TITLE
    const titleContainer = document.createElement("div");
    
    const titleLabel = document.createElement("label");
    titleLabel.textContent = "Title:";
    titleLabel.htmlFor = `${subtype}-${type}-title`;
    
    const titleInput = document.createElement("input");
    titleInput.value = title;
    titleInput.id = `${subtype}-${type}-title`;
    
    titleContainer.appendChild(titleLabel);
    titleContainer.appendChild(titleInput);
    
    // DESCRIPTION
    const descriptionContainer = document.createElement("div");
    
    const descriptionLabel = document.createElement("label");
    descriptionLabel.htmlFor = `${subtype}-${type}-desc`;
    descriptionLabel.textContent = "Description:";
    
    const descriptionInput = document.createElement("textarea");
    descriptionInput.id = `${subtype}-${type}-desc`;
    descriptionInput.value = description;
    
    descriptionContainer.appendChild(descriptionLabel);
    descriptionContainer.appendChild(descriptionInput);

    return { titleContainer, descriptionContainer }
}

function renderModalButtons(subtype) {
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("modal-button-container");

    const cancelBtn = document.createElement("button");
    cancelBtn.id = "cancel-modal";
    cancelBtn.textContent = "Cancel";
    cancelBtn.classList.add("cancel-modal-btn");
    
    buttonContainer.appendChild(cancelBtn);

    let acceptBtn;
    if (subtype == "edit") {
        acceptBtn = document.createElement("button");
        acceptBtn.id = "save-modal-content";
        acceptBtn.classList.add("save-modal-btn");
        acceptBtn.textContent = "Save";
    } else if (subtype == "add") {
        acceptBtn = document.createElement("button");
        acceptBtn.id = "add-modal-content";
        acceptBtn.classList.add("add-modal-btn");
        acceptBtn.textContent = "Add";
    }
    
    buttonContainer.appendChild(acceptBtn);

    return buttonContainer;
}

function renderModalContainer(type, subtype, id="") {
    const modal = document.createElement("dialog");
    modal.id = `${subtype}-${type}-modal`;
    modal.classList.add(`${subtype}-${type}-dialog`);
    modal.dataset.id = id;
    modal.dataset.type = type;
    modal.dataset.subtype = subtype;

    return modal;
}

function renderTaskModal(type, title, taskId = "", taskTitle = "", taskDescription = "", taskDueDate = "", taskPriority="") {
    const taskModal = renderModalContainer("task", type, taskId);
    
    const modalTitle = renderModalTitle(title);
    
    const form = document.createElement("form");

    // TITLE & CONTAINER
    const { titleContainer, descriptionContainer } = renderModalMetadata("task", type, taskTitle, taskDescription);

    // DUE DATE
    const dueDateContainer = document.createElement("div");

    const dueDateLegend = document.createElement("legend");
    dueDateLegend.classList.add("title");
    dueDateLegend.textContent = "Due Date:";

    const dueDateOptions = document.createElement("div");
    dueDateOptions.id = `${type}-task-dueDate`;

    const dueDateToday = document.createElement("button");
    dueDateToday.id = "today-option";  
    dueDateToday.textContent = "Today";
    dueDateToday.type = "button";
    dueDateToday.classList.add("dueDate-option");
    
    const dueDateTomorrow = document.createElement("button");
    dueDateTomorrow.id = "tmrw-option";  
    dueDateTomorrow.textContent = "Tomorrow";
    dueDateTomorrow.type = "button";
    dueDateTomorrow.classList.add("dueDate-option");
    
    const dueDatePick = document.createElement("button");
    dueDatePick.id = "pick-option";  
    dueDatePick.textContent = "Pick a Date";
    dueDatePick.type = "button";
    dueDatePick.classList.add("dueDate-option");
    
    dueDateOptions.appendChild(dueDateToday);
    dueDateOptions.appendChild(dueDateTomorrow);
    dueDateOptions.appendChild(dueDatePick);

    if (taskDueDate) {
        dueDateOptions.childNodes.forEach((option) => {
            if (option.id.match(getDueDateOption(taskDueDate))) {
                option.classList.add("selected");
            }
        })    
    } else {
        dueDateToday.classList.add("selected");
    }

    dueDateContainer.appendChild(dueDateLegend);
    dueDateContainer.appendChild(dueDateOptions);

    // PRIORITY
    const priorityContainer = document.createElement("div");

    const priorityLegend = document.createElement("legend");
    priorityLegend.classList.add("title");
    priorityLegend.textContent = "Priority:";

    const priorityOptions = document.createElement("div");
    priorityOptions.id = `${type}-task-priority`;
    priorityOptions.classList.add("priority-button-container");

    const priorityHighContainer = document.createElement("button");
    priorityHighContainer.id = "high-priority";
    priorityHighContainer.classList.add("high-priority", "priority-option");
    priorityHighContainer.textContent = "High";
    priorityHighContainer.type = "button";
    
    const priorityMedContainer = document.createElement("button");
    priorityMedContainer.id = "medium-priority";
    priorityMedContainer.classList.add("medium-priority", "priority-option");
    priorityMedContainer.textContent = "Medium";
    priorityMedContainer.type = "button";

    const priorityLowContainer = document.createElement("button");
    priorityLowContainer.id = "low-priority";
    priorityLowContainer.classList.add("low-priority", "priority-option");
    priorityLowContainer.textContent = "Low";
    priorityLowContainer.type = "button";

    priorityOptions.appendChild(priorityHighContainer);
    priorityOptions.appendChild(priorityMedContainer);
    priorityOptions.appendChild(priorityLowContainer);

    if (taskPriority) {
        priorityOptions.childNodes.forEach((option) => {
            if (option.id.match(taskPriority.toLowerCase())) {
                option.classList.add("selected");
            }
        })
    } else {
        priorityMedContainer.classList.add("selected");
    }

    priorityContainer.appendChild(priorityLegend);
    priorityContainer.appendChild(priorityOptions);
    
    // BUTTONS
    const buttonContainer = renderModalButtons(type);

    form.appendChild(titleContainer);
    form.appendChild(descriptionContainer);
    form.appendChild(dueDateContainer);
    form.appendChild(priorityContainer);
    form.appendChild(buttonContainer);

    taskModal.appendChild(modalTitle);
    taskModal.appendChild(form);

    return taskModal;
}

function renderProjectModal(type, title, projectId = "", projectTitle = "", projectDescription = "") {
    const projectModal = renderModalContainer("project", type, projectId);

    const modalTitle = renderModalTitle(title);

    const form = document.createElement("form");

    const { titleContainer, descriptionContainer } = renderModalMetadata("project", type, projectTitle, projectDescription);

    const buttonContainer = renderModalButtons(type);

    form.appendChild(titleContainer);
    form.appendChild(descriptionContainer);
    form.appendChild(buttonContainer);

    projectModal.appendChild(modalTitle);
    projectModal.appendChild(form);

    return projectModal;
}

function renderEditTaskModal(taskId, taskTitle, taskDescription, taskDueDate, taskPriority) {
    return renderTaskModal("edit", "Edit Task", taskId, taskTitle, taskDescription, taskDueDate, taskPriority);
}

function renderAddTaskModal() {
    return renderTaskModal("add", "Add Task");
}

function renderEditProjectModal(projectId, projectTitle, projectDescription) {
    return renderProjectModal("edit", "Edit Project", projectId, projectTitle, projectDescription);
}

function renderAddProjectModal() {
    return renderProjectModal("add", "Add Project");
}

export {renderEditTaskModal, renderAddTaskModal, renderAddProjectModal, renderEditProjectModal}