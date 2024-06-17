import './App.css';
import Footer from './components/big/Footer';
import UserService from './services/users.service';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationRouter from './components/navigation/NavigationRouter';
import ToastSucces from './components/ToastSucces';
import { useLocation } from 'react-router-dom';
function App()
{
  const location = useLocation();
  const [messageShown, setMessageShown] = useState(false);
  const [renderFooter, setRenderFooter] = useState(true);


  useEffect(() =>
  {
    if (location.pathname === '/messages' || location.pathname === '/doctors' || location.pathname === '/pacients')
    {
      setRenderFooter(false);
    } else
    {
      setRenderFooter(true);
    }
  }, [location.pathname]);


  useEffect(() =>
  {
    const storedValue = localStorage.getItem('loginSucces');
    const hasBeenShown = storedValue === 'true';

    if (!hasBeenShown)
    {
      setMessageShown(true);
      localStorage.setItem('messageShown', 'true');
    }
  }, [messageShown]);




  return (
    <>
      <NavigationRouter />

      {renderFooter && <Footer />}
    </>
  );

}

export default App;
