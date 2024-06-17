import '../css/pages/Contact.css'
import { useState } from 'react';
import axios from 'axios';
function Contact()
{

    return (
        <div className="contact-container">
            <div className="contact">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-10">
                            <h1 className='form-title'>Contacteaza-ne</h1>
                            <form>
                                <div className="form-outline mb-4">
                                    <input type="email" id="form3Example3" className="form-control form-control-lg"
                                        placeholder="Introdu numele" />
                                    <label className="form-label" >Nume</label>
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="email" id="form3Example3" className="form-control form-control-lg"
                                        placeholder="Introdu o adresa de email valida" />
                                    <label className="form-label" >Adresa email</label>
                                </div>

                                <div className="form-outline mb-3">
                                    <textarea id="form3Example4" className="form-control form-control-lg"
                                        placeholder="Descriere" />
                                    <label className="form-label" >Descrie pe scurt solicitarea</label>
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button type="button" className="btn btn-primary btn-lg">Trimite</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div >
            </div >
        </div>
    )
}
export default Contact;

