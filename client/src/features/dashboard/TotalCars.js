import React, { useEffect, useState } from 'react'
import axios from 'axios'
const TotalCars = () => {
    const [total, setTotal] = useState(0);
    useEffect(() => {
        const getTotalCars = async () => {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND}/cars/totalcars`);
            setTotal(res.data);
        }
        getTotalCars();
    }, [])
    return (
        <div>TotalCars {total}</div>
    )
}

export default TotalCars