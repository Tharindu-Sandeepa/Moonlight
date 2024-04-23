import { Box, Button, Paper } from "@mui/material";
import FeedbackForm from "./FeedbackForm";
import { useNavigate } from 'react-router-dom';

import Axios from "axios";
import { useEffect, useState } from "react";

import ViewFeedbackIcon from '@mui/icons-material/Feedback';
import AddFeedbackIcon from '@mui/icons-material/Add';

const OptionPage = () => {
    const [feedback, setFeedback] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [selectedFeedback, setSelectedFeedback] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const [showForm, setShowForm] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        getFeedback();
    }, []);

    const getFeedback = () => {
        Axios.get('http://localhost:5002/api/feedbacks')
            .then(response => {
                setFeedback(response.data?.response || []);
            })
            .catch(error => {
                console.error("Axios Error: ", error);
            });
    }

    const createFeedback = (data) => {
        setSubmitted(true);
        const payload = { id: data.id, User_ID: data.User_ID, name: data.name, email: data.email, Jewelry_ID: data.Jewelry_ID, Jewelry_Name: data.Jewelry_Name, rating: data.rating, feedback: data.feedback };
        Axios.post('http://localhost:5002/api/createfeedback', payload)
            .then(() => {
                getFeedback();
                setSubmitted(false);
                setIsEdit(false);
                setShowForm(true);
            })
            .catch(error => {
                console.error("Axios Error: ", error);
            });
    }

    const updateFeedback = (data) => {
        setSubmitted(true);
        const payload = { ...data };
        Axios.post('http://localhost:5002/api/updateFeedback', payload)
            .then(() => {
                getFeedback();
                setSubmitted(false);
                setIsEdit(false);
                setShowForm(true);
            })
            .catch(error => {
                console.error("Axios Error: ", error);
            });
    }

    const deleteFeedback = (data) => {
        Axios.post('http://localhost:5002/api/deleteFeedback', data)
            .then(() => {
                getFeedback();
            })
            .catch(error => {
                console.error("Axios Error: ", error);
            });
    }

    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                backgroundImage: 'url("/path/to/your/background-image.jpg")', // Replace with the path to your background image
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {showForm && (
                <Paper
                    elevation={3}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: '20px',
                        width: 250,
                        padding: '20px',
                    }}
                >
                    <Button
                        onClick={() => navigate('/ViewFeedback')}
                        startIcon={<ViewFeedbackIcon />}
                        sx={{
                            mt: 3,
                            color: "white",
                            fontWeight: 'bold',
                            fontSize: 14,
                            borderRadius: '40px',
                            width: '100%',
                            backgroundColor: '#1565c0',
                            '&:hover': {
                                backgroundColor: '#0d47a1',
                            },
                        }}
                    >
                        View Feedback
                    </Button>
                    {/* <Button
                        onClick={() => { setShowForm(true); setSelectedFeedback(null); }}
                        startIcon={<AddFeedbackIcon />}
                        sx={{
                            mt: 3,
                            color: "white",
                            fontWeight: 'bold',
                            fontSize: 14,
                            borderRadius: '40px',
                            width: '100%',
                            backgroundColor: '#1565c0',
                            '&:hover': {
                                backgroundColor: '#0d47a1',
                            },
                        }}
                    >
                        Add Feedback
                    </Button> */}
                </Paper>
            )}
            {showForm && (
                <FeedbackForm
                    createFeedback={createFeedback}
                    updateFeedback={updateFeedback}
                    submitted={submitted}
                    data={selectedFeedback}
                    isEdit={isEdit}
                />
            )}
        </Box>
    );
}

export default OptionPage;
