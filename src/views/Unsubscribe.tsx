import React, { useEffect, useState, ReactElement } from "react";
import { useParams } from "react-router";
import { User } from "../App";
import * as addinService from "../services/addin.service";
interface Props {
  getUser: (email: string) => Promise<void>;
  user: User | undefined;
}
export default function Unsubscribe({ getUser, user }: Props): ReactElement {
  console.log(`Unsubscribe -> user`, user);
  const [options, setOptions] = useState({
    renewal: true,
    features: true,
    promotions: true,
  });
  const { userEmail } = useParams();
  useEffect(() => {
    if (userEmail && !user) {
      getUser(userEmail);
    }
  }, [userEmail, user]);
  useEffect(() => {
    if (user) {
      if (user.subscription) {
        const { renewal, features, promotions } = user?.subscription;
        setOptions({ renewal, features, promotions });
      }
    }
  }, [user]);
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
