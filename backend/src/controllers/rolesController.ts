import { Request, Response } from 'express';
import {
    getRolesService,
    getRoleByIdService,
    addRoleService,
    updateRoleServiceById,
    deleteRoleService,
    getEmployeesByRoleId
} from '../services/roleService';

// Function to get all roles

export const getRoles = async (req: Request, res: Response) => {
    try {
        const roles = await getRolesService(); // This now returns both IDs and roles
        res.status(200).json(roles); // Respond with the filtered roles
    } catch (err) {
        console.error("Error fetching roles:", err);
        res.status(500).json({ message: 'Error fetching roles' });
    }
};

// Function to get a role by ID
export const getRoleById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const role = await getRoleByIdService(id);
        if (!role) {
            res.status(404).json({ message: 'Role not found' });
            return;
        }
        // Return only the id and role
        res.status(200).json({
            id: role.idrole,
            role: role.role
        });
    } catch (err) {
        console.error("Error fetching role:", err);
        res.status(500).json({ message: 'Error fetching role' });
    }
};

// Function to create a new role
export const addRole = async (req: Request, res: Response) => {
    const { role, isBypass, salary } = req.body; // Destructure salary from the request body
    try {
        const newRole = await addRoleService({ role, isBypass, salary }); // Pass salary to the service
        res.status(201).json(newRole); // Return the newly created role
    } catch (err) {
        // Assert the error type
        if (err instanceof Error) {
            res.status(500).json({ message: err.message }); // Access message property safely
        } else {
            res.status(500).json({ message: 'An unexpected error occurred.' });
        }
    }
};

// Function to update a role
export const updateRoleById = async (req: Request, res: Response) => {
    const id = Number(req.params.id); // Get ID from the URL parameters
    const { role, salary } = req.body; // Get role details from the request body

    try {
        const updatedRole = await updateRoleServiceById(id, { role, salary }); // Call service to update the role
        if (!updatedRole) {
            res.status(404).json({ message: 'Role not found' });
            return;
        }
        res.status(200).json(updatedRole); // Return the updated role
    } catch (err: any) {
        res.status(500).json({ message: 'Error updating role', error: err.message });
    }
};

// Function to delete a role
export const deleteRole = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await deleteRoleService(id);
        res.status(200).json({ message: 'Role deleted successfully.' });
    } catch (err) {
        // Assert the error type
        if (err instanceof Error) {
            res.status(400).json({ message: err.message }); // Access message property safely
        } else {
            res.status(500).json({ message: 'An unexpected error occurred.' });
        }
    }
};

// src/controllers/roleController.ts

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
        console.error(err); // Log the error for debugging
        res.status(500).json({ message: 'Error fetching employees by role' });
    }
};


