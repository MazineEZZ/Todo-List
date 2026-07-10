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

    const deleteTaskBtn = document.createElement("button");
    deleteTaskBtn.setAttribute("id", "delete-task");
    deleteTaskBtn.classList.add("delete-btn");
    deleteTaskBtn.textContent = "❌";

    taskElement.appendChild(taskDetails);
    taskElement.appendChild(deleteTaskBtn);

    return taskElement;
}

function createTodosContainer(tasksArray) {
    const todosContainer = document.createElement("ul");
    todosContainer.classList.add("tasks-container");
    
    tasksArray.forEach(task => {
        todosContainer.appendChild(createTodo(task.id, task.title, task.description));
    });

    return todosContainer;
}


export function renderSidebar() {
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

export function renderContentView(filterTitle, tasksArray, isProject = false) {
    const contentWrapper = document.createElement("div");
    contentWrapper.classList.add("content-view");
    contentWrapper.setAttribute("id", "main-content");
    
    const title = createTitle(filterTitle)
    const todosContainer = createTodosContainer(tasksArray)
    
    contentWrapper.appendChild(title);

    if (isProject) {
        const projectDescription = document.createElement("p");
        projectDescription.textContent = "Project description goes here...";
        contentWrapper.appendChild(projectDescription);
    }
    
    contentWrapper.appendChild(todosContainer);
    
    return contentWrapper;
}