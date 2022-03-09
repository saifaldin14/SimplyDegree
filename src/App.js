import React from "react";
// import Node from "./components/Node";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import SignIn from "./Screens/SignIn.js";
import "./App.css";
import Home from "./Screens/Home.js";
import SignUp from "./Screens/SignUp"

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
            <Route path="/" element={<SignIn/>}/>
            <Route path="/Home" element={<Home/>}/>
            <Route path="/SignUp" element={<SignUp/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
