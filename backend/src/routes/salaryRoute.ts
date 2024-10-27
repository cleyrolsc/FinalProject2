import { Router } from 'express';
import { getSalariesByRole, deleteSalary } from '../controllers/salaryController';

const salaryRouter = Router();

salaryRouter.get('/roles', getSalariesByRole); // GET /salaries/roles
salaryRouter.delete('/:id', deleteSalary);

export default salaryRouter;