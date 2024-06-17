import { Link } from 'react-router-dom';
import '../../static/css/components/Footer.css'
function Footer()
{
    const currentYear = new Date().getFullYear();
    return (
        <div className="footer">
            <div className='footer-row'>
                <div className='util-links'>
                    <div className='util-links-tit'>Resurse</div>
                    <a href='https://dotnet.microsoft.com/en-us/apps/aspnet/apis'>ASP.NET Core</a>
                    <a href='https://www.rabbitmq.com/getstarted.html'>RabbitMq</a>
                    <a href='https://react.dev/learn'>React</a>
                    <a href='https://docs.docker.com/'>Docker</a>
                </div>
                <div className='social-media'>
                    <img src={require('../../static/imgs/footer/fb.png')} />
                    <img src={require('../../static/imgs/footer/insta.png')} />
                    <img src={require('../../static/imgs/footer/tiktok.png')} />
                </div>
            </div>
            <div className='footer-column'>
                <div className='contact-about'>
                    <Link to='contact'>Contact</Link>
                    <Link to='about'>Despre</Link>
                </div>
                <div className="copyright">
                    &copy; {currentYear} Smile Dental Clinic
                </div>
            </div>
        </div>
    );
}

export default Footer;