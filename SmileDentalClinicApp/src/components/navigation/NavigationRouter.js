
import { Route, Routes, Navigate } from 'react-router-dom';
import Navigation from './Navigation';
import { Home } from '../../static/pages/Home';
import Appointments from '../../static/pages/Appointments';
import Doctors from '../../static/pages/Doctors';
import Services from '../../static/pages/Services';
import Login from '../../static/pages/Login';
import CreateAppointment from '../../static/pages/CreateAppointment';
import EditAppointment from '../../static/pages/EditAppointment';
import Register from '../../static/pages/Register';
import About from '../../static/pages/About';
import Contact from '../../static/pages/Contact';
import UserProfile from '../../static/pages/UserProfile';
import Messenger from '../../static/pages/Messenger';
import NotFound from '../../static/pages/NotFound';
import UserService from '../../services/users.service';
import { useState, useEffect } from 'react';
import Loading from '../Loading';
import EditProfile from '../../static/pages/EditProfile';
function NavigationRouter(){
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState("");
    useEffect(() =>
    {
        handleGetCurrentUser();
    }, []);
    const handleGetCurrentUser = async () =>
    {
        try
        {
            const usr = await UserService.getCurrentUser();
            setUser(usr);
            setIsLoading(false);
        } catch (error)
        {
            //  console.log(error);
        }
    }
    return (
        <>
            <Navigation />
            <Routes>
                {
                    isLoading ? <Route path='/loading' element={<Loading />} /> : (
                        <>
                            {user && (<>
                                <Route path='/' element={<Home />} />
                                <Route path='/home' element={<Home />} />
                                <Route path='/doctors' element={<Doctors />} />
                                <Route path='/appointments' element={<Appointments />} />
                                <Route path='/services' element={<Services />} />
                                <Route path='/about' element={<About />} />
                                <Route path='/contact' element={<Contact />} />
                                <Route path='/CreateAppointment' element={<CreateAppointment />} />
                                <Route path='/edit_profile/:id' element={<EditProfile />} />
                                <Route path='/profile/:id' element={<UserProfile />} />
                                <Route path='/messages' element={<Messenger />} />
                                <Route path='/user_edit' element={<Contact />} />
                                <Route path='/EditAppointment/:appointmentID' element={<EditAppointment />} />
                                <Route path="*" element={<NotFound />} />
                            </>)}
                            <Route path='/' element={<Login />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/register' element={<Register />} />
                            <Route path="*" element={<Navigate to="/login" />} />
                        </>)}
            </Routes>
        </>
    )
}

export default NavigationRouter;