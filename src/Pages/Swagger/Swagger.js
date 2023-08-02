import React, { useEffect } from "react";
import "./Swagger.css";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { GiveSubs } from "../../layouts/full-layout/sidebar/Menuitems";
// import SwaggerUI from "swagger-ui-react";
// import "swagger-ui-react/swagger-ui.css";

const Swagger = () => {
  const permission = useSelector((state) => state.CustomizerReducer.Access);
  const [viewAccess, setViewAccess] = React.useState(false);
  const [editAccess, setEditAccess] = React.useState(false);
  const [deleteAccess, setDeleteAccess] = React.useState(false);
  let navigate = useNavigate();
  function GetSubsAccess() {
    let arr = GiveSubs(permission, "Api Documentation", "subs");
    if (arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].name == "View") {
          setViewAccess(true);
        }
        if (arr[i].name == "Edit") {
          setEditAccess(true);
        }
        if (arr[i].name == "Delete") {
          setDeleteAccess(true);
        }
      }
    } else {
      if (permission[0]?.route) {
        navigate(permission[0].route);
      }
    }
  }

  useEffect(() => {
    GetSubsAccess();
  }, [permission]);
  return (
    <div>
      {/* <SwaggerUI url="https://dev.glorep.com/api.yaml" /> */}
      {viewAccess && (
        <iframe
          className="ContainerBox"
          src="https://dev.glorep.com/api/swagger/"
          title="Swagger UI"
        />
      )}
    </div>
  );
};

export default Swagger;
