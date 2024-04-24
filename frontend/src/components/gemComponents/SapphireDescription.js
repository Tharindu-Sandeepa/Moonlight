import React from "react";
import { Typography ,Box } from '@mui/material';

const SapphireDescription =()=>{

    return(
        <Box sx={{
            maxWidth: 1200,
            margin: 'auto',
            padding: 3,
            borderRadius: 2,
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#f7f7f7',
            textAlign: 'justify',
            marginTop: '50px',
            border: '2px solid',
            borderImage: 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)',
            WebkitBorderImage: 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)',
            borderImageSlice: 1,
            WebkitBorderImageSlice: 1,
        }}>
            <Typography variant="h4" sx={{
                textAlign: 'center',
                marginBottom: 3,
                color: '#333',
                borderBottom: '2px solid #333',
                paddingBottom: 1,
                
            }}>Sapphire</Typography>
            <div className="sapphire-description-content">
                <Typography variant="body1" sx={{ marginBottom: 2, color: '#666' }}>
                    Sapphire is a precious gemstone belonging to the corundum mineral species. It is typically blue in color due to the presence of trace elements such as iron and titanium, although it can occur in various other colors such as pink, yellow, green, purple, and orange. The blue sapphire is the most well-known and prized variety, symbolizing wisdom, virtue, and good fortune. Sapphires are renowned for their hardness, ranking 9 on the Mohs scale, just below diamonds. This makes them durable and suitable for everyday wear in jewelry such as rings, earrings, necklaces, and bracelets.
                </Typography>
                <Typography variant="body1" sx={{ color: '#666' }}>
                    In addition to its beauty and durability, sapphire has historical and cultural significance. It has been revered for centuries in various cultures around the world, often associated with royalty and spirituality. Some famous sapphires include the Star of India and the Logan Sapphire, both of which are part of renowned jewelry collections. Beyond its use in jewelry, sapphire also has industrial applications due to its hardness and optical properties. It is used in watch crystals, scientific instruments, and high-performance optics. Overall, sapphire is a versatile and cherished gemstone admired for its beauty, durability, and cultural significance across the globe.
                </Typography>
            </div>
        </Box>
    );

}

export default SapphireDescription;