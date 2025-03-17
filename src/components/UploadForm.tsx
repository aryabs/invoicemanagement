import React, { useState } from 'react';
import { Button, TextField, Alert } from '@mui/material';

interface UploadFormProps {
  onFileUpload: (file: File) => void;
}

const UploadForm: React.FC<UploadFormProps> = ({ onFileUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Please upload a CSV file.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      onFileUpload(file);
    } else {
      setError('No file selected.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        variant="outlined"
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary">
        Upload
      </Button>
      {error && <Alert severity="error">{error}</Alert>}
    </form>
  );
};

export default UploadForm;
