
const checkAuth = () => {
    if (!localStorage.getItem('jwt')) {

        window.location.href = 'login.html';
    }
};


const logout = () => {

    localStorage.removeItem('jwt');

    window.location.href = 'login.html';
};


document.addEventListener('DOMContentLoaded', () => {

    checkAuth();


    const logoutButton = document.querySelector('.logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }
});