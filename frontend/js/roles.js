const roleList = document.getElementById("roleList");
const searchRoleId = document.getElementById("searchRoleId");
const goRoleButton = document.querySelector(".goRole");
const clearRoleButton = document.querySelector(".clearRole");
const createRoleButton = document.getElementById("createRoleButton");
const deleteRoleButton = document.getElementById("confirmDeleteRole");
let currentDeleteId = null;


const fetchRoles = async () => {
        try {
                const response = await axios.get("http://localhost:5000/roles");
                displayRoles(response.data);
        } catch (error) {
                console.error("Error fetching roles:", error);
        }
};


const displayRoles = (roles) => {
        roleList.innerHTML = '';

        roles.forEach((role) => {
                const roleItem = document.createElement("tr");
                roleItem.className = "border-b";
                roleItem.innerHTML = `
            <td class="border border-gray-300 px-4 py-2">${role.id}</td>
            <td class="border border-gray-300 px-4 py-2">${role.role}</td>
            <td class="border border-gray-300 px-4 py-2">
                <button onclick="confirmDelete('${role.id}')" class="bg-red-500 text-white rounded p-2">Delete</button>
            </td>
        `;
                roleList.appendChild(roleItem);
        });
};


createRoleButton.addEventListener("click", async () => {
        const roleName = document.getElementById("roleName").value.trim();
        const roleSalary = document.getElementById("roleSalary").value;
        const isBypass = document.getElementById("isBypass").value === "true";

        if (!roleName || !roleSalary) {
                alert("Role name and salary are required.");
                return;
        }

        try {
                const response = await axios.post("http://localhost:5000/roles", {
                        role: roleName,
                        salary: roleSalary,
                        isBypass: isBypass
                });
                fetchRoles();
                document.getElementById("roleName").value = '';
                document.getElementById("roleSalary").value = '';
                document.getElementById("isBypass").value = "false";
        } catch (error) {
                console.error("Error creating role:", error);
                alert("Failed to create role: " + (error.response ? error.response.data.message : error.message));
        }
});


const searchRoleById = async (id) => {
        try {
                const response = await axios.get(`http://localhost:5000/roles/${id}`);
                displayRoles([response.data]);
        } catch (error) {
                console.error("Error fetching role by ID:", error);
                alert("Role not found.");
        }
};


goRoleButton.addEventListener("click", () => {
        const id = searchRoleId.value.trim();
        if (id) {
                searchRoleById(id);
        }
});


clearRoleButton.addEventListener("click", () => {
        searchRoleId.value = '';
        fetchRoles();
});


const confirmDelete = (id) => {
        currentDeleteId = id;
        const deleteModal = new bootstrap.Modal(document.getElementById('deleteConfirmationModal'));
        deleteModal.show();
};


deleteRoleButton.addEventListener("click", async () => {
        if (currentDeleteId) {
                try {
                        const response = await axios.delete(`http://localhost:5000/roles/${currentDeleteId}`);
                        fetchRoles();
                        const deleteModal = bootstrap.Modal.getInstance(document.getElementById('deleteConfirmationModal'));
                        deleteModal.hide();
                } catch (error) {
                        console.error("Error deleting role:", error);
                        alert("Failed to delete role: " + (error.response ? error.response.data.message : error.message));
                }
        }
});

fetchRoles();
