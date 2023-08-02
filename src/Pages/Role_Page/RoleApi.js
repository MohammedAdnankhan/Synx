import React, { useEffect } from "react";
import { GETACCESSROUTES, getToken } from "../../Api/GetData";
import { useDispatch } from "react-redux";
import { SetAccess } from "../../redux/customizer/Action";

const RoleApi = () => {
  const dispatch = useDispatch();
  let token = getToken();
  const handleClick = () => {
    GETACCESSROUTES(token)
      .then((res) => dispatch(SetAccess(res)))
      .catch((error) => dispatch(SetAccess(error)));
  };
  useEffect(() => {
    handleClick();
  }, []);
  return <div></div>;
};

export default RoleApi;
