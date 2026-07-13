function pad(number) {
    return String(number).padStart(2, "0");
}

function getDueDateOption(dueDate) {
    const todayObj = new Date();
    const tmrObj = new Date();
    tmrObj.setDate(todayObj.getDate() + 1);

    const today = `${todayObj.getFullYear()}-${pad(todayObj.getMonth() + 1)}-${pad(todayObj.getDate())}`;
    const tmr = `${tmrObj.getFullYear()}-${pad(tmrObj.getMonth() + 1)}-${pad(tmrObj.getDate())}`

    console.log(today);

    if (dueDate == today) {
        return "today";
    } else if (dueDate == tmr) {
        return "tmrw";
    } else {
        return "pick";
    }
    
}

function createTitle(filterTitle) {
    const title = document.createElement("h1");
    title.classList.add("title");
    title.textContent = filterTitle;

    return title;
}

function createTodo(task) {
    const id = task.id;
    const title = task.title;
    const description = task.description;
    const dueDate = task.dueDate;
    const priority = task.priority;

    const taskElement = document.createElement("li");
    taskElement.classList.add("task-item");
    taskElement.dataset.id = id;

    const markCompleteBtn = document.createElement("button");
    markCompleteBtn.id = "mark-complete-task";
    markCompleteBtn.classList.add("mark-complete-btn");
    markCompleteBtn.textContent = "✅";

    const taskDetails = document.createElement("div");
    taskDetails.classList.add("details");

    const taskTitle = document.createElement("p");
    taskTitle.classList.add("title");
    taskTitle.textContent = title;

    const taskDescription = document.createElement("p");
    taskDescription.classList.add("description");
    taskDescription.textContent = description;

    const taskDueDate = document.createElement("p");
    taskDueDate.classList.add("dueDate");
    taskDueDate.textContent = dueDate;

    taskDetails.appendChild(taskTitle);
    taskDetails.appendChild(taskDescription);
    taskDetails.appendChild(taskDueDate);

    const editTaskBtn = document.createElement("button");
    editTaskBtn.id = "edit-task";
    editTaskBtn.classList.add("edit-task-btn");
    editTaskBtn.textContent = "✏️";

    const deleteTaskBtn = document.createElement("button");
    deleteTaskBtn.id = "delete-task";
    deleteTaskBtn.classList.add("delete-btn");
    deleteTaskBtn.textContent = "❌";

    taskElement.appendChild(markCompleteBtn);
    taskElement.appendChild(taskDetails);
    taskElement.appendChild(editTaskBtn);
    taskElement.appendChild(deleteTaskBtn);

    return taskElement;
}

function createTodosContainer(tasksArray) {
    const todosContainer = document.createElement("ul");
    todosContainer.classList.add("tasks-container");
    
    tasksArray.forEach(task => {
        if (!task.isComplete) {
            todosContainer.appendChild(createTodo(task));
        }
    });

    return todosContainer;
}

function renderModal(type, title, taskId = "", taskTitle = "", taskDescription = "", taskDueDate = "") {
    const taskModal = document.createElement("dialog");
    taskModal.id = `${type}-task-modal`;
    taskModal.classList.add(`${type}-task-dialog`);
    taskModal.dataset.id = taskId;
    taskModal.dataset.type = type;
    
    const modalTitle = document.createElement("h1");
    modalTitle.classList.add("modal-title");
    modalTitle.textContent = title;
    
    const form = document.createElement("form");

    const titleContainer = document.createElement("div");

    const titleLabel = document.createElement("label");
    titleLabel.textContent = "Title:";
    titleLabel.htmlFor = `${type}-task-title`;
    
    const titleInput = document.createElement("input");
    titleInput.id = `${type}-task-title`;
    titleInput.value = taskTitle;

    titleContainer.appendChild(titleLabel);
    titleContainer.appendChild(titleInput);

    const descriptionContainer = document.createElement("div");

    const descriptionLabel = document.createElement("label");
    descriptionLabel.textContent = "Description:";
    descriptionLabel.htmlFor = `${type}-task-desc`;

    const descriptionInput = document.createElement("textarea");
    descriptionInput.id = `${type}-task-desc`;
    descriptionInput.value = taskDescription;

    descriptionContainer.appendChild(descriptionLabel);
    descriptionContainer.appendChild(descriptionInput);

    const dueDateContainer = document.createElement("div");

    const dueDateLegend = document.createElement("legend");
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
    }

    dueDateContainer.appendChild(dueDateLegend);
    dueDateContainer.appendChild(dueDateOptions);
    
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
    form.appendChild(buttonContainer);

    taskModal.appendChild(modalTitle);
    taskModal.appendChild(form);

    return taskModal;
}

function renderEditTaskModal(taskId, taskTitle, taskDescription, taskDueDate) {
    return renderModal("edit", "Edit Task", taskId, taskTitle, taskDescription, taskDueDate);
}

function renderAddTaskModal() {
    return renderModal("add", "Add Task");
}

function renderSidebar() {
    const sidebarWrapper = document.createElement("div");
    sidebarWrapper.classList.add("sidebar");
    sidebarWrapper.id = "sidebar";

    // Profile Compartment
    const profile = document.createElement("div");
    profile.classList.add("profile");
    // TODO: profile elements

    // Navigation Compartment
    const navigationContainer = document.createElement("div");
    navigationContainer.classList.add("navigation");

    // Main Filters Compartment
    const mainFilterContainer = document.createElement("div");
    mainFilterContainer.classList.add("main-filter");

    const inboxContainer = document.createElement("button");
    inboxContainer.classList.add("inbox", "filter");
    inboxContainer.textContent = "📩 Inbox";

    const todayContainer = document.createElement("button");
    todayContainer.classList.add("today", "filter");
    todayContainer.textContent = "⭐ Today";

    mainFilterContainer.appendChild(inboxContainer);
    mainFilterContainer.appendChild(todayContainer);

    // Projects Filter Compartment
    const projectsFilterContainer = document.createElement("div");
    projectsFilterContainer.classList.add("project-filter");

    navigationContainer.appendChild(mainFilterContainer);
    navigationContainer.appendChild(projectsFilterContainer);

    sidebarWrapper.appendChild(profile);
    sidebarWrapper.appendChild(navigationContainer);
    
    return sidebarWrapper;
}

function renderContentView(filterTitle, tasksArray, isProject = false) {
    const contentWrapper = document.createElement("div");
    contentWrapper.classList.add("content-view");
    contentWrapper.id = "main-content";
    
    const header = document.createElement("div");
    header.classList.add("header");

    const title = createTitle(filterTitle);

    const addTaskBtn = document.createElement("button");
    addTaskBtn.id = "add-task";
    addTaskBtn.classList.add("add-task-btn");
    addTaskBtn.textContent = "➕";

    const todosContainer = createTodosContainer(tasksArray);

    
    header.appendChild(title);
    header.appendChild(addTaskBtn);

    contentWrapper.appendChild(header);

    if (isProject) {
        const projectDescription = document.createElement("p");
        projectDescription.textContent = "Project description goes here...";
        contentWrapper.appendChild(projectDescription);
    }
    
    contentWrapper.appendChild(todosContainer);
    
    return contentWrapper;
}

export { renderEditTaskModal, renderAddTaskModal, renderSidebar, renderContentView, pad };