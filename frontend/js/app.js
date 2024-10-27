const employeeList = document.getElementById("employeeList");
const searchId = document.getElementById("searchId");
const goButton = document.querySelector(".goHome");
const clearButton = document.querySelector(".clearHome");
const createEmployeeButton = document.getElementById("createEmployee");
const saveChangesButton = document.getElementById("saveChanges");
const editFullNameInput = document.getElementById("editFullName");
let currentEditId = null;

// Function to fetch and display all employees
const fetchEmployees = async () => {
    try {
        const response = await axios.get("http://localhost:5000/employees");
        const employees = response.data.sort((a, b) => a.idemp - b.idemp); // Sort by employee ID
        displayEmployees(employees);
    } catch (error) {
        console.error("Error fetching employees:", error);
    }
};

// Function to search employees by ID
const searchEmployeeById = async (id) => {
    try {
        const response = await axios.get(`http://localhost:5000/employees/${id}`);
        const employee = response.data;
        displayEmployees([employee]); // Display the specific employee
    } catch (error) {
        console.error("Error fetching employee by ID:", error);
        alert("Employee not found.");
    }
};

// Function to display employees in the table
const displayEmployees = (employees) => {
    employeeList.innerHTML = ''; // Clear current employee list

    employees.forEach((employee) => {
        const employeeItem = document.createElement("tr");
        employeeItem.className = "border-b";
        employeeItem.innerHTML = `
            <td class="border border-gray-300 px-4 py-2">${employee.employeeId}</td>
            <td class="border border-gray-300 px-4 py-2">${employee.fullname}</td>
            <td class="border border-gray-300 px-4 py-2">${employee.active ? "Active" : "Inactive"}</td>
            <td class="border border-gray-300 px-4 py-2"><button onclick="openEditModal('${employee.idemp}', '${employee.fullname}')" class="bg-yellow-500 text-white rounded p-2">Edit</button></td>
            <td class="border border-gray-300 px-4 py-2"><button onclick="confirmDelete('${employee.idemp}')" class="bg-red-500 text-white rounded p-2">Delete</button></td>
        `;
        employeeList.appendChild(employeeItem);
    });
};

// Function to open the edit modal
const openEditModal = (id, fullname) => {
    currentEditId = id;
    editFullNameInput.value = fullname; // Populate the full name input
    const editModal = new bootstrap.Modal(document.getElementById('editEmployeeModal'));
    editModal.show();
};

// Event listener for the save changes button
saveChangesButton.addEventListener("click", async () => {
    const updatedFullName = editFullNameInput.value;
    try {
        await axios.put(`http://localhost:5000/employees/${currentEditId}`, { fullname: updatedFullName });
        fetchEmployees(); // Refresh the employee list
        const editModal = new bootstrap.Modal(document.getElementById('editEmployeeModal'));
        editModal.hide(); // Hide the modal after saving changes
    } catch (error) {
        console.error("Error updating employee:", error);
    }
});

let currentDeleteId = null; // Variable to store the ID of the employee to be deleted

// Function to confirm deletion
const confirmDelete = (id) => {
    currentDeleteId = id; // Set the current ID for deletion
    const deleteModal = new bootstrap.Modal(document.getElementById('deleteConfirmationModal'));
    deleteModal.show(); // Show the delete confirmation modal
};

// Event listener for the confirm delete button
document.getElementById("confirmDelete").addEventListener("click", async () => {
    if (currentDeleteId) {
        try {
            await axios.delete(`http://localhost:5000/employees/${currentDeleteId}`); // Send delete request
            fetchEmployees(); // Refresh the employee list
            const deleteModal = new bootstrap.Modal(document.getElementById('deleteConfirmationModal'));
            deleteModal.hide(); // Hide the modal after deletion
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    }
});

// Event listener for the search button
goButton.addEventListener("click", () => {
    const id = searchId.value.trim();
    if (id) {
        searchEmployeeById(id);
    }
});

// Event listener for the clear button
clearButton.addEventListener("click", () => {
    searchId.value = '';
    fetchEmployees(); // Fetch all employees again
});

// Function to create a new employee
createEmployeeButton.addEventListener("click", async () => {
    const fullname = document.getElementById("fullname").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    try {
        await axios.post("http://localhost:5000/employees", { fullname, username, password, role });
        fetchEmployees(); // Refresh the employee list
    } catch (error) {
        console.error("Error creating employee:", error);
    }
});

// Fetch all employees when the page loads
fetchEmployees();
