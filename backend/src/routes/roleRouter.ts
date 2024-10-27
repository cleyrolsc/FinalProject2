import { Router } from 'express';
import {
    getRoles,
    getRoleById,
    addRole,
    updateRoleById,
    deleteRole,
    getEmployeesByRole
} from '../controllers/rolesController';

const roleRouter = Router();


roleRouter.get('/', getRoles);
roleRouter.get('/:id', getRoleById);
roleRouter.get('/:id/employees', getEmployeesByRole);
roleRouter.post('/', addRole);
roleRouter.put('/:id', updateRoleById);
roleRouter.delete('/:id', deleteRole);

export default roleRouter;
