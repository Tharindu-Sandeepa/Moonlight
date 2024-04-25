import * as React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import List from '@mui/joy/List';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import logo from '../img/logo.png';

export default function ColorInversionFooter() {
  const backgroundColor = '#F0F4F8'; // Light background color
  const primaryColor = '#1976D2'; // Primary color for blue theme
  const textColor = '#333'; // Text color for contrast

  return (
    <Sheet
      variant="solid"
      sx={{
        mt: 20,
        backgroundColor: backgroundColor,
        color: textColor,
        padding: 2,
        borderRadius: { xs: 0, sm: 'sm' },
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography level="h5" sx={{ flexGrow: 1 }}>
          Moonlight
        </Typography>
        <Divider orientation="vertical" sx={{ height: 24 }} />
        <IconButton color="primary">
          <FacebookRoundedIcon />
        </IconButton>
        <IconButton color="primary">
          <TwitterIcon />
        </IconButton>
        <IconButton color="primary">
          <LinkedInIcon />
        </IconButton>
        <IconButton color="primary">
          <GitHubIcon />
        </IconButton>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { md: 'flex-start' },
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Card
          variant="soft"
          size="sm"
          sx={{
            display: 'flex',
            flexDirection: { xs: 'row', md: 'column' },
            minWidth: { xs: '100%', md: 'auto' },
            gap: 1,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            borderRadius: '8px',
          }}
        >
          <AspectRatio
            ratio="21/9"
            minHeight={80}
            sx={{
              flexBasis: { xs: 200, md: 'initial' },
              borderRadius: '8px',
              overflow: 'hidden',
              alignContent: 'center',
            }}
          >
            <img src={logo} alt="Moonlight logo" style={{ width: '80%' }} />
          </AspectRatio>
          <CardContent>
            <Typography level="body-sm" sx={{ fontWeight: 'bold', color: primaryColor }}>
              Moonlight
            </Typography>
            <Typography level="body-xs" sx={{ color: textColor }}>
              Gems & Jewelry
            </Typography>
          </CardContent>
        </Card>

        <Box sx={{ flexBasis: { xs: '100%', md: '50%' }, textAlign: 'left' }}>
          <Typography sx={{ color: textColor }}>
            Welcome to Moonlight, your trusted source for exquisite gems and stunning jewelry. We take pride in curating a collection that captures the essence of beauty and craftsmanship. Discover the perfect piece to celebrate your special moments or to simply treat yourself. Let Moonlight illuminate your world with the brilliance of our unique offerings.
          </Typography>
        </Box>

        <List size="sm" orientation="horizontal" wrap sx={{ flexGrow: 0, '--ListItem-radius': '8px', '--ListItem-gap': '8px', gap: '10px' }}>
          <ListItem nested sx={{ width: { xs: '50%', md: 140 } }}>
            <ListSubheader sx={{ fontWeight: 'xl' }}>Sitemap</ListSubheader>
            <List>
              <ListItem>
                <Link to="/">
                  <ListItemButton sx={{ color: primaryColor }}>Home</ListItemButton>
                </Link>
              </ListItem>
              <ListItem>
                <Link to="/GemHome">
                  <ListItemButton sx={{ color: primaryColor }}>Gems</ListItemButton>
                </Link>
              </ListItem>
              <ListItem>
                <Link to="/jewllery-grid">
                  <ListItemButton sx={{ color: primaryColor }}>Jewelry</ListItemButton>
                </Link>
              </ListItem>
              <ListItem>
                <Link to="/feedback">
                  <ListItemButton sx={{ color: primaryColor }}>Feedbacks</ListItemButton>
                </Link>
              </ListItem>
            </List>
          </ListItem>
        </List>
      </Box>

      {/* Add the copyright notice */}
      <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
        &copy; Moonlight.lk 2024
      </Typography>
    </Sheet>
  );
}
