import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Button,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Toolbar,
    Paper,
    Typography,
} from "@mui/material";

import StyledStatusCell from "./StyledStatusCell";

export default function RequestsTable() {
    const [allRequests, setAllRequests] = useState([]);

    useEffect(() => {
        const fetchAllRequests = async () => {
            fetch("http://localhost:8080/requests")
                .then((response) => response.json())
                .then((data) => {
                    setAllRequests(data);
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
        <Box sx={{ width: "90%", margin: "auto", maxWidth: 1500 }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
                <Toolbar>
                    <Typography
                        sx={{ flex: "1 1 50%", fontWeight: "bold" }}
                        variant="h5"
                        component="div"
                    >
                        Requests
                    </Typography>
                    <Link to="/new-request">
                        <Button variant="contained" color="success">
                            NEW REQUEST
                        </Button>
                    </Link>
                </Toolbar>
                <TableContainer>
                    <Table sx={{ minWidth: 1000 }} aria-labelledby="tableTitle">
                        <TableHead sx={{ backgroundColor: "secondary.main" }}>
                            <TableRow>
                                <TableCell sx={{ color: "var(--white)", fontWeight: "bold" }}>
                                    ID
                                </TableCell>
                                <TableCell sx={{ color: "var(--white)", fontWeight: "bold" }}>
                                    Status
                                </TableCell>
                                <TableCell sx={{ color: "var(--white)", fontWeight: "bold" }}>
                                    Requestor
                                </TableCell>
                                <TableCell sx={{ color: "var(--white)", fontWeight: "bold" }}>
                                    Title
                                </TableCell>
                                <TableCell sx={{ color: "var(--white)", fontWeight: "bold" }}>
                                    Created Date
                                </TableCell>
                                <TableCell sx={{ color: "var(--white)", fontWeight: "bold" }}>
                                    Assignee
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {allRequests.map((row) => {
                                return (
                                    <TableRow
                                        key={row.request_id}
                                        component={Link}
                                        to={`/request/${row.request_id}`}
                                        sx={{
                                            "&:nth-of-type(odd)": {
                                                backgroundColor: "secondary.light",
                                            },
                                            ":hover": {
                                                backgroundColor: "primary.light",
                                            },
                                            textDecoration: "none",
                                        }}
                                    >
                                        <TableCell>{row.request_id}</TableCell>
                                        <TableCell>
                                            <StyledStatusCell status={row.status_type} />
                                        </TableCell>
                                        <TableCell>{row.requestor_name}</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>
                                            {row.title}
                                        </TableCell>
                                        <TableCell>{formatDate(row.created_date)}</TableCell>
                                        <TableCell>{row.assignee_name}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}
