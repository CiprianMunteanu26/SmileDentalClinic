import '../css/pages/Contact.css';
import { useState } from 'react';
import ToastSucces from '../../components/ToastSucces';
function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
  });
  const [succes, setSucces] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    
    setSucces("Mesajul dumneavoastra a fost trimis!");
    // Clear form fields
    setFormData({
      name: '',
      email: '',
      description: '',
    });
  };
  const resetSucces = () =>
    {
        setSucces("");
    }
  return (
   
    <div className="contact-container">
      <div className="contact">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-10">
            {succes && <ToastSucces message={succes} duration={4000} resetError={resetSucces} />}
              <h1 className="form-title">Contacteaza-ne</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="Introdu numele"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <label className="form-label">Nume</label>
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="Introdu o adresa de email valida"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <label className="form-label">Adresa email</label>
                </div>
                <div className="form-outline mb-3">
                  <textarea
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="Descriere"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                  <label className="form-label">Descrie pe scurt solicitarea</label>
                </div>
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Trimite
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
