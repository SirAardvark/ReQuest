import { useState, useEffect } from "react";

import { Card, CardContent, Divider, Stack, Typography } from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import ReplyIcon from "@mui/icons-material/Reply";
import EditNoteIcon from "@mui/icons-material/EditNote";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";

export default function RequestActivityNotes(props) {
    const [activitiesDetails, setActivitiesDetails] = useState([]);

    useEffect(() => {
        const fetchAllRequests = async () => {
            fetch(`http://localhost:8080/request_activities/${props.requestID}`)
                .then((response) => response.json())
                .then((data) => {
                    setActivitiesDetails(data);
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
            {activitiesDetails.map((row) => {
                if (row.activity_type === "Internal Note") {
                    return (
                        <Card sx={{ backgroundColor: "warning.light" }}>
                            <CardContent>
                                <Stack direction={"row"} spacing={2}>
                                    <EditNoteIcon />
                                    <div style={{ width: "100%" }}>
                                        <Typography>
                                            <b>{row.user_name}</b> updated on{" "}
                                            {formatDate(row.created_date)} |{" "}
                                            <b>{row.activity_type}</b>
                                        </Typography>
                                        <Divider />
                                        <Typography>{row.message}</Typography>
                                    </div>
                                </Stack>
                            </CardContent>
                        </Card>
                    );
                } else if (row.activity_type === "Note to Requestor") {
                    return (
                        <Card sx={{ backgroundColor: "primary.light" }}>
                            <CardContent>
                                <Stack direction={"row"} spacing={2}>
                                    <ReplyIcon />
                                    <div style={{ width: "100%" }}>
                                        <Typography>
                                            <b>{row.user_name}</b> updated on{" "}
                                            {formatDate(row.created_date)} |{" "}
                                            <b>{row.activity_type}</b>
                                        </Typography>
                                        <Divider />
                                        <Typography>{row.message}</Typography>
                                    </div>
                                </Stack>
                            </CardContent>
                        </Card>
                    );
                } else if (row.activity_type === "Note from Requestor") {
                    return (
                        <Card sx={{ backgroundColor: "success.light" }}>
                            <CardContent>
                                <Stack direction={"row"} spacing={2}>
                                    <PersonIcon />
                                    <div style={{ width: "100%" }}>
                                        <Typography>
                                            <b>{row.user_name}</b> updated on{" "}
                                            {formatDate(row.created_date)} |{" "}
                                            <b>{row.activity_type}</b>
                                        </Typography>
                                        <Divider />
                                        <Typography>{row.message}</Typography>
                                    </div>
                                </Stack>
                            </CardContent>
                        </Card>
                    );
                } else {
                    return (
                        <Card sx={{ backgroundColor: "secondary.light" }}>
                            <CardContent>
                                <Stack direction={"row"} spacing={2}>
                                    <SettingsApplicationsIcon />
                                    <div style={{ width: "100%" }}>
                                        <Typography>
                                            <b>{row.user_name}</b> updated on{" "}
                                            {formatDate(row.created_date)} |{" "}
                                            <b>{row.activity_type}</b>
                                        </Typography>
                                        <Divider />
                                        <Typography>{row.message}</Typography>
                                    </div>
                                </Stack>
                            </CardContent>
                        </Card>
                    );
                }
            })}
        </>
    );
}
