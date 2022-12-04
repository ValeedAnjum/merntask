import React, { createContext, useState, useEffect } from "react";
import axios from 'axios'

export const CategoriesContext = createContext();

const CategoriesContextProvider = (props) => {
    const [categoriesData, setCategoriesData] = useState({
        list: [],
        total: 0,
        page: 1,
        openUpdateModel: false,
        updateId: ""
    })
    useEffect(() => {
        fetchCategories();
    }, [categoriesData.page]);

    const fetchCategories = async () => {
        try {
            setCategoriesData((pre) => ({ ...pre, loading: true, list: [] }));
            const res = await axios.get(`${process.env.REACT_APP_BACKEND}/category/categories/${categoriesData.page}`);
            setCategoriesData((pre) => ({ ...pre, list: res.data.categories, total: res.data.total, loading: false }));
            console.log(res.data)
        } catch (error) {
            setCategoriesData((pre) => ({ ...pre, loading: false }));
        }
    }
    const handleChange = (event, value) => {
        setCategoriesData((pre) => ({ ...pre, page: value }));
    };
    const delHand = async (id) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND}/category/delete/${id}`);
            console.log(res.data)
            fetchCategories();
        } catch (error) {
            console.log(error)
        }
    };
    const updateHan = async (id) => {
        setCategoriesData((pre) => ({ ...pre, openUpdateModel: true, updateId: id }));
    }
    return (
        <CategoriesContext.Provider
            value={{
                categoriesData,
                updateHan,
                handleChange,
                delHand,
                fetchCategories,
                setCategoriesData
            }}
        >
            {props.children}
        </CategoriesContext.Provider>
    );
};

export default CategoriesContextProvider;
