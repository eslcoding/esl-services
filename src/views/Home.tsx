import React, { ReactElement, useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { User } from "../App";

interface Props {
  getUser: (email: string) => Promise<void>;
  user: User | undefined;
}

export default function Home({ getUser, user }: Props): ReactElement {
  const [input, setInput]: [string | undefined, Function] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(`/emailPreferences/${input}`);
    }
  }, [user]);
  return (
    <div className="home unsubscribe-buttons">
      <input
        className="input"
        onChange={(e) => setInput(e.target.value)}
        value={input}
        placeholder="Please enter your email"
      />
      <button className="add-button" onClick={() => input && getUser(input)}>
        Go to preferences
      </button>
    </div>
  );
}
