const username = document.querySelector('.username');
const password = document.querySelector('.password');
const loginBtn = document.querySelector('.login');

// Function to decode JWT token
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

// Event listener for login button click
loginBtn.addEventListener("click", () => {
    const data = {
        username: username.value,
        password: password.value
    };

    axios.post('http://localhost:5000/login', data)
        .then((loginResponse) => {
            const token = loginResponse.data.token;
            localStorage.setItem("token", token);

            // Decode the token to get the user role
            const decodedToken = parseJwt(token);
            const userRole = decodedToken.role;
            console.log("User Role from Token:", userRole);

            // Redirect based on role ID (assuming 6 = Agent)
            if (userRole === 6) {
                window.location.href = "agent.html";
            } else {
                window.location.href = "home.html";
            }
        })
        .catch((error) => {
            console.error('Login error:', error);
            alert("Invalid username or password.");
        });
});

// Redirect to appropriate page if already logged in
if (localStorage.getItem("token")) {
    const token = localStorage.getItem("token");
    const decodedToken = parseJwt(token);
    const userRole = decodedToken.role;

    // Redirect based on role ID (assuming 6 = Agent)
    if (userRole === 6) {
        window.location.href = "agent.html";
    } else {
        window.location.href = "home.html";
    }
}
