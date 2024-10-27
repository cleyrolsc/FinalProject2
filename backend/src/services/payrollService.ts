import pool from '../config/db'; // Adjust path to your database configuration

export const getAllPayrolls = async () => {
    const result = await pool.query('SELECT * FROM public.payroll'); // Query to fetch all payrolls
    return result.rows; // Return all payroll records
};

export const getPayrollByEmployeeId = async (employeeId: string) => {
    const result = await pool.query('SELECT * FROM public.payroll WHERE employee_id = $1', [employeeId]); // Fetch payrolls for a specific employee
    return result.rows; // Return payroll records for the specified employee
};

export const createPayroll = async (payrollData: any) => {
    const { totalpayroll, extraamount, payrollcut, date, baseamount, active } = payrollData; // Ensure to match the correct name
    const result = await pool.query(
        'INSERT INTO public.payroll (totalpayroll, extraamount, payrollcut, date, baseamount, active) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [totalpayroll, extraamount, payrollcut, date, baseamount, active] // Use the correct variable name here
    );
    return result.rows[0]; // Return the newly created payroll record
};

export const getSpecificPayrollForEmployee = async (payrollId: string, employeeId: string) => {
    const result = await pool.query('SELECT * FROM public.payroll WHERE idpayroll = $1 AND employee_id = $2', [payrollId, employeeId]); // Fetch a specific payroll record
    return result.rows[0]; // Return the specific payroll record
};
