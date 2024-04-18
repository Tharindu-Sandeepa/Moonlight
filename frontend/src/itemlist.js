import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';

const ImageGridPage = () => {
  const [allImage, setAllImage] = useState(null);
  const [updateData, setUpdateData] = useState(null);

  useEffect(() => {
    getImage();
  }, []);

  const getImage = async () => {
    const result = await axios.get("http://localhost:5002/get-images");
    setAllImage(result.data.data);
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

  return (
    <div>
      <h1>Image Grid Page</h1>
      {updateData ? (
        <form onSubmit={handleUpdateSubmit}>
          <input type="text" name="name" defaultValue={updateData.name} />
          <input type="text" name="type" defaultValue={updateData.type} />
          <input type="number" name="price" defaultValue={updateData.price} />
          <input type="file" name="image" />
          <textarea name="description" defaultValue={updateData.description}></textarea>
          <button type="submit">Update</button>
        </form>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allImage &&
                allImage.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>{data.name}</TableCell>
                    <TableCell>Rs {data.price}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="error" onClick={() => deleteImage(data._id)}>Delete</Button>
                      <Button variant="contained" color="primary" onClick={() => handleUpdate(data)}>Update</Button>
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