import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { GithubRepository } from '../interfaces/githubInterfaces';
import { useCustomDispatch, useCustomSelector } from '../hooks/redux';
import { getRepositories, getSingleUser } from '../controllers/githubUsers';
import { useParams } from 'react-router-dom';

interface Column {
    id: 'id' | 'name' | 'html_url' | 'visibility';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'id', label: 'ID', minWidth: 30 },
    { id: 'name', label: 'Repository', minWidth: 80 },
    {
        id: 'html_url',
        label: 'URL Repo',
        minWidth: 80,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'visibility',
        label: 'Type',
        minWidth: 50,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    }
];

export const TableRepos = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { repositories, singleUser } = useCustomSelector((state) => state.users);
    const dispatch = useCustomDispatch();
    const { login } = useParams();
    const rows: GithubRepository[] = repositories

    React.useEffect(() => {
        dispatch(getRepositories({ user: login }))
        dispatch(getSingleUser({user:login}))
    }, [])

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '30px',
                flexDirection: 'column',
            }}
        >
            <h1 style={{marginBottom:'20px', color:'#fff'}}>User: {singleUser?.name}</h1>
            <Paper sx={{ width: '60%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }} style={{display:'flex', justifyContent:'space-between', textAlign:'center'}}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth, backgroundColor: '#29292f', color: 'white' }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.name} >
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}