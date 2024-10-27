import { Router } from 'express';
import {
    getRoles,
    getRoleById,
    addRole,
    updateRoleById,
    deleteRole,
    getEmployeesByRole
} from '../controllers/rolesController'; // Import the relevant controllers

const roleRouter = Router();

// Define routes for roles
roleRouter.get('/', getRoles); // Get all roles
roleRouter.get('/:id', getRoleById); // Get a specific role by ID
roleRouter.get('/:id/employees', getEmployeesByRole); // GET /cargo/:id/empleado
roleRouter.post('/', addRole); // Add a new role
roleRouter.put('/:id', updateRoleById); // Update an existing role
roleRouter.delete('/:id', deleteRole); // Delete a role

export default roleRouter;
