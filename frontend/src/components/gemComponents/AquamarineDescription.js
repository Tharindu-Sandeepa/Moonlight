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
                fontFamily: 'Helvetica',
                
            }}>Aquamarine</Typography>
            <div className="sapphire-description-content">
                <Typography variant="body1" sx={{ marginBottom: 2, color: '#666' }}>
                Aquamarine is a captivating gemstone renowned for its enchanting hues reminiscent of the tranquil ocean waters. Belonging to the beryl mineral family, it boasts a captivating range of blue and green tones, evoking a sense of serenity and calmness. Its name, derived from the Latin words "aqua" and "marina," translates to "water of the sea," aptly capturing its aquatic essence.

                This gemstone is cherished for its clarity and transparency, allowing light to dance gracefully through its facets, resulting in a mesmerizing play of colors. Aquamarine is often associated with qualities of courage, tranquility, and clarity of thought, making it a symbol of inner peace and emotional balance.                </Typography>
                <Typography variant="body1" sx={{ color: '#666' }}>
                Throughout history, aquamarine has been treasured by various cultures for its mystical properties and believed to offer protection to sailors during sea voyages. It is also celebrated as the birthstone for the month of March, symbolizing purity and eternal youth.

                In jewelry, aquamarine's soothing hues make it a popular choice for both contemporary and vintage designs. From delicate earrings to stunning statement necklaces, its versatility allows it to complement a wide range of styles and occasions, adding a touch of elegance and sophistication to any ensemble.

                Whether adorning a piece of jewelry or admired in its natural form, aquamarine continues to captivate hearts with its ethereal beauty and timeless allure, serving as a cherished symbol of tranquility and harmony.                </Typography>
            </div>
        </Box>
    );

}

export default SapphireDescription;