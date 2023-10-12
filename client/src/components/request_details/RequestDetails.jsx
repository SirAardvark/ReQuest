import Grid from "@mui/material/Unstable_Grid2";
import { Typography, Stack, Paper, Divider } from "@mui/material";

import { useState, useEffect } from "react";
import StyledStatusCell from "../requests/StyledStatusCell";

function RequestDetails(props) {
    const [requestDetails, setRequestDetails] = useState([]);

    useEffect(() => {
        const fetchAllRequests = async () => {
            fetch(`http://localhost:8080/requests/${props.requestID}`)
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
            <Paper sx={{ padding: 3 }}>
                <Grid container spacing={2}>
                    {/* Request Title and Details */}
                    <Grid xs={8}>
                        <Typography variant="h5" sx={{ paddingBottom: 1 }}>
                            {requestDetails.title}
                        </Typography>
                        <Divider />
                        <Typography sx={{ paddingTop: 2 }}>{requestDetails.details}</Typography>
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
                                <b>Created Date:</b> {formatDate(requestDetails.created_date)}
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
}

export default RequestDetails;
