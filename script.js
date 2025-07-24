document.getElementById('createUserForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const name = document.getElementById('createName').value;
    const email = document.getElementById('createEmail').value;
    const age = document.getElementById('createAge').value;

    try {
        const response = await fetch('https://digiverse-task.onrender.com/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, age })
        });
        const data = await response.json();
        const createResponse = document.getElementById('createResponse');
        createResponse.textContent = `User created with ID: ${data._id}`;
        createResponse.style.display = 'block';
     
        document.getElementById('createUserForm').reset();
    } catch (error) {
        console.error('Error:', error);
    }
});

async function getAllUsers() {
    try {
        const response = await fetch('https://digiverse-task.onrender.com/users');
        const users = await response.json();
        const usersList = document.getElementById('usersList');
        usersList.innerHTML = '';

        if (users.length === 0) {
            usersList.innerHTML = '<p>No users found</p>';
            return;
        }

        const tableContainer = document.createElement('div');
        tableContainer.className = 'table-container table-responsive';
        
        const table = document.createElement('table');
        table.innerHTML = `
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;

        const tbody = table.querySelector('tbody');
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user._id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.age}</td>
            `;
            tbody.appendChild(row);
        });

        tableContainer.appendChild(table);
        
        const cardsContainer = document.createElement('div');
        cardsContainer.className = 'cards-view';
        
        users.forEach(user => {
            const card = document.createElement('div');
            card.className = 'user-mobile-card';
            card.innerHTML = `
                <div class="user-field">
                    <span class="field-label">ID:</span>
                    <span class="field-value">${user._id}</span>
                </div>
                <div class="user-field">
                    <span class="field-label">Name:</span>
                    <span class="field-value">${user.name}</span>
                </div>
                <div class="user-field">
                    <span class="field-label">Email:</span>
                    <span class="field-value">${user.email}</span>
                </div>
                <div class="user-field">
                    <span class="field-label">Age:</span>
                    <span class="field-value">${user.age}</span>
                </div>
            `;
            cardsContainer.appendChild(card);
        });
        
        usersList.appendChild(tableContainer);
        usersList.appendChild(cardsContainer);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Get User by ID
async function getUserById() {
    const userId = document.getElementById('getUserId').value;
    if (!userId) {
        alert('Please enter a user ID');
        return;
    }

    try {
        const response = await fetch(`https://digiverse-task.onrender.com/users/${userId}`);
        const user = await response.json();
        const getUserResponse = document.getElementById('getUserResponse');

        if (user) {
            getUserResponse.innerHTML = `
                <div class="user-card">
                    <p><strong>ID:</strong> ${user._id}</p>
                    <p><strong>Name:</strong> ${user.name}</p>
                    <p><strong>Email:</strong> ${user.email}</p>
                    <p><strong>Age:</strong> ${user.age}</p>
                </div>
            `;
        } else {
            getUserResponse.textContent = 'User not found';
        }
        getUserResponse.style.display = 'block';
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('getUserResponse').textContent = 'Error fetching user';
        document.getElementById('getUserResponse').style.display = 'block';
    }
}

// Update User
document.getElementById('updateUserForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const userId = document.getElementById('updateId').value;
    const name = document.getElementById('updateName').value;
    const email = document.getElementById('updateEmail').value;
    const age = document.getElementById('updateAge').value;

    try {
        const response = await fetch(`https://digiverse-task.onrender.com/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, age })
        });
        const data = await response.json();
        const updateResponse = document.getElementById('updateResponse');
        updateResponse.textContent = `User updated successfully`;
        updateResponse.style.display = 'block';
        // Clear form
        document.getElementById('updateUserForm').reset();
    } catch (error) {
        console.error('Error:', error);
    }
});

// Delete User
async function deleteUser() {
    const userId = document.getElementById('deleteId').value;
    if (!userId) {
        alert('Please enter a user ID');
        return;
    }

    try {
        const response = await fetch(`https://digiverse-task.onrender.com/users/${userId}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        const deleteResponse = document.getElementById('deleteResponse');
        deleteResponse.textContent = `User deleted successfully`;
        deleteResponse.style.display = 'block';
        document.getElementById('deleteId').value = '';
    } catch (error) {
        console.error('Error:', error);
    }
}