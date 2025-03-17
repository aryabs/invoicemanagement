import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, CircularProgress } from '@mui/material';
import { fetchInvoices, Invoice, updateInvoiceStatus } from '../api/api';
import InvoiceTable from './InvoiceTable';

const ManagerDashboard: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [comment, setComment] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);  // Track loading state

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

  const handleApprove = (invoice: Invoice) => {
 
    const invoiceId = invoices.findIndex(i => i['Invoice ID'] === invoice['Invoice ID']);

    updateInvoiceStatus(invoiceId, 'Approved')
      .then(() => {
        setInvoices((prevInvoices) =>
          prevInvoices.map((inv) =>
            inv.id === invoice.id ? { ...inv, Status: 'Approved' } : inv
          )
        );
      })
      .catch((error) => console.error('Error approving invoice', error));
  };

  const handleReject = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setComment('');
  };

  const handleSubmitRejection = () => {
    if (selectedInvoice) {
      updateInvoiceStatus(selectedInvoice.id, 'Rejected', comment)
        .then(() => {
          setInvoices((prevInvoices) =>
            prevInvoices.map((inv) =>
              inv.id === selectedInvoice.id
                ? { ...inv, Status: 'Rejected', Comment: comment }
                : inv
            )
          );
          setOpenDialog(false);
          setComment('');
        })
        .catch((error) => console.error('Error rejecting invoice', error));
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Manager Dashboard
      </Typography>

      {/* Show loading spinner while data is being fetched */}
      {loading ? (
        <CircularProgress />
      ) : (
        <InvoiceTable data={invoices} onApprove={handleApprove} onReject={handleReject} />
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Rejection Comment</DialogTitle>
        <DialogContent>
          <TextField
            label="Comment"
            fullWidth
            multiline
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmitRejection} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManagerDashboard;
