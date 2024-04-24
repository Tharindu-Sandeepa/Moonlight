// InquiryForm.jsx
import { Button, Grid, Input, Typography, Box } from '@mui/material';
import { useEffect, useState } from 'react';

const InquiryForm = ({ enterInquiry,submitted }) => {
    const [Iname, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State for error message

    useEffect(() => {
        if (!submitted) {
            setName('');
            setEmail('');
            setMessage('');
        }
    }, [submitted]);

    const handleSubmit = () => {

        setErrorMessage('');

        if (!Iname.trim()) {
            setErrorMessage('Please enter your name');
            return;
        }

        if (!email.trim()) {
            setErrorMessage('Please enter your email');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            setErrorMessage('Please enter a valid email address');
            return;
        }

        if (!message.trim()) {
            setErrorMessage('Please enter your message');
            return;
        }
    
        enterInquiry({ name: Iname, email, message });
    };
    return (
        <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
            xs={15}
            sx={{
                background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8), transparent)',
                padding: '40px',
                borderRadius: '8px',
                boxShadow: '0px 0px 20px rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                maxWidth: '600px',
                border: '3px solid white',
            }}
        >
            <Grid item xs={12}>
                <Typography variant="h4" sx={{ color: '#fff', marginBottom: '20px', textAlign: 'center' }}>
                    Inquiry Form
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Box sx={{ marginBottom: '20px' }}>
                    <Input
                        type="text"
                        placeholder="Name"
                        value={Iname}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            borderRadius: '4px',
                            '& input': {
                                padding: '12px',
                            },
                        }}
                    />
                </Box>
            </Grid>

            <Grid item xs={12}>
                <Box sx={{ marginBottom: '20px' }}>
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            borderRadius: '4px',
                            '& input': {
                                padding: '12px',
                            },
                        }}
                    />
                </Box>
            </Grid>

            <Grid item xs={12}>
                <Box sx={{ marginBottom: '20px' }}>
                    <Input
                        type="text"
                        placeholder="Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        fullWidth
                        multiline
                        rows={4}
                        sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            borderRadius: '4px',
                            '& textarea': {
                                padding: '12px',
                            },
                        }}
                    />
                </Box>
            </Grid>

            <Grid item xs={12}>

                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#2F539B',
                        color: '#fff',
                        width: '100%',
                        '&:hover': {
                            backgroundColor: '#1c2d5e',
                        },
                    }}
                    //onClick={() => enterInquiry({ name: Iname, email, message })}
                    onClick={handleSubmit}

               
               >
                    Submit
                </Button>
            </Grid>

            {errorMessage && (
                <div style={{ 
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
               
                color: 'white',
                padding: '10px',
                borderRadius: '5px',
                textAlign: 'center',
                border: '2px solid white',
                animation: 'fade-in 0.5s ease-out',
                backdropFilter: 'blur(5px)', }}>
                    {errorMessage}
                </div>
            )}

        </Grid>
    );
};

export default InquiryForm;
