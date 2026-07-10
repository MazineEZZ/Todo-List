function createTitle(filterTitle) {
    const title = document.createElement("h1");
    title.classList.add("title");
    title.textContent = filterTitle;

    return title;
}

function createTodo(id, title, description) {
    const taskElement = document.createElement("li");
    taskElement.classList.add("task-item");
    taskElement.dataset.id = id;

    const markCompleteBtn = document.createElement("button");
    markCompleteBtn.setAttribute("id", "mark-complete-task");
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

    taskDetails.appendChild(taskTitle);
    taskDetails.appendChild(taskDescription);

    const editTaskBtn = document.createElement("button");
    editTaskBtn.setAttribute("id", "edit-task");
    editTaskBtn.classList.add("edit-task-btn");
    editTaskBtn.textContent = "✏️";

    const deleteTaskBtn = document.createElement("button");
    deleteTaskBtn.setAttribute("id", "delete-task");
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
            todosContainer.appendChild(createTodo(task.id, task.title, task.description));
        }
    });

    return todosContainer;
}

function renderModal(type, title, taskId = "", taskTitle = "", taskDescription = "") {
    const taskModal = document.createElement("dialog");
    taskModal.setAttribute("id", `${type}-task-modal`);
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
    titleLabel.setAttribute("for", `${type}-task-title`);
    
    const titleInput = document.createElement("input");
    titleInput.setAttribute("id", `${type}-task-title`);
    titleInput.value = taskTitle;

    titleContainer.appendChild(titleLabel);
    titleContainer.appendChild(titleInput);

    const descriptionContainer = document.createElement("div");

    const descriptionLabel = document.createElement("label");
    descriptionLabel.textContent = "Description:";
    descriptionLabel.setAttribute("for", `${type}-task-desc`);

    const descriptionInput = document.createElement("textarea");
    descriptionInput.setAttribute("id", `${type}-task-desc`);
    descriptionInput.value = taskDescription;

    descriptionContainer.appendChild(descriptionLabel);
    descriptionContainer.appendChild(descriptionInput);

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("modal-button-container");

    const cancelBtn = document.createElement("button");
    cancelBtn.setAttribute("id", "cancel-modal");
    cancelBtn.classList.add("cancel-modal-btn");
    cancelBtn.textContent = "Cancel";
    
    buttonContainer.appendChild(cancelBtn);

    let acceptBtn;
    if (type == "edit") {
        acceptBtn = document.createElement("button");
        acceptBtn.setAttribute("id", "save-modal-content");
        acceptBtn.classList.add("save-modal-btn");
        acceptBtn.textContent = "Save";
    } else if (type == "add") {
        acceptBtn = document.createElement("button");
        acceptBtn.setAttribute("id", "add-modal-content");
        acceptBtn.classList.add("add-modal-btn");
        acceptBtn.textContent = "Add";
    }
    
    buttonContainer.appendChild(acceptBtn);

    form.appendChild(titleContainer);
    form.appendChild(descriptionContainer);
    form.appendChild(buttonContainer);

    taskModal.appendChild(modalTitle);
    taskModal.appendChild(form);

    return taskModal;
}

function renderEditTaskModal(taskId, taskTitle, taskDescription) {
    return renderModal("edit", "Edit Task", taskId, taskTitle, taskDescription);
}

function renderAddTaskModal() {
    return renderModal("add", "Add Task");
}

function renderSidebar() {
    const sidebarWrapper = document.createElement("div");
    sidebarWrapper.classList.add("sidebar");
    sidebarWrapper.setAttribute("id", "sidebar");

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
    contentWrapper.setAttribute("id", "main-content");
    
    const header = document.createElement("div");
    header.classList.add("header");

    const title = createTitle(filterTitle);

    const addTaskBtn = document.createElement("button");
    addTaskBtn.setAttribute("id", "add-task");
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

export { renderEditTaskModal, renderAddTaskModal, renderSidebar, renderContentView };