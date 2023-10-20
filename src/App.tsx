import './App.css';
import {Route,Routes} from "react-router-dom"
import StartPage from './components/StartPage/StartPage';
import RegisterPage from './components/RegisterPages/RegisterPage';
import HomePage from './components/HomePage/HomePage';
import FamilyModePage from './components/ModePages/FamilyModePage';
import AddModePanel from './components/Common/AddModePanel';



function App() {
  return (
    <div className="app">
      <Routes>
            <Route path="/" element={<StartPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/home" element={<HomePage/>}/>
            <Route path="/family" element={<FamilyModePage/>}/>
            <Route path="/addmode" element={<AddModePanel/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
