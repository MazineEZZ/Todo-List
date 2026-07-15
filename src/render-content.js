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

    const taskPriority = document.createElement("p");
    taskPriority.classList.add("priority");
    taskPriority.textContent = priority;

    taskDetails.appendChild(taskTitle);
    taskDetails.appendChild(taskDescription);
    taskDetails.appendChild(taskDueDate);
    taskDetails.appendChild(taskPriority);

    const editTaskBtn = document.createElement("button");
    editTaskBtn.classList.add("edit-task-btn");
    editTaskBtn.textContent = "✏️";

    const deleteTaskBtn = document.createElement("button");
    deleteTaskBtn.classList.add("delete-btn");
    deleteTaskBtn.textContent = "❌";

    taskElement.appendChild(markCompleteBtn);
    taskElement.appendChild(taskDetails);
    taskElement.appendChild(editTaskBtn);
    taskElement.appendChild(deleteTaskBtn);

    return taskElement;
}

function createTodosContainer(tasksArray, isProject, projectName) {
    const todosContainer = document.createElement("ul");
    todosContainer.classList.add("tasks-container");
    
    tasksArray.forEach(task => {
        if (!task.isComplete) {
            if (isProject) {
                if (task.project !== "inbox" && task.project === projectName.toLowerCase()) {
                    todosContainer.appendChild(createTodo(task));
                }
            } else {
                if (task.project === "inbox") {
                    todosContainer.appendChild(createTodo(task));
                }
            }
        }
    });

    return todosContainer;
}

function createProject(project) {
    const projectContainer = document.createElement("div");
    projectContainer.classList.add("project-tab", "tab");
    projectContainer.id = project.id;
    projectContainer.dataset.id = project.name;

    const projectName = document.createElement("p");
    projectName.textContent = "# " + project.name;

    const projectDeleteBtn = document.createElement("button");
    projectDeleteBtn.classList.add("project-delete-btn");
    projectDeleteBtn.textContent = "🗑️";

    projectContainer.appendChild(projectName);
    projectContainer.appendChild(projectDeleteBtn);

    return projectContainer;
}

function renderSidebar(projects) {
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
    inboxContainer.classList.add("inbox", "filter", "loaded-page", "tab");
    inboxContainer.textContent = "📩 Inbox";
    inboxContainer.dataset.id = "inbox";

    const todayContainer = document.createElement("button");
    todayContainer.classList.add("today", "filter", "tab");
    todayContainer.textContent = "⭐ Today";
    todayContainer.dataset.id = "today";

    mainFilterContainer.appendChild(inboxContainer);
    mainFilterContainer.appendChild(todayContainer);

    // Projects Filter Compartment
    const projectsFilterContainer = document.createElement("div");
    projectsFilterContainer.classList.add("project-filter");

    const myProjectsContainer = document.createElement("div");
    myProjectsContainer.classList.add("my-projects");

    const addProjectBtn = document.createElement("button");
    addProjectBtn.textContent = "➕";
    addProjectBtn.id = "add-project";
    addProjectBtn.classList.add("add-project-btn");

    const toggleProjectsBtn = document.createElement("button");
    toggleProjectsBtn.textContent = "⬆️";
    toggleProjectsBtn.id = "list-projects";
    toggleProjectsBtn.classList.add("list-projects-btn");

    myProjectsContainer.appendChild(Object.assign(document.createElement("p"), {textContent: "My Projects"}));
    myProjectsContainer.appendChild(addProjectBtn);
    myProjectsContainer.appendChild(toggleProjectsBtn);

    const projectsContainer = document.createElement("div");
    projectsContainer.classList.add("projects-container");

    projects.forEach((project) => {
        projectsContainer.appendChild(createProject(project));
    });

    projectsFilterContainer.appendChild(myProjectsContainer);
    projectsFilterContainer.appendChild(projectsContainer);

    navigationContainer.appendChild(mainFilterContainer);
    navigationContainer.appendChild(projectsFilterContainer);

    sidebarWrapper.appendChild(profile);
    sidebarWrapper.appendChild(navigationContainer);
    
    return sidebarWrapper;
}

function renderContentView(filterTitle, tasksArray, projectDescription) {
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

    const todosContainer = createTodosContainer(tasksArray, isProject, filterTitle);
    
    header.appendChild(title);
    header.appendChild(addTaskBtn);

    contentWrapper.appendChild(header);

    if (projectDescription) {
        const projectDescription = document.createElement("p");
        projectDescription.textContent = "Project description goes here...";
        contentWrapper.appendChild(projectDescription);
    }
    
    contentWrapper.appendChild(todosContainer);
    
    return contentWrapper;
}

export {renderSidebar, renderContentView};