import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from '@mui/material';
import { Invoice } from '../api/api';
import { useLocation } from 'react-router-dom';

interface InvoiceTableProps {
  data: Invoice[];
  onApprove: (invoice: Invoice) => void;
  onReject: (invoice: Invoice) => void;
}



const InvoiceTable: React.FC<InvoiceTableProps> = ({ data, onApprove, onReject }) => {
  if (!data || data.length === 0) return <p>No invoices found.</p>;

  const location = useLocation(); // Get current location
  const [isEmployeeRoute, setIsEmployeeRoute] = useState(false); // State to track employee route

    // useEffect to monitor route changes and set isEmployeeRoute accordingly
    useEffect(() => {
        // Check if the current path includes 'employee' (or any other condition you need)
        setIsEmployeeRoute(location.pathname.includes('employee'));
        console.log(isEmployeeRoute);
      }, [location]); // Dependency array with location, to re-run whenever the location changes

  return (
    <TableContainer component={Paper} style={{ marginTop: '16px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Invoice ID</TableCell>
            <TableCell>Employee Name</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
            {!isEmployeeRoute && (
            <TableCell>Action</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((invoice) => (
            <TableRow key={invoice['Invoice ID']}>
              <TableCell>{invoice['Invoice ID']}</TableCell>
              <TableCell>{invoice['Employee Name']}</TableCell>
              <TableCell>{invoice['Amount']}</TableCell>
              <TableCell>{invoice['Date']}</TableCell>
              <TableCell>{invoice['Status']}</TableCell>

              <TableCell>
              {!(isEmployeeRoute)  && invoice['Status'] === 'Pending' && (
                  <Box display="flex" justifyContent="flex-start" alignItems="center">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => onApprove(invoice)}
                      style={{ marginRight: '8px' }}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => onReject(invoice)}
                    >
                      Reject
                    </Button>
                  </Box>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InvoiceTable;
