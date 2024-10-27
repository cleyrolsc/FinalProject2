import pool from '../config/db'; // Import your database connection

interface Hour {
    hours: number; // This represents the number of hours worked.
    // Include any other relevant properties if necessary.

}

export const getRoleIdByName = async (roleName: string) => {
    console.log(`Querying for role: ${roleName}`); // Log the role name being queried
    const result = await pool.query('SELECT idrole FROM public.role WHERE role = $1', [roleName]);
    if (result.rows.length === 0) {
        return null; // Role not found
    }
    return result.rows[0]; // Returns an object like { idrole: 2 }
};
export const getRoleSalaryById = async (roleId: number) => {
    const result = await pool.query('SELECT salary_idSalary FROM role WHERE idRole = $1', [roleId]);
    return result.rows[0]; // Adjust based on your table structure
};


export const getEmployees = async () => {
    const result = await pool.query('SELECT idemp, fullname, active, role_id, username, password FROM public.employee');
    return result.rows.map(employee => {
        const employeeId = `C-${String(employee.idemp).padStart(4, '0')}`;
        return { ...employee, employeeId }; // Add formatted employeeId
    });
};

export const getEmployeeByIdService = async (id: string) => {
    const result = await pool.query('SELECT * FROM public.employee WHERE idemp = $1', [id]);
    return result.rows[0]; // Return employee regardless of active status
};

export const getEmployeeHoursService = async (id: string) => {
    const result = await pool.query('SELECT * FROM public.workedHour WHERE employee_idEmp = $1', [id]);
    return result.rows;
};

export const getEmployeeSalaryService = async (id: string) => {
    const result = await pool.query(`
        SELECT e.fullname, c.role, s.salary 
        FROM public.employee e 
        JOIN public.role c ON e.role_id = c.idrole 
        JOIN public.salary s ON c.salary_idSalary = s.idSalary 
        WHERE e.idemp = $1 AND e.active = TRUE
    `, [id]);

    if (result.rows.length === 0) {
        throw new Error('Employee not found or inactive');
    }

    return result.rows[0]; // This will return an object with fullname, role, and salary
};

export const createEmployee = async (employeeData: any) => {
    const { fullname, role_id, username, password, active } = employeeData;
    try {
        await pool.query('BEGIN'); // Start the transaction
        const result = await pool.query(
            'INSERT INTO public.employee (fullname, role_id, username, password, active) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [fullname, role_id, username, password, active]
        );
        await pool.query('COMMIT'); // Commit the transaction

        // Format the employeeId
        const employeeId = `C-${String(result.rows[0].idemp).padStart(4, '0')}`; // Pad the number with zeros

        // Return the new employee without the employeeid
        const { employeeid, ...newEmployee } = result.rows[0]; // Destructure to exclude employeeid
        return { ...newEmployee, employeeId }; // Add formatted employeeId to the result
    } catch (error: any) {
        await pool.query('ROLLBACK'); // Rollback if there's an error
        throw new Error('Failed to create employee: ' + error.message);
    }
};










export const addEmployeeHours = async (employeeId: string, hoursData: any) => {
    const { hours, date } = hoursData; // Extract hours and date from input data
    try {
        await pool.query('BEGIN'); // Start the transaction
        const result = await pool.query(
            'INSERT INTO workedHour (empleado_idEmp, horas, fechaCorte) VALUES ($1, $2, $3) RETURNING *',
            [employeeId, hours, date] // Insert values into the workedHour table
        );
        await pool.query('COMMIT');
        return result.rows[0];
    } catch (error: any) {
        await pool.query('ROLLBACK');
        throw new Error('Failed to add employee hours: ' + error.message);
    }
};


export const updateEmployeeService = async (id: string, fullname: string) => {
    const result = await pool.query(
        'UPDATE public.employee SET fullname = $1 WHERE idemp = $2 RETURNING *',
        [fullname, id]
    );
    return result.rows[0];
};

export const softDeleteEmployeeService = async (id: string) => {
    const result = await pool.query(
        'UPDATE public.employee SET active = FALSE WHERE idEmp = $1 RETURNING *',
        [id]
    );
    return result.rows[0];
};
