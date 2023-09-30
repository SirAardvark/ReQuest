import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, FormGroup, TextField, Paper, Typography } from "@mui/material";

const types = [{ value: "Support" }, { value: "Change Request" }, { value: "Raise Bug" }];

export default function FormSubmitHooks() {
    const [formValues, setFormValues] = useState([]);
    const handleTextFieldChange = (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        // If Request Type is not called in form it is updated here.
        if (formValues.requestType === undefined || formValues.requestType === "") {
            // Sets to the default type
            formValues.requestType = types[0].value;
        }

        if (formValues.requestTitle === undefined || formValues.requestTitle === "") {
            alert("Please fill in a Request Title");
        } else if (formValues.requestDetails === undefined || formValues.requestDetails === "") {
            alert("Please fill in the Request Details");
        } else {
            console.log(formValues.requestType);
            console.log(formValues.requestTitle);
            console.log(formValues.requestDetails);
        }
    };

    // Saves state of previous page
    const navigate = useNavigate();

    const handleCancel = () => {
        // Goes back to previous page on pressing cancel
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
                    <div>
                        <TextField
                            sx={{ paddingBottom: 2 }}
                            select
                            name="requestType"
                            label="Request Type"
                            SelectProps={{
                                native: true,
                            }}
                            onChange={handleTextFieldChange}
                        >
                            {types.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.value}
                                </option>
                            ))}
                        </TextField>
                    </div>
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
