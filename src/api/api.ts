import axios from 'axios';

// Define the structure of an invoice
export interface Invoice {
  id?: string;
  'Invoice ID': string;
  'Employee Name': string;
  Amount: string;
  Date: string;
  Status: string;
  Comment?: string;
}

// Base URL for the backend API (adjust based on your setup)
const API_BASE_URL = 'http://localhost:5000/invoices'; // or wherever your backend is hosted

// Function to upload invoices to the server
export const uploadInvoices = async (invoices: Invoice[]) => {
  try {
    const response = await axios.post(API_BASE_URL, invoices, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error uploading invoices: ' + error);
  }
};

// Function to fetch all invoices from the server
export const fetchInvoices = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data[0];
  } catch (error) {
    throw new Error('Error fetching invoices: ' + error);
  }
};

// Function to update an invoice's status (Approve/Reject)
export const updateInvoiceStatus = async (id: string, status: string, comment?: string) => {
  try {
    const updatedInvoice = {
      Status: status,
      Comment: comment || '',
    };
    const response = await axios.patch(`${API_BASE_URL}/${id}`, updatedInvoice, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error updating invoice status: ' + error);
  }
};
