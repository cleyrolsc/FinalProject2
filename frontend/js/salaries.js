const salaryList = document.getElementById("salaryList");
let currentEditSalaryId = null;
let currentDeleteSalaryId = null;


const fetchSalaries = async () => {
    try {
        const response = await axios.get("http://localhost:5000/salaries/roles");
        const salaries = response.data;
        displaySalaries(salaries);
    } catch (error) {
        console.error("Error fetching salaries:", error);
    }
};


const displaySalaries = (salaries) => {
    salaryList.innerHTML = '';

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


const confirmDeleteSalary = (id) => {
    currentDeleteSalaryId = id;
    const deleteModal = new bootstrap.Modal(document.getElementById('deleteSalaryConfirmationModal'));
    deleteModal.show();
};


document.getElementById("confirmDeleteSalary").addEventListener("click", async () => {
    if (currentDeleteSalaryId) {
        try {

            const response = await axios.delete(`http://localhost:5000/salaries/${currentDeleteSalaryId}`);
            console.log("Delete response:", response.data);
            fetchSalaries();
            const deleteModal = new bootstrap.Modal(document.getElementById('deleteSalaryConfirmationModal'));
            deleteModal.hide();
        } catch (error) {
            console.error("Error deleting salary:", error.response ? error.response.data : error.message);
        }
    }
});

fetchSalaries();
