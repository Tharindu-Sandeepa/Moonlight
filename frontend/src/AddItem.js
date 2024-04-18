import React, { useState } from "react";
import axios from "axios";

const AddItem = ({  }) => {
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
    <div>
      <h2>Add Image</h2>
      <form onSubmit={submitImage}>
        <input type="file" name="image" accept="image/*" onChange={onInputChange}></input>
        <input type="text" name="name" placeholder="Name" value={name} onChange={onInputChange} />
        <input type="text" name="type" placeholder="Type" value={type} onChange={onInputChange} />
        <input type="text" name="price" placeholder="Price" value={price} onChange={onInputChange} />
        <input type="text" name="description" placeholder="Description" value={description} onChange={onInputChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddItem;
