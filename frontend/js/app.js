const employeeList = document.getElementById("employeeList");
const searchId = document.getElementById("searchId");
const goButton = document.querySelector(".goHome");
const clearButton = document.querySelector(".clearHome");
const createEmployeeButton = document.getElementById("createEmployee");
const saveChangesButton = document.getElementById("saveChanges");
const editFullNameInput = document.getElementById("editFullName");
let currentEditId = null;

const fetchEmployees = async () => {
    try {
        const response = await axios.get("http://localhost:5000/employees");
        const employees = response.data.sort((a, b) => a.idemp - b.idemp);
        displayEmployees(employees);
    } catch (error) {
        console.error("Error fetching employees:", error);
    }
};


const searchEmployeeById = async (id) => {
    try {
        const response = await axios.get(`http://localhost:5000/employees/${id}`);
        const employee = response.data;
        displayEmployees([employee]);
    } catch (error) {
        console.error("Error fetching employee by ID:", error);
        alert("Employee not found.");
    }
};


const displayEmployees = (employees) => {
    employeeList.innerHTML = '';

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


const openEditModal = (id, fullname) => {
    currentEditId = id;
    editFullNameInput.value = fullname;
    const editModal = new bootstrap.Modal(document.getElementById('editEmployeeModal'));
    editModal.show();
};


saveChangesButton.addEventListener("click", async () => {
    const updatedFullName = editFullNameInput.value;
    try {
        await axios.put(`http://localhost:5000/employees/${currentEditId}`, { fullname: updatedFullName });
        fetchEmployees();
        const editModal = new bootstrap.Modal(document.getElementById('editEmployeeModal'));
        editModal.hide();
    } catch (error) {
        console.error("Error updating employee:", error);
    }
});

let currentDeleteId = null;


const confirmDelete = (id) => {
    currentDeleteId = id;
    const deleteModal = new bootstrap.Modal(document.getElementById('deleteConfirmationModal'));
    deleteModal.show();
};


document.getElementById("confirmDelete").addEventListener("click", async () => {
    if (currentDeleteId) {
        try {
            await axios.delete(`http://localhost:5000/employees/${currentDeleteId}`);
            fetchEmployees();
            const deleteModal = new bootstrap.Modal(document.getElementById('deleteConfirmationModal'));
            deleteModal.hide();
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    }
});

goButton.addEventListener("click", () => {
    const id = searchId.value.trim();
    if (id) {
        searchEmployeeById(id);
    }
});


clearButton.addEventListener("click", () => {
    searchId.value = '';
    fetchEmployees();
});


createEmployeeButton.addEventListener("click", async () => {
    const fullname = document.getElementById("fullname").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    try {
        await axios.post("http://localhost:5000/employees", { fullname, username, password, role });
        fetchEmployees();
    } catch (error) {
        console.error("Error creating employee:", error);
    }
});


fetchEmployees();
