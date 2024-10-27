import { Router } from 'express';
import { getSalariesByRole, deleteSalary } from '../controllers/salaryController';

const salaryRouter = Router();

salaryRouter.get('/roles', getSalariesByRole);
salaryRouter.delete('/:id', deleteSalary);

export default salaryRouter;