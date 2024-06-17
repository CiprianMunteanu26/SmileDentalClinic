import { Link } from "react-router-dom";

function NotFound()
{
    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center row">
                <div className=" col-md-6">
                    <img src={require('../imgs/navigation/notfound.png')} alt="" className="img-fluid" />
                </div>
                <div className=" col-md-6 mt-5">
                    <p className="fs-3"> <span className="text-danger">Hopa!</span> Ai ajuns pe un taram necunoscut.</p>
                    <p className="lead">
                        Pagina pe care o cauti nu exista sau nu ai acces.
                    </p>
                    <Link to="/" className="btn btn-primary">Mergi la Login</Link>
                </div>

            </div>
        </div>
    );
}
export default NotFound;