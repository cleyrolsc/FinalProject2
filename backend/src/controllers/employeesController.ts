import { Request, Response } from 'express';
import {
    getEmployees,
    getEmployeeByIdService,
    getEmployeeHoursService,
    getEmployeeSalaryService,
    createEmployee,
    addEmployeeHours as addEmployeeHoursService,
    updateEmployeeService,
    softDeleteEmployeeService,
    getRoleIdByName,
    getRoleSalaryById
} from '../services/employeeService';

export const getAllEmployees = async (req: Request, res: Response) => {
    try {
        const employees = await getEmployees();
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching employees' });
    }
};

export const getEmployeeById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const employee = await getEmployeeByIdService(id);
        if (!employee) {
            res.status(404).json({ message: 'Employee not found' });
            return;
        }
        const { employeeid, ...rest } = employee; // Destructure to exclude employeeid
        const formattedEmployee = {
            ...rest,
            employeeId: `C-${String(employee.idemp).padStart(4, '0')}`, // Format the ID for display
        };
        res.status(200).json(formattedEmployee);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ message: 'Error fetching employee' });
    }
};

export const getEmployeeHours = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const hours = await getEmployeeHoursService(id);
        res.status(200).json(hours);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching employee hours' });
    }
};

// src/controllers/employeeController.ts
export const getEmployeeSalary = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const employeeSalary = await getEmployeeSalaryService(id);
        res.status(200).json(employeeSalary); // Return only fullname, role, and salary
    } catch (err) {
        console.error('Error fetching employee salary:', err);
        res.status(500).json({ message: 'Error fetching employee salary' });
    }
};


export const addEmployee = async (req: Request, res: Response) => {
    const { fullname, role, username, password } = req.body;
    try {
        console.log(`Role to be fetched: ${role}`); // Log the role
        const roleId = await getRoleIdByName(role);
        console.log(`Role ID found: ${JSON.stringify(roleId)}`); // Log the fetched role ID

        if (!roleId) {
            res.status(400).json({ message: 'Role not found' });
            return;
        }

        const newEmployee = await createEmployee({
            fullname,
            role_id: roleId.idrole, // Ensure you're using the correct property here
            username,
            password,
            active: true
        });
        res.status(201).json(newEmployee);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ message: 'Error adding employee' });
    }
};



export const addEmployeeHours = async (req: Request, res: Response) => {
    const { id } = req.params; // Extract employee ID from request parameters
    const hoursData = req.body; // Extract hours data from request body
    try {
        // Call the service function to add employee hours
        const newHours = await addEmployeeHoursService(id, hoursData);
        res.status(201).json(newHours); // Return the newly created hours
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ message: 'Error adding employee hours' }); // Send error response
    }
};

export const updateEmployee = async (req: Request, res: Response) => {
    const { id } = req.params; // Get the employee ID from the request parameters
    const { fullname } = req.body; // Only extract fullname from the request body
    try {
        const updatedEmployee = await updateEmployeeService(id, fullname); // Call the service with ID and fullname
        if (!updatedEmployee) {
            res.status(404).json({ message: 'Employee not found' });
            return;
        }
        res.status(200).json(updatedEmployee); // Return the updated employee details
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ message: 'Error updating employee' });
    }
};

export const softDeleteEmployee = async (req: Request, res: Response) => {
    const { id } = req.params; // Get the employee ID from the request parameters
    try {
        const result = await softDeleteEmployeeService(id); // Call the service to soft delete
        if (!result) {
            res.status(404).json({ message: 'Employee not found' }); // If not found, return 404
            return;
        }
        res.status(204).send(); // No content, indicate successful deletion
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ message: 'Error deleting employee' }); // Send error response
    }
};
