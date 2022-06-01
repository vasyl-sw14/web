const backendUrl = 'http://127.0.0.1:8080/api/v1/user';

const logoutButton = document.getElementById('logout');
const saveButton = document.getElementById('save');
const deleteButton = document.getElementById('delete');
const errorMessage = document.getElementById('error_message');
const statusMessage = document.getElementById('status_message');

function getUser() {
    const headers = new Headers();
    headers.set('Authorization', 'Bearer ' + window.localStorage.getItem('token'));
    fetch(backendUrl, {
        method: 'GET',
        headers,
    }).then(async (response) => {
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error(await response.text())
        }
    }).then((data) => {
        const id = document.getElementById('user_id')
        id.value = data.id;
        const fullName = document.getElementById('full_name');
        fullName.value = data.fullName;
        const email = document.getElementById('email');
        email.value = data.email;
    }).catch((error) => {
        console.log(`Error: ${error.message}`);
        errorMessage.textContent = error.message;
        window.localStorage.removeItem('token');
        window.location.href = '../components/login.html';
    });
}

function updateUser(userData) {
    const headers = new Headers();
    headers.set('Authorization', 'Bearer ' + window.localStorage.getItem('token'));
    let formData = new FormData()
    formData.append('fullName', userData.fullName)
    formData.append('email', userData.email);

    return fetch(backendUrl, {
        method: 'PUT',
        body: formData,
        headers
    });
}

function deleteUser() {
    const headers = new Headers();
    headers.set('Authorization', 'Bearer ' + window.localStorage.getItem('token'));
    return fetch(backendUrl, {
        method: 'DELETE',
        headers
    });
}

function logoutButtonHandler(event) {
    event.preventDefault();
    window.localStorage.removeItem('token');
    window.location.href = '../components/login.html';
}

function deleteButtonHandler(event) {
    event.preventDefault();

    deleteUser().then(async (response) => {
        if (response.status !== 200) {
            throw new Error(await response.text());
        }

        return response.text();
    }).then(() => {
        window.localStorage.removeItem('token');
        window.location.href = '../components/login.html';
    }).catch((error) => {
        errorMessage.textContent = error.message;
        setTimeout(() => {
            errorMessage.textContent = null; 
        }, 5000);
    })
}

function saveButtonHandler(event) {
    event.preventDefault();
    const fullName = document.getElementById('full_name');
    const email = document.getElementById('email');

    if (!email.value.length || !fullName.value.length) {
        errorMessage.textContent = "All fields should be filled";
        setTimeout(() => {
            errorMessage.textContent = null; 
        }, 5000);
        return;
    } 

    const userData = {
        fullName: fullName.value,
        email: email.value,
    };

    updateUser(userData).then(async (response) => {
        if (response.status !== 200) {
            throw new Error(await response.text());
        }

        return response.text();
    }).then((message) => {
        console.log(message)
        statusMessage.textContent = message;
        setTimeout(() => {
            statusMessage.textContent = null; 
        }, 5000);
    }).catch((error) => {
        errorMessage.textContent = error.message;
        setTimeout(() => {
            errorMessage.textContent = null; 
        }, 5000);
    })

}

logoutButton.addEventListener('click', logoutButtonHandler);
saveButton.addEventListener('click', saveButtonHandler);
deleteButton.addEventListener('click', deleteButtonHandler);
window.addEventListener('load', getUser);