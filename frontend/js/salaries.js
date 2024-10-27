const salaryList = document.getElementById("salaryList");
let currentEditSalaryId = null; // To track which salary is being edited
let currentDeleteSalaryId = null; // To track which salary is being deleted

// Function to fetch and display all salaries
const fetchSalaries = async () => {
    try {
        const response = await axios.get("http://localhost:5000/salaries/roles");
        const salaries = response.data;
        displaySalaries(salaries);
    } catch (error) {
        console.error("Error fetching salaries:", error);
    }
};

// Function to display salaries in the table
const displaySalaries = (salaries) => {
    salaryList.innerHTML = ''; // Clear current salary list

    salaries.forEach((salary) => {
        const salaryItem = document.createElement("tr");
        salaryItem.className = "border-b";
        salaryItem.innerHTML = `
            <td class="border border-gray-300 px-4 py-2">${salary.idsalary}</td>
            <td class="border border-gray-300 px-4 py-2">${salary.salary}</td>
    
            <td class="border border-gray-300 px-4 py-2"><button onclick="confirmDeleteSalary(${salary.idsalary})" class="bg-red-500 text-white rounded p-2">Delete</button></td>
        `;
        salaryList.appendChild(salaryItem);
    });
};

// Function to confirm deletion of a salary
const confirmDeleteSalary = (id) => {
    currentDeleteSalaryId = id; // Set the current ID for deletion
    const deleteModal = new bootstrap.Modal(document.getElementById('deleteSalaryConfirmationModal'));
    deleteModal.show(); // Show the delete confirmation modal
};

// Event listener for the confirm delete button
document.getElementById("confirmDeleteSalary").addEventListener("click", async () => {
    if (currentDeleteSalaryId) {
        try {
            // Send delete request
            const response = await axios.delete(`http://localhost:5000/salaries/${currentDeleteSalaryId}`);
            console.log("Delete response:", response.data); // Log the response data
            fetchSalaries(); // Refresh the salary list
            const deleteModal = new bootstrap.Modal(document.getElementById('deleteSalaryConfirmationModal'));
            deleteModal.hide(); // Hide the modal after deletion
        } catch (error) {
            console.error("Error deleting salary:", error.response ? error.response.data : error.message);
        }
    }
});

// Fetch all salaries when the page loads
fetchSalaries();
