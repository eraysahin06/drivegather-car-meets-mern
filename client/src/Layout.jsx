import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className='mt-12'>
      <Outlet />
      </div>
    </>
  );
};

export default Layout;
