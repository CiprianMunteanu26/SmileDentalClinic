import '../../static/css/pages/editAppointment.css'
import { useState, useEffect } from 'react';
import ToastError from '../../components/ToastError';
import ToastSucces from '../../components/ToastSucces';
import SchedulerService from '../../services/scheduler.service';
import { useParams } from "react-router-dom";
function EditAppointment()
{
    const [error, setError] = useState("");
    const [succes, setSucces] = useState("");
    const [startTime, setstartTime] = useState("");
    const [endTime, setendTime] = useState("");
    const [status, setStatus] = useState("");
    const [appointment, setAppointment] = useState("");
    const [appointmentID, setappoinmentID] = useState("");
    useEffect(() =>
    {
        console.log(appointmentID)
        
        handleGetAppointment();
    }, []);

    const getCurrentappointmentid = async () =>
        {
            const location = window.location.pathname;
            const appointmentid = location.split('EditAppointment/')[1];
            return appointmentid;
        }
    const handleUpdateAppointment = async (e) =>
    {
        e.preventDefault();

            try
            {
                
                await SchedulerService.updateAppointment(appointmentID, startTime, endTime, status);
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
                    console.log(appointmentID);
                    const appID = await getCurrentappointmentid();
                    const response = await SchedulerService.getAppointmentByAppointmentUid(appID);
                    setappoinmentID(appID);
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

        <><section className="EditAppointment">
            {appointment && (
                <>
                    {error && <ToastError message={error} duration={4000} resetError={resetError} />}
                    {succes && <ToastSucces message={succes} duration={4000} resetError={resetSucces} />}
                    <form className="row g-3 edit-form" onSubmit={handleUpdateAppointment}>
                        <div className="col-12">
                            <label htmlFor="starttime" className="form-label">Ora incepere programare</label>
                            <input type="datetime-local" className="form-control" id="startTime" placeholder={`${appointment.startTime}`} value={startTime} onChange={(e) => setstartTime(e.target.value)} />
                        </div>
                        <div className="col-12">
                            <label htmlFor="endtime" className="form-label">Ora sfarsit programare</label>
                            <input type="datetime-local" className="form-control" id="endTime" placeholder={`${appointment.endTime}`} value={endTime} onChange={(e) => setendTime(e.target.value)} />
                        </div>
                        <div className="col-12">
                            <label htmlFor="status" className="form-label">Status</label>
                            <select className="form-select" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="Programat">Programat</option>
                                <option value="Confirmat">Confirmat</option>
                                <option value="Anulat">Anulat</option>
                                <option value="Finalizat">Finalizat</option>
                                <option value="Nefinalizat">Nefinalizat</option>
                            </select>
                        </div>


                        <div className="col-12">
                            <button type="submit" className="btn btn-primary">Actualizeaza</button>
                        </div>
                    </form>
                </>
            )

            }
            </section>
        </>

    );
}
export default EditAppointment;
