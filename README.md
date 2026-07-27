# Todo List

A single-page todo list app built as part of *The Odin Project curriculum*. It supports multiple projects, due dates, priority levels, and persists everything to `localStorage`. Here's a [live preview](https://mazine-ezz.github.io/Todo-list/)

## Features: 
- Inbox, Upcoming, and custom Project views
- Add / edit / delete tasks and projects
- Due date presets (Today, Tomorrow, and custom pick) and priority levels (High, Medium, Low)
- Data persistence across page reloads via `localStorage`

## Tech stack:
- **Vanilla JavaScript** (ES modules) no framework used. All DOM updates are done by hand, no virtual DOM.
- **Webpack module bundling**: dev server, and separate dev/prod configs.
- **CSS custom properties**, no framework: a small design-token system (variables.css) for color, spacing, type scale, and radii, used across every component file.
- **Lucide icons**, an npm package, swapped in for the original emoji-based buttons partway through the project.
- **localStorage**, the database alternative; no backend done.

## Code Architecture:
The app is structured around a handful of clear layers:
- `storage/` the actual data (projectsArray, tasksArray) and all CRUD functions, each saving to `localStorage` on every mutation.
- `dom/`pure rendering: functions that take data and return DOM nodes, with no state or logic of their own.
- `logic/`app orchestration (app-logic.js) and modal state handling (modal-logic.js).
- `events/` a single delegated click listener on the app container and one on the modal container, rather than binding handlers to individual elements.
- `utils/` shared helpers for all files (date formatting, tab selection, string casing).

## Key Techniques:
- **Global Event Delegation**: Instead of attaching a listener to every button, two listeners (one on the app container, one on the modal container) inspect e.target and route based on class names. Since the DOM gets rebuilt often, this avoids having to re-bind listeners after every render.

- **Unified Modal Architecture**: Uses a single, dataset-driven modal framework that reads HTML attributes (data-type, data-subtype, data-id) to dynamically handle all add/edit flows through one generic handler.

- **State-Driven Full Re-renders**: Simplifies UI state management by completely re-building the sidebar and main views on every mutation, prioritizing code simplicity over targeted virtual DOM updates.

- **Centralized Design Tokens**: Routes all CSS variables (colors, spacing, typography) through a single variables.css file to allow seamless, global visual re-styling.