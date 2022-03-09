import React, { useEffect, useState, ReactElement } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { User } from "../App";
import * as addinService from "../services/addin.service";
interface Props {
  getUser: (email: string) => Promise<void>;
  user: User | undefined;
  setUser: Function;
}
export default function Unsubscribe({
  getUser,
  user,
  setUser,
}: Props): ReactElement {
  const navigate = useNavigate();
  const { userEmail } = useParams();
  //todo: add "return to home" btn, add userEmail in page, add sweet alerts
  console.log(`Unsubscribe -> user`, user);
  const [options, setOptions] = useState({
    renewal: true,
    features: true,
    promotions: true,
  });
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
    } else {
      navigate("/");
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
  const handleClick = (e: React.MouseEvent) => {
    const unSub = userEmail && addinService.unsubscribe(userEmail, options);
    Swal.fire({
      title: "Your preferences are saved",
      text: "You can always come back from the integration and change them again!",
      icon: "success",
    });
  };
  const backHome = () => {
    setUser();
    navigate("/");
  };
  return (
    <>
      <button className="add-button" onClick={backHome}>
        Home
      </button>
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
        <button className="add-button" onClick={handleClick}>
          Save Changes
        </button>
      </div>
    </>
  );
}
