// import "./App.css";
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Unsubscribe from "./views/Unsubscribe";
import "./App.css";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/unsubscribe/:userEmail" element={<Unsubscribe />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
