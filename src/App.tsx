// import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Unsubscribe from "./views/Unsubscribe";
import "./App.css";
import Footer from "./components/Footer";
import Home from "./views/Home";
import * as addinService from "./services/addin.service";
import Swal from "sweetalert2";

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
  const getUser = async (email: string | undefined): Promise<void> => {
    try {
      const _user = await addinService.getUsersSubscriptions(email!);
      if (_user) {
        setUser(_user);
      }
    } catch (err) {
      console.log(`getUser -> err`, err);
      if (!user) {
        Swal.fire({
          title: "Sorry!",
          html: `<p>Looks like <b>${email}</b> is not registered in our system</p> `,
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <h1>Email Preferences</h1>
        <h2>We Would love to stay in touch! </h2>
        <Routes>
          <Route
            path="/emailPreferences/:userEmail"
            element={
              <Unsubscribe user={user} getUser={getUser} setUser={setUser} />
            }
          />
          <Route path="/" element={<Home getUser={getUser} user={user} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
