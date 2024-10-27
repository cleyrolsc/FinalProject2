import express from 'express';
import { fetchAllPayrolls, fetchPayrollsByEmployeeId, addPayroll, fetchSpecificPayrollForEmployee } from '../controllers/payrollController';

const payrollRouter = express.Router();

payrollRouter.get('/', fetchAllPayrolls);
payrollRouter.get('/employee/:id', fetchPayrollsByEmployeeId);
payrollRouter.post('/', addPayroll);
payrollRouter.get('/:id/employee/:employeeId', fetchSpecificPayrollForEmployee);

export default payrollRouter;
