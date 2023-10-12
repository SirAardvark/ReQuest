import {
    Box,
    Paper,
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Toolbar,
    Typography,
} from "@mui/material";
import { useState, useEffect } from "react";

function ConfigStatusTable() {
    const [configStatusDetails, setConfigStatusDetails] = useState([]);

    useEffect(() => {
        const fetchAllConfig = async () => {
            fetch(`http://localhost:8080/request_status`)
                .then((response) => response.json())
                .then((data) => {
                    setConfigStatusDetails(data);
                })
                .catch((error) => console.error(error));
        };
        fetchAllConfig();
    }, []);

    return (
        <>
            <Box sx={{ width: "90%", margin: "auto", maxWidth: 1500 }}>
                <Paper sx={{ width: "100%", mb: 2 }}>
                    <Toolbar>
                        <Typography
                            sx={{ flex: "1 1 50%", fontWeight: "bold" }}
                            variant="h5"
                            component="div"
                        >
                            Request Status Types
                        </Typography>
                    </Toolbar>
                    <TableContainer>
                        <Table sx={{ minWidth: 1000 }} aria-labelledby="tableTitle">
                            <TableHead sx={{ backgroundColor: "secondary.main" }}>
                                <TableRow>
                                    <TableCell sx={{ color: "var(--white)", fontWeight: "bold" }}>
                                        ID
                                    </TableCell>
                                    <TableCell sx={{ color: "var(--white)", fontWeight: "bold" }}>
                                        Name
                                    </TableCell>
                                    <TableCell sx={{ color: "var(--white)", fontWeight: "bold" }}>
                                        Description
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {configStatusDetails.map((row) => {
                                    return (
                                        <TableRow
                                            key={row.status_id}
                                            sx={{
                                                "&:nth-of-type(odd)": {
                                                    backgroundColor: "secondary.light",
                                                },
                                                ":hover": {
                                                    backgroundColor: "primary.light",
                                                },
                                            }}
                                        >
                                            <TableCell>{row.status_id}</TableCell>
                                            <TableCell> {row.name}</TableCell>
                                            <TableCell>{row.description}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        </>
    );
}

export default ConfigStatusTable;
