import { Table } from 'react-bootstrap'
import '../../static/css/components/SearchViewDoctor.css';
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import UserService from '../../services/users.service';
import ToastError from '../ToastError';
import Loading from '../Loading';

function SearchViewDoctor()  
{

    const [inputRef, setInputRef] = useState("");
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');
    const [clicked, setClicked] = useState(false);

    const [isShowing, setIsShowing] = useState("");

    const getUsersByNameAndEmail = async (e) =>
    {

        e.preventDefault();
        try
        {
            if (!inputRef) return;
            if (isShowing)
            {
                const reponse = await UserService.getByDataAndRole(inputRef, "Doctor")
                setData(reponse);
            }
            else
            {
                const reponse = await UserService.getByDataAndRole(inputRef, "Doctor")
                setData(reponse);
            }

        } catch (err)
        {
            setErr("Nu am gasit nici un doctor după datele oferite de dvs");
        } finally
        {
            setIsLoading(false);
            setClicked({ clicked: !clicked });
        }
    };

    const handleIsShowing = () =>
    {
        setIsShowing(!isShowing);
    }

    const resetError = () =>
    {
        setErr("");
    }

    return (
        <>
            <div className='search-column-container'>
                <div className="search-view-container">
                    <div onClick={handleIsShowing} className='adv-search-btn'><p>Filtrează</p>
                        <img src={require('../../static/imgs/users_listview/icons8-arrow-50.png')} />
                    </div>
                    <form className="width-100 space-around" onSubmit={getUsersByNameAndEmail}>
                        <div className="input-group">
                            <input type="search" className="form-control rounded" placeholder="Caută după nume sau email" aria-label="Search" aria-describedby="search-addon"
                                value={inputRef} onChange={(e) => setInputRef(e.target.value)}
                                required onInvalid={(e) => e.target.setCustomValidity('Câmpul trebuie completat dacă vreți să căutați')}
                                onInput={(e) => e.target.setCustomValidity('')} />
                            <button type="submit" className="btn btn-outline-primary">search</button>
                        </div>
                    </form>

                </div>
                <form className={isShowing ? 'advanced-search-active' : 'advanced-search'}>
                    <div className="row">
                        <div className="col">
                            <label> Departament</label>
                            <select id="inputState" className="form-control">
                                <option>AIA (Automatică şi Informatică Aplicată )</option>
                                <option>CR (Calculatoare cu predare în limba română)</option>
                                <option>CE (Calculatoare cu predare în limba engleză)</option>
                                <option>ELA ( Electronică Aplicată)</option>
                                <option>ISM (Ingineria Sistemelor Multimedia)</option>
                                <option>MCT (Mecatronică)</option>
                                <option>ROB (Robotică )</option>
                            </select>
                        </div>
                        <div className="col">
                            <label> Cabinet</label>
                            <select id="inputState" className="form-control">
                                <option>Choose...</option>
                                <option>...</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
            <div className='reponse-content'>
                {
                    err &&
                    <ToastError message={err} duration={4000} resetError={resetError} />
                }

                {
                    data && <Table className={clicked ? "mt-4" : "d-none"} striped bordered hover size='sm'>
                        <thead>
                            <tr>
                                <th>Prenume</th>
                                <th>Nume</th>
                                <th>Email</th>
                                <th>Nr Telefon</th>
                                <th>Functie</th>
                                <th>Rol</th>
                                <th>Vezi doctor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((user) =>
                                {
                                    return (
                                        <tr>
                                            <td>{user.fname}</td>
                                            <td>{user.lnmae}</td>
                                            <td>{user.email}</td>
                                            <td>{user.phoneNumber}</td>
                                            <td>{user.function}</td>
                                            <td>{user.role}</td>
                                            <td><Link to={`/profile/${user.id}`}>Detalii</Link></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                }
            </div >
        </>
    );
}
export default SearchViewDoctor;