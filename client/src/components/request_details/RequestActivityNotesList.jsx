import { Divider, Paper, Stack, Typography } from "@mui/material";
import RequestActivityNotes from "../request_details/RequestActivityNotes";

export default function RequestActivityNotesList(props) {
    return (
        <>
            <Paper sx={{ marginTop: "20px !important;", padding: 3 }}>
                <Typography variant="h5" sx={{ paddingBottom: 1 }}>
                    Request Activity
                </Typography>
                <Divider />
                <Stack spacing={2} sx={{ paddingTop: 2 }}>
                    <Stack spacing={1}>
                        <RequestActivityNotes requestID={props.requestID} />
                    </Stack>
                </Stack>
            </Paper>
        </>
    );
}
