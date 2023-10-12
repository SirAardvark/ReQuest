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

function ConfigActivityTypeTable() {
    const [configActivityTypeDetails, setConfigActivityTypeDetails] = useState([]);

    useEffect(() => {
        const fetchAllConfig = async () => {
            fetch(`http://localhost:8080/request_activity_config`)
                .then((response) => response.json())
                .then((data) => {
                    setConfigActivityTypeDetails(data);
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
                            Request Activity Types
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
                                {configActivityTypeDetails.map((row) => {
                                    return (
                                        <TableRow
                                            key={row.type_id}
                                            sx={{
                                                "&:nth-of-type(odd)": {
                                                    backgroundColor: "secondary.light",
                                                },
                                                ":hover": {
                                                    backgroundColor: "primary.light",
                                                },
                                            }}
                                        >
                                            <TableCell>{row.type_id}</TableCell>
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

export default ConfigActivityTypeTable;
