# 🚀 Advanced Interactive Todo Card (HNG Stage 1a)

An interactive, accessible, and stateful Todo Card built with Vanilla JavaScript, HTML5, and CSS3. This project demonstrates advanced DOM manipulation, state synchronization, and accessibility patterns required for the HNG Frontend Stage 1a task.

## 🌐 Live Demo
[https://hng-todo-task-three.vercel.app/]

## ✨ Enhancements (What's new since Stage 0)

### 1. Interactive Edit Mode
- Introduced a dedicated **Edit Form** (`data-testid="test-todo-edit-form"`) to modify task details.
- Supports real-time updates for Title, Description, Priority, and Due Date.
- Implemented **Save** and **Cancel** logic to persist or discard changes.

### 2. Smart Status Transitions
- Added a **Status Dropdown** (`data-testid="test-todo-status-control"`) with "Pending", "In Progress", and "Done" states.
- **Two-way Sync:** Toggling the completion checkbox automatically sets the status to "Done", and selecting "Done" in the dropdown checks the box.

### 3. Dynamic Time Management
- **Granular Countdown:** Displays real-time urgency (e.g., "Due in 3 hours", "Due in 45 minutes").
- **Overdue Logic:** Automatically detects expired deadlines and displays an "Overdue" indicator with red visual cues.
- **Auto-Update:** The UI refreshes time calculations every 60 seconds without page reloads.

### 4. Expandable Content
- Implemented an **Expand/Collapse** behavior for long descriptions to maintain a clean UI.
- Uses accessible patterns (`aria-expanded`, `aria-controls`) for screen reader compatibility.

## 🎨 Design Decisions
- **Visual Feedback:** Used a specific color palette for urgency (Red for Overdue, Orange for Due Today, Green for Completed).
- **Priority Indicators:** Implemented a border-accent and color-coded pills to make task priority instantly recognizable.
- **Done State:** Applied `text-decoration: line-through` and reduced opacity to provide clear visual confirmation of completed tasks.

## ♿ Accessibility Notes
- **ARIA Patterns:** Utilized `aria-live="polite"` for time updates to inform assistive technologies without interrupting the user.
- **Keyboard Navigation:** Fully navigable via `Tab` key (Checkbox -> Status -> Expand -> Edit -> Delete).
- **Semantic HTML:** Ensured all form fields have associated `<label>` elements for better screen reader support.

## 🛠️ Tech Stack
- **HTML5:** Semantic structure and data-attributes for testing.
- **CSS3:** Flexbox/Grid for responsiveness and transitions for the collapsible section.
- **JavaScript:** Vanilla JS for state management and DOM manipulation.

## 🧪 Testing
All elements are tagged with the required `data-testid` to comply with automated testing suites, including:
- `test-todo-overdue-indicator`
- `test-todo-priority-indicator`
- `test-todo-expand-toggle`
- `test-todo-status-control`

---
Developed by **Maram** | HNG Internship 2026
