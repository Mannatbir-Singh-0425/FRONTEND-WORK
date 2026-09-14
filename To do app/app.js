// State Store
let tasks = JSON.parse(localStorage.getItem('fee_tasks') || 'null') || [
    { id: 1, title: 'Implement Responsive CSS Grid Layout', priority: 'high', completed: true },
    { id: 2, title: 'Refactor REST API Fetch Handlers', priority: 'high', completed: false },
    { id: 3, title: 'Audit Semantic HTML5 Landmarks', priority: 'medium', completed: false },
    { id: 4, title: 'Test LocalStorage State Hydration', priority: 'low', completed: true }
];

let activeFilter = 'all';
let searchQuery = '';

const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');
const prioritySelect = document.getElementById('prioritySelect');
const taskCounter = document.getElementById('taskCounter');

function saveTasks() {
    localStorage.setItem('fee_tasks', JSON.stringify(tasks));
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = '';

    const filtered = tasks.filter(task => {
        const matchesFilter = (
            activeFilter === 'all' ||
            (activeFilter === 'pending' && !task.completed) ||
            (activeFilter === 'completed' && task.completed)
        );
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    taskCounter.textContent = `${filtered.length} task${filtered.length === 1 ? '' : 's'} displayed`;

    if (filtered.length === 0) {
        taskList.innerHTML = `
            <div class="empty-state">
                <p>No tasks found matching current filters.</p>
            </div>
        `;
        return;
    }

    filtered.forEach(task => {
        const item = document.createElement('div');
        item.className = `task-item ${task.completed ? 'completed' : ''}`;

        item.innerHTML = `
            <div class="task-left">
                <div class="custom-checkbox" onclick="toggleTaskCompletion(${task.id})">
                    ${task.completed ? '✓' : ''}
                </div>
                <span class="priority-tag priority-${task.priority}">${task.priority}</span>
                <span class="task-text">${escapeHtml(task.title)}</span>
            </div>
            <div class="task-actions">
                <button class="action-icon-btn" onclick="editTask(${task.id})">Edit</button>
                <button class="action-icon-btn delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;

        taskList.appendChild(item);
    });
}

function handleAddTask(e) {
    e.preventDefault();
    const title = taskInput.value.trim();
    if (!title) return;

    const newTask = {
        id: Date.now(),
        title: title,
        priority: prioritySelect.value,
        completed: false
    };

    tasks.unshift(newTask);
    taskInput.value = '';
    saveTasks();
}

function toggleTaskCompletion(id) {
    tasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
    saveTasks();
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const newTitle = prompt('Update Task Title:', task.title);
    if (newTitle !== null && newTitle.trim() !== '') {
        task.title = newTitle.trim();
        saveTasks();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
}

function clearCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
}

function setFilter(filter) {
    activeFilter = filter;
    document.querySelectorAll('.pill-filter').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    renderTasks();
}

function handleSearch() {
    searchQuery = document.getElementById('searchInput').value;
    renderTasks();
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// Initial Run
renderTasks();
