import * as React from 'react';

import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import Input from '@mui/joy/Input';
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
import SendIcon from '@mui/icons-material/Send';

import logo from '../img/logo.png';

export default function ColorInversionFooter() {
  const backgroundColor = '#F0F4F8'; // Light background color
  const primaryColor = '#1976D2'; // Primary color for blue theme
  const textColor = '#333'; // Text color for contrast

  return (
    <Sheet
      variant="solid"
      sx={{
        mt:10,
        backgroundColor: backgroundColor,
        color: textColor,
        padding: 2,
        borderRadius: { xs: 0, sm: 'sm' },
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        mt:20
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography level="h5" sx={{ flexGrow: 1 }}>
          MoonLight
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
              alignContent:'center'
            }}
          >
            <img src={logo} alt="MoonLight logo" style={{ width: '80%' }} />
          </AspectRatio>
          <CardContent>
            <Typography level="body-sm" sx={{ fontWeight: 'bold', color: primaryColor }}>
              MoonLight
            </Typography>
            <Typography level="body-xs" sx={{ color: textColor }}>
              Gems & Jewelry
            </Typography>
          </CardContent>
        </Card>
        <List
          size="sm"
          orientation="horizontal"
          wrap
          sx={{
            flexGrow: 0,
            '--ListItem-radius': '8px',
            '--ListItem-gap': '8px',
            gap: '10px',
          }}
        >
          <ListItem nested sx={{ width: { xs: '50%', md: 140 } }}>
            <ListSubheader sx={{ fontWeight: 'xl' }}>Sitemap</ListSubheader>
            <List>
              <ListItem>
                <ListItemButton sx={{ color: primaryColor }}>Services</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton sx={{ color: primaryColor }}>Blog</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton sx={{ color: primaryColor }}>About</ListItemButton>
              </ListItem>
            </List>
          </ListItem>
          <ListItem nested sx={{ width: { xs: '50%', md: 180 } }}>
            <ListSubheader sx={{ fontWeight: 'xl' }}>Products</ListSubheader>
            <List sx={{ '--ListItemDecorator-size': '32px' }}>
              <ListItem>
                <ListItemButton sx={{ color: primaryColor }}>Joy UI</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton sx={{ color: primaryColor }}>Base UI</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton sx={{ color: primaryColor }}>Material UI</ListItemButton>
              </ListItem>
            </List>
          </ListItem>
        </List>
      </Box>
    </Sheet>
  );
}
