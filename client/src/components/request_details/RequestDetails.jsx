import Grid from "@mui/material/Unstable_Grid2";
import {
    InputLabel,
    FormControl,
    MenuItem,
    Typography,
    Select,
    Stack,
    Paper,
    Divider,
} from "@mui/material";

import { useState, useEffect } from "react";

function RequestDetails(props) {
    const [requestDetails, setRequestDetails] = useState([]);
    const [requestStatus, setRequestStatus] = useState("");

    useEffect(() => {
        const fetchAllRequests = async () => {
            fetch(`http://localhost:8080/requests/${props.requestID}`)
                .then((response) => response.json())
                .then((data) => {
                    setRequestDetails(data);
                    setRequestStatus(data.status_type);
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

    const handleStatusChange = (event) => {
        setRequestStatus(event.target.value);
        formatDataQuery(event.target.value);
    };

    function formatDataQuery(statusTypeName) {
        let statusID;
        switch (statusTypeName) {
            case "Open":
                statusID = 1;
                break;
            case "In Progress":
                statusID = 2;
                break;
            case "Pending Response":
                statusID = 3;
                break;
            case "On Hold":
                statusID = 4;
                break;
            case "Completed":
                statusID = 5;
                break;
            case "Cancelled":
                statusID = 6;
                break;
            default:
                break;
        }
        updateRequestStatus(statusID);
    }

    const updateRequestStatus = async (statusID) => {
        fetch(`http://localhost:8080/update_request_status/${props.requestID}`, {
            method: "PUT",
            body: JSON.stringify({
                statusID: statusID,
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
        });

        window.location.reload(false);
    };

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
                            <FormControl>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={requestStatus}
                                    label="Status"
                                    onChange={handleStatusChange}
                                >
                                    <MenuItem value={"Open"}>Open</MenuItem>
                                    <MenuItem value={"In Progress"}>In Progress</MenuItem>
                                    <MenuItem value={"Pending Response"}>Pending Response</MenuItem>
                                    <MenuItem value={"On Hold"}>On Hold</MenuItem>
                                    <MenuItem value={"Completed"}>Completed</MenuItem>
                                    <MenuItem value={"Cancelled"}>Cancelled</MenuItem>
                                </Select>
                            </FormControl>
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
