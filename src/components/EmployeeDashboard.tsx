import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography, Alert } from '@mui/material';
import { fetchInvoices, Invoice, uploadInvoices } from '../api/api';
import InvoiceTable from './InvoiceTable';

const EmployeeDashboard: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true); 
  useEffect(() => {
    const getInvoices = async () => {
      try {
        const response = await fetchInvoices();
  
        if (response && Object.keys(response).length > 0) {
          setInvoices(Object.values(response));
        } else {
          console.error('Data is empty or in an unexpected format');
        }
      } catch (error) {
        console.error('Error fetching invoices', error);
      } finally {
        setLoading(false);
      }
    };
  
    getInvoices();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      setMessage('Please select a CSV file to upload.');
      return;
    }

    

    const reader = new FileReader();
    reader.onload = async (e) => {
      const fileContent = e.target?.result as string;
      const rows = fileContent.split('\n').map((row) => row.split(','));

      const header = rows[0];
      const parsedInvoices = rows.slice(1).map((row) => {
        const invoice: any = {};
        row.forEach((column, index) => {
          invoice[header[index]] = column.trim();
        });
        return invoice as Invoice;
      });

      try {
        await uploadInvoices(parsedInvoices);
        setMessage('Invoices uploaded successfully!');
        setInvoices(parsedInvoices);
      } catch (error) {
        setMessage('Error uploading invoices. Please try again.');
      }
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Employee Dashboard
      </Typography>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        style={{ marginBottom: '16px' }}
      />
      <Button variant="contained" color="primary" onClick={handleFileUpload}>
        Upload Invoice
      </Button>
      {message && (
        <Alert severity={message.includes('Error') ? 'error' : 'success'} style={{ marginTop: '16px' }}>
          {message}
        </Alert>
      )}
      <InvoiceTable data={invoices} onApprove={() => {}} onReject={() => {}} />
    </div>
  );
};

export default EmployeeDashboard;
