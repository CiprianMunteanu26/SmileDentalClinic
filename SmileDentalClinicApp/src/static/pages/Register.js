import { useState, useRef } from 'react';
import '../css/pages/Register.css'
import AuthService from '../../services/auth.service';
import { Link } from 'react-router-dom';
function Register()
{
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRpt, setPasswordRpt] = useState("");
    const [phoneNr, setPhoneNr] = useState("");
    const [role, setRole] = useState("");

    const handleRegister = async (e) =>
    {
        e.preventDefault();
        try
        {
            await AuthService.register(fname, lname, email, password, role);

        }
        catch (err)
        {
            console.log(err);
        }
    }
    return (
        <>
            <section className="register">
                <div className="section-name">Înregistrare</div>
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form onSubmit={handleRegister}>
                                <div className="form-outline mb-4">
                                    <input type="text" id="validationCustom01" className="form-control form-control-lg"
                                        placeholder="Introdu numele" value={fname} onChange={(e) => setFname(e.target.value)}
                                        required onInvalid={(e) => e.target.setCustomValidity('Introduceți prenumele dumneavoastră')}
                                        onInput={(e) => e.target.setCustomValidity('')} />
                                    <label className="form-label" htmlFor="form3Example3">Nume</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="text" id="validationCustom02" className="form-control form-control-lg"
                                        placeholder="Introdu prenumele" value={lname} onChange={(e) => setLname(e.target.value)}
                                        required onInvalid={(e) => e.target.setCustomValidity('Introduceți numele dumneavoastră')}
                                        onInput={(e) => e.target.setCustomValidity('')} />
                                    <label className="form-label" htmlFor="form3Example3">Prenume</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="email" id="email" className="form-control form-control-lg"
                                        placeholder="Introdu o adresa de email valida" value={email} onChange={(e) => setEmail(e.target.value)}
                                        required onInvalid={(e) => e.target.setCustomValidity('Introduceți o adresă de email validă')}
                                        onInput={(e) => e.target.setCustomValidity('')} />
                                    <label className="form-label" htmlFor="form3Example3">Adresa email</label>
                                </div>


                                <div className="form-outline mb-3">
                                    <input type="password" id="pwd" className="form-control form-control-lg"
                                        placeholder="Introdu parola" value={password} onChange={(e) => setPassword(e.target.value)}
                                        required onInvalid={(e) => e.target.setCustomValidity('Introduceți o parolă')}
                                        onInput={(e) => e.target.setCustomValidity('')} />
                                    <label className="form-label" htmlFor="form3Example4">Parola</label>
                                </div>

                                <div className="form-outline mb-3">
                                    <input type="password" id="pwdRpt" className="form-control form-control-lg"
                                        placeholder="Repeta parola" value={passwordRpt} onChange={(e) => setPasswordRpt(e.target.value)}
                                        required onInvalid={(e) => e.target.setCustomValidity('Repetați parola introdusă anterior')}
                                        onInput={(e) => e.target.setCustomValidity('')} />
                                    <label className="form-label" htmlFor="form3Example4">Repeta parola</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="text" id="phone" className="form-control form-control-lg"
                                        placeholder="Introdu numarul de telefon" value={phoneNr} onChange={(e) => setPhoneNr(e.target.value)}
                                        required onInvalid={(e) => e.target.setCustomValidity('Introduceți numele dumneavoastră')}
                                        onInput={(e) => e.target.setCustomValidity('')} />
                                    <label className="form-label" htmlFor="form3Example3">Număr de telefon</label>
                                </div>

                                
                                <div className="form-group mb-4">
                                <label className="form-label" htmlFor="selectInput">Rol</label>
                                <select 
                                    className="form-control form-control-lg" 
                                    id="selectInput" 
                                    value={role} 
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="pacient">Pacient</option>
                                    <option value="doctor">Doctor</option>
                                </select>
                            </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button type="submit" className="btn btn-primary btn-lg">Inregistrare</button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">Ai deja un cont? <Link to="/login"
                                        className="link-danger">Autentificare</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );

}
export default Register;