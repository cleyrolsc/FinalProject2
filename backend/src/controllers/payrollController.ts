import { Request, Response } from 'express';
import { getAllPayrolls, getPayrollByEmployeeId, createPayroll, getSpecificPayrollForEmployee } from '../services/payrollService';

export const fetchAllPayrolls = async (req: Request, res: Response) => {
    try {
        const payrolls = await getAllPayrolls();
        res.status(200).json(payrolls);
    } catch (error) {
        console.error('Error fetching payrolls:', error);
        res.status(500).json({ message: 'Error fetching payrolls' });
    }
};

export const fetchPayrollsByEmployeeId = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const payrolls = await getPayrollByEmployeeId(id);
        res.status(200).json(payrolls);
    } catch (error) {
        console.error('Error fetching payrolls for employee:', error);
        res.status(500).json({ message: 'Error fetching payrolls for employee' });
    }
};

export const addPayroll = async (req: Request, res: Response) => {
    const payrollData = req.body;
    try {
        const newPayroll = await createPayroll(payrollData);
        res.status(201).json(newPayroll);
    } catch (error) {
        console.error('Error creating payroll:', error);
        res.status(500).json({ message: 'Error creating payroll' });
    }
};

export const fetchSpecificPayrollForEmployee = async (req: Request, res: Response) => {
    const { id, employeeId } = req.params;
    try {
        const payroll = await getSpecificPayrollForEmployee(id, employeeId);
        res.status(200).json(payroll);
    } catch (error) {
        console.error('Error fetching specific payroll for employee:', error);
        res.status(500).json({ message: 'Error fetching specific payroll for employee' });
    }
};
