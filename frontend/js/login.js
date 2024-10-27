document.addEventListener('DOMContentLoaded', () => {

    if (localStorage.getItem('jwt')) {

        window.location.href = 'home.html';
    }


    document.querySelector('.login').addEventListener('click', async () => {
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;


        if (!username || !password) {
            document.getElementById('responseMessage').innerText = 'Username and password are required.';
            return;
        }

        try {

            const response = await axios.post('http://localhost:5000/login', { username, password });
            const { token } = response.data;


            localStorage.setItem('jwt', token);


            window.location.href = 'home.html';
        } catch (error) {
            console.error('Login error:', error);
            document.getElementById('responseMessage').innerText = 'Invalid username or password.';
        }
    });
});
