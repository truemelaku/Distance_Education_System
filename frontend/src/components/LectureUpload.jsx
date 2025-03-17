import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material'; // Material UI components
import 'tailwindcss/tailwind.css'; // Ensure Tailwind CSS is imported

const LectureUpload = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Retrieve JWT token from local storage
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('lecture', file); // Append file

    try {
      const response = await axios.post('http://localhost:5000/api/teachers/upload-lecture', formData, {
        headers: {
          'Authorization': `Bearer ${token}`, // Attach token to the request
          'Content-Type': 'multipart/form-data',
        }
      });
      alert('Lecture uploaded successfully');
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading lecture:', error);
      alert('Error uploading lecture');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-lg shadow-lg">
        <CardContent>
          <Typography variant="h5" component="h2" className="text-center mb-6 text-blue-600">
            Upload Lecture
          </Typography>
          <form onSubmit={handleUpload} className="flex flex-col gap-4">
            <TextField 
              label="Title" 
              variant="outlined" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required
              fullWidth
              className="mb-4"
            />
            <TextField
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              fullWidth
              className="mb-4"
            />
            <input 
              type="file" 
              accept="application/pdf, video/*"
              onChange={(e) => setFile(e.target.files[0])} 
              required
              className="file-input mb-4"
            />
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2"
            >
              Upload Lecture
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LectureUpload;
