import axios, { AxiosResponse } from "axios";
export async function unsubscribe(
  userEmail: string,
  options: {
    renewal: Boolean;
    features: Boolean;
    promotions: Boolean;
  }
): Promise<AxiosResponse> {
  const res: AxiosResponse = await axios.post(
    // process.env.NODE_ENV === "development"
    // ? `http://localhost:3030/api/user/subscription/${userEmail}`
    `https://monday-outlook/herokuapp.com/api/user/subscription/${userEmail}`,
    // : `https://monday-outlook/herokuapp.com/api/user/subscription/${userEmail}`,
    { options }
  );
  return res.data;
}
export async function getUsersSubscriptions(userEmail: string) {
  const res: AxiosResponse = await axios.get(
    // process.env.NODE_ENV === "development"
    // ? `http://localhost:3030/api/user/${userEmail}`
    `https://monday-outlook/herokuapp.com/api/user/${userEmail}`
    // : `https://monday-outlook/herokuapp.com/api/user/${userEmail}`
  );
  if (res.data) return res.data;
  else return;
}
