import '../../static/css/components/EditProfile.css'
import { useState, useEffect } from 'react';
import UserService from '../../services/academic.service';
import ToastError from '../../components/ToastError';
import ToastSucces from '../../components/ToastSucces';
import AcademicService from '../../services/academic.service';
import { useParams } from "react-router-dom";
function EditAppointment()
{
    const { appointmentID } = useParams();
    const [error, setError] = useState("");
    const [succes, setSucces] = useState("");
    const [startTime, setstartTime] = useState("");
    const [endTime, setendTime] = useState("");
    const [status, setStatus] = useState("");
    const [appointment, setAppointment] = useState("");
    useEffect(() =>
    {
        console.log(appointmentID)
        handleGetAppointment();
    }, []);


    const handleUpdateAppointment = async (e) =>
    {
        e.preventDefault();

            try
            {
                
                await AcademicService.updateAppointment(appointmentID, startTime, endTime, status);
                setSucces("Programare actualizata!");
            }
            catch (error)
            {
                console.log(error)
            }
        
    }

    const handleGetAppointment = async (e) =>
        {
    
                try
                {
                    const response = await AcademicService.getAppointmentByAppointmentUid(appointmentID);
                    setAppointment(response);
                }
                catch (error)
                {
                    console.log(error)
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

    return (

        <>
            {appointment && (
                <>
                    {error && <ToastError message={error} duration={4000} resetError={resetError} />}
                    {succes && <ToastSucces message={succes} duration={4000} resetError={resetSucces} />}
                    <form className="row g-3 edit-form" onSubmit={handleUpdateAppointment}>
                        <div className="col-12">
                            <label htmlFor="fnmae" className="form-label">Prenume</label>
                            <input type="datetime-local" className="form-control" id="startTime" placeholder={`${appointment.startTime}`} value={startTime} onChange={(e) => setstartTime(e.target.value)} />
                        </div>
                        <div className="col-12">
                            <label htmlFor="lname" className="form-label">Nume</label>
                            <input type="datetime-local" className="form-control" id="endTime" placeholder={`${appointment.endTime}`} value={endTime} onChange={(e) => setendTime(e.target.value)} />
                        </div>
                        <div className="col-12">
                            <label htmlFor="email" className="form-label">Parola</label>
                            <input type="text" className="form-control" id="status" placeholder={`${appointment.status}`} value={status} onChange={(e) => setStatus(e.target.value)}/>
                        </div>
                        


                        <div className="col-12">
                            <button type="submit" className="btn btn-primary">Actualizeaza</button>
                        </div>
                    </form>
                </>
            )

            }

        </>

    );
}
export default EditAppointment;