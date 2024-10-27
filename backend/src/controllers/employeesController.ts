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

import { createAccountForEmployee } from "../services/accountService";

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
        const { employeeid, ...rest } = employee;
        const formattedEmployee = {
            ...rest,
            employeeId: `C-${String(employee.idemp).padStart(4, '0')}`,
        };
        res.status(200).json(formattedEmployee);
    } catch (err) {
        console.error(err);
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


export const getEmployeeSalary = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const employeeSalary = await getEmployeeSalaryService(id);
        res.status(200).json(employeeSalary);
    } catch (err) {
        console.error('Error fetching employee salary:', err);
        res.status(500).json({ message: 'Error fetching employee salary' });
    }
};


export const addEmployee = async (req: Request, res: Response) => {
    const { fullname, role, username, password } = req.body;
    try {
        console.log(`Role to be fetched: ${role}`);
        const roleId = await getRoleIdByName(role);
        console.log(`Role ID found: ${JSON.stringify(roleId)}`);

        if (!roleId) {
            res.status(400).json({ message: 'Role not found' });
            return;
        }

        const newEmployee = await createEmployee({
            fullname,
            role_id: roleId.idrole,
            username,
            password,
            active: true
        });

        const accountCreated = await createAccountForEmployee(username, password, roleId.idrole);
        console.log(`Account created: ${JSON.stringify(accountCreated)}`);

        res.status(201).json({ newEmployee, accountCreated });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error adding employee' });
    }
};



export const addEmployeeHours = async (req: Request, res: Response) => {
    const { id } = req.params;
    const hoursData = req.body;
    try {

        const newHours = await addEmployeeHoursService(id, hoursData);
        res.status(201).json(newHours);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error adding employee hours' });
    }
};

export const updateEmployee = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { fullname } = req.body;
    try {
        const updatedEmployee = await updateEmployeeService(id, fullname);
        if (!updatedEmployee) {
            res.status(404).json({ message: 'Employee not found' });
            return;
        }
        res.status(200).json(updatedEmployee);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating employee' });
    }
};

export const softDeleteEmployee = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await softDeleteEmployeeService(id);
        if (!result) {
            res.status(404).json({ message: 'Employee not found' });
            return;
        }
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting employee' });
    }
};
