// import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Unsubscribe from "./views/Unsubscribe";
import "./App.css";
import Footer from "./components/Footer";
import Home from "./views/Home";
import * as addinService from "./services/addin.service";
export interface User {
  userEmail: string;
  token: string;
  userDomain: string;
  registerDate: Date;
  expirationDate: Date;
  license: string;
  userType: string;
  lastVisited: Date;
  isSignedOut: boolean;
  startItem: null | object;
  company: string;
  settings: object;
  isEndingLicense: boolean;
  apiKey: string;
  numOfUsers: number;
  renewalSent: {
    twenty: boolean;
    five: boolean;
    timeStamp: number;
  };
  subscription: {
    renewal: boolean;
    features: boolean;
    promotions: boolean;
  };
  announced: number;
}

export function App() {
  const [user, setUser]: [undefined | User, Function] = useState();
  const getUser = async (email: string): Promise<void> => {
    const _user = await addinService.getUsersSubscriptions(email!);
    setUser(_user);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <h1>Email Preferences</h1>
        <h2>We Would love to stay in touch! </h2>
        <Routes>
          <Route
            path="/emailPreferences/:userEmail"
            element={<Unsubscribe user={user} getUser={getUser} />}
          />
          <Route path="/" element={<Home getUser={getUser} user={user} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
