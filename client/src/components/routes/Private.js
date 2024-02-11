import { useEffect, useState } from "react";
import { useAuth } from "../../context/authProvider";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spinner from "../spinner/Spinner";

const PrivateRoute = () => {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  const authCheck = async () => {
    const res = await axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/user-auth`, {
        headers: {
          Authorization: auth?.token,
        },
      })
      .then((result) => result)
      .catch((error) => error);
    console.log("authentication", res);
    if (res?.data?.success) {
      setOk(true);
    } else {
      setOk(false);
    }
  };
  useEffect(() => {
    if (auth?.token) authCheck();
  }, [auth]);
  return ok ? <Outlet /> : <Spinner />;
};

export default PrivateRoute;
