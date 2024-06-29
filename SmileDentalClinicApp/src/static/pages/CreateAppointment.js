import { useState, useRef, useEffect } from 'react';
import '../css/pages/createAppointment.css'
import SchedulerService from '../../services/scheduler.service';
import UserService from '../../services/users.service';
import { Link } from 'react-router-dom';
import jwtDecode from "jwt-decode";
import ToastError from '../../components/ToastError';
import ToastSucces from '../../components/ToastSucces';

function CreateAppointment()
{
    const [starttime, setStartTime] = useState("");
    const [type, setType] = useState("");
    const [doctorID, setdoctorID] = useState("");
    const [pacientID, setpacientID] = useState("");
    const [doctors, setDoctors] = useState("");
    const status = "Programat";
    const [error, setError] = useState("");
    const [succes, setSucces] = useState("");
    useEffect(() =>
    {
        fetchPacientID();
        handleGetdoctors();
    }, []);

    const handleCreateAppointment = async (e) =>
    {
        e.preventDefault();
        
        try
        {
            const doctor = await UserService.getById(doctorID);
            const pacient = await UserService.getById(pacientID);

            const doctorName = `${doctor.lnmae}, ${doctor.fname}`;
            const pacientName = `${pacient.lnmae}, ${pacient.fname}`;
            await SchedulerService.setAppointment(pacientID, starttime, type, doctorID, status,doctorName, pacientName);
            setSucces("Programarea a fost creata cu succes!");
        }
        catch (err)
        {
            console.log(err);
            setError("Programarea nu poate fi creata in perioada selectata!");
        }
    }
    

    const fetchPacientID = async () => {
        const token = localStorage.getItem("user");
        const tokenDec = jwtDecode(token);
        const userId = tokenDec.UserId;
        setpacientID(userId);
      };

    const handleGetdoctors = async () =>
        {
            try
            {
                const response = await UserService.getByRole("doctor");
                if (response != null)
                {
                    setDoctors(response);
                }
            } catch (error)
            {
                console.error(error);
            }
        };
        const scheduleData = [
            { day: "Luni - Vineri", hours: "09:00 - 17:00" },
            { day: "Sâmbătă", hours: "Închis" },
            { day: "Duminică", hours: "Închis" },
        ];
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
        <div id="page-content">
                    <section className="CreateAppointment">
                    {error && <ToastError message={error} duration={4000} resetError={resetError} />}
                    {succes && <ToastSucces message={succes} duration={4000} resetError={resetSucces} />}
                <h2 className="section-name">Programează-te</h2>
                <div className="container-grid"> 
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form onSubmit={handleCreateAppointment}>
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="validationCustom02">Ora inceput</label>
                                <input
                                    type="datetime-local"
                                    id="validationCustom02"
                                    className="form-control form-control-lg"
                                    placeholder="Alege ora la care doresti sa te programezi"
                                    value={starttime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    required
                                    onInvalid={(e) => e.target.setCustomValidity('Introduceți numele dumneavoastră')}
                                    onInput={(e) => e.target.setCustomValidity('')}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="selectInput">Tipul programarii</label>
                                <select 
                                    className="form-control form-control-lg" 
                                    id="selectInput" 
                                    /*{value={empty} }*/
                                    onChange={(e) => setType(e.target.value)}
                                >
                                    <option value="Consultatie Stomatologica">Consultatie Stomatologica</option>
                                    <option value="Detartraj si Periaj Profesional">Detartraj si Periaj Profesional</option>
                                    <option value="Plomba Fotopolimerizabila">Plomba Fotopolimerizabila</option>
                                    <option value="Albire Dentara">Albire Dentara</option>
                                    <option value="Extractie Dentara">Extractie Dentara</option>
                                </select>
                            </div>

                            {doctors && (
                                <div className="form-group">
                                    <label className="form-label" htmlFor="selectDoctor">Alege doctorul:</label>
                                    <select 
                                    className="form-control form-control-lg" 
                                    id="selectDoctor" 
                                    onChange={(e) => setdoctorID(e.target.value)} // Pass the selected ID
                                    >
                                    {/* Default "Select a doctor" option */}
                                    <option value="">Selectati un doctor</option> 

                                    {/* Map over doctors to create options */}
                                    {doctors.map((doctor) => (
                                        <option key={doctor.id} value={doctor.id}> 
                                        {doctor.lnmae} {doctor.fname}  {/* Display Last Name, First Name */}
                                        </option>
                                    ))}
                                    </select>
                                </div>
                                )}
                           
                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="submit" className="btn btn-primary btn-lg">Creeaza programare</button>
                            </div>
                        </form>
                    </div>
                    <div className="clinic-schedule">
                        <h3>Orar Clinică</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Zi</th>
                                    <th>Ore</th>
                                </tr>
                            </thead>
                            <tbody>
                                {scheduleData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.day}</td>
                                        <td>{item.hours}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            {/* </div> */}
        </section>
        </div>
        </>
    );

}
export default CreateAppointment;
