import { getDueDateOption, pad } from "./utilities";

function renderModal(type, title, taskId = "", taskTitle = "", taskDescription = "", taskDueDate = "", taskPriority="") {
    const taskModal = document.createElement("dialog");
    taskModal.id = `${type}-task-modal`;
    taskModal.classList.add(`${type}-task-dialog`);
    taskModal.dataset.id = taskId;
    taskModal.dataset.type = type;
    
    const modalTitle = document.createElement("h1");
    modalTitle.classList.add("modal-title");
    modalTitle.textContent = title;
    
    const form = document.createElement("form");

    // TITLE
    const titleContainer = document.createElement("div");

    const titleLabel = document.createElement("label");
    titleLabel.textContent = "Title:";
    titleLabel.htmlFor = `${type}-task-title`;
    
    const titleInput = document.createElement("input");
    titleInput.id = `${type}-task-title`;
    titleInput.value = taskTitle;

    titleContainer.appendChild(titleLabel);
    titleContainer.appendChild(titleInput);

    // DESCRIPTION
    const descriptionContainer = document.createElement("div");

    const descriptionLabel = document.createElement("label");
    descriptionLabel.textContent = "Description:";
    descriptionLabel.htmlFor = `${type}-task-desc`;

    const descriptionInput = document.createElement("textarea");
    descriptionInput.id = `${type}-task-desc`;
    descriptionInput.value = taskDescription;

    descriptionContainer.appendChild(descriptionLabel);
    descriptionContainer.appendChild(descriptionInput);

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
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("modal-button-container");

    const cancelBtn = document.createElement("button");
    cancelBtn.id = "cancel-modal";
    cancelBtn.textContent = "Cancel";
    cancelBtn.classList.add("cancel-modal-btn");
    
    buttonContainer.appendChild(cancelBtn);

    let acceptBtn;
    if (type == "edit") {
        acceptBtn = document.createElement("button");
        acceptBtn.id = "save-modal-content";
        acceptBtn.classList.add("save-modal-btn");
        acceptBtn.textContent = "Save";
    } else if (type == "add") {
        acceptBtn = document.createElement("button");
        acceptBtn.id = "add-modal-content";
        acceptBtn.classList.add("add-modal-btn");
        acceptBtn.textContent = "Add";
    }
    
    buttonContainer.appendChild(acceptBtn);

    form.appendChild(titleContainer);
    form.appendChild(descriptionContainer);
    form.appendChild(dueDateContainer);
    form.appendChild(priorityContainer);
    form.appendChild(buttonContainer);

    taskModal.appendChild(modalTitle);
    taskModal.appendChild(form);

    return taskModal;
}

function renderEditTaskModal(taskId, taskTitle, taskDescription, taskDueDate, taskPriority) {
    return renderModal("edit", "Edit Task", taskId, taskTitle, taskDescription, taskDueDate, taskPriority);
}

function renderAddTaskModal() {
    return renderModal("add", "Add Task");
}

export {renderEditTaskModal, renderAddTaskModal}