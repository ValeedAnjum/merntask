import React, { useContext } from 'react';
import { Button, Pagination, Stack, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
// import UpdateCategory from './UpdateCategory';
import { CarContext } from './context/CarContext';
const ListOfCars = () => {
    const { carsData, updateHan, delHand, handlePageChange } = useContext(CarContext)
    return (
        <>
            {
                carsData.list.length > 0 && <>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Car Name</TableCell>
                                    <TableCell>Model</TableCell>
                                    <TableCell>Color</TableCell>
                                    <TableCell>Make</TableCell>
                                    <TableCell>Reg No.</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    carsData.list.map(({ _id, name, model, color, make, reg }) => {
                                        return (
                                            <TableRow
                                                key={_id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {name}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {model}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {color}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {make}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {reg}
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
                                    carsData.loading && <TableRow
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
                        {carsData.list.length > 0 && !carsData.loading && <Pagination sx={{ mt: '5px' }} count={Math.ceil(carsData.total / 1)} page={carsData.page} onChange={handlePageChange} />}
                    </Stack>
                    {/* {categoriesData.openUpdateModel && <UpdateCategory id={categoriesData.updateId} />} */}
                </>
            }
        </>
    );
}

export default ListOfCars;