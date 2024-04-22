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

    await axios.post("http://localhost:5002/upload-image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // Refresh the image list after submission
  };

  const onInputChange = (e) => {
    if (e.target.name === "image") {
      setImage(e.target.files[0]);
    } else {
      const value = e.target.value;
      switch (e.target.name) {
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
          />
          <TextField
            name="type"
            label="Type"
            value={type}
            onChange={onInputChange}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            name="price"
            label="Price"
            value={price}
            onChange={onInputChange}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            name="description"
            label="Description"
            value={description}
            onChange={onInputChange}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
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
