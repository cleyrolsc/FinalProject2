import { Request, Response } from 'express';
import { getAllPayrolls, getPayrollByEmployeeId, createPayroll, getSpecificPayrollForEmployee } from '../services/payrollService';

export const fetchAllPayrolls = async (req: Request, res: Response) => {
    console.log('Fetching all payrolls');
    try {
        const payrolls = await getAllPayrolls(); // Fetch all payrolls
        res.status(200).json(payrolls); // Return payroll records
    } catch (error) {
        console.error('Error fetching payrolls:', error);
        res.status(500).json({ message: 'Error fetching payrolls' }); // Internal server error
    }
};

export const fetchPayrollsByEmployeeId = async (req: Request, res: Response) => {
    const { id } = req.params; // Get employee ID from request parameters
    try {
        const payrolls = await getPayrollByEmployeeId(id); // Fetch payrolls for the employee
        res.status(200).json(payrolls); // Return payroll records
    } catch (error) {
        console.error('Error fetching payrolls for employee:', error);
        res.status(500).json({ message: 'Error fetching payrolls for employee' }); // Internal server error
    }
};

export const addPayroll = async (req: Request, res: Response) => {
    const payrollData = req.body; // Get payroll data from the request body
    try {
        const newPayroll = await createPayroll(payrollData); // Create new payroll
        res.status(201).json(newPayroll); // Return the newly created payroll
    } catch (error) {
        console.error('Error creating payroll:', error);
        res.status(500).json({ message: 'Error creating payroll' }); // Internal server error
    }
};

export const fetchSpecificPayrollForEmployee = async (req: Request, res: Response) => {
    const { id, employeeId } = req.params; // Get payroll ID and employee ID from request parameters
    try {
        const payroll = await getSpecificPayrollForEmployee(id, employeeId); // Fetch specific payroll
        res.status(200).json(payroll); // Return the payroll record
    } catch (error) {
        console.error('Error fetching specific payroll for employee:', error);
        res.status(500).json({ message: 'Error fetching specific payroll for employee' }); // Internal server error
    }
};
