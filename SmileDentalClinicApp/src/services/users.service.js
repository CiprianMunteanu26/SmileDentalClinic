import axios from "axios";
import jwtDecode from "jwt-decode";
const API_URL = "https://localhost:5001/";


const getCurrentUser = async () =>
{
    try
    {
        const token = localStorage.getItem("user");
        const tokenWithoutQuotes = token.replace(/"/g, '');
        const tokenDec = jwtDecode(token);
        const userId = tokenDec.UserId;
        if (token)
        {
            const response = await axios.get(API_URL + "users/" + userId, {
                headers: {
                    Authorization: `Bearer ${tokenWithoutQuotes}`,
                },
            });
            return response.data;
        }
    }
    catch (error)
    {
        // console.log(error);
    };
}



const getByRole = async (role) =>
{
    try
    {
        if (!role) return null;
        const token = localStorage.getItem("user");
        if (token)
        {
            const tokenWithoutQuotes = token.replace(/"/g, '');
            const response = await axios.get(API_URL + "users/entity/" + role, {
                headers: {
                    Authorization: `Bearer ${tokenWithoutQuotes}`,
                },
            });
            return response.data;
        }
    }
    catch (error)
    {

    }
}

const getByDataAndRole = async (data, role) =>
{
    console.log(data, role);
    try
    {
        if (!role) return null;
        const token = localStorage.getItem("user");
        if (token)
        {
            const tokenWithoutQuotes = token.replace(/"/g, '');
            const response = await axios.get(API_URL + "users/entity/" + data + "/" + role, {
                headers: {
                    Authorization: `Bearer ${tokenWithoutQuotes}`,
                },
            });
            return response.data;
        }
    }
    catch (error)
    {
        return Promise.reject(error);
    }
}

const getById = async (userId) =>
{
    try
    {
        if (!userId) return null;
        const token = localStorage.getItem("user");
        const tokenWithoutQuotes = token.replace(/"/g, '');
        if (token)
        {
            const response = await axios.get(API_URL + "users/" + userId, {
                headers: {
                    Authorization: `Bearer ${tokenWithoutQuotes}`,
                },
            });
            return response.data;
        }
        return null;
    }
    catch (error)
    {
        return error;
    };
}

const getByListId = async (list) =>
{
    try
    {

        const token = localStorage.getItem("user");
        const tokenWithoutQuotes = token.replace(/"/g, '');
        const tokenDec = jwtDecode(token);
        const userId = tokenDec.UserId;

        const userPromises = list.map(async (item) =>
        {
            let user;
            if (item.userId !== userId)
            {
                user = await axios.get(API_URL + "users/entitybyid/" + item.userId, {
                    headers: {
                        Authorization: `Bearer ${tokenWithoutQuotes}`,
                    },
                });
            } else
            {
                user = await axios.get(API_URL + "users/entitybyid/" + item.otherId, {
                    headers: {
                        Authorization: `Bearer ${tokenWithoutQuotes}`,
                    },
                });
            }
            if (user)
                return user.data;
        });

        const users = await Promise.all(userPromises);
        console.log(users);
        return users;

    } catch (error)
    {
        return Promise.reject(error);
    }
};

const getUserFriends = async (userId) =>
{
    try
    {
        const token = localStorage.getItem("user");
        const tokenWithoutQuotes = token.replace(/"/g, '');
        if (token)
        {
            const response = await axios.get(API_URL + "friends/get/" + userId, {
                headers: {
                    Authorization: `Bearer ${tokenWithoutQuotes}`,
                },
            });
            return response.data;
        }
    }
    catch (error)
    {
        return Promise.reject(error);
    };
}

const postUserFriend = async (userId, logedUserId) =>
{
    try
    {
        const token = localStorage.getItem("user");
        const tokenWithoutQuotes = token.replace(/"/g, '');
        await axios.post(API_URL + "friends/", { UserId: logedUserId, OtherId: userId }, {
            headers: {
                Authorization: `Bearer ${tokenWithoutQuotes}`,
            },
        });
    }
    catch (error)
    {
        return Promise.reject(error);
    };
}

const updateUser = async (userId, fname, lname, password, phoneNr, func, cabinet, profileImage, details) =>
{
    console.log(userId);
    console.log(fname);
    console.log(lname);
    console.log(password);
    console.log(phoneNr);
    console.log(func);
    console.log(cabinet);
    console.log(profileImage);
    console.log(details);
    try
    {
        const token = localStorage.getItem("user");
        const tokenWithoutQuotes = token.replace(/"/g, '');
        await axios.put(API_URL + "users/" + userId, { UserId: userId, Fname: fname, Lname: lname, Password: password, PhoneNumber: phoneNr, Function: func, Cabinet: cabinet, profileImage: profileImage, Details: details }, {
            headers: {
                Authorization: `Bearer ${tokenWithoutQuotes}`,
            },
        });
    }
    catch (error)
    {
        return Promise.reject(error);
    }
}



const UserService = {
    getCurrentUser,
    getByRole,
    getById,
    getUserFriends,
    postUserFriend,
    getByListId,
    updateUser,
    getByDataAndRole,
};

export default UserService;