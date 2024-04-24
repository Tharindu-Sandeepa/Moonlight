// Existing imports
import React, { useState } from 'react';
import { Typography, Box, Grid, MenuItem, Select, FormControl, InputLabel } from '@mui/material';








const products = [
  { id: 1, name: 'Product 1', category: 'Category A', price: 100, imageUrl: 'product1.jpg' },
  { id: 2, name: 'Product 2', category: 'Category B', price: 150, imageUrl: 'product2.jpg' },
  { id: 3, name: 'Product 3', category: 'Category A', price: 120, imageUrl: 'product3.jpg' },
  { id: 4, name: 'Product 4', category: 'Category C', price: 200, imageUrl: 'product4.jpg' },
  // Add more products here with image URLs
];

const ProductPage = () => {
  // State for selected category, sorting option, and price range
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortingOption, setSortingOption] = useState('price'); // Default sorting option
  const [priceRange, setPriceRange] = useState(0); // Default price range

  // Filter products based on selected category and price range
  const filteredProducts = products.filter(product => {
    const passesCategoryFilter = selectedCategory ? product.category === selectedCategory : true;
    const passesPriceRangeFilter = product.price <= priceRange;
    return passesCategoryFilter && passesPriceRangeFilter;
  });

  // Sort products based on sorting option
  const sortedProducts = filteredProducts.slice().sort((a, b) => {
    if (sortingOption === 'price') {
      return a.price - b.price;
    } else {
      // Add more sorting options here if needed
      return 0;
    }
  });

  //get details from gemtable

  
  return (

    <div>
      <Grid container>
      {/* Left side: Filters and sorting */}
      <Grid item xs={12} sm={4} md={3} lg={2} sx={{ p: 2 }}>
        <Box sx={{ mb: 2 }}>
          {/* Filter by category */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Category A">Category A</MenuItem>
              <MenuItem value="Category B">Category B</MenuItem>
              {/* Add more categories dynamically if needed */}
            </Select>
          </FormControl>

          {/* Sorting options */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="sorting-select-label">Sort By</InputLabel>
            <Select
              labelId="sorting-select-label"
              id="sorting-select"
              value={sortingOption}
              onChange={(e) => setSortingOption(e.target.value)}
            >
              <MenuItem value="price">Price</MenuItem>
              {/* Add more sorting options here if needed */}
            </Select>
          </FormControl>

          {/* Price range bar */}
          <Typography id="price-range-label" gutterBottom>
            Price Range: ${priceRange}
          </Typography>
          <input
            type="range"
            min="0"
            max="500" // Adjust the maximum price range as needed
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            aria-labelledby="price-range-label"
          />
        </Box>
      </Grid>

      {/* Right side: Product list */}
      <Grid item xs={12} sm={8} md={9} lg={10} sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {sortedProducts.map(product => (
            <Box key={product.id} sx={{ width: 'calc(33.33% - 20px)', mb: 2, mx: 10 }}>
              <Box sx={{ border: '1px solid #ccc', p: 2 }}>
                {/* Product image */}
                <img src={product.imageUrl} alt={product.name} style={{ maxWidth: '100%', height: 'auto' }} />

                {/* Product information */}
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body1">Category: {product.category}</Typography>
                <Typography variant="body1">Price: ${product.price}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Grid>
    </Grid>
    </div>
  );
   
      
      
 
};

export default ProductPage;
