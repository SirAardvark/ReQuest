import { List, ListItem, Paper, Typography } from "@mui/material";

function ConfigList() {
    return (
        <>
            <Paper sx={{ width: "90%", margin: "auto" }}>
                <Typography sx={{ fontWeight: "bold", padding: 2 }} variant="h5">
                    Config
                </Typography>
                <List>
                    <ListItem>Test</ListItem>
                    <ListItem>Test</ListItem>
                    <ListItem>Test</ListItem>
                    <ListItem>Test</ListItem>
                </List>
            </Paper>
        </>
    );
}

export default ConfigList;
