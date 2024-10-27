import pool from '../config/db';

export const getAllPayrolls = async () => {
    const result = await pool.query('SELECT * FROM public.payroll');
    return result.rows;
};

export const getPayrollByEmployeeId = async (employeeId: string) => {
    const result = await pool.query('SELECT * FROM public.payroll WHERE employee_id = $1', [employeeId]);
    return result.rows;
};

export const createPayroll = async (payrollData: any) => {
    const { totalpayroll, extraamount, payrollcut, date, baseamount, active } = payrollData;
    const result = await pool.query(
        'INSERT INTO public.payroll (totalpayroll, extraamount, payrollcut, date, baseamount, active) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [totalpayroll, extraamount, payrollcut, date, baseamount, active]
    );
    return result.rows[0];
};

export const getSpecificPayrollForEmployee = async (payrollId: string, employeeId: string) => {
    const result = await pool.query('SELECT * FROM public.payroll WHERE idpayroll = $1 AND employee_id = $2', [payrollId, employeeId]);
    return result.rows[0];
};
