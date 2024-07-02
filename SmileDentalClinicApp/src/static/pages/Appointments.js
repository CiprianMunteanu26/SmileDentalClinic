// import { useEffect, useState } from "react";
// import AcademicService from "../../services/academic.service";
// import { Link } from "react-router-dom";
// import SearchBar from "../../components/big/SearchBar";
// import UserService from '../../services/users.service';

// function Appointments()
// {
//     const [appointments, setAppointments] = useState("");
//     const [data, setData] = useState("");
//     const [logedUser, setLogedUser] = useState("");
//     useEffect(() =>
//     {
//         handleLoadingData();
//         handleGetAppointments();
//     }, []);

//     const handleGetCurrentUser = async () =>
//         {
//             try
//             {
//                 const usr = await UserService.getCurrentUser();
//                 console.log("User fetched:", usr); // Debug logging
//                 setLogedUser(usr);
//             } catch (error)
//             {
//                 setLogedUser("-NO NAME-");
//             }
//         }
//     const handleLoadingData = async () =>
//         {
//             await handleGetCurrentUser();
//         }
//     const handleGetAppointments = async () =>
//     {
//         try
//         {
//             const response = await AcademicService.getAppointmentsByUid(logedUser.id);
//             if (response != null)
//             {
//                 setAppointments(response);
//             }
//         } catch (error)
//         {
//             console.error(error);
//         }
//     };

//     const handleGetSearchedStud = async (dt) =>
//     {
//         try
//         {
//             if (!dt) handleGetAppointments();
//             const response = await AcademicService.GetByUserIDAsync(dt, "Pacient");
//             if (response != null)
//             {
//                 setAppointments(response);
//             }
//         }
//         catch (error)
//         {

//         }
//     }

//     const updateData = (newData) =>
//     {
//         setData(newData);
//     };

    

//     return (
//         <>
//             <div className="appointments-container">
//                 <SearchBar updateData={updateData} handleGetSearchedStud={handleGetSearchedStud} />
//                 {appointments && (<>
//                     <table className="table table-hover">
//                         <thead>
//                             <tr>
//                                 <th scope="col">Tip</th>
//                                 <th scope="col">Doctor</th>
//                                 <th scope="col">Pacient</th>
//                                 <th scope="col">Start</th>
//                                 <th scope="col">End </th>
//                                 <th scope="col">Status </th>
//                                 {logedUser.role === "pacient" && (
//                                 <td><Link to={`/CreateAppointment`}>Programeaza-te!</Link></td>
//                                 )
//                                 }
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {
//                                 appointments.map((appointment) =>
//                                 {
//                                     const patient = UserService.getById(appointment.UserId);
//                                     const doctor = UserService.getById(appointment.DoctorId);
//                                     return (
//                                         <tr key={appointment.id}>
//                                             <td>{appointment.type}</td>
//                                             <td>{patient.fname}, {patient.lnmae}</td>
//                                             <td>{doctor.fname}, {doctor.lnmae}</td>
//                                             <td>{appointment.type}</td>
//                                             <td>{appointment.startTime}</td>
//                                             <td>{appointment.endTime}</td>
//                                         </tr>
//                                     );
//                                 })
//                             }
//                         </tbody>
//                     </table>
//                 </>)}
//             </div>
//         </>
//     );
// }
// export default Appointments;
import { useEffect, useState } from "react";
import AcademicService from "../../services/academic.service";
import { Link } from "react-router-dom";
import SearchBar from "../../components/big/SearchBar";
import UserService from "../../services/users.service";
import '../css/pages/Appointments.css'
function Appointments() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [logedUser, setLogedUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usr = await UserService.getCurrentUser();
                setLogedUser(usr); 
                
                if (usr) { // Fetch appointments only when loggedUser is available
                    
                  const response = await AcademicService.getAppointmentsByUid(usr.id);
                  setAppointments(response || []);
                  console.log(appointments);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures this runs only once on component mount

    // useEffect(() => {
    //     const enrichAppointments = async () => {
    //         const updatedAppointments = await Promise.all(
    //             appointments.map(async (appointment) => {
    //                 const [patient, doctor] = await Promise.all([
    //                     UserService.getById(appointment.UserId),
    //                     UserService.getById(appointment.DoctorId),
    //                 ]);

    //                 return { ...appointment, patient, doctor };
    //             })
    //         );
    //         setAppointments(updatedAppointments);
    //     };

    //     if (appointments.length > 0 && logedUser) {
    //         enrichAppointments();
    //     }
    // }, [appointments, logedUser]); 

    // ... (Your other function handles - handleGetSearchedStud and updateData)

    const formatDateTime = (dateTimeString) => {
        if (!dateTimeString) return ""; // Handle potential null/undefined values

        const dateObj = new Date(dateTimeString);
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        };

        return new Intl.DateTimeFormat("en-US", options).format(dateObj);
    };
    

    return (
        <>
            <div className="appointments-container">
                
                
                {loading ? (
                    <p>Loading appointments...</p> // Display loading message
                ) : appointments.length >= 0 ? (
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Tip</th>
                                <th scope="col">Doctor</th>
                                <th scope="col">Pacient</th>
                                <th scope="col">Start</th>
                                <th scope="col">End</th>
                                <th scope="col">Status</th>
                                {logedUser.role === "pacient" && (
                                <th scope="col"> <Link to={`/CreateAppointment`}>Programeaza-te!</Link></th>
                                )
                            }
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appointment) => (
                                <tr key={appointment.id}>
                                    <td>{appointment.type}</td>
                                    <td>{appointment.doctorName}</td>
                                    <td>{appointment.pacientName}</td>
                                    <td>{formatDateTime(appointment.startTime)}</td>
                                    <td>{formatDateTime(appointment.endTime)}</td>
                                    <td>{appointment.status}</td> {/* Add the status column */}
                                    {logedUser.role == "doctor" && (
                                    <td><Link to={`/EditAppointment/${appointment.id}`}>Edit</Link></td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No appointments found.</p>
                )}
            </div>
        </>
    );
}

export default Appointments;
