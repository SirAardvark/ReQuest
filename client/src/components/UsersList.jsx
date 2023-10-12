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

function UsersList() {
    const [usersDetails, setUsersDetails] = useState([]);

    useEffect(() => {
        const fetchAllUsers = async () => {
            fetch(`http://localhost:8080/users`)
                .then((response) => response.json())
                .then((data) => {
                    setUsersDetails(data);
                })
                .catch((error) => console.error(error));
        };
        fetchAllUsers();
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
                            Users
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
                                        Role
                                    </TableCell>
                                    <TableCell sx={{ color: "var(--white)", fontWeight: "bold" }}>
                                        Name
                                    </TableCell>
                                    <TableCell sx={{ color: "var(--white)", fontWeight: "bold" }}>
                                        Email
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {usersDetails.map((row) => {
                                    return (
                                        <TableRow
                                            key={row.user_id}
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
                                            <TableCell>{row.user_id}</TableCell>
                                            <TableCell>{row.user_role_name}</TableCell>
                                            <TableCell> {row.name}</TableCell>
                                            <TableCell>{row.email}</TableCell>
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

export default UsersList;
