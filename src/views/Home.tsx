import React, { ReactElement, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

import { User } from "../App";

interface Props {
  getUser: (email: string) => Promise<void>;
  user: User | undefined;
}

export default function Home({ getUser, user }: Props): ReactElement {
  const [input, setInput]: [string | undefined, Function] = useState();

  const navigate = useNavigate();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    console.log(`handleOnChange -> e.target.value`, e.target.value);
  };

  useEffect(() => {
    if (user) {
      navigate(`/emailPreferences/${user.userEmail}`);
    }
  }, [user]);
  return (
    <div className="home unsubscribe-buttons">
      <input
        className="input"
        type="email"
        onChange={handleOnChange}
        value={input}
        placeholder="Please enter your email"
        onKeyDown={(e) => {
          if (input && e.key === "Enter") {
            getUser(input);
          }
        }}
      />
      <button
        className="add-button"
        onClick={(e) =>
          input
            ? getUser(input)
            : Swal.fire({
                title: "Please enter an email",
                icon: "error",
                // returnFocus: true,
              })
        }
      >
        Go to preferences
      </button>
    </div>
  );
}
