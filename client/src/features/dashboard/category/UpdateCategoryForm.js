import React, { useContext } from "react";
import { Button, TextField, } from '@mui/material'
import { useForm } from "react-hook-form";
import axios from 'axios'
import { CategoriesContext } from './context/CategoryContext';
const UpdateForm = ({ id }) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const { fetchCategories, setCategoriesData } = useContext(CategoriesContext)

    const onSubmit = async (data) => {
        try {
            const reqData = JSON.stringify({ name: data.name });
            const customConfig = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            await axios.post(`${process.env.REACT_APP_BACKEND}/category/update/${id}`, reqData, customConfig);
            fetchCategories();
            setCategoriesData((pre) => ({ ...pre, openUpdateModel: false, updateId: "" }));
        } catch (error) {
            console.log(error.response.data.errors)
        }
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                error={errors.name ? true : false}
                {...register("name", {
                    validate: (value) => value.length > 0
                })}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Update
            </Button>



        </form>
    );
}
export default UpdateForm;