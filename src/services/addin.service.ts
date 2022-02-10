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
    `https://monday-outlook/herokuapp.com/unsubscribe/${userEmail}`,
    { options }
  );
  return res.data;
}
