import React, { createContext, useState, useEffect } from "react";
import axios from 'axios'
export const CarContext = createContext();

const CarContextProvider = (props) => {
    const [selectCategory, setSelectCategory] = useState({
        list: [],
        value: ""
    });
    const [carsData, setCarsData] = useState({
        list: [],
        total: 0,
        page: 1,
        openUpdateModel: false,
        updateId: ""
    })
    // useEffect(() => {
    //     fetchCategories();
    // }, [carsData.page]);
    useEffect(() => {
        const fetchListOfCars = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BACKEND}/category/list`);
                const modifiedForDropdown = res.data.map(({ name, _id }) => ({ value: _id, label: name }));
                setSelectCategory(pre => ({ ...pre, list: modifiedForDropdown }));
            } catch (error) {
                console.log(error)
            }
        }
        fetchListOfCars();
    }, [])
    const fetchCars = async (id, page) => {
        try {
            setCarsData((pre) => ({ ...pre, loading: true, list: [] }));

            const res = await axios.get(`${process.env.REACT_APP_BACKEND}/cars/listofcars/${id}/${page}`);
            setCarsData((pre) => ({ ...pre, list: res.data.cars, total: res.data.total, loading: false }));
            console.log(res.data)
        } catch (error) {
            setCarsData((pre) => ({ ...pre, loading: false }));
        }
    }
    const handlePageChange = (event, value) => {
        setCarsData((pre) => ({ ...pre, page: value }));
        fetchCars(selectCategory.value, value)
    };
    const delHand = async (id) => {
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND}/cars/delete/${id}`);
            fetchCars(selectCategory.value, 1)
        } catch (error) {
            console.log(error)
        }
    };
    const updateHan = async (id) => {
        setCarsData((pre) => ({ ...pre, openUpdateModel: true, updateId: id }));
    }


    const handleChange = (event) => {
        setSelectCategory(pre => ({ ...pre, value: event.target.value }));
        fetchCars(event.target.value);
    };
    return (
        <CarContext.Provider
            value={{
                selectCategory,
                handleChange,
                carsData,
                updateHan, delHand, handlePageChange
            }}
        >
            {props.children}
        </CarContext.Provider>
    );
};

export default CarContextProvider;
