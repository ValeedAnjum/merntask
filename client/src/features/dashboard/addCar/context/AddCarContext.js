import React, { createContext, useState, useEffect } from "react";
import axios from 'axios'
export const AddCarContext = createContext();

const AddCarContextProvider = (props) => {
    const [selectCategory, setSelectCategory] = useState({
        list: [],
        value: "",
        disbaleBtn: true
    });
    useEffect(() => {
        const fetchListOfCars = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BACKEND}/category/list`);
                const modifiedForDropdown = res.data.map(({ name, _id }) => ({ value: _id, label: name }));
                setSelectCategory(pre => ({ ...pre, list: modifiedForDropdown }));
                console.log(modifiedForDropdown)
            } catch (error) {
                console.log(error)
            }
        }
        fetchListOfCars();
    }, [])


    const handleChange = (event) => {
        setSelectCategory(pre => ({ ...pre, value: event.target.value, disbaleBtn: false }));

    };
    return (
        <AddCarContext.Provider
            value={{
                selectCategory,
                handleChange,
            }}
        >
            {props.children}
        </AddCarContext.Provider>
    );
};

export default AddCarContextProvider;
