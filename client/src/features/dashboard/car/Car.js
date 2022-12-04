import React from 'react'
import CarContextProvider from './context/CarContext';
import SelectCategory from './SelectCategory';
import ListOfCars from './ListOfCars';

const Car = () => {
    return (
        <CarContextProvider>
            <SelectCategory />
            <ListOfCars />
        </CarContextProvider>
    )
}

export default Car