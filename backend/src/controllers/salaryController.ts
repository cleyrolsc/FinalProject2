import { Request, Response } from 'express';
import { getSalariesByRoleService, deleteSalaryService } from '../services/salaryService';

export const getSalariesByRole = async (req: Request, res: Response) => {
    try {
        const salaries = await getSalariesByRoleService();
        res.status(200).json(salaries);
    } catch (error) {

        const errorMessage = (error as Error).message || 'Unknown error occurred';
        res.status(500).json({ message: 'Error fetching salaries', error: errorMessage });
    }
};

export const deleteSalary = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await deleteSalaryService(id);
        if (result.rowCount === 0) {
            res.status(404).json({ message: 'Salary not found or is linked to a role' });
            return;
        }
        res.status(200).json({ message: 'Salary deleted successfully' });
    } catch (error) {
        const errorMessage = (error as Error).message || "Unknown error occured";
        res.status(500).json({ message: 'Error deleting salary', error: errorMessage });
    }
};