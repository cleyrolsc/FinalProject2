const payrollList = document.getElementById("payrollList");
const payrollForm = document.getElementById("payrollForm");

const fetchPayrolls = async () => {
    try {
        const response = await axios.get("http://localhost:5000/payroll");
        displayPayrolls(response.data);
    } catch (error) {
        console.error("Error fetching payrolls:", error);
    }
};


const displayPayrolls = (payrolls) => {
    payrollList.innerHTML = '';

    payrolls.forEach((payroll) => {
        const payrollItem = document.createElement("tr");
        payrollItem.innerHTML = `
 
            <td class="border border-gray-300 px-4 py-2">${payroll.totalpayroll}</td>
            <td class="border border-gray-300 px-4 py-2">${payroll.extraamount}</td>
            <td class="border border-gray-300 px-4 py-2">${payroll.payrollcut}</td>
            <td class="border border-gray-300 px-4 py-2">${new Date(payroll.date).toLocaleDateString()}</td>
            <td class="border border-gray-300 px-4 py-2">${payroll.baseamount}</td>
            <td class="border border-gray-300 px-4 py-2">${payroll.active ? 'Yes' : 'No'}</td>
        `;
        payrollList.appendChild(payrollItem);
    });
};


document.getElementById("createPayroll").addEventListener("click", async () => {
    const payrollData = {
        totalpayroll: document.getElementById("totalPayroll").value,
        extraamount: document.getElementById("extraAmount").value,
        payrollcut: document.getElementById("payrollCut").value,
        date: document.getElementById("date").value,
        baseamount: document.getElementById("baseAmount").value,
        active: document.getElementById("active").value === "true"
    };

    try {
        const response = await axios.post("http://localhost:5000/payroll", payrollData);
        fetchPayrolls();
        const modal = bootstrap.Modal.getInstance(document.getElementById('payrollModal'));
        modal.hide();
        payrollForm.reset();
        document.getElementById("responseMessage").innerText = "Payroll created successfully!";
    } catch (error) {
        console.error("Error creating payroll:", error);
        document.getElementById("responseMessage").innerText = "Failed to create payroll: " + error.message;
    }
});


fetchPayrolls();
