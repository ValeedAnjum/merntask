import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { CarContext } from './context/CarContext';


const SelectCategory = () => {
    const { selectCategory, handleChange } = useContext(CarContext);
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    id="outlined-select-currency"
                    select
                    label="Select"
                    value={selectCategory.value}
                    onChange={handleChange}
                    helperText="Please select your currency"
                >
                    {selectCategory.list.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

            </div>

        </Box>
    );
}

export default SelectCategory;