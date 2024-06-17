import '../../static/css/components/EditProfile.css'
import { useState, useEffect } from 'react';
import UserService from '../../services/users.service';
import ToastError from '../../components/ToastError';
import ToastSucces from '../../components/ToastSucces';
function EditProfile(props)
{
    const [error, setError] = useState("");
    const [succes, setSucces] = useState("");
    const [logedUser, setLogedUser] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");

    const [password, setPassword] = useState("");
    const [passwordRpt, setPasswordRpt] = useState("");
    const [phoneNr, setPhoneNr] = useState("");
    const [imagePath, setImagePath] = useState("");
    const [func, setFunction] = useState("");
    const [cabinet, setCabinet] = useState("");
    const [details, setDetails] = useState("");
    useEffect(() =>
    {
        handleLoadingData();
    }, []);

    const handleGetCurrentUser = async () =>
    {
        try
        {
            const usr = await UserService.getCurrentUser();
            setLogedUser(usr);
        } catch (error)
        {
            setLogedUser("-NO NAME-");
        }
    }

    const handleLoadingData = async () =>
    {
        await handleGetCurrentUser();
    }

    const handleUpdateUser = async (e) =>
    {
        e.preventDefault();

        if (!fname) setFname(document.getElementById("fname").placeholder);
        if (!lname) setLname(document.getElementById("lname").placeholder);
        if (!phoneNr) setPhoneNr(document.getElementById("phoneNr").placeholder);
        if (logedUser.role === "Doctor")
        {
            if (!func) setFunction(document.getElementById("func").placeholder);
            if (!cabinet) setCabinet(document.getElementById("cabinet").placeholder);
            if (!details) setDetails(document.getElementById("details").placeholder);
        }


        if (password != passwordRpt) setError("Parolele nu se potrivesc");
        else
        {
            try
            {
                await UserService.updateUser(logedUser.id, fname, lname, password, phoneNr, func, cabinet, imagePath, details);
                setSucces("Ți-ai actualizat cu succes datele");
            }
            catch (error)
            {
                console.log(error)
            }
        }
    }

    const handleFileChange = (event) =>
    {
        const file = event.target.files[0];
        if (file)
        {
            const reader = new FileReader();
            reader.onload = () =>
            {
                const dataURL = reader.result;
                setImagePath(dataURL);
            };
            reader.readAsDataURL(file);
        }
    };

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
            {logedUser && (
                <>
                    {error && <ToastError message={error} duration={4000} resetError={resetError} />}
                    {succes && <ToastSucces message={succes} duration={4000} resetError={resetSucces} />}
                    <form className="row g-3 edit-form" onSubmit={handleUpdateUser}>
                        <div className="col-12">
                            <label htmlFor="fnmae" className="form-label">Prenume</label>
                            <input type="text" className="form-control" id="fname" placeholder={`${logedUser.fname}`} value={fname} onChange={(e) => setFname(e.target.value)} />
                        </div>
                        <div className="col-12">
                            <label htmlFor="lname" className="form-label">Nume</label>
                            <input type="text" className="form-control" id="lname" placeholder={`${logedUser.lnmae}`} value={lname} onChange={(e) => setLname(e.target.value)} />
                        </div>
                        <div className="col-12">
                            <label htmlFor="email" className="form-label">Parola</label>
                            <input type="password" className="form-control" id="password" placeholder="Alege o parola" value={password} onChange={(e) => setPassword(e.target.value)}
                                required onInvalid={(e) => e.target.setCustomValidity('Introduceți o parolă')} onInput={(e) => e.target.setCustomValidity('')} />
                        </div>
                        <div className="col-12">
                            <label htmlFor="email" className="form-label">Repeta parola</label>
                            <input type="password" className="form-control" id="passwordRpt" placeholder='Repeta parola' value={passwordRpt} onChange={(e) => setPasswordRpt(e.target.value)}
                                required onInvalid={(e) => e.target.setCustomValidity('Repetați parola')} onInput={(e) => e.target.setCustomValidity('')} />
                        </div>
                        <div className="col-12">
                            <label htmlFor="email" className="form-label">Numar de telefon</label>
                            <input type="text" className="form-control" id="phoneNr" placeholder={`${logedUser.phoneNumber}`} value={phoneNr} onChange={(e) => setPhoneNr(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label">Alege o poza de profil</label>
                            <input className="form-control" type="file" id="formFile" onChange={handleFileChange} />
                        </div>
                        {logedUser && logedUser.role === "Doctor" &&
                            (<>
                                <div className="col-12">
                                    <label htmlFor="email" className="form-label">Functie ocupata</label>
                                    <input type="text" className="form-control" id="func" placeholder={`${logedUser.function}`} value={func} onChange={(e) => setFunction(e.target.value)} />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="email" className="form-label">Cabinet</label>
                                    <input type="text" className="form-control" id="cabinet" placeholder={`${logedUser.cabinet}`} value={cabinet} onChange={(e) => setCabinet(e.target.value)} />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="email" className="form-label">Detalii</label>
                                    <input type="text" className="form-control" id="details" placeholder={`${logedUser.details}`} value={details} onChange={(e) => setDetails(e.target.value)} />
                                </div>
                            </>)
                        }


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
export default EditProfile;