const backendUrl = 'http://127.0.0.1:8080/api/v1/login';
const submitButton = document.querySelector('.button');
const errorMessage = document.getElementById('error_message');

if (window.localStorage.getItem('token')) {
    window.location.href = '../components/profile.html';
}

function loginUser(userData) {
    let formData = new FormData();
    formData.append('email', userData.username);
    formData.append('password', userData.password);

    return fetch(backendUrl, {
        method: 'POST',
        body: formData
    });
}

async function loginButtonHandler(event) {
    event.preventDefault();
    const username = document.getElementById('username');
    const password = document.getElementById('password');

    const userData = {
        username: username.value,
        password: password.value,
    };

    loginUser(userData)
        .then(async (response) => {
            if (response.status !== 200) {
                throw new Error(await response.text());
            } 
            return response.json()
        }).then((json) => {
            console.log(json.token)
            window.localStorage.setItem('token', json.token);
            window.location.href = '../components/profile.html';
        })
        .catch((error) => {
            console.log(`Fetch error: ${error}`);
            errorMessage.textContent = error.message;
        });
}

submitButton.addEventListener('click', loginButtonHandler);