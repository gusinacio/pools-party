import { useApolloClient } from "@apollo/client";
import { useState } from "react";

export type AuthInput = {
  token: string;
  setToken: (authPayload: AuthPayload) => void;
};

interface AuthPayload {
  token: string;
  user: {
    id: string;
    username: string;
  };
}
export function useAuth(): AuthInput {
  const client = useApolloClient();
  const getToken = () => {
    if (typeof window !== "undefined") {
      const tokenString = localStorage.getItem("authPayload");
      if (tokenString) {
        const userToken = JSON.parse(tokenString);
        return userToken?.token;
      }
    }
    return "";
  };
  const [token, setToken] = useState(getToken());

  const saveToken = (authPayload: AuthPayload) => {
    if (typeof window !== "undefined") {
      client.clearStore();
      localStorage.setItem("authPayload", JSON.stringify(authPayload));
    }
    setToken(authPayload.token);
  };

  return { token, setToken: saveToken };
}
