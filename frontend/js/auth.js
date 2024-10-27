// auth.js

// Check if the user is logged in
const checkAuth = () => {
    if (!localStorage.getItem('jwt')) {
        // If no token, redirect to login
        window.location.href = 'login.html';
    }
};

// Function to handle logout
const logout = () => {
    // Remove the token from local storage
    localStorage.removeItem('jwt');

    // Redirect to login page
    window.location.href = 'login.html';
};

// Add event listener to the logout button
document.addEventListener('DOMContentLoaded', () => {
    // Call the checkAuth function when the page loads
    checkAuth();

    // Add logout functionality if the logout button exists
    const logoutButton = document.querySelector('.logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }
});