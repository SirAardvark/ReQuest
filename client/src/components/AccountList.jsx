import { List, ListItem, Paper, Typography } from "@mui/material";

function AccountList() {
    return (
        <>
            <Paper sx={{ width: "90%", margin: "auto" }}>
                <Typography sx={{ fontWeight: "bold", padding: 2 }} variant="h5">
                    Account Details
                </Typography>
                <List>
                    <ListItem>User ID: </ListItem>
                    <ListItem>Name: </ListItem>
                    <ListItem>Email: </ListItem>
                    <ListItem>Password: </ListItem>
                    <ListItem>Role: </ListItem>
                </List>
            </Paper>
        </>
    );
}

export default AccountList;
