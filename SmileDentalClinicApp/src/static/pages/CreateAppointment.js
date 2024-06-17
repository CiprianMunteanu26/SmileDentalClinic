import { useState, useRef, useEffect } from 'react';
import '../css/pages/createAppointment.css'
import AcademicService from '../../services/academic.service';
import UserService from '../../services/users.service';
import { Link } from 'react-router-dom';
import jwtDecode from "jwt-decode";

function CreateAppointment()
{
    const [starttime, setStartTime] = useState("");
    const [endtime, setEndTime] = useState("");
    const [type, setType] = useState("");
    const [doctorID, setdoctorID] = useState("");
    const [pacientID, setpacientID] = useState("");
    const [doctors, setDoctors] = useState("");
    const [status, setStatus] = useState("");

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
            setStatus("Confirmata");
            await AcademicService.setAppointment(pacientID, starttime, endtime, type, doctorID, status);
        }
        catch (err)
        {
            console.log(err);
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

    return (
        <>
                    <section className="CreateAppointment">
            <div className="section-name">Programeaza-te</div>
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
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

                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="endtime">Ora sfarsit</label>
                                <input
                                    type="datetime-local"
                                    id="endtime"
                                    className="form-control form-control-lg"
                                    placeholder="Alege ora la care doresti sa se termine programarea"
                                    value={endtime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    required
                                    onInvalid={(e) => e.target.setCustomValidity('Introduceți o adresă de email validă')}
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
                </div>
            </div>
        </section>

        </>
    );

}
export default CreateAppointment;