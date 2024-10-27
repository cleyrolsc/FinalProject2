import { Router } from 'express';
import {
    getAllEmployees,
    getEmployeeById,
    getEmployeeHours,
    getEmployeeSalary,
    addEmployee,
    addEmployeeHours,
    updateEmployee,
    softDeleteEmployee,
} from '../controllers/employeesController';

const employeeRouter = Router();

// Define the routes
employeeRouter.get('/', getAllEmployees);
employeeRouter.get('/:id', getEmployeeById);
employeeRouter.post('/', addEmployee);
employeeRouter.put('/:id', updateEmployee);
employeeRouter.delete('/:id', softDeleteEmployee);


employeeRouter.get('/:id/hours', getEmployeeHours);
employeeRouter.post('/:id/hours', addEmployeeHours);
employeeRouter.get('/:id/salary', getEmployeeSalary);




export default employeeRouter;
