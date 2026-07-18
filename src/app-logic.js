import { getCurrentTab, toggleSelectedTab } from "./utilities.js";
import { renderSidebar, renderContentView } from "./render-hub.js";
import { setUpEventListeners } from "./event-listener.js";
import { projectsArray } from "./project-storage.js";
import { tasksArray } from "./todo-storage.js";

// use a pub/sub functionality
function refreshPage(project = false) {
    const appContainer = document.querySelector("#app-container");

    const selectedTab = getCurrentTab();
    
    appContainer.replaceChildren();
    
    const sidebar = renderSidebar(projectsArray);

    let tabName;

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
    
    const refresher = (p = false) => {
        refreshPage(p);
    }

    setUpEventListeners(appContainer, modalContainer, refresher);
    
    appContainer.appendChild(sidebar);
    appContainer.appendChild(contentView);
    document.body.appendChild(appContainer);
}

export { initializeApp }