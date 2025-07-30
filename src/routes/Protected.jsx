import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./../context/AuthContext";
import useSWR from "swr";
import { fetchData } from "../api/ClientFunction";

export default function Protected() {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const urlToken = urlParams.get("token");
  const [token, setToken] = useState(
    urlToken || localStorage.getItem("token") || ""
  );
  const { setUser, setIsLogin } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const urlToken1 = urlParams.get("token");
    const effectiveToken = urlToken1 || token;

    if (effectiveToken) {
      localStorage.setItem("token", effectiveToken);
      setToken(effectiveToken);
    }
  }, [location.search]);

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  const { data, error } = useSWR("/user/getUserInfo", fetchData);

  useEffect(() => {
    if (data && data.user) {
      setUser(data.user);
      setIsLogin(true);
    }
    if (error) {
      setIsLogin(false);
    }
  }, [data, error, setUser, setIsLogin]);

  return <Outlet />;
}
