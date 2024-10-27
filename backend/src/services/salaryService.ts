import pool from '../config/db';

export const getSalariesByRoleService = async () => {
    const result = await pool.query(
        'SELECT s.idsalary, s.salary, r.role FROM public.salary s JOIN public.role r ON s.idsalary = r.salary_idsalary'
    );
    return result.rows;
};

export const deleteSalaryService = async (id: string) => {
    const result = await pool.query(
        'DELETE FROM public.salary WHERE idsalary = $1 AND idsalary NOT IN (SELECT salary_idsalary FROM public.role)',
        [id]
    );
    return result;
};