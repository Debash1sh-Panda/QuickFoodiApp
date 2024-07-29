import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

function useAuth() {
  const auth = useContext(AuthContext);
  return auth;
}

export default useAuth;
