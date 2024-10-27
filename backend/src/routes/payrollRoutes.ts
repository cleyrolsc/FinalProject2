import express from 'express';
import { fetchAllPayrolls, fetchPayrollsByEmployeeId, addPayroll, fetchSpecificPayrollForEmployee } from '../controllers/payrollController';

const payrollRouter = express.Router();

payrollRouter.get('/', fetchAllPayrolls); // GET /payroll
payrollRouter.get('/employee/:id', fetchPayrollsByEmployeeId); // GET /payroll/employee/:id
payrollRouter.post('/', addPayroll); // POST /payroll
payrollRouter.get('/:id/employee/:employeeId', fetchSpecificPayrollForEmployee); // GET /payroll/:id/employee/:employeeId

export default payrollRouter;
