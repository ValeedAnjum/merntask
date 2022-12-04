import React from "react";
import { Button, TextField, Typography, } from '@mui/material'
import { useForm } from "react-hook-form";

const AddCarForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const onSubmit = (data) => {
        console.log(data);
    }; // your form submit function which will invoke after successful validation


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
            >
                Add Car
            </Button>
        </form>
    );
}
export default AddCarForm;