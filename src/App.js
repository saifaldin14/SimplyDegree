import React from "react";
// import Node from "./components/Node";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./Screens/SignIn.js";
import "./App.css";
import { AuthProvider } from "./utils/context";
import Home from "./Screens/Home.js";
import SignUp from "./Screens/SignUp.js";
import PrivateRoute from "./Screens/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
