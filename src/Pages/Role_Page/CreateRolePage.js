import React, { useEffect, useState } from "react";
import "./Role.css";
import PageContainer from "../../components/container/PageContainer";
import Title from "../../CustomComponent/Title";
import { ADDROLES, getToken } from "../../Api/GetData";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { GiveSubs } from "../../layouts/full-layout/sidebar/Menuitems";

const CreateRolePage = () => {
  const [admin, setAdmin] = useState("");
  const [adminEr, setAdminEr] = useState("");
  const [dashView, setDashView] = useState(false);
  const [userView, setuserView] = useState(false);
  const [userEdit, setUserEdit] = useState(false);
  const [userDelete, setdeleteUser] = useState(false);
  const [teamView, setteamView] = useState(false);
  const [teamEdit, setteamEdit] = useState(false);
  const [teamDelete, setteamDelete] = useState(false);
  const [orgView, setorgView] = useState(false);
  const [orgEdit, setorgEdit] = useState(false);
  const [subView, setsubView] = useState(false);
  const [subEdit, setsubEdit] = useState(false);
  const [dataEdit, setdataEdit] = useState(false);
  const [dataRView, setdataRVeiw] = useState(false);
  const [apiView, setapiView] = useState(false);
  const [apiEdit, setapiEdit] = useState(false);
  const [apiDelete, setapiDelete] = useState(false);
  const [roleView, setroleView] = useState(false);
  const [roleEdit, setroleEdit] = useState(false);
  const [roleDelete, setroleDelete] = useState(false);
  const [APIView, setAPIeView] = useState(false);
  const [AIPEdit, setAIPEdit] = useState(false);
  const [APIDelete, setAPIDelete] = useState(false);
  const [dis, setDis] = useState(true);
  const [access, setAccess] = useState([]);
  const token = getToken();
  let navigate = useNavigate();

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

  useEffect(() => {
    GetSubsAccess();
  }, [permission]);

  const AccessDetail = [
    {
      name: "Dashboard",
      route: "/dashboard",
      api: "/dashboard",
    },

    {
      name: "User",
      route: "/user-management",
      api: "/user/retrive/all",
    },
    {
      name: "Team",
      route: "/team-management",
      api: "/team/retrive/all",
    },
    {
      name: "Organization",
      route: "/organization",
      api: "/2FADetails",
    },

    {
      name: "Subscription",
      route: "/subscription",
      api: "/payHistory",
    },
    {
      name: "Data retention",
      route: "/data-retention",
      api: "/update/retentionPeriod",
    },
    {
      name: "Api Settings",
      route: "/api-setting",
      api: "/URL",
    },

    {
      name: "Roles management",
      route: "/roles-management",
      api: "",
    },
    {
      name: "Api Documentation",
      route: "/API-documentation",
      api: "",
    },
  ];

  const handleCheckboxChange = (e, setState, Number, value) => {
    e.preventDefault();

    let obj = {
      route: AccessDetail[Number].route,
      tabName: AccessDetail[Number].name,
      subs: [
        {
          api: AccessDetail[Number].api,
          name: value,
          route: AccessDetail[Number].route,
        },
      ],
    };

    let FeatureName = AccessDetail[Number].name;

    const matchingAccessIndex = access.findIndex(
      (obj) => obj.tabName === FeatureName
    );

    if (e.target.checked) {
      setState(e.target.checked);

      if (matchingAccessIndex !== -1) {
        const matchingAccess = access[matchingAccessIndex];
        const matchingSubsIndex = matchingAccess.subs.findIndex(
          (sub) => sub.name === value
        );

        if (matchingSubsIndex !== -1) {
          matchingAccess.subs.splice(matchingSubsIndex, 1);

          if (matchingAccess.subs.length === 0) {
            access.splice(matchingAccessIndex, 1); // Remove the object if subs is empty
          }

          setAccess([...access]); // Update the access state
        } else {
          matchingAccess.subs.push({
            api: AccessDetail[Number].api,
            name: value,
            route: AccessDetail[Number].route,
          });
          setAccess([...access]); // Update the access state
        }
      } else {
        setAccess((prevAccess) => [...prevAccess, obj]); // Add the entire object to access state
      }
    } else {
      setState(false);
      if (matchingAccessIndex !== -1) {
        const matchingAccess = access[matchingAccessIndex];
        const matchingSubsIndex = matchingAccess.subs.findIndex(
          (sub) => sub.name === value
        );

        if (matchingSubsIndex !== -1) {
          matchingAccess.subs.splice(matchingSubsIndex, 1);

          if (matchingAccess.subs.length === 0) {
            access.splice(matchingAccessIndex, 1); // Remove the object if subs is empty
          }

          setAccess([...access]); // Update the access state
        } else {
          matchingAccess.subs.push({
            api: AccessDetail[Number].api,
            name: value,
            route: AccessDetail[Number].route,
          });
          setAccess([...access]); // Update the access state
        }
      }
    }
  };

  function addRole(e) {
    e.preventDefault();
    if (admin !== "" && access.length >= 1) {
      ADDROLES(
        {
          name: admin,
          fields: access,
        },
        token,
        navigate
      );

      setAdminEr("");
    } else {
      if (!admin) {
        setAdminEr("Invalid Role");
      } else if (!access.length >= 1) {
        setAdminEr("Please select at least one Feature");
      } else setAdminEr("");
    }
  }

  function CheckBox({ state, setState, dis = false, value, Number }) {
    return (
      <div className="ChkCont">
        <input
          type="checkbox"
          disabled={dis}
          className={dis ? "InputCheck Dis" : "InputCheck"}
          checked={state}
          onChange={(e) => handleCheckboxChange(e, setState, Number, value)}
        />
      </div>
    );
  }
  return (
    <PageContainer title="Add Roles">
      <div className="jtfy">
        <Title title="Add Roles" />
      </div>
      <form onSubmit={addRole}>
        <div className="inputConatinerStyle">
          <div className="inpuWiCont P20 Crd Bdr">
            <div className="Wid25 ">
              <input
                type="text"
                className="inputStyle"
                placeholder="Role Name"
                onChange={(e) => {
                  setAdmin(e.target.value);
                  setAdminEr("");
                }}
                value={admin}
              />
              {adminEr && <span className="ERRMSG"> {adminEr}</span>}
            </div>
            <button
              className={access.length == 0 ? "btnSub Gray" : "btnSub"}
              disabled={access.length == 0 ? true : false}
              style={{ width: "fit-content" }}
            >
              Add Role
            </button>
          </div>

          <div className="Crd P20">
            <div className="inpuWiCont P20 Bdr">
              <div className="MidCenter Wid50">
                <span className="Til">Features</span>
              </div>
              <div className="MidCenter Wid50">
                <span className="Til">Actions</span>
              </div>
            </div>
            <div className="FlxEnd Bdr P20 Bdr">
              <div className="inpuWiCont  Wid50 ">
                <div>
                  <span className="Til Gr">View</span>
                </div>
                <div>
                  <span className="Til Gr">Edit</span>
                </div>
                <div>
                  {" "}
                  <span className="Til Gr">Delete</span>
                </div>
              </div>
            </div>
            <div className="inpuWiCont P20 Bdr">
              <div className="Srt Wid50">
                <span className="Til">Dashboard</span>
              </div>
              <div className="SpB Wid50">
                <CheckBox
                  state={dashView}
                  setState={setDashView}
                  Number={0}
                  value={"View"}
                />
                <CheckBox dis={true} />
                <CheckBox dis={true} />
              </div>
            </div>

            <div className="inpuWiCont P20 Bdr">
              <div className="Srt Wid50">
                <span className="Til">User</span>
              </div>
              <div className="SpB Wid50">
                <CheckBox
                  state={userView}
                  setState={setuserView}
                  value={"View"}
                  Number={1}
                />
                <CheckBox
                  state={userEdit}
                  setState={setUserEdit}
                  value={"Edit"}
                  Number={1}
                />
                <CheckBox
                  state={userDelete}
                  setState={setdeleteUser}
                  value={"Delete"}
                  Number={1}
                />
              </div>
            </div>
            <div className="inpuWiCont P20 Bdr">
              <div className="Srt Wid50">
                <span className="Til">Team</span>
              </div>
              <div className="SpB Wid50">
                <CheckBox
                  state={teamView}
                  setState={setteamView}
                  value={"View"}
                  Number={2}
                />
                <CheckBox
                  state={teamEdit}
                  setState={setteamEdit}
                  value={"Edit"}
                  Number={2}
                />
                <CheckBox
                  state={teamDelete}
                  setState={setteamDelete}
                  value={"Delete"}
                  Number={2}
                />
              </div>
            </div>
            <div className="inpuWiCont P20 Bdr">
              <div className="Srt Wid50">
                <span className="Til">Organization</span>
              </div>
              <div className="SpB Wid50">
                <CheckBox
                  state={orgView}
                  setState={setorgView}
                  value={"View"}
                  Number={3}
                />
                <CheckBox
                  state={orgEdit}
                  setState={setorgEdit}
                  value={"Edit"}
                  Number={3}
                />
                <CheckBox dis={true} />
              </div>
            </div>
            <div className="inpuWiCont P20 Bdr">
              <div className="Srt Wid50">
                <span className="Til">Subscriptions</span>
              </div>
              <div className="SpB Wid50">
                <CheckBox
                  state={subView}
                  setState={setsubView}
                  Number={4}
                  value={"View"}
                />
                <CheckBox
                  state={subEdit}
                  setState={setsubEdit}
                  value={"Edit"}
                  Number={4}
                />
                <CheckBox dis={true} />
              </div>
            </div>
            <div className="inpuWiCont P20 Bdr">
              <div className="Srt Wid50">
                <span className="Til">Data Retention</span>
              </div>
              <div className="SpB Wid50">
                <CheckBox
                  state={dataRView}
                  setState={setdataRVeiw}
                  value={"View"}
                  Number={5}
                />
                <CheckBox
                  state={dataEdit}
                  setState={setdataEdit}
                  value={"Edit"}
                  Number={5}
                />
                <CheckBox dis={true} />
              </div>
            </div>
            <div className="inpuWiCont P20 Bdr">
              <div className="Srt Wid50">
                <span className="Til">Api Settings</span>
              </div>
              <div className="SpB Wid50">
                <CheckBox
                  state={apiView}
                  setState={setapiView}
                  value={"View"}
                  Number={6}
                />
                <CheckBox
                  state={apiEdit}
                  setState={setapiEdit}
                  value={"Edit"}
                  Number={6}
                />
                <CheckBox
                  state={apiDelete}
                  setState={setapiDelete}
                  value={"Delete"}
                  Number={6}
                />
              </div>
            </div>

            <div className="inpuWiCont P20 Bdr">
              <div className="Srt Wid50">
                <span className="Til">Roles</span>
              </div>
              <div className="SpB Wid50">
                <CheckBox
                  state={roleView}
                  setState={setroleView}
                  value={"View"}
                  Number={7}
                />
                <CheckBox
                  state={roleEdit}
                  setState={setroleEdit}
                  value={"Edit"}
                  Number={7}
                />
                <CheckBox
                  state={roleDelete}
                  setState={setroleDelete}
                  value={"Delete"}
                  Number={7}
                />
              </div>
            </div>

            <div className="inpuWiCont P20 Bdr">
              <div className="Srt Wid50">
                <span className="Til">API DOCUMENTATION</span>
              </div>
              <div className="SpB Wid50">
                <CheckBox
                  state={APIView}
                  setState={setAPIeView}
                  value={"View"}
                  Number={8}
                />
                <CheckBox
                  state={AIPEdit}
                  setState={setAIPEdit}
                  value={"Edit"}
                  Number={8}
                />
                <CheckBox
                  state={APIDelete}
                  setState={setAPIDelete}
                  value={"Delete"}
                  Number={8}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </PageContainer>
  );
};

export default CreateRolePage;
