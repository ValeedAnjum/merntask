import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { AddCarContext } from './context/AddCarContext';


const SelectCategory = () => {
    const { selectCategory, handleChange } = useContext(AddCarContext);
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