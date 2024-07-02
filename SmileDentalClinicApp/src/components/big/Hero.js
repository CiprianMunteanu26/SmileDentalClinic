import '../../static/css/components/HeaderCarousel.css'
import { Link } from 'react-router-dom';
function Hero()
{
    return (
        <>
            <div className="hero-container">
                <div className="carousel-capt-container">
                    <div className='carousel-capt'>
                        <h1>Smile Dental Clinic</h1>
                        <Link to={`/doctors`} className="carousel-capt-btn">
                            Cauta doctorul de care ai nevoie
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Hero;