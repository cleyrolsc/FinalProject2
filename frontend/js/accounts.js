const accountList = document.getElementById("accountList");

// Function to fetch and display all accounts
const fetchAccounts = async () => {
    try {
        const response = await axios.get("http://localhost:5000/account/login"); // Update the URL to your endpoint
        const accounts = response.data; // Get the accounts from the response
        displayAccounts(accounts); // Display accounts in the table
    } catch (error) {
        console.error("Error fetching accounts:", error); // Log any error
    }
};

// Function to display accounts in the table
const displayAccounts = (accounts) => {
    accountList.innerHTML = ''; // Clear current account list

    accounts.forEach((account) => {
        const accountItem = document.createElement("tr");
        accountItem.className = "border-b";
        accountItem.innerHTML = `
            <td class="border border-gray-300 px-4 py-2">${account.id}</td>
            <td class="border border-gray-300 px-4 py-2">${account.username}</td>
            <td class="border border-gray-300 px-4 py-2">${account.password}</td> <!-- Show the password -->
            <td class="border border-gray-300 px-4 py-2">${account.active}</td>
        `;
        accountList.appendChild(accountItem); // Append each account to the table
    });
};

// Fetch all accounts when the page loads
fetchAccounts();
