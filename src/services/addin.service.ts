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
    // `http://localhost:3030/api/user/unsubscribe/${userEmail}`,
    `https://monday-outlook/herokuapp.com/api/user/unsubscribe/${userEmail}`,
    { options }
  );
  return res.data;
}
export async function getUsersSubscriptions(userEmail: string) {
  const res: AxiosResponse = await axios.get(
    // `http://localhost:3030/api/user/${userEmail}`
    `https://monday-outlook/herokuapp.com/api/user/subscription/${userEmail}`
  );
  return res.data;
}
