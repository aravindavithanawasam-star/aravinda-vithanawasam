// app.js

// Cart Management
class Cart {
    constructor() {
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
    }

    removeItem(item) {
        this.items = this.items.filter(i => i !== item);
    }

    getItems() {
        return this.items;
    }
}

// Dark/Light Mode Toggle
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-mode');
}

// Modal Controls
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
}

// Event Listeners
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

document.querySelectorAll('.open-modal').forEach(button => {
    button.addEventListener('click', () => openModal(button.dataset.modal));
});

document.querySelectorAll('.close-modal').forEach(button => {
    button.addEventListener('click', () => closeModal(button.dataset.modal));
});
