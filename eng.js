// eng.js

// Real-time updates on project changes
function fetchProjectUpdates() {
    // Simulated API call to fetch project updates
    return new Promise((resolve) => {
        setTimeout(() => {
            const updates = [
                { id: 1, message: 'New project file added: design_v2.pdf' },
                { id: 2, message: 'Project timeline updated' },
                { id: 3, message: 'New task assigned: Review design' },
            ];
            resolve(updates);
        }, 1000);
    });
}

function displayProjectUpdates(updates) {
    const projectUpdatesContainer = document.getElementById('projectUpdates');
    projectUpdatesContainer.innerHTML = '';

    updates.forEach((update) => {
        const updateItem = document.createElement('li');
        updateItem.textContent = update.message;
        projectUpdatesContainer.appendChild(updateItem);
    });
}

// Drag-and-drop task assignment
function enableTaskDragAndDrop() {
    const taskCards = document.querySelectorAll('.task-card');
    const taskLists = document.querySelectorAll('.task-list');

    taskCards.forEach((card) => {
        card.addEventListener('dragstart', dragStart);
        card.addEventListener('dragend', dragEnd);
    });

    taskLists.forEach((list) => {
        list.addEventListener('dragover', dragOver);
        list.addEventListener('drop', drop);
    });

    function dragStart() {
        this.classList.add('dragging');
    }

    function dragEnd() {
        this.classList.remove('dragging');
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function drop() {
        const card = document.querySelector('.dragging');
        this.appendChild(card);
        // Simulated API call to update task status
        updateTaskStatus(card.dataset.taskId, this.id);
    }
}

function updateTaskStatus(taskId, status) {
    // Simulated API call to update task status on the server
    console.log(`Task ${taskId} status updated to ${status}`);
}

// Real-time messaging
function sendMessage(e) {
    e.preventDefault();
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();

    if (message !== '') {
        // Simulated API call to send message
        postMessage(message)
            .then((response) => {
                console.log('Message sent:', response);
                displayMessage(message);
                messageInput.value = '';
            })
            .catch((error) => {
                console.error('Error sending message:', error);
            });
    }
}

function postMessage(message) {
    // Simulated API call to send message to the server
    return new Promise((resolve) => {
        setTimeout(() => {
            const response = {
                id: Date.now(),
                message: message,
                timestamp: new Date().toLocaleString(),
            };
            resolve(response);
        }, 1000);
    });
}

function displayMessage(message) {
    const messageList = document.querySelector('.message-list ul');
    const messageItem = document.createElement('li');
    messageItem.classList.add('message');
    messageItem.innerHTML = `
        <div class="message-icon">
            <i class="fas fa-user"></i>
        </div>
        <div class="message-details">
            <div class="message-header">
                <span class="sender">John Doe</span>
                <span class="timestamp">${new Date().toLocaleTimeString()}</span>
            </div>
            <div class="message-content">
                <p>${message}</p>
            </div>
        </div>
    `;
    messageList.appendChild(messageItem);
}

// Update profile information
function updateProfile(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    // Simulated API call to update profile data
    putProfileData(formData)
        .then((response) => {
            console.log('Profile updated:', response);
            form.reset();
        })
        .catch((error) => {
            console.error('Error updating profile:', error);
        });
}

function putProfileData(formData) {
    // Simulated API call to update profile data on the server
    return new Promise((resolve) => {
        setTimeout(() => {
            const response = {
                message: 'Profile updated successfully',
            };
            resolve(response);
        }, 1000);
    });
}

// Smooth scrolling for navigation links
function init() {
    // Fetch and display project updates
    fetchProjectUpdates()
        .then((updates) => {
            displayProjectUpdates(updates);
        })
        .catch((error) => {
            console.error('Error fetching project updates:', error);
        });

    // Enable drag-and-drop task assignment
    enableTaskDragAndDrop();

    // Handle message form submission
    const messageForm = document.getElementById('messageForm');
    messageForm.addEventListener('submit', sendMessage);

    // Handle profile form submission
    const profileForm = document.getElementById('profileForm');
    profileForm.addEventListener('submit', updateProfile);

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Call the initialization function when the DOM is loaded
document.addEventListener('DOMContentLoaded', init);