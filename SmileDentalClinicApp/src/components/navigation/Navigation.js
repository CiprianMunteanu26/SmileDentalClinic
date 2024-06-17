import '../../static/css/components/Navigation.css'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserService from '../../services/users.service';
import AuthService from '../../services/auth.service';
function Navigation()
{
    const [faBarsClicked, setFaBarsClicked] = useState(false);
    const [activeTab, setActiveTab] = useState('home');
    const [profileClicked, setProfileClicked] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [user, setUser] = useState("");
    const [dayTime, setDayTime] = useState("")

    useEffect(() =>
    {
        handleGetCurrentUser();
        setDayTime({ dayTime: handleDayTime() });
    }, []);

    useEffect(() =>
    {
        const intervalId = setInterval(() =>
        {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const handleFaBarsClick = () =>
    {
        setFaBarsClicked({ faBarsClicked: !faBarsClicked.faBarsClicked })
    }

    const handleProfileClick = () =>
    {
        setProfileClicked({ profileClicked: !profileClicked.profileClicked })
    }

    const handleDayTime = () =>
    {
        if (currentTime.getHours() >= 4 && currentTime.getHours() < 11)
            return "Buna dimineata";
        else if (currentTime.getHours() >= 11 && currentTime.getHours() < 18)
            return "Buna ziua";
        else
            return "Buna seara";
    }

    const handleTabClick = (tab) =>
    {
        setActiveTab(tab);
    };

    const handleGetCurrentUser = async () =>
    {
        try
        {
            const usr = await UserService.getCurrentUser();
            setUser(usr);
        } catch (error)
        {
            setUser("-NO NAME-");
        }
    }

    return (
        <>
            <ul className="navigation-bar">
                <div className="logo">
                    <img src={require('../../static/imgs/navigation/logo.png')} />
                </div>
                {user && (
                    <>
                        <i onClick={handleFaBarsClick} className={faBarsClicked.faBarsClicked ? "fas fa-times" : "fas fa-bars"}></i>
                        <div className={faBarsClicked.faBarsClicked ? "navigation-items-holder-active" : "navigation-items-holder"}>
                            <Link className={`tab ${activeTab === 'home' ? 'active-tab' : ''}`} onClick={() => handleTabClick('home')} to="/home">
                                <li>
                                    <div className="li-img-holder"><img src={require('../../static/imgs/navigation/home.png')} alt="home" /></div> Acasa
                                </li>
                            </Link>
                            <Link className={`tab ${activeTab === 'about' ? 'active-tab' : ''}`} onClick={() => handleTabClick('about')} to="/doctors">
                                <li>
                                    <div className="li-img-holder"><img src={require('../../static/imgs/navigation/doctor.png')} alt="home" /></div>Doctori
                                </li>
                            </Link>

                            <Link className={`tab ${activeTab === 'contact' ? 'active-tab' : ''}`} onClick={() => handleTabClick('contact')} to="/appointments">
                                <li>
                                    <div className="li-img-holder"><img src={require('../../static/imgs/navigation/appointments.png')} alt="home" /></div>Programari
                                </li>
                            </Link>
                            <Link className={`tab ${activeTab === 'servicii' ? 'active-tab' : ''}`} onClick={() => handleTabClick('servicii')} to="/services">
                                <li>
                                    <div className="li-img-holder"><img src={require('../../static/imgs/navigation/services.png')} alt="home" /></div>Servicii
                                </li>
                            </Link>
                            {
                                user.role === "Admin" && <Link className={`tab ${activeTab === 'dashboard' ? 'active-tab' : ''}`} onClick={() => handleTabClick('dashboard')} to="/dashboard">
                                    <li>
                                        <div className="li-img-holder"><img src={require('../../static/imgs/navigation/dashboard.png')} alt="home" /></div>Dashboard
                                    </li>
                                </Link>
                            }
                            <div className="profile-btns">
                                <div className="greetings">{dayTime.dayTime}, {user.fname} </div>
                                <div onClick={handleProfileClick} className="profile-btn">
                                    <img src={require('../../static/imgs/navigation/profile.png')} alt="profil" />
                                </div>
                                {
                                    localStorage.getItem("user") && (<div onClick={AuthService.logout} className="logout-btn">
                                        <img src={require('../../static/imgs/navigation/logout.png')} alt="logout" />
                                    </div>)
                                }

                                <ul className={profileClicked.profileClicked ? "profile-menu-active" : "profile-menu"}>
                                    <Link to={`/profile/${user.id}`}>
                                        <li onClick={handleProfileClick}><div className="li-img-holder">
                                            <img src={require('../../static/imgs/navigation/user_profile.png')} alt="home" /></div>Profil
                                        </li>
                                    </Link>
                                    <Link to="/messages">
                                        <li onClick={handleProfileClick}><div className="li-img-holder"><img src={require('../../static/imgs/navigation/message.png')} alt="home" /></div>Mesaje
                                        </li>
                                    </Link>
                                </ul>
                            </div>
                        </div>
                    </>
                )}
            </ul >
        </>
    );
}

export default Navigation;