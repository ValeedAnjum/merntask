const initialState = {
    authenticated: false,
    userProfile: {
        name: null,
    },
};

export const authReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case "LOGIN_SUCCESS":
        case "REGISTRATION_SUCCESS":
        case "PASSWORD_RESET_SUCCESS":
            localStorage.setItem("token", payload);
            return { ...state };
        // profile data
        case "SET_PROFILE":
            return { ...state, authenticated: true, userProfile: payload };
        case "CLEAR_PROFILE":
            localStorage.removeItem("token");
            return { ...state, authenticated: false, userProfile: null };
        default:
            return state;
    }
};
