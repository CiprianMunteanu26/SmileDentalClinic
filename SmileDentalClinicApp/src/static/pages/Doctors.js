import { useState } from "react";
import UserService from "../../services/users.service";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../../components/big/SearchBar";
import '../css/pages/Doctors.css'
function Doctors()
{
    const [doctors, setDoctors] = useState("");
    const [data, setData] = useState("");
    useEffect(() =>
    {
        handleGetdoctors();
    }, []);

    
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

    const handleGetSearchedStud = async (dt) =>
    {
        try
        {
            if (!dt) handleGetdoctors();
            const response = await UserService.getByDataAndRole(dt, "doctor");
            if (response != null)
            {

                setDoctors(response);
            }
        }
        catch (error)
        {
            console.error(error);
        }
    }

    const updateData = (newData) =>
    {
        setData(newData);
    };

    return (
        <>
            <div className="doctors-container">
                <SearchBar updateData={updateData} handleGetSearchedStud={handleGetSearchedStud} />
                {doctors && (<>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Nume</th>
                                <th scope="col">Prenume</th>
                                <th scope="col">Email</th>
                                <th scope="col">Telefon</th>
                                <th scope="col">Profil</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                doctors.map((doctor) =>
                                {
                                    return (
                                        <tr key={doctor.id}>
                                            <td>{doctor.lnmae}</td>
                                            <td>{doctor.fname}</td>
                                            <td>{doctor.email}</td>
                                            <td>{doctor.phonenumber}</td>
                                            <td><Link to={`/profile/${doctor.id}`}>Vezi profil</Link></td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </>)}
            </div>
        </>
    );
}
export default Doctors;