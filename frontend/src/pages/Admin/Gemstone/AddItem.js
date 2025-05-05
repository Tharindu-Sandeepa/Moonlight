import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import Dashboard from '../Dashboard';

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

  const submitImage = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("type", type);
    formData.append("price", price);
    formData.append("description", description);

    await axios.post("http://localhost:5002/gemupload-image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // Refresh the image list after submission

  };

  const onInputChange = (e) => {
    if (e.target.name === "image") {
      setImage(e.target.files[0]);
    } else if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "type") {
      setType(e.target.value);
    } else if (e.target.name === "price") {
      setPrice(e.target.value);
    } else if (e.target.name === "description") {
      setDescription(e.target.value);
    }
  };

  return (
    <Dashboard title="Gem Management">

    <div>
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
        variant="outlined" fullWidth 
        InputLabelProps={{ shrink: true }} 
        />
      </Box>
        {/* </input> */}
        <TextField 
        type="text" 
        name="name" 
        placeholder="Name" 
        value={name} 
        onChange={onInputChange} 
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }} 
        />
        <TextField 
        type="text" 
        name="type" 
        placeholder="Type" 
        value={type} 
        onChange={onInputChange} 
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }} />

        <TextField 
        type="text" 
        name="price" 
        placeholder="Price" 
        value={price} 
        onChange={onInputChange} 
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}/>
        <TextField 
        type="text" 
        name="description" 
        placeholder="Description" 
        value={description} 
        onChange={onInputChange} 
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }} />

        <Button 
            type="submit" 
            variant="contained"
            color="primary"
            fullWidth>
              Submit
        </Button>

      </form>
      </Box>
      </ThemeProvider>
    </div>
    </Dashboard>
  );
};

export default AddItem;
