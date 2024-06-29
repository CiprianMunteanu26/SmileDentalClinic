import '../../static/css/components/Appointments.css'
import { useState, useEffect } from 'react';
import SchedulerService from '../../services/scheduler.service'
import ToastError from '../ToastError';
import ToastSucces from '../ToastSucces';
function Appointments(props)
{

    const [formActive, setFormActive] = useState(false);
    const [appointments, setAppointments] = useState("");
    const [userAppointments, setUserAppointments] = useState("");
    const [selectedAppointment, setSelectedAppointment] = useState('');
    const [currentProfileId, setCurrentProfileId] = useState("");
    const [error, setError] = useState("");
    const [succes, setSucces] = useState("");
    useEffect(() =>
    {
        getCurrentUserId();
        handleGetAllAppointments();
        handleGetAppointmentsByUid();
    }, [userAppointments]);

    const handleFormActive = () =>
    {
        setFormActive(!formActive)
    }

    const handleCloseForm = () =>
    {
        setFormActive(false)
    }

    const handleAppointmentSelection = (event) =>
    {
        setSelectedAppointment(event.target.value);
    };

    const getCurrentUserId = async () =>
    {
        const location = window.location.pathname;
        const userId = location.split('profile/')[1];
        setCurrentProfileId(userId);
    }

    const handleGetAllAppointments = async () =>
    {
        try
        {
            const response = await SchedulerService.getAllAppointments();
            setAppointments(response);
        }
        catch {
            setError("Nu s-au putut prelua cursurile");
        }
    }

    const handleGetAppointmentsByUid = async () =>
    {
        try
        {
            const response = await SchedulerService.getAppointmentsByUid(props.message.user.id);
            setUserAppointments(response);
        }
        catch {

        }
    }

    const handleSetAppointment = async () =>
    {
        try
        {
            const response = await SchedulerService.setAppointment(props.message.logedUser.id, selectedAppointment);
            setSucces("Cursul a fost asociat cu succes. Reîncarcă pagina.");
        }
        catch {
            setError("Cursul nu a putut fi asociat!");
        }
    }

    const resetError = () =>
    {
        setError("");
    }

    const resetSucces = () =>
    {
        setError("");
    }

    return (
        <>
            {error && <ToastError message={error} duration={4000} resetError={resetError} />}
            {succes && <ToastSucces message={succes} duration={4000} resetError={resetSucces} />}
            {formActive && <>
                <div className="form-holder">
                    <div className='form-holder-info'>Alege un curs din lista de mai jos</div>
                    <div className='form-holder-close' onClick={handleCloseForm}><img src={require('../../static/imgs/users_profile/close.png')} /></div>
                    <select className="form-select" aria-label="Default select example" value={selectedAppointment} onChange={handleAppointmentSelection}>
                        {appointments.map((appointment) => (
                            <option key={appointment.id} value={appointment.id}>{appointment.name}</option>
                        ))}
                    </select>
                    <div className='add-new-appointment' onClick={() => { handleSetAppointment(); handleGetAppointmentsByUid(); handleCloseForm(); }}>Adaugă</div>
                </div>
            </>
            }
            {
                props.message ? (
                    <div className="user-details">
                        {props.message.user.id == props.message.logedUser.id &&
                            <div className='btn-holder'>
                                <div className="add-appointment-btn" onClick={handleFormActive}>
                                    <img src={require('../../static/imgs/users_profile/add-c.png')} />
                                    Adaugă un curs
                                </div>
                            </div>
                        }
                        {userAppointments && userAppointments.map((appointment) => (
                            <div className="user-details-item">
                                <div>{appointment.name}</div>
                            </div>
                        ))}
                    </div>
                ) :
                    (
                        <div className="user-details">
                            <h1>Nu exista cursuri</h1>
                        </div>
                    )
            }
        </>
    );
}
export default Appointments;