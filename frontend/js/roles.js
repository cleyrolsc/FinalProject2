const roleList = document.getElementById("roleList");
const searchRoleId = document.getElementById("searchRoleId");
const goRoleButton = document.querySelector(".goRole");
const clearRoleButton = document.querySelector(".clearRole");
const createRoleButton = document.getElementById("createRoleButton");
const deleteRoleButton = document.getElementById("confirmDeleteRole");
let currentDeleteId = null; // To track which role is being deleted

// Fetch and display all roles
const fetchRoles = async () => {
        try {
                const response = await axios.get("http://localhost:5000/roles");
                console.log("Fetched Roles:", response.data);
                displayRoles(response.data);
        } catch (error) {
                console.error("Error fetching roles:", error);
        }
};

// Function to display roles in the table
const displayRoles = (roles) => {
        roleList.innerHTML = ''; // Clear current role list

        roles.forEach((role) => {
                console.log("Role Object:", role); // Log the role object to check its structure
                const roleItem = document.createElement("tr");
                roleItem.className = "border-b";
                roleItem.innerHTML = `
            <td class="border border-gray-300 px-4 py-2">${role.id}</td> <!-- Ensure id is used here -->
            <td class="border border-gray-300 px-4 py-2">${role.role}</td>
            <td class="border border-gray-300 px-4 py-2">
                <button onclick="confirmDelete('${role.id}')" class="bg-red-500 text-white rounded p-2">Delete</button> <!-- Correctly use role.id -->
            </td>
        `;
                roleList.appendChild(roleItem);
        });
};

// Function to create a new role
createRoleButton.addEventListener("click", async () => {
        const roleName = document.getElementById("roleName").value;
        const roleSalary = document.getElementById("roleSalary").value;
        const isBypass = document.getElementById("isBypass").value === "true"; // Convert to boolean

        try {
                await axios.post("http://localhost:5000/roles", { role: roleName, salary: roleSalary, isBypass: isBypass });
                fetchRoles(); // Refresh the role list
        } catch (error) {
                console.error("Error creating role:", error);
        }
});

// Event listener for the search button
goRoleButton.addEventListener("click", () => {
        const id = searchRoleId.value.trim();
        if (id) {
                searchRoleById(id); // Fetch role by ID
        }
});

// Event listener for the clear button
clearRoleButton.addEventListener("click", () => {
        searchRoleId.value = '';
        fetchRoles(); // Fetch all roles again
});

// Function to confirm deletion
// Function to confirm deletion
const confirmDelete = (id) => {
        currentDeleteId = id; // Set the current ID for deletion
        const deleteModal = new bootstrap.Modal(document.getElementById('deleteConfirmationModal'));
        deleteModal.show(); // Show the delete confirmation modal
};

// Event listener for the confirm delete button
deleteRoleButton.addEventListener("click", async () => {
        if (currentDeleteId) {
                try {
                        const response = await axios.delete(`http://localhost:5000/roles/${currentDeleteId}`); // Send delete request
                        console.log("Delete Response:", response.data); // Log response for debugging
                        fetchRoles(); // Refresh the role list

                        // Hide the modal after deletion
                        const deleteModal = bootstrap.Modal.getInstance(document.getElementById('deleteConfirmationModal'));
                        deleteModal.hide();
                } catch (error) {
                        console.error("Error deleting role:", error);
                        alert("Failed to delete role: " + (error.response ? error.response.data.message : error.message));
                }
        }
});

// Fetch all roles when the page loads
fetchRoles();
