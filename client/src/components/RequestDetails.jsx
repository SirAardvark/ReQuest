import Grid from "@mui/material/Unstable_Grid2";
import {
    Typography,
    Stack,
    Paper,
    Box,
    Divider,
    Button,
    TextField,
    RadioGroup,
    Radio,
    FormControlLabel,
} from "@mui/material";

import { useState, useEffect } from "react";
import StyledStatusCell from "./StyledStatusCell";
import RequestActivityNotes from "./RequestActivityNotes";

function RequestDetailsView() {
    let currentURLDetails = window.location.href.split("/");
    let requestID = currentURLDetails[4]; // Getting the request ID from the URL

    const [requestDetails, setRequestDetails] = useState([]);

    useEffect(() => {
        const fetchAllRequests = async () => {
            fetch(`http://localhost:8080/requests/${requestID}`)
                .then((response) => response.json())
                .then((data) => {
                    setRequestDetails(data);
                })
                .catch((error) => console.error(error));
        };
        fetchAllRequests();
    }, []);

    function formatDate(datetime) {
        const date = new Date(datetime);
        const formattedDate = date.toLocaleDateString("en-AU");
        return formattedDate;
    }

    return (
        <>
            <Box sx={{ width: "90%", margin: "auto", maxWidth: 1500 }}>
                <Stack spacing={1}>
                    <Paper sx={{ padding: 3 }}>
                        {/* Request Title and Details */}
                        <Grid container spacing={2}>
                            <Grid xs={8}>
                                <Typography variant="h5" sx={{ paddingBottom: 1 }}>
                                    {requestDetails.title}
                                </Typography>
                                <Divider />
                                <Typography sx={{ paddingTop: 2 }}>
                                    {requestDetails.details}
                                </Typography>
                            </Grid>
                            {/* Details Tab */}
                            <Grid xs={4}>
                                <Typography variant="h5" sx={{ paddingBottom: 1 }}>
                                    Details
                                </Typography>
                                <Divider />
                                <Stack spacing={1} sx={{ paddingTop: 2 }}>
                                    <Typography>
                                        <StyledStatusCell status={requestDetails.status_type} />
                                    </Typography>
                                    <Typography>
                                        <b>ID:</b> {requestDetails.request_id}
                                    </Typography>
                                    <Typography>
                                        <b>Assignee:</b> {requestDetails.assignee_name}
                                    </Typography>
                                    <Typography>
                                        <b>Requestor:</b> {requestDetails.requestor_name}
                                    </Typography>
                                    <Typography>
                                        <b>Request Type:</b> {requestDetails.request_type}
                                    </Typography>
                                    <Typography>
                                        <b>Created Date:</b>{" "}
                                        {formatDate(requestDetails.created_date)}
                                    </Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Paper>

                    {/* Update Request */}
                    <Paper sx={{ marginTop: "20px !important;", padding: 3 }}>
                        <Typography variant="h5" sx={{ paddingBottom: 1 }}>
                            Update Request
                        </Typography>
                        <Divider />
                        <RadioGroup row defaultValue={"internalNote"}>
                            <FormControlLabel
                                value={"internalNote"}
                                control={<Radio />}
                                label="Internal Note"
                            />
                            <FormControlLabel
                                value={"sendEmail"}
                                control={<Radio />}
                                label="Send Email"
                            />
                        </RadioGroup>
                        <TextField
                            sx={{ paddingBottom: 2, width: "100%" }}
                            name="addNoteOrEmail"
                            label="Add Internal Note / Send Email"
                            multiline
                            rows={5}
                            inputProps={{ maxLength: 1000 }}
                        />
                        <Button variant="contained" color="primary">
                            Update Request
                        </Button>
                    </Paper>

                    {/* Request Activity */}
                    <Paper sx={{ marginTop: "20px !important;", padding: 3 }}>
                        <Typography variant="h5" sx={{ paddingBottom: 1 }}>
                            Request Activity
                        </Typography>
                        <Divider />
                        <Stack spacing={2} sx={{ paddingTop: 2 }}>
                            <Stack spacing={1}>
                                <RequestActivityNotes requestID={requestID} />;
                            </Stack>
                        </Stack>
                    </Paper>
                </Stack>
            </Box>
        </>
    );
}

export default RequestDetailsView;
