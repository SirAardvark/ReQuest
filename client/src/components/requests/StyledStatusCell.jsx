import { Chip } from "@mui/material";
import { yellow, orange, purple } from "@mui/material/colors";

export default function StyledStatusCell(props) {
    if (props.status === "Open") {
        return (
            <Chip
                label={props.status}
                variant="filled"
                sx={{ backgroundColor: yellow[800], color: "var(--white)" }}
            />
        );
    } else if (props.status === "In Progress") {
        return (
            <Chip
                label={props.status}
                variant="filled"
                sx={{ backgroundColor: orange[800], color: "var(--white)" }}
            />
        );
    } else if (props.status === "Pending Response") {
        return <Chip label={props.status} variant="filled" color="primary" />;
    } else if (props.status === "On Hold") {
        return (
            <Chip
                label={props.status}
                variant="filled"
                sx={{ backgroundColor: purple[600], color: "var(--white)" }}
            />
        );
    } else if (props.status === "Completed") {
        return <Chip label={props.status} variant="filled" color="success" />;
    } else if (props.status === "Cancelled") {
        return <Chip label={props.status} variant="filled" color="error" />;
    } else {
        return <Chip label={props.status} variant="filled" />;
    }
}
