const backendUrl = 'http://127.0.0.1:8080/api/v1/register';

const submitButton = document.querySelector('.button');
const errorMessage = document.getElementById('error_message');

if (window.localStorage.getItem('token')) {
    window.location.href = '../components/profile.html';
}

function registerUser(userData) {
    let formData = new FormData()

    formData.append('fullName', userData.fullName)
    formData.append('email', userData.email);
    formData.append('password', userData.password);

    return fetch(backendUrl, {
        method: 'POST',
        body: formData
    });
}

function registerButtonHandler(event) {
    event.preventDefault();
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm_password');


    if (password.value !== confirmPassword.value) {
        errorMessage.textContent = 'Passwords doesn\'t match';
        return;
    }

    const userData = {
        fullName: fullName.value,
        email: email.value,
        password: password.value,
    };

    registerUser(userData)
        .then(async (response) => {
            if (response.status !== 200) {
                throw new Error(await response.text());
            }
            return response.json();
        })
        .then(() => {
            window.location.href = '../components/login.html';
        })
        .catch((error) => {
            console.log(`Fetch error: ${error.message}`);
            errorMessage.textContent = error.message;
        });
}

submitButton.addEventListener('click', registerButtonHandler);