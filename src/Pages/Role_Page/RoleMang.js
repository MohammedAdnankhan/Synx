import React, { useEffect, useState } from "react";
import Title from "../../CustomComponent/Title";
import PageContainer from "../../components/container/PageContainer";
import "./Role.css";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import RoleTab from "../../CustomComponent/RoleTab";
import { GETROLES, getToken } from "../../Api/GetData";
import { GiveSubs } from "../../layouts/full-layout/sidebar/Menuitems";
const RoleMang = () => {
  let navigate = useNavigate();
  const [roleTabData, setRoleTabData] = useState("");
  const token = getToken();
  const permission = useSelector((state) => state.CustomizerReducer.Access);
  const [viewAccess, setViewAccess] = React.useState(false);
  const [editAccess, setEditAccess] = React.useState(false);
  const [deleteAccess, setDeleteAccess] = React.useState(false);
  function GetSubsAccess() {
    let arr = GiveSubs(permission, "Roles management", "subs");
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

  const handlebnt = () => {
    navigate("/add-roles");
  };
  function getData() {
    GETROLES(setRoleTabData, token);
  }
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    GetSubsAccess();
  }, [permission]);
  return (
    <PageContainer title="Role-Management">
      {viewAccess || deleteAccess || editAccess ? (
        <>
          {" "}
          <div className="jtfy">
            <Title title="Role Management" />
            {editAccess && (
              <button
                className="btnSub"
                onClick={handlebnt}
                style={{ width: "fit-content" }}
              >
                Add Role
              </button>
            )}
          </div>
          <RoleTab
            roleTabData={roleTabData}
            handleTableData={getData}
            editAccess={editAccess}
            viewAccess={viewAccess}
            deleteAccess={deleteAccess}
          />
        </>
      ) : null}
    </PageContainer>
  );
};

export default RoleMang;
