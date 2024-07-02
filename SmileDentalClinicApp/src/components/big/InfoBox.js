import React, { useEffect } from 'react';
import '../../static/css/components/InfoBox.css'
const InfoBox = () =>
{
    useEffect(() =>
    {
        const handleScroll = () =>
        {
            const elements = document.querySelectorAll('.scroll-transition');
            const windowHeight = window.innerHeight;

            elements.forEach((element) =>
            {
                const rect = element.getBoundingClientRect();
                const offset = 120;
                const translationAmount = 160;

                if (rect.top <= windowHeight - offset)
                {
                    element.style.transform = 'translateX(0%)';
                } else
                {

                    element.style.transform = `translateX(-${translationAmount}%)`;
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () =>
        {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            <div className="scroll-transition">
                <div className='scroll-transition-tit'>
                    Despre Smile Dental Clinic
                </div>
                <p>Smile Dental Clinic este o platformă ce ajuta atât pacientii cât și doctorii să comunice într-un mod cât mai rapid și eficient. Platforma pune la dispoziția dvs o gamă de funcționalități prin care puteți căuta un doctor pe baza anumitor criterii și, de asemenea, îi puteți trimite un mesaj.</p>
            </div>
            <div className="scroll-transition">
                <div className='scroll-transition-tit'>
                    Cum funcționează?
                </div>
                <p>Puteți căuta un doctor folosind bara de căutare după numele și email-ul dorit. Dacă căutarea s-a efectuat cu succes din lista de doctori apărută într-un puteți vizualiza informațile despre doctor sau puteți naviga către pagina de profil a acestuia unde puteți vedea informații suplimentare și îi puteți trimite și mesaje. De asemenea, puteți sa creati o programare la doctorul dorit din pagina Programari, selectand data si serviciul dorit.</p>
            </div>
        </div>
    );
};

export default InfoBox;