// AddCourse.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function AddCourse(props) {
  // Define the function to add a course to the user database
  const addCourse = (course) => {
    // Your logic to add the course to the user database
    console.log('Adding course:', course);
    // Return a promise or perform asynchronous operations if needed
    return Promise.resolve();
  };

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  // Save course and close modal form
  // Save course and close modal form
// Save recipe and close modal form
const handleAdd = () => {
  // Make an API call to add the recipe
  fetch('http://localhost:8080/api/add-recipe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, description }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to add recipe');
      }
      return response.json();
    })
    .then((data) => {
      // Additional logic after successfully adding the recipe
      console.log('Recipe added successfully:', data);
      handleClose();
    })
    .catch((error) => {
      // Handle error, e.g., display an error message
      console.error('Error adding recipe:', error);
    });
};



  return (
    <div>
      <Button
        id="addCourse"
        variant="outlined"
        color="primary"
        style={{ margin: 10 }}
        onClick={handleClickOpen}
      >
        Add Recipe
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Recipe</DialogTitle>
        <DialogContent style={{ paddingTop: 20 }}>
          <TextField
            id="title"
            autoFocus
            fullWidth
            label="Title"
            name="title"
            value={title}
            onChange={handleTitleChange}
          />
          <TextField
            id="description"
            fullWidth
            multiline
            rows={4}
            label="Description"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button id="add" color="primary" onClick={handleAdd}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

AddCourse.propTypes = {
  addCourse: PropTypes.func.isRequired,
};

export default AddCourse;
