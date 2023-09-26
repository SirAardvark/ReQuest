import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { visuallyHidden } from "@mui/utils";
import { Button } from "@mui/material";

import { Link } from "react-router-dom";

interface Data {
    requestID: number;
    status: string;
    type: string;
    requestor: string;
    title: string;
    lastUpdatedDate: string;
    createdDate: string;
    assignee: string;
}

function createData(
    requestID: number,
    status: string,
    type: string,
    requestor: string,
    title: string,
    lastUpdatedDate: string,
    createdDate: string,
    assignee: string
): Data {
    return {
        requestID,
        status,
        type,
        requestor,
        title,
        lastUpdatedDate,
        createdDate,
        assignee,
    };
}

const rows = [
    createData(
        1,
        "Completed",
        "Support",
        "John Smith",
        "Need assistance with resetting my password",
        "17/09/2023",
        "17/09/2023",
        "Justin Aavik"
    ),
    createData(
        2,
        "Cancelled",
        "Support",
        "Mary Jane",
        "Setup New laptop",
        "18/09/2023",
        "17/09/2023",
        "Justin Aavik"
    ),
    createData(
        3,
        "Completed",
        "Support",
        "John Smith",
        "Install Adobe",
        "19/09/2023",
        "17/09/2023",
        "Justin Aavik"
    ),
    createData(
        4,
        "In Progress",
        "Support",
        "John Smith",
        "Export Data to Spreadsheet",
        "18/09/2023",
        "18/09/2023",
        "Justin Aavik"
    ),
    createData(
        5,
        "In Progress",
        "Support",
        "John Smith",
        "Import Data from Spreadsheet",
        "18/09/2023",
        "18/09/2023",
        "Justin Aavik"
    ),
    createData(
        6,
        "Open",
        "Raise Bug",
        "Mary Jane",
        "Data loading incorrectly",
        "19/09/2023",
        "19/09/2023",
        "Justin Aavik"
    ),
    createData(
        7,
        "Open",
        "Change Request",
        "John Smith",
        "New field in DB to be created",
        "19/09/2023",
        "19/09/2023",
        "Justin Aavik"
    ),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: "requestID",
        numeric: true,
        disablePadding: false,
        label: "ID",
    },
    {
        id: "status",
        numeric: false,
        disablePadding: false,
        label: "Status",
    },
    {
        id: "type",
        numeric: false,
        disablePadding: false,
        label: "Type",
    },
    {
        id: "requestor",
        numeric: false,
        disablePadding: false,
        label: "Requestor",
    },
    {
        id: "title",
        numeric: false,
        disablePadding: false,
        label: "Title",
    },
    {
        id: "lastUpdatedDate",
        numeric: false,
        disablePadding: false,
        label: "Last Updated Date",
    },
    {
        id: "createdDate",
        numeric: false,
        disablePadding: false,
        label: "Created Date",
    },

    {
        id: "assignee",
        numeric: false,
        disablePadding: false,
        label: "Assignee",
    },
];

interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

const StyledTableRowHeader = styled(TableRow)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
}));

const StyledTableCellHeader = styled(TableCell)(({ theme }) => ({
    fontWeight: "bold",
    color: theme.palette.common.white,
}));

const StyledTableSortHeader = styled(TableSortLabel)(() => ({
    color: "white !important",
    "& svg": {
        color: "white !important",
    },
}));

function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <StyledTableRowHeader>
                {headCells.map((headCell) => (
                    <StyledTableCellHeader
                        key={headCell.id}
                        align="left"
                        padding={headCell.disablePadding ? "none" : "normal"}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <StyledTableSortHeader
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : "asc"}
                            onClick={createSortHandler(headCell.id)}
                            // sx={{ color: "white !important" }}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                                </Box>
                            ) : null}
                        </StyledTableSortHeader>
                    </StyledTableCellHeader>
                ))}
            </StyledTableRowHeader>
        </TableHead>
    );
}

interface EnhancedTableToolbarProps {}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
            }}
        >
            <Typography
                sx={{ flex: "1 1 50%", fontWeight: "bold" }}
                variant="h5"
                id="tableTitle"
                component="div"
            >
                Requests
            </Typography>
            <Link to={"/new-request"}>
                <Button variant="contained" color="success">
                    New Request
                </Button>
            </Link>
        </Toolbar>
    );
}

export default function RequestsTable() {
    const [order, setOrder] = React.useState<Order>("desc");
    const [orderBy, setOrderBy] = React.useState<keyof Data>("requestID");
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
            ),
        [order, orderBy, page, rowsPerPage]
    );

    return (
        <Box sx={{ width: "90%", margin: "auto", maxWidth: 1500 }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
                <EnhancedTableToolbar />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? "small" : "medium"}
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />

                        <TableBody>
                            {visibleRows.map((row) => {
                                return (
                                    <TableRow
                                        key={row.requestID}
                                        component={Link}
                                        to={`/request/${row.requestID}`}
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
                                        <TableCell align="left">{row.requestID}</TableCell>
                                        <TableCell align="left">{row.status}</TableCell>
                                        <TableCell align="left">{row.type}</TableCell>
                                        <TableCell align="left">{row.requestor}</TableCell>
                                        <TableCell align="left">{row.title}</TableCell>
                                        <TableCell align="left">{row.lastUpdatedDate}</TableCell>
                                        <TableCell align="left">{row.createdDate}</TableCell>
                                        <TableCell align="left">{row.assignee}</TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        </Box>
    );
}
