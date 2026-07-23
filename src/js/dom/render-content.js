import { capitalize } from "../utils/utilities";
import { sortByDate } from "../storage/todo-storage";

import { createElement, CalendarDays, Inbox, Plus, ChevronDown, SquarePen, PenLine, Trash2 } from "lucide";

function createTitle(filterTitle) {
    const title = document.createElement("h1");
    title.classList.add("title");
    title.textContent = capitalize(filterTitle);

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

function createTodosContainer(tasksArray, project = false) {
    const todosContainer = document.createElement("ul");
    todosContainer.classList.add("tasks-container");
    tasksArray.forEach(task => {
        if (task.isComplete) return;

        if (project === "all") {
            if (task.projectId !== "inbox") {
                todosContainer.appendChild(createTodo(task));
            }
            return;
        }
        if (project) {
            if (task.projectId !== "inbox" && task.projectId === project.id) {
                todosContainer.appendChild(createTodo(task));
            }
            return;
        }
        
        if (task.projectId === "inbox") {
            todosContainer.appendChild(createTodo(task));
        }

    });

    return todosContainer;
}

function createProject(project) {
    const projectContainer = document.createElement("div");
    projectContainer.classList.add("project-tab", "tab");
    projectContainer.dataset.id = project.id;
    projectContainer.dataset.title = project.title;

    const hashtag = document.createElement("p");
    hashtag.textContent = "#";
    hashtag.style.color = "black";
    hashtag.classList.add("hashtag");

    const projectName = document.createElement("p");
    projectName.textContent = capitalize(project.title);

    const projectEditBtn = document.createElement("button");
    projectEditBtn.classList.add("edit-project-btn");
    
    projectEditBtn.appendChild(createElement(PenLine))

    const projectDeleteBtn = document.createElement("button");
    projectDeleteBtn.classList.add("delete-project-btn");
    
    projectDeleteBtn.appendChild(createElement(Trash2))

    projectContainer.appendChild(hashtag);
    projectContainer.appendChild(projectName);
    projectContainer.appendChild(projectEditBtn);
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
    profile.textContent = "Img - Profile";
    // TODO: profile elements

    // Navigation Compartment
    const navigationContainer = document.createElement("div");
    navigationContainer.classList.add("navigation");

    // Main Filters Compartment
    const mainFilterContainer = document.createElement("div");
    mainFilterContainer.classList.add("main-filter");

    const inboxContainer = document.createElement("div");
    inboxContainer.classList.add("inbox", "filter", "tab");
    inboxContainer.dataset.title = "inbox";
    inboxContainer.dataset.id = "inbox";

    const inboxTitle = document.createElement("p");
    inboxTitle.textContent = "Inbox";

    const inboxIcon = createElement(Inbox);

    inboxContainer.appendChild(inboxIcon);
    inboxContainer.appendChild(inboxTitle);

    const upcomingContainer = document.createElement("div");
    upcomingContainer.classList.add("upcoming", "filter", "tab");
    upcomingContainer.dataset.title = "upcoming";
    upcomingContainer.dataset.id = "upcoming";

    const upcomingTitle = document.createElement("p");
    upcomingTitle.textContent = "Upcoming";

    const upcomingIcon = createElement(CalendarDays);

    upcomingContainer.appendChild(upcomingIcon);
    upcomingContainer.appendChild(upcomingTitle);

    mainFilterContainer.appendChild(inboxContainer);
    mainFilterContainer.appendChild(upcomingContainer);

    // Projects Filter Compartment
    const projectsFilterContainer = document.createElement("div");
    projectsFilterContainer.classList.add("project-filter");

    const myProjectsContainer = document.createElement("div");
    myProjectsContainer.classList.add("my-projects");

    const addProjectBtn = document.createElement("button");
    addProjectBtn.id = "add-project";
    addProjectBtn.classList.add("add-project-btn");

    addProjectBtn.appendChild(createElement(Plus))

    const toggleProjectsBtn = document.createElement("button");
    toggleProjectsBtn.id = "list-projects";
    toggleProjectsBtn.classList.add("list-projects-btn");

    toggleProjectsBtn.appendChild(createElement(ChevronDown))

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

function renderContentView(filterTitle, tasksArray, project = false) {
    const contentWrapper = document.createElement("div");
    contentWrapper.classList.add("content-view");
    contentWrapper.id = "main-content";
    
    const header = document.createElement("div");
    header.classList.add("header");

    // TOP BAR
    const title = createTitle(filterTitle);

    const addTaskBtn = document.createElement("button");
    addTaskBtn.id = "add-task";
    addTaskBtn.classList.add("add-task-btn");
    addTaskBtn.textContent = "➕";

    header.appendChild(title);
    header.appendChild(addTaskBtn);

    contentWrapper.appendChild(header);

    // MAIN BODY
    let todosContainer;
    if (filterTitle === "upcoming") {
        todosContainer = createTodosContainer(sortByDate(tasksArray), "all");
    } else {
        todosContainer = createTodosContainer(tasksArray, project);        
    }
    
    if (project && project.description) {
        const projectDescription = document.createElement("p");
        projectDescription.textContent = project.description;
        contentWrapper.appendChild(projectDescription);
    }
    
    contentWrapper.appendChild(todosContainer);
    
    return contentWrapper;
}

export {renderSidebar, renderContentView};