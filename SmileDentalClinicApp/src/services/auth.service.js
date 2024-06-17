import axios from "axios";
import jwtDecode from "jwt-decode";
const API_URL = "https://localhost:5010/auth";

const login = async (email, password) =>
{
    try
    {
        const response = await axios.post(API_URL + "/login", { email, password });
        if (response.data) { localStorage.setItem("user", JSON.stringify(response.data)); localStorage.setItem("loginSucces", "false"); }
    }
    catch (error)
    {
        return Promise.reject(error);
    }
}

const register = async (fname, lname, email, password, role) =>
{
    try
    {
        const response = await axios.post(API_URL + "/register", { fname, lname, email, password, role });
        if (response) return response.data;
    }
    catch (error)
    {
        return error;
    }
};

const getLoginDetails = async () =>
{
    const token = localStorage.getItem("user");
    if (token)
    {
        const tokenDec = jwtDecode(token);
        return tokenDec;
    }
    return null;
}

const logout = () =>
{
    localStorage.removeItem("user");
    window.location.replace("/")
}

const hasAuthExpired = () =>
{
    const token = localStorage.getItem("user");
    try
    {
        const decoded = jwtDecode(token);
        if (decoded.exp < Date.now() / 1000)
        {
            return true;
        }
    } catch (error)
    {

        return true;
    }
    return false;
}

const AuthService = {
    login,
    register,
    getLoginDetails,
    logout,
    hasAuthExpired
};

export default AuthService;