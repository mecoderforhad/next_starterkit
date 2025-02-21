import { auth } from "@/auth";
import axios, { AxiosRequestConfig } from "axios";

export interface ApiOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  params?: Record<string, any>;
  body?: Record<string, any>;
  headers?: Record<string, string>;
}

export const serverApiCall = async (
  endpoint: string,
  options: ApiOptions = {}
): Promise<any> => {
  const { method = "GET", params, body, headers } = options;

  try {
    const session: any = await auth();
    const token = session?.user?.token;

    if (!token) {
      throw new Error("Authentication token is missing");
    }

    // Configure the Axios request
    const config: AxiosRequestConfig = {
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`,
      method,
      params,
      data: body,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        ...headers,
      },
    };

    // Make the API request
    const response = await axios(config);
    return response.data;
  } catch (error: any) {
    console.error("Server API call failed:", error.message || error);
    throw error;
  }
};
