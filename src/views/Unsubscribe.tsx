import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as addinService from "../services/addin.service";
type user = {
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
};
export default function Unsubscribe() {
  const [user, setUser]: [undefined | user, Function] = useState();
  const [options, setOptions] = useState({
    renewal: true,
    features: true,
    promotions: true,
  });
  const { userEmail } = useParams();
  useEffect(() => {
    if (userEmail) {
      getUser();
    }
  }, [userEmail]);
  useEffect(() => {
    if (user) {
      if (user.subscription) {
        const { renewal, features, promotions } = user?.subscription;
        setOptions({ renewal, features, promotions });
      }
    }
  }, [user]);
  const getUser = async () => {
    const _user = await addinService.getUsersSubscriptions(userEmail!);
    setUser(_user);
  };
  const onSetOptions = (
    e: React.ChangeEvent<HTMLInputElement>,
    all: boolean
  ) => {
    console.log(`Unsubscribe -> all`, all);
    if (all) {
      setOptions({
        renewal: false,
        features: false,
        promotions: false,
      });
    } else {
      setOptions({ ...options, [e.target.name]: e.target.checked });
    }
  };
  return (
    <>
      <h1>Email Preferences</h1>
      <h2>We Would love to stay in touch! </h2>
      <div className="options">
        <p>
          <input
            type="checkbox"
            checked={options.renewal}
            onChange={(e) => onSetOptions(e, false)}
            name="renewal"
          />
          Keep me updated about renewals
        </p>
        <p>
          <input
            type="checkbox"
            checked={options.features}
            onChange={(e) => onSetOptions(e, false)}
            name="features"
          />
          Keep me updated about new features
        </p>
        <p>
          <input
            type="checkbox"
            checked={options.promotions}
            onChange={(e) => onSetOptions(e, false)}
            name="promotions"
          />
          Keep me updated about promotions and new apps
        </p>
      </div>

      <div className="unsubscribe-buttons">
        <p>
          <input
            //   className="add-button"
            type="checkbox"
            onChange={(e) => onSetOptions(e, true)}
            checked={
              !options.features && !options.promotions && !options.renewal
            }
            name="all"
          />
          Remove all Email subscriptions
        </p>
        <button
          className="add-button"
          onClick={(e) =>
            userEmail && addinService.unsubscribe(userEmail, options)
          }
        >
          Save Changes
        </button>
      </div>
    </>
  );
}
