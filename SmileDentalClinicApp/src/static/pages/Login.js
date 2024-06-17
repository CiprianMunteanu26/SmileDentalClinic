import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/pages/Login.css'
import AuthService from '../../services/auth.service';
import ToastError from '../../components/ToastError';
import UserService from '../../services/users.service';

function Login()
{
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [logedUser, setLogedUser] = useState("");

    useEffect(() =>
    {
        handleIsUserLogedIn();
        if (logedUser) window.location.replace("home");
    }, [logedUser]);

    const handleLogin = async (e) =>
    {
        e.preventDefault();
        try
        {
            await AuthService.login(email, password);
            window.location.replace("/home");

        }
        catch (error)
        {

            if (error.response && error.response.status === 401)
            {
                setErr("Date de autentificare invalide");
            }
        }
    }

    const handleIsUserLogedIn = async () =>
    {
        try
        {
            const usr = await UserService.getCurrentUser();
            setLogedUser(usr);
        } catch (error)
        {
            setLogedUser("");
        }
    }

    const togglePasswordVisibility = () =>
    {
        setShowPassword(!showPassword);
    };

    const resetError = () =>
    {
        setErr("");
    }
    return (
        <>
            {err && <ToastError message={err} duration={4000} resetError={resetError} />}
            <section className="login">
                <div className="container-fluid">
                    <div className="section-logo"><img src={require('../imgs/auth/logo.png')} /></div>
                    <div className="section-name">Autentificare</div>
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-8 col-lg-6 col-xl-4 ">
                            <form onSubmit={handleLogin}>
                                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="email" id="validationCustom01" className="form-control form-control-lg"
                                        placeholder="Introdu o adresa de email valida" value={email} onChange={(e) => setEmail(e.target.value)}
                                        required onInvalid={(e) => e.target.setCustomValidity('Introduceți o adresă de email validă')}
                                        onInput={(e) => e.target.setCustomValidity('')} />
                                    <label className="form-label" htmlFor="form3Example3">Adresa email</label>
                                </div>


                                <div className="form-outline mb-3">
                                    <input type={showPassword ? 'text' : 'password'} id="validationCustom02" className="form-control form-control-lg"
                                        placeholder="Introdu parola" value={password} onChange={(e) => setPassword(e.target.value)}
                                        required onInvalid={(e) => e.target.setCustomValidity('Introduceți parola dumneavastră')}
                                        onInput={(e) => e.target.setCustomValidity('')} />
                                    <i className={`fa ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`} aria-hidden="true" onClick={togglePasswordVisibility}></i>
                                    <label className="form-label" htmlFor="form3Example4">Parola</label>
                                </div>


                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button type="submit" className="btn btn-primary btn-lg">Autentificare</button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">Nu ai inca un cont? <Link to="/register"
                                        className="link-danger">Inregistrare</Link></p>
                                </div>

                            </form>
                        </div>
                    </div>
                </div >
            </section >


        </>
    );
}

export default Login