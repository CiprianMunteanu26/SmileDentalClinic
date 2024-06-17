import AuthService from '../../services/auth.service';
import UserService from '../../services/users.service';
import { useState, useEffect } from 'react';
import '../css/pages/UserProfile.css';
import '../css/components/Loading.css'
import Chat from '../../components/profile/Chat'
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../../components/profile/Navigation';
import ToastError from '../../components/ToastError';
import ToastSucces from '../../components/ToastSucces';
function UserProfile()
{
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState("");
    const [logedUser, setLogedUser] = useState("");
    const [loginDetails, setLoginDetails] = useState("");
    const location = useLocation();
    const [showEdit, setShowEdit] = useState(false);
    const [error, setError] = useState("");
    const [succes, setSucces] = useState("");
    useEffect(() =>
    {
        handleLoadingData();
    }, [location.pathname]);


    const getCurrentUserId = async () =>
    {
        const location = window.location.pathname;
        const userId = location.split('profile/')[1];
        return userId;
    }

    const handlePorfileUser = async () =>
    {
        try
        {
            const userId = await getCurrentUserId();
            const usr = await UserService.getById(userId);
            setUser(usr);
        } catch (error)
        {
            setUser("-NO NAME-");
        }
    }

    const handleGetCurrentUser = async () =>
    {
        try
        {
            const usr = await UserService.getCurrentUser();
            setLogedUser(usr);
        } catch (error)
        {
            setLogedUser("");
        }
    }


    const handleLoginDetails = async () =>
    {
        const login = await AuthService.getLoginDetails();
        if (login) setLoginDetails(login);
    }


    const handleLoadingData = async () =>
    {
        await handlePorfileUser();
        await handleGetCurrentUser();
        await handleLoginDetails();
        setIsLoading(false);

    }

    const handleShowEdit = () =>
    {
        setShowEdit(!showEdit);
    };

    const handleSendFriendReq = async (loggedUserId, otherUserId) =>
    {
        try
        {
            await UserService.postUserFriend(loggedUserId, otherUserId);
            setSucces("Ai adaugat un nou prieten");
        }
        catch (error)
        {
            setError('Ești deja prieten cu acest utilizator')
        }
    }

    const resetError = () =>
    {
        setError("");
    }

    const resetSucces = () =>
    {
        setSucces("");
    }
    console.log(logedUser)
    return (
        <>
            {
                isLoading ? <div className='loading'><img src={require('../imgs/users_listview/loading.gif')} /> </div> :
                    (
                        <>
                            {error && <ToastError message={error} duration={4000} resetError={resetError} />}
                            {succes && <ToastSucces message={succes} duration={4000} resetError={resetSucces} />}
                            {logedUser.id != user.id && <Chat message={{ userId: user.id, logedUserId: logedUser.id, logedUserFname: logedUser.fname, logedUserLname: logedUser.lname, userFname: user.fname, userLname: user.lnmae }} />}
                            <div className="user-profile">
                                <div className='user-settings-holder'>
                                    <div className='user-settings'>
                                        <Link to={`/edit_profile/${logedUser.id}`}>{logedUser.id == user.id && <img onClick={handleShowEdit} src={require('../../static/imgs/users_profile/settings.png')} />}</Link>
                                    </div>
                                </div>
                                <div className="user-profile-img">
                                    <img src={user.profileImage ? require(`../${user.profileImage.split('static/')[1]}`) : require('../../static/imgs/users_profile/no-profile.png')} alt="UserProfileImage" />
                                </div>
                                <div className="user-profile-name">
                                    <div className='inline'>
                                        <div className='user-activ'></div>
                                        <h3>{user.fname} {user.lnmae}</h3>
                                        {
                                            logedUser.id != user.id && (
                                                <>
                                                    <div className='vertical-line'></div>
                                                    <img onClick={() => handleSendFriendReq(user.id, logedUser.id)} src={require('../../static/imgs/users_profile/add.png')} />
                                                    <img src={require('../../static/imgs/users_profile/message.png')} />
                                                </>
                                            )
                                        }
                                    </div>
                                    <div className='user-active-role'>- {user.role} -</div>
                                    <>Ultima autentificare: {loginDetails.LastLogin.split('+')[0]}</>
                                </div>
                            </div>

                            {user && <Navigation message={{ user: user, logedUser: logedUser }} />}

                        </>
                    )
            }
        </>
    )
}
export default UserProfile;

