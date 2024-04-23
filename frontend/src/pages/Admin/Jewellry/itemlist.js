import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  TextField,
  Select,
  MenuItem,
  Typography,
  InputAdornment
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const ImageGridPage = () => {
  const [allImage, setAllImage] = useState([]);
  const [updateData, setUpdateData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  useEffect(() => {
    getImage();
  }, []);

  const getImage = async () => {
    try {
      const result = await axios.get("http://localhost:5002/get-images");
      setAllImage(result.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteImage = async (id) => {
    try {
      await axios.delete(`http://localhost:5002/delete-image/${id}`);
      getImage();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (data) => {
    setUpdateData(data);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", e.target.name.value);
      formData.append("type", e.target.type.value);
      formData.append("price", e.target.price.value);
      formData.append("description", e.target.description.value);
      formData.append("image", e.target.image.files[0]);

      await axios.put(`http://localhost:5002/update-image/${updateData._id}`, formData);
      getImage();
      setUpdateData(null);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredImages = allImage.filter(data => {
    const matchesSearch = data.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          data.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !typeFilter || data.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const generateCSVReport = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Name,Type,Description,Price\n";
    filteredImages.forEach(data => {
      csvContent += `${data.name},${data.type},${data.description},${data.price}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "image_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <Box sx={{ mt: 12, padding: 2, display: 'flex', justifyContent: 'center' }}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          sx={{
            width: '40%',
            borderRadius: '8px',
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        
        <TextField
          select
          label="Type"
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
          variant="outlined"
          sx={{ marginLeft: 2, width: '20%' }}
        >
          <MenuItem value="">All Types</MenuItem>
          {[...new Set(allImage.map(data => data.type))].map(type => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
        
        <Button
          variant="contained"
          color="primary"
          onClick={generateCSVReport}
          sx={{ marginLeft: 2 }}
        >
          Download CSV Report
        </Button>
      </Box>

      {updateData ? (
        <Box sx={{ mt: 4, padding: 2, borderRadius: 1, boxShadow: 3, maxWidth: 600, margin: '0 auto' }}>
          <Typography variant="h6">Update Image</Typography>
          <form onSubmit={handleUpdateSubmit}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              defaultValue={updateData.name}
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Type"
              name="type"
              defaultValue={updateData.type}
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Price"
              name="price"
              defaultValue={updateData.price}
              type="number"
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              defaultValue={updateData.description}
              multiline
              rows={4}
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              name="image"
              type="file"
              variant="outlined"
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Update
            </Button>
          </form>
        </Box>
      ) : (
        <TableContainer sx={{ marginTop: 3 }}>
          <Table sx={{ border: '1px solid #ccc' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ borderBottom: '1px solid #ccc' }}>Name</TableCell>
                <TableCell sx={{ borderBottom: '1px solid #ccc' }}>Type</TableCell>
                <TableCell sx={{ borderBottom: '1px solid #ccc' }}>Description</TableCell>
                <TableCell sx={{ borderBottom: '1px solid #ccc' }}>Price</TableCell>
                <TableCell sx={{ borderBottom: '1px solid #ccc' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredImages.map((data, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ borderBottom: '1px solid #ccc' }}>{data.name}</TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #ccc' }}>{data.type}</TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #ccc' }}>{data.description}</TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #ccc' }}>Rs {data.price}</TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #ccc' }}>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => deleteImage(data._id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ marginLeft: 1 }}
                      onClick={() => handleUpdate(data)}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default ImageGridPage;
