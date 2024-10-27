import express from 'express';
import employeeRouter from './routes/employeeRoutes';
import roleRouter from './routes/roleRouter';
import salaryRouter from './routes/salaryRoute';
import accountRoutes from './routes/accountRoutes';;
import payrollRouter from './routes/payrollRoutes';;

var cors = require('cors');
const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Basic 
app.use('/roles', roleRouter);
app.use('/employees', employeeRouter);
app.use('/salaries', salaryRouter);
app.use('/account', accountRoutes);
app.use('/payroll', payrollRouter);


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
