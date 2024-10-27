const roleList = document.getElementById("roleList");
const searchRoleId = document.getElementById("searchRoleId");
const goRoleButton = document.querySelector(".goRole");
const clearRoleButton = document.querySelector(".clearRole");
const createRoleButton = document.getElementById("createRoleButton");
let currentEditId = null;

// Fetch and display all roles
const fetchRoles = async () => {
        try {
                const response = await axios.get("http://localhost:5000/roles");
                console.log("Fetched Roles:", response.data); // Log the fetched roles
                displayRoles(response.data); // Call displayRoles function with fetched data
        } catch (error) {
                console.error("Error fetching roles:", error);
        }
};

// Function to display roles in the table
const displayRoles = (roles) => {
        roleList.innerHTML = ''; // Clear current role list

        roles.forEach((role) => {
                const roleItem = document.createElement("tr");
                roleItem.className = "border-b";
                roleItem.innerHTML = `
      
                <td class="border border-gray-300 px-4 py-2">${role.role}</td>
         
                <td class="border border-gray-300 px-4 py-2"><button onclick="openEditModal('${role.idrole}', '${role.role}', '${role.salary_idsalary}')" class="bg-yellow-500 text-white rounded p-2">Edit</button></td>
                <td class="border border-gray-300 px-4 py-2"><button onclick="confirmDelete('${role.idrole}')" class="bg-red-500 text-white rounded p-2">Delete</button></td>
            `;
                roleList.appendChild(roleItem);
        });
};

// Event listener for the create role button


// Function to create a new role
document.getElementById("createRoleButton").addEventListener("click", async () => {
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
const searchRoleById = async (id) => {
        try {
                const response = await axios.get(`http://localhost:5000/roles/${id}`);
                const role = response.data;
                displayRoles([role]); // Assuming displayRoles can handle a single role
        } catch (error) {
                console.error("Error fetching role by ID:", error);
                alert("Role not found."); // Notify user if role isn't found
        }
};

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

// Function to open the edit modal
const openEditModal = (id, role, salary) => {
        currentEditId = id; // Set the current ID for editing
        document.getElementById("roleName").value = role; // Populate role name input
        document.getElementById("roleSalary").value = salary; // Populate salary input
        const editModal = new bootstrap.Modal(document.getElementById('createRoleModal'));
        editModal.show(); // Show the edit modal
};

// Function to confirm deletion
const confirmDelete = (id) => {
        // Store the ID and show a confirmation modal (similar to employee)
        currentDeleteId = id;
        const deleteModal = new bootstrap.Modal(document.getElementById('deleteConfirmationModal'));
        deleteModal.show();
};

// Fetch all roles when the page loads
fetchRoles();