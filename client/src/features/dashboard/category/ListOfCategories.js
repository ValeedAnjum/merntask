import React, { useContext } from 'react';
import { Button, Pagination, Stack, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import UpdateCategory from './UpdateCategory';
import { CategoriesContext } from './context/CategoryContext';
const BasicTable = () => {
    const { categoriesData, updateHan, delHand, handleChange } = useContext(CategoriesContext)
    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Category Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            categoriesData.list.length > 0 && categoriesData.list.map(({ _id, name }) => {
                                return (
                                    <TableRow
                                        key={_id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {name}
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button variant='outlined' onClick={() => updateHan(_id)}>Update</Button>
                                            <Button variant='outlined' onClick={() => delHand(_id)}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                        {
                            categoriesData.loading && <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        }

                    </TableBody>
                </Table>
            </TableContainer>
            <Stack sx={{ mt: '5px' }} spacing={2}>
                {!categoriesData.loading && <Pagination sx={{ mt: '5px' }} count={Math.ceil(categoriesData.total / 2)} page={categoriesData.page} onChange={handleChange} />}
            </Stack>
            {categoriesData.openUpdateModel && <UpdateCategory id={categoriesData.updateId} />}
        </>
    );
}

export default BasicTable;