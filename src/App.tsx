import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, Button, Typography, Box } from '@mui/material';
import EmployeeDashboard from './components/EmployeeDashboard';
import ManagerDashboard from './components/ManagerDashboard';

const App: React.FC = () => {
  return (
    <Router>
      {/* Main container to take full screen width */}
      <Box
        display="flex"
        flexDirection="column"
       
       
        sx={{
          backgroundColor: '#f4f4f4', // Optional background color
          padding: 2, // Optional padding to avoid elements being too close to the edges
        }}
      >
        <Typography variant="h4" gutterBottom>
          Invoice Reimbursement System
        </Typography>

        <Box mb={2} display="flex" justifyContent="center" gap={2}>
          {/* Navigation Buttons */}
          <Button variant="contained" color="primary">
            <Link to="/employee" style={{ textDecoration: 'none', color: 'white' }}>
              Employee
            </Link>
          </Button>
          <Button variant="contained" color="secondary">
            <Link to="/manager" style={{ textDecoration: 'none', color: 'white' }}>
              Manager
            </Link>
          </Button>
        </Box>

        {/* Routes for Employee and Manager */}
        <Routes>
          <Route path="/employee" element={<EmployeeDashboard />} />
          <Route path="/manager" element={<ManagerDashboard />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;
