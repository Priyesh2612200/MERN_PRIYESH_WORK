import './App.css';
import Sidebar from './Components/Sidebar';
import Appbar from './Components/Appbar';
import HomePage from './Pages/HomePage';
import Analytics from './Pages/Analytics';
import DashBoard from './Pages/DashBoard';
import Friends from './Pages/Friends';
import MailBox from './Pages/MailBox';
import { BrowserRouter,Routes,Route } from 'react-router-dom';


function App() {
  return (
    <>
    <BrowserRouter>
    <div className='App'>
    <Appbar></Appbar>
    <Sidebar> 
    <Routes>
    <Route path="/home" element={<HomePage />} />
    <Route path="/analytics" element={<Analytics />} />
    <Route path="/dashboard" element={<DashBoard />} />
    <Route path="/friends" element={<Friends />} />
    <Route path="/mailbox" element={<MailBox />} />
    </Routes>
    </Sidebar>
 
    </div>
    </BrowserRouter>
    {/* <div className='App'>
    <Sidebar></Sidebar>
    <Appbar></Appbar>
    </div> */}
    </>
  );
}

export default App;
