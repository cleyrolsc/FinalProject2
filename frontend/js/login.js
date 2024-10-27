document.addEventListener('DOMContentLoaded', () => {
    // Check if a token is already in local storage
    if (localStorage.getItem('jwt')) {
        // Redirect to home.html if a token exists
        window.location.href = 'home.html';
    }

    // Add event listener for login button
    document.querySelector('.login').addEventListener('click', async () => {
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        // Validate input
        if (!username || !password) {
            document.getElementById('responseMessage').innerText = 'Username and password are required.';
            return;
        }

        try {
            // Attempt to login
            const response = await axios.post('http://localhost:5000/login', { username, password });
            const { token } = response.data;

            // Store the token in local storage
            localStorage.setItem('jwt', token);

            // Redirect to home.html
            window.location.href = 'home.html';
        } catch (error) {
            console.error('Login error:', error);
            document.getElementById('responseMessage').innerText = 'Invalid username or password.';
        }
    });
});
