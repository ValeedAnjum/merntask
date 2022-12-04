import axios from "axios";
import { setAuthToken } from "../util/setAuthToken";

export const loadUser = () => async (dispatch) => {
    try {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
            const res = await axios.get(`${process.env.REACT_APP_BACKEND}/auth/user`);
            console.log(res.data)
            dispatch({ type: "SET_PROFILE", payload: res.data });
        }
    } catch (error) {
        console.log(error);
    }
};


export const signIn =
    ({ email, password }) =>
        async (dispatch) => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const body = JSON.stringify({ email, password });
            try {
                // const res = await axios.post(`/auth/signin`, body, config);
                const res = await axios.post(`${process.env.REACT_APP_BACKEND}/auth/signin`, body, config);
                dispatch({ type: "LOGIN_SUCCESS", payload: res.data.token });
                dispatch(loadUser());
                return true;
            } catch (err) {
                return false;
            }
        };

export const register = (name, email, password) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const body = JSON.stringify({ name, email, password });
    try {
        // const res = await axios.post("/auth/register", body, config);
        const res = await axios.post(`${process.env.REACT_APP_BACKEND}/auth/register`, body, config);
        dispatch({ type: "REGISTRATION_SUCCESS", payload: res.data.token });
        dispatch(loadUser());
    } catch (error) {
        console.log(error.message);
    }
};

