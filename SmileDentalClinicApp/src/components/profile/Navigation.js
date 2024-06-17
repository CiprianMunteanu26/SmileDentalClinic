import { useState } from "react";
import '../../static/css/components/ProfileNav.css'
import About from "./About";
import Appointments from "./Appointments";
import Friends from "./Friends";
function Navigation(props)
{
    const [activeTab, setActiveTab] = useState('pr-about');

    const handleTabClick = (tab) =>
    {
        setActiveTab(tab);
    };
    return (
        <>
            <ul className='user-profile-navbar'>
                <li className={`tab ${activeTab === 'pr-about' ? 'user-profile-active-tab' : ''}`} onClick={() => handleTabClick('pr-about')}>Despre</li>
                {props.message.user.role === "Doctor" &&
                    (
                        <>
                            <li className={`tab ${activeTab === 'pr-appointment' ? 'user-profile-active-tab' : ''}`} onClick={() => handleTabClick('pr-appointment')}>Cursuri</li>
                            <li className={`tab ${activeTab === 'pr-publi' ? 'user-profile-active-tab' : ''}`} onClick={() => handleTabClick('pr-publi')}>Publicatii</li>
                            <li className={`tab ${activeTab === 'pr-research' ? 'user-profile-active-tab' : ''}`} onClick={() => handleTabClick('pr-research')}>Cercetare</li>
                        </>
                    )
                }
                <li className={`tab ${activeTab === 'pr-friends' ? 'user-profile-active-tab' : ''}`} onClick={() => handleTabClick('pr-friends')}>Prieteni</li>
            </ul>

            <div className='user-profile-content'>
                {activeTab === 'pr-about' && <About message={props.message} />}
                {activeTab === 'pr-appointment' && <Appointments message={props.message} />}
                {activeTab === 'pr-friends' && <Friends message={props.message} />}
            </div>
        </>
    );
}
export default Navigation;