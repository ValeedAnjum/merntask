import React from 'react'
import AddCarForm from './AddCarForm'
import AddCarContextProvider from './context/AddCarContext'
import SelectCategory from './SelectCategory';

const AddCar = () => {
    return (
        <AddCarContextProvider>
            <SelectCategory />
            <AddCarForm />
        </AddCarContextProvider>
    )
}

export default AddCar