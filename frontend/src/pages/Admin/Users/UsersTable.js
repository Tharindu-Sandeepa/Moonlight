import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const UsersTable = ({ rows, selectUser, deleteUser }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                       
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Telephone</TableCell>
                        <TableCell>UserName</TableCell>
                       
                        <TableCell>Type</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.length > 0 ? (
                        rows.map(row => (
                            <TableRow key={row.id}>
                               
                                <TableCell component={'th'} scope="row">{row.name}</TableCell>
                                <TableCell component={'th'} scope="row">{row.email}</TableCell>
                                <TableCell component={'th'} scope="row">{row.tp}</TableCell>
                                <TableCell component={'th'} scope="row">{row.username}</TableCell>
                               
                                <TableCell component={'th'} scope="row">{row.type}</TableCell>
                                <TableCell>
                                    <Button onClick={() => selectUser({ id: row._id, name: row.name, email: row.email, tp: row.tp, username: row.username, password: row.password, type: row.type })}>
                                        Update
                                    </Button>
                                    <Button onClick={() => deleteUser({ id: row._id })}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell component={'th'} scope="row">No data!</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default UsersTable;
