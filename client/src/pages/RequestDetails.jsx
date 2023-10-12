import { Box, Stack } from "@mui/material";

import ResponsiveAppBar from "../components/nav/ResponsiveAppBar";
import RequestDetails from "../components/request_details/RequestDetails";
import UpdateRequests from "../components/request_details/UpdateRequests";
import RequestActivityNotesList from "../components/request_details/RequestActivityNotesList";

function RequestDetail() {
    let currentURLDetails = window.location.href.split("/");
    let requestID = currentURLDetails[4]; // Getting the request ID from the URL

    return (
        <>
            <ResponsiveAppBar />
            <br />
            <Box sx={{ width: "90%", margin: "auto", maxWidth: 1500 }}>
                <Stack spacing={1}>
                    <RequestDetails requestID={requestID} />
                    <UpdateRequests requestID={requestID} />
                    <RequestActivityNotesList requestID={requestID} />
                </Stack>
            </Box>
        </>
    );
}

export default RequestDetail;
