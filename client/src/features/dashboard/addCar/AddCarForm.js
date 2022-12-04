import React, { useContext } from "react";
import { Button, TextField } from '@mui/material'
import { useForm } from "react-hook-form";
import { AddCarContext } from './context/AddCarContext';
import axios from 'axios'
const AddCarForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const { selectCategory } = useContext(AddCarContext);
    const onSubmit = async (data) => {
        const category_id = selectCategory.value;
        const { Name, Color, Model, Make, Reg } = data;
        console.log(selectCategory.value);
        const reqData = JSON.stringify({ name: Name, color: Color, model: Model, make: Make, reg: Reg, category_id });
        const customConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND}/cars/add/`, reqData, customConfig);
            console.log(res.data);
        } catch (error) {
            console.log(error)
        }
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {
                ['Name', 'Color', 'Model', 'Make', 'Reg'].map((name) => (
                    <TextField
                        key={name}
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label={name}
                        name="name"
                        autoFocus
                        error={errors[name] ? true : false}
                        {...register(name, {
                            validate: (value) => value.length > 2
                        })}
                    />
                ))
            }
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={selectCategory.disbaleBtn}
            >
                Add Car
            </Button>
        </form>
    );
}
export default AddCarForm;