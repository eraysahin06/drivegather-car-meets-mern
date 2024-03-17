import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className='mt-12'>
      <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
