import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateImageForm = ({ onUpdateComplete }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    price: "",
    description: "",
  });
  const [image, setImage] = useState(null);

  // Fetch the image data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5002/get-image/${id}`);
        const data = response.data.data;

        setFormData({
          name: data.name,
          type: data.type,
          price: data.price,
          description: data.description,
        });
        // Optionally set the image if required
      } catch (error) {
        console.error("Error fetching image data:", error);
      }
    };

    fetchData();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("type", formData.type);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("description", formData.description);
      if (image) {
        formDataToSend.append("image", image);
      }

      await axios.put(`http://localhost:5002/update-image/${id}`, formDataToSend);

      // Call the onUpdateComplete callback to refresh data
      onUpdateComplete();

      // Navigate back to a different page, if desired
      navigate("/");

    } catch (error) {
      console.error("Error updating image:", error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="type"
        value={formData.type}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleInputChange}
      />
      <input
        type="file"
        name="image"
        onChange={handleFileChange}
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleInputChange}
      ></textarea>
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateImageForm;
