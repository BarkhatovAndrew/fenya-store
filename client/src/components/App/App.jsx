import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import SearchPanel from '../SearchPanel/SearchPanel';
import TopPanel from '../TopPanel/TopPanel';
import './normalize.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="root-container">
      <TopPanel />
      <SearchPanel />
      <Outlet />
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
