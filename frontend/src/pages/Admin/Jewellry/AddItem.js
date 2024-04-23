import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Select, MenuItem } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Blue color for primary
    },
    secondary: {
      main: "#ffffff", // White color for secondary
    },
  },
});

const AddItem = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  
  const [errors, setErrors] = useState({}); // State for error messages

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    
    if (!image) {
      newErrors.image = "Please upload an image.";
    }
    
    if (!name) {
      newErrors.name = "Please enter a name.";
    }
    
    if (!type) {
      newErrors.type = "Please enter a type.";
    }
    
    if (!price) {
      newErrors.price = "Please enter a price.";
    } else if (isNaN(price)) {
      newErrors.price = "Price must be a number.";
    }
    
    if (!description) {
      newErrors.description = "Please enter a description.";
    }
    
    return newErrors;
  };

  // Handle form submission
  const submitImage = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("type", type);
    formData.append("price", price);
    formData.append("description", description);

    try {
      await axios.post("http://localhost:5002/upload-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Reset form fields and errors after successful submission
      setImage(null);
      setName("");
      setType("");
      setPrice("");
      setDescription("");
      setErrors({});
      
      // Refresh the image list after submission
    } catch (error) {
      console.error(error);
    }
  };

  // Handle input changes
  const onInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "image") {
      setImage(e.target.files[0]);
    } else {
      switch (name) {
        case "name":
          setName(value);
          break;
        case "type":
          setType(value);
          break;
        case "price":
          setPrice(value);
          break;
        case "description":
          setDescription(value);
          break;
        default:
          break;
      }
    }

    // Update errors as the user types
    const newErrors = validateForm();
    setErrors(newErrors);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: 3, backgroundColor: "secondary.main" }}>
        <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
          Add Image
        </Typography>
        <form onSubmit={submitImage}>
          <Box sx={{ mb: 2 }}>
            <TextField
              type="file"
              name="image"
              accept="image/*"
              onChange={onInputChange}
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              error={Boolean(errors.image)} // Show error state if there is an error
              helperText={errors.image} // Display error message
            />
          </Box>
          <TextField
            name="name"
            label="Name"
            value={name}
            onChange={onInputChange}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            error={Boolean(errors.name)} // Show error state if there is an error
            helperText={errors.name} // Display error message
          />
        <Select
    name="type"
    label="Type"
    value={type}
    onChange={onInputChange}
    variant="outlined"
    fullWidth
    sx={{ mb: 2 }}
    error={Boolean(errors.type)} // Show error state if there is an error
    helperText={errors.type} // Display error message
    displayEmpty
>
    <MenuItem value="">Select Type</MenuItem>
    <MenuItem value="Necklace">Necklace</MenuItem>
    <MenuItem value="Ring">Ring</MenuItem>
    <MenuItem value="Earring">Earring</MenuItem>
    <MenuItem value="Bracelet">Bracelet</MenuItem>
    <MenuItem value="Anklet">Anklet</MenuItem>
    <MenuItem value="Other">Other</MenuItem>
</Select>

          <TextField
            name="price"
            label="Price"
            value={price}
            onChange={onInputChange}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            error={Boolean(errors.price)} // Show error state if there is an error
            helperText={errors.price} // Display error message
          />
          <TextField
            name="description"
            label="Description"
            value={description}
            onChange={onInputChange}
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            sx={{ mb: 2 }}
            error={Boolean(errors.description)} // Show error state if there is an error
            helperText={errors.description} // Display error message
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Submit
          </Button>
        </form>
      </Box>
    </ThemeProvider>
  );
};

export default AddItem;
