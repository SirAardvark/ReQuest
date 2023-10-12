import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, FormGroup, TextField, Paper, Typography } from "@mui/material";

export default function FormSubmitHooks() {
    const [formValues, setFormValues] = useState([]);
    const handleTextFieldChange = (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        if (formValues.requestTitle === undefined || formValues.requestTitle === "") {
            alert("Please fill in a Request Title");
        } else if (formValues.requestDetails === undefined || formValues.requestDetails === "") {
            alert("Please fill in the Request Details");
        } else {
            await createRequest(formValues.requestTitle, formValues.requestDetails);
        }
    };

    // Saves state of previous page
    const navigate = useNavigate();

    const handleCancel = () => {
        // Goes back to previous page on pressing cancel
        navigate(-1);
    };

    const createRequest = async (title, details) => {
        fetch("http://localhost:8080/new_request", {
            method: "POST",
            body: JSON.stringify({
                title: title,
                details: details,
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
        });

        navigate(-1);
    };

    return (
        <Paper sx={{ width: "90%", margin: "auto" }}>
            <Typography sx={{ fontWeight: "bold", padding: 2 }} variant="h5" component="div">
                New Request
            </Typography>
            <form>
                <FormGroup
                    sx={{
                        padding: 2,
                    }}
                >
                    <TextField
                        sx={{ paddingBottom: 2 }}
                        name="requestTitle"
                        label="Request Title"
                        onChange={handleTextFieldChange}
                        inputProps={{ maxLength: 50 }}
                    />
                    <TextField
                        sx={{ paddingBottom: 2 }}
                        name="requestDetails"
                        label="Request Details"
                        multiline
                        rows={7}
                        onChange={handleTextFieldChange}
                        inputProps={{ maxLength: 1000 }}
                    />
                    <div>
                        <Button
                            variant="contained"
                            color="error"
                            sx={{ width: "45%", marginRight: "10%" }}
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="success"
                            sx={{ width: "45%" }}
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </div>
                </FormGroup>
            </form>
        </Paper>
    );
}
