import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const Redi = () => {
  let navigate = useNavigate();
  let location = useLocation();
  useEffect(() => {
    const paths = location.pathname.split("/"); // Split pathname into an array of segments
    const lastPath = paths[paths.length - 1];
    if (lastPath) {
      sessionStorage.setItem("Token", JSON.stringify(lastPath));
      navigate("/auth/login");
    }
  }, []);
  return <></>;
};

export default Redi;
