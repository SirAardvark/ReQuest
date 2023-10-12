import {
    Box,
    Button,
    Divider,
    FormControlLabel,
    FormGroup,
    Paper,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material";

import { useState } from "react";

export default function UpdateRequests(props) {
    // Form States
    const [requestActivityType, setRequestActivityType] = useState("internalNote");
    const [requestActivityMessage, setRequestActivityMessage] = useState("");

    const handleTypeChange = (event) => {
        setRequestActivityType(event.target.value);
    };

    const handleMessageChange = (event) => {
        setRequestActivityMessage(event.target.value);
    };

    const handleSubmit = async () => {
        if (requestActivityMessage === undefined || requestActivityMessage === "") {
            alert("Please fill in a Note in the Update Request section");
        } else {
            formatQueryData();
        }
    };

    const formatQueryData = async () => {
        let activityTypeID = 1;
        let userID = 1;

        if (requestActivityType == "internalNote") {
            activityTypeID = 1;
            userID = 1;
            await createRequestActivity(activityTypeID, userID);
        } else if (requestActivityType == "requestorNote") {
            activityTypeID = 2;
            userID = 2;
            await createRequestActivity(activityTypeID, userID);
        } else if (requestActivityType == "assigneeNote") {
            activityTypeID = 3;
            userID = 1;
            await createRequestActivity(activityTypeID, userID);
        } else {
            alert("Something went wrong, please try again.");
        }
    };

    const createRequestActivity = async (activityTypeID, userID) => {
        fetch("http://localhost:8080/new_request_activity", {
            method: "POST",
            body: JSON.stringify({
                requestID: props.requestID,
                activityTypeID: activityTypeID,
                userID: userID,
                message: requestActivityMessage,
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
        });

        window.location.reload(false);
    };

    return (
        <>
            <Paper sx={{ marginTop: "20px !important;", padding: 3 }}>
                <Typography variant="h5" sx={{ paddingBottom: 1 }}>
                    Update Request
                </Typography>
                <Divider />
                <FormGroup
                    sx={{
                        padding: 2,
                    }}
                >
                    <RadioGroup row defaultValue={"internalNote"} onChange={handleTypeChange}>
                        <FormControlLabel
                            value={"internalNote"}
                            control={<Radio />}
                            label="Internal Note"
                        />
                        <FormControlLabel
                            value={"requestorNote"}
                            control={<Radio />}
                            label="Requestor Note"
                        />
                        <FormControlLabel
                            value={"assigneeNote"}
                            control={<Radio />}
                            label="Assignee Note"
                        />
                    </RadioGroup>
                    <TextField
                        sx={{ paddingBottom: 2, width: "100%" }}
                        name="message"
                        label="Add Internal Note / Requestor Note / Assignee Note"
                        multiline
                        rows={5}
                        onChange={handleMessageChange}
                        inputProps={{ maxLength: 1000 }}
                    />
                    <Box>
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Update Request
                        </Button>
                    </Box>
                </FormGroup>
            </Paper>
        </>
    );
}
