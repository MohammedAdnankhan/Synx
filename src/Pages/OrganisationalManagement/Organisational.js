import "./Organisation.css";
import Title from "../../CustomComponent/Title";
import React, { useEffect, useState } from "react";
import SearchTable from "../../CustomComponent/SearchTable";
import PageContainer from "../../components/container/PageContainer";
import OrganizationTable from "../../CustomComponent/OrganizationTable";
import {
  GETADMINDATA,
  GetData,
  getToken,
  GETVERIFICATIONLINK,
} from "../../Api/GetData";
import { GiveSubs } from "../../layouts/full-layout/sidebar/Menuitems";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
const Organisational = () => {
  const [userTableData, setuserTableData] = useState([]);
  const [adminData, setAdminData] = useState([]);
  const [VL, setVL] = useState("");
  const permission = useSelector((state) => state.CustomizerReducer.Access);
  const [viewAccess, setViewAccess] = React.useState(false);
  const [editAccess, setEditAccess] = React.useState(false);
  const [deleteAccess, setDeleteAccess] = React.useState(false);
  let navigate = useNavigate();

  let token = getToken();
  function GetSubsAccess() {
    let arr = GiveSubs(permission, "User", "subs");

    if (arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].name === "View") {
          setViewAccess(true);
        }
        if (arr[i].name === "Edit") {
          setEditAccess(true);
        }
        if (arr[i].name === "Delete") {
          setDeleteAccess(true);
        }
      }
    } else {
      if (permission[0]?.route) {
        navigate(permission[0].route);
      }
    }
  }
  async function handleTableData() {
    await GetData("user/retrive/all", setuserTableData, token);
    GETADMINDATA("retrive/profile", setAdminData, token);
  }
  function handleSearchValue(searchValue) {
    if (searchValue !== "") {
      GetData(
        `user/retrive/all?search=${searchValue}`,
        setuserTableData,
        token
      );
    } else {
      GetData("user/retrive/all", setuserTableData, token);
    }
  }
  function GETLINK() {
    GETVERIFICATIONLINK(setVL, token);
  }

  useEffect(() => {
    handleTableData();
    GETLINK();
  }, []);
  useEffect(() => {
    GetSubsAccess();
  }, [permission]);

  return (
    <PageContainer title="User-Management">
      {viewAccess && (
        <>
          <div className="jtfy">
            <Title title="User Management" />
          </div>
          <CopyVerificationLink adminData={adminData} VL={VL} />
        </>
      )}
      {viewAccess || editAccess || deleteAccess ? (
        <>
          <SearchTable searchFunction={handleSearchValue} />
          <OrganizationTable
            TableRowData={userTableData}
            handleTableData={handleTableData}
            editAccess={editAccess}
            viewAccess={viewAccess}
            deleteAccess={deleteAccess}
          />
        </>
      ) : null}
    </PageContainer>
  );
};

export default Organisational;

function CopyVerificationLink({ adminData, VL }) {
  return (
    <div className="verifyContainer">
      <div>
        <span className="verifyTitle">Verification link</span>
      </div>
      <div className="jtfy">
        <div>
          <span className="something">
            Pulvinar diam non vivamus venenatis id phasellus at consectetur
            suspendisse.
            <br /> Nunc nunc non in lorem nisi hendrerit risus. Nunc nunc non in
            lorem nisi hendrerit risus.
          </span>
        </div>
        <div className="btnlinkcontainer">
          <div className="linkContainer">
            <span className="something">{VL}</span>
          </div>
          <div>
            <button
              className="createBtn"
              onClick={() => window.open(VL, "_blank")}
            >
              Try Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
