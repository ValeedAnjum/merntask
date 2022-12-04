import React from 'react'
import AddCategory from './AddCategory'
import CategoriesContextProvider from './context/CategoryContext'
import ListOfCategories from './ListOfCategories'

const Category = () => {

    return (
        <CategoriesContextProvider>
            <AddCategory />
            <ListOfCategories />
        </CategoriesContextProvider>
    )
}

export default Category