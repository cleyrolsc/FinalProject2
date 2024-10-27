import pool from '../config/db';

export const getRolesService = async () => {
    const result = await pool.query('SELECT idrole, role FROM public.role WHERE active = TRUE');
    return result.rows.map(row => ({
        id: row.idrole,
        role: row.role
    }));
};


export const getRoleByIdService = async (id: string) => {
    const result = await pool.query('SELECT idrole, role FROM public.role WHERE idrole = $1', [id]);
    return result.rows[0];
};


const findOrCreateSalary = async (salary: number) => {

    const result = await pool.query('SELECT * FROM public.salary WHERE salary = $1', [salary]);


    if (result.rows.length > 0) {
        return result.rows[0].idsalary;
    } else {
        const newSalaryResult = await pool.query('INSERT INTO public.salary (salary) VALUES ($1) RETURNING idsalary', [salary]);
        return newSalaryResult.rows[0].idsalary;
    }
};

export const addRoleService = async (roleData: { role: string; isBypass: boolean; salary: number; }) => {
    const { role, isBypass, salary } = roleData;

    try {
        const salaryId = await findOrCreateSalary(salary);

        const result = await pool.query(
            'INSERT INTO public.role (role, isbypass, active, salary_idsalary) VALUES ($1, $2, TRUE, $3) RETURNING *',
            [role, isBypass, salaryId]
        );

        return result.rows[0];
    } catch (error: any) {
        throw new Error('Failed to add role: ' + error.message);
    }
};



export const getEmployeesByRoleId = async (roleId: string) => {
    const result = await pool.query(
        'SELECT e.idemp, e.fullname, e.username, e.active FROM public.employee e WHERE e.role_id = $1',
        [roleId]
    );
    return result.rows;
};


export const updateRoleServiceById = async (id: number, roleData: { role?: string; salary?: number; }) => {
    const { role, salary } = roleData;

    const updates = [];
    const values: (string | number)[] = [];

    if (role) {
        updates.push(`role = $${updates.length + 1}`);
        values.push(role);
    }
    if (salary) {
        const salaryId = await findOrCreateSalary(salary);
        updates.push(`salary_idsalary = $${updates.length + 1}`);
        values.push(salaryId);
    }

    if (updates.length > 0) {
        const query = `UPDATE public.role SET ${updates.join(', ')} WHERE idrole = $${updates.length + 1} RETURNING idrole, role, salary_idsalary`;
        values.push(id);

        const result = await pool.query(query, values);
        return result.rows[0];
    } else {
        throw new Error('No updates provided for the role.');
    }
};




export const deleteRoleService = async (id: string) => {
    const employeeCheck = await pool.query('SELECT COUNT(*) FROM public.employee WHERE role_id = $1 AND active = TRUE', [id]);

    if (parseInt(employeeCheck.rows[0].count) > 0) {
        throw new Error('Cannot delete role; there are active employees linked to this role.');
    }

    await pool.query('DELETE FROM public.role WHERE idRole = $1', [id]);
    return { message: 'Role deleted successfully.' };
};
