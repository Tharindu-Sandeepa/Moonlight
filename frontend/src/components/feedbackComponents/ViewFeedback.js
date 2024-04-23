import { Box } from "@mui/material";
import FeedbackTable from "../../pages/Admin/Feedback/FeedbackTable";
import Axios from "axios";
import { useEffect, useState } from "react";
import UserView from "./UserView";
import FeedbackForm from "./FeedbackForm";

const ViewFeedback = () => {
    const [selectedFeedback, setSelectedFeedback] = useState({});
    const [feedback, setFeedback] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [showForm, setShowForm] = useState(false);

    // Run first
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

        const payload = {
            id: data.id,
            User_ID: data.User_ID,
            name: data.name,
            email: data.email,
            Jewelry_ID: data.Jewelry_ID,
            Jewelry_Name: data.Jewelry_Name,
            rating: data.rating,
            feedback: data.feedback,
        }

        Axios.post('http://localhost:5002/api/createfeedback', payload)
            .then(() => {
                getFeedback();
                setSubmitted(false);
                setIsEdit(false);
                setShowForm(false);
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
                setShowForm(false);
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
        <Box>
            {showForm ? (
                <FeedbackForm
                    createFeedback={createFeedback}
                    updateFeedback={updateFeedback}
                    submitted={submitted}
                    data={selectedFeedback}
                    isEdit={isEdit}
                />
            ) : (
                <UserView
                    rows={feedback}
                    selectedFeedback={data => {
                        setSelectedFeedback(data);
                        setIsEdit(true);
                        setShowForm(true);
                    }}
                    deleteFeedback={data => window.confirm('Are you sure?') && deleteFeedback(data)}
                />
            )}
        </Box>
    )
}

export default ViewFeedback;
