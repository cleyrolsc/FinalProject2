const accountList = document.getElementById("accountList");


const fetchAccounts = async () => {
    try {
        const response = await axios.get("http://localhost:5000/account/login");
        const accounts = response.data;
        displayAccounts(accounts);
    } catch (error) {
        console.error("Error fetching accounts:", error);
    }
};


const displayAccounts = (accounts) => {
    accountList.innerHTML = '';

    accounts.forEach((account) => {
        const accountItem = document.createElement("tr");
        accountItem.className = "border-b";
        accountItem.innerHTML = `
         
            <td class="border border-gray-300 px-4 py-2">${account.username}</td>
            <td class="border border-gray-300 px-4 py-2">${account.password}</td> <!-- Show the password -->
            <td class="border border-gray-300 px-4 py-2">${account.active}</td>
        `;
        accountList.appendChild(accountItem);
    });
};

fetchAccounts();
