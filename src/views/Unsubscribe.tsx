import React, { useState } from "react";
import { useParams } from "react-router";
import { unsubscribe } from "../services/addin.service";
export default function Unsubscribe() {
  const { userEmail } = useParams();
  const [options, setOptions] = useState({
    renewal: true,
    features: true,
    promotions: true,
  });
  const onSetOptions = (
    e: React.ChangeEvent<HTMLInputElement>,
    all: Boolean
  ) => {
    setOptions({ ...options, [e.target.name]: e.target.checked });
    if (all)
      setOptions({
        renewal: e.target.checked,
        features: e.target.checked,
        promotions: e.target.checked,
      });
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
        <button
          className="add-button"
          onClick={(e) =>
            setOptions(
              !options.features && !options.promotions && !options.renewal
                ? { features: true, renewal: true, promotions: true }
                : { features: false, renewal: false, promotions: false }
            )
          }
          name="promotions"
        >
          {!options.features && !options.promotions && !options.renewal
            ? "Approve"
            : "Remove"}{" "}
          all Email subscriptions
        </button>
        <button
          className="add-button"
          onClick={(e) => unsubscribe(userEmail!, options)}
        >
          Save Changes
        </button>
      </div>
    </>
  );
}
