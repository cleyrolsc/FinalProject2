import pool from '../config/db'; // Import your database connection

// Function to get all roles
export const getRolesService = async () => {
    const result = await pool.query('SELECT idrole, role FROM public.role WHERE active = TRUE'); // Select both idrole and role
    return result.rows.map(row => ({
        id: row.idrole, // Include the ID
        role: row.role  // Include the role name
    }));
};

// Function to get a role by ID
export const getRoleByIdService = async (id: string) => {
    const result = await pool.query('SELECT idrole, role FROM public.role WHERE idrole = $1', [id]); // Select only idrole and role
    return result.rows[0]; // Return the first row or undefined
};

// Function to create a new role
const findOrCreateSalary = async (salary: number) => {
    // Check if the salary already exists
    const result = await pool.query('SELECT * FROM public.salary WHERE salary = $1', [salary]);

    // If it exists, return the ID
    if (result.rows.length > 0) {
        return result.rows[0].idsalary; // Return the existing salary ID
    } else {
        // If it doesn't exist, create a new salary entry
        const newSalaryResult = await pool.query('INSERT INTO public.salary (salary) VALUES ($1) RETURNING idsalary', [salary]);
        return newSalaryResult.rows[0].idsalary; // Return the newly created salary ID
    }
};

export const addRoleService = async (roleData: { role: string; isBypass: boolean; salary: number; }) => {
    const { role, isBypass, salary } = roleData;

    try {
        // First, find or create the salary and get its ID
        const salaryId = await findOrCreateSalary(salary);

        // Then, insert the new role with the salary ID
        const result = await pool.query(
            'INSERT INTO public.role (role, isbypass, active, salary_idsalary) VALUES ($1, $2, TRUE, $3) RETURNING *',
            [role, isBypass, salaryId]
        );

        return result.rows[0]; // Return the newly created role
    } catch (error: any) {
        throw new Error('Failed to add role: ' + error.message);
    }
};

// src/services/roleService.ts


export const getEmployeesByRoleId = async (roleId: string) => {
    const result = await pool.query(
        'SELECT e.idemp, e.fullname, e.username, e.active FROM public.employee e WHERE e.role_id = $1',
        [roleId]
    );
    return result.rows;
};


// Function to update a role
export const updateRoleServiceById = async (id: number, roleData: { role?: string; salary?: number; }) => {
    const { role, salary } = roleData;

    const updates = [];
    const values: (string | number)[] = [];

    // Prepare updates based on provided data
    if (role) {
        updates.push(`role = $${updates.length + 1}`);
        values.push(role);
    }
    if (salary) {
        const salaryId = await findOrCreateSalary(salary);
        updates.push(`salary_idsalary = $${updates.length + 1}`);
        values.push(salaryId);
    }

    // Proceed only if there are updates to make
    if (updates.length > 0) {
        const query = `UPDATE public.role SET ${updates.join(', ')} WHERE idrole = $${updates.length + 1} RETURNING idrole, role, salary_idsalary`;
        values.push(id);

        const result = await pool.query(query, values);
        return result.rows[0]; // Return the updated role
    } else {
        throw new Error('No updates provided for the role.');
    }
};




// Function to delete a role
export const deleteRoleService = async (id: string) => {
    // Check if the role is linked to any employees
    const employeeCheck = await pool.query('SELECT COUNT(*) FROM public.employee WHERE role_id = $1 AND active = TRUE', [id]);

    if (parseInt(employeeCheck.rows[0].count) > 0) {
        throw new Error('Cannot delete role; there are active employees linked to this role.');
    }

    // If no active employees, proceed to delete the role
    await pool.query('DELETE FROM public.role WHERE idRole = $1', [id]);
    return { message: 'Role deleted successfully.' };
};
