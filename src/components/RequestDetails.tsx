import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {
    Typography,
    Stack,
    Paper,
    Box,
    Divider,
    Button,
    TextField,
    Card,
    CardContent,
    RadioGroup,
    Radio,
    FormControlLabel,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import ReplyIcon from "@mui/icons-material/Reply";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";

function RequestDetailsView() {
    return (
        <>
            <Box sx={{ width: "90%", margin: "auto", maxWidth: 1500 }}>
                <Stack spacing={1}>
                    <Paper sx={{ padding: 3 }}>
                        {/* Request Title and Details */}
                        <Grid container spacing={2}>
                            <Grid xs={8}>
                                <Typography variant="h5" sx={{ paddingBottom: 1 }}>
                                    Request Title
                                </Typography>
                                <Divider />
                                <Typography sx={{ paddingTop: 2 }}>Request Details</Typography>
                            </Grid>
                            {/* Details Tab */}
                            <Grid xs={4}>
                                <Typography variant="h5" sx={{ paddingBottom: 1 }}>
                                    Details
                                </Typography>
                                <Divider />
                                <Stack spacing={1} sx={{ paddingTop: 2 }}>
                                    <Typography>
                                        <b>Assignee:</b> Justin Aavik
                                    </Typography>
                                    <Typography>
                                        <b>Requestor:</b> Bob Smith
                                    </Typography>
                                    <Typography>
                                        <b>Request Type:</b> Support
                                    </Typography>
                                    <Typography>
                                        <b>Last Updated Date:</b> 19/09/2023
                                    </Typography>
                                    <Typography>
                                        <b>Created Date:</b> 19/09/2023
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
                                <Card sx={{ backgroundColor: "warning.light" }}>
                                    <CardContent>
                                        <Stack direction={"row"} spacing={2}>
                                            <StickyNote2Icon />
                                            <div style={{ width: "100%" }}>
                                                <Typography>
                                                    <b>Justin Aavik</b> updated at 10:00AM |{" "}
                                                    <b>Internal Note</b>
                                                </Typography>
                                                <Divider />
                                                <Typography>
                                                    Internal Note that relates to this ticket
                                                </Typography>
                                            </div>
                                        </Stack>
                                    </CardContent>
                                </Card>
                                <Card sx={{ backgroundColor: "primary.light" }}>
                                    <CardContent>
                                        <Stack direction={"row"} spacing={2}>
                                            <ReplyIcon />
                                            <div style={{ width: "100%" }}>
                                                <Typography>
                                                    <b>Justin Aavik</b> updated at 10:00AM |{" "}
                                                    <b>Email to Requestor</b>
                                                </Typography>
                                                <Divider />
                                                <Typography>
                                                    Hi, this is a reply to a customer
                                                </Typography>
                                            </div>
                                        </Stack>
                                    </CardContent>
                                </Card>
                                <Card sx={{ backgroundColor: "success.light" }}>
                                    <CardContent>
                                        <Stack direction={"row"} spacing={2}>
                                            <EmailIcon />
                                            <div style={{ width: "100%" }}>
                                                <Typography>
                                                    <b>Justin Aavik</b> updated at 10:00AM |{" "}
                                                    <b>Email from Requestor</b>
                                                </Typography>
                                                <Divider />
                                                <Typography>
                                                    Hi, this is a reply from a customer
                                                </Typography>
                                            </div>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Stack>
                        </Stack>
                    </Paper>
                </Stack>
            </Box>
        </>
    );
}

export default RequestDetailsView;
