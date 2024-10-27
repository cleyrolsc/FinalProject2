import { Request, Response } from 'express';
import {
    getRolesService,
    getRoleByIdService,
    addRoleService,
    updateRoleServiceById,
    deleteRoleService,
    getEmployeesByRoleId
} from '../services/roleService';


export const getRoles = async (req: Request, res: Response) => {
    try {
        const roles = await getRolesService();
        res.status(200).json(roles);
    } catch (err) {
        console.error("Error fetching roles:", err);
        res.status(500).json({ message: 'Error fetching roles' });
    }
};


export const getRoleById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const role = await getRoleByIdService(id);
        if (!role) {
            res.status(404).json({ message: 'Role not found' });
            return;
        }

        res.status(200).json({
            id: role.idrole,
            role: role.role
        });
    } catch (err) {
        console.error("Error fetching role:", err);
        res.status(500).json({ message: 'Error fetching role' });
    }
};


export const addRole = async (req: Request, res: Response) => {
    const { role, isBypass, salary } = req.body;
    try {
        const newRole = await addRoleService({ role, isBypass, salary });
        res.status(201).json(newRole);
    } catch (err) {

        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'An unexpected error occurred.' });
        }
    }
};


export const updateRoleById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { role, salary } = req.body;

    try {
        const updatedRole = await updateRoleServiceById(id, { role, salary });
        if (!updatedRole) {
            res.status(404).json({ message: 'Role not found' });
            return;
        }
        res.status(200).json(updatedRole);
    } catch (err: any) {
        res.status(500).json({ message: 'Error updating role', error: err.message });
    }
};


export const deleteRole = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await deleteRoleService(id);
        res.status(200).json({ message: 'Role deleted successfully.' });
    } catch (err) {

        if (err instanceof Error) {
            res.status(400).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'An unexpected error occurred.' });
        }
    }
};


export const getEmployeesByRole = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const employees = await getEmployeesByRoleId(id);
        if (employees.length === 0) {
            res.status(404).json({ message: 'No employees found for this role' });
            return;
        }
        res.status(200).json(employees);
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching employees by role' });
    }
};


