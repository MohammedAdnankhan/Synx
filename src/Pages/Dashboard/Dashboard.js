import * as React from "react";
import PageContainer from "../../components/container/PageContainer";
import DashCard from "../../CustomComponent/DashCard";
import LineGraph from "../../CustomComponent/LineGraph";
import "./Dasboard.css";
import { LIMITICONS, TEAMICON, VERIFYICON } from "../../Global/Icons";
import {
  GetDataDashboardData,
  GetGraphData,
  getToken,
} from "../../Api/GetData";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { GiveSubs } from "../../layouts/full-layout/sidebar/Menuitems";

const Dashboard = () => {
  const [color, setcolor] = React.useState("Verifications");
  const [cardData, setCardData] = React.useState();
  const [graphData, setGraphData] = React.useState([]);
  const [Xdata, setXdata] = React.useState([]);
  const [Ydata, setYdata] = React.useState([]);
  const [viewAccess, setViewAccess] = React.useState(false);
  const token = getToken();
  const permission = useSelector((state) => state.CustomizerReducer.Access);

  const navigate = useNavigate();
  function handleColor(title) {
    setcolor(title);
  }

  function GetDashboard() {
    GetDataDashboardData(setCardData, token, navigate);
  }

  function GetSubsAccess() {
    let arr = GiveSubs(permission, "Dashboard", "subs");
    if (arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].name === "View") {
          setViewAccess(true);
        }
      }
    } else {
      if (permission[0]?.route) {
        navigate(permission[0].route);
      }
    }
  }

  function GetData(time) {
    time == undefined ? (time = "yearly") : "";
    GetGraphData(
      {
        range: time,
      },
      token
    )
      .then((GD) => {
        setXdata([]);
        setYdata([]);
        if (GD) {
          GD?.forEach((data) => {
            setXdata((prevXdata) => [...prevXdata, data.start]);
            setYdata((prevYdata) => [...prevYdata, data.count]);
          });
        }
      })
      .catch((er) => {
        setXdata([]);
        setYdata([]);
      });
  }
  React.useEffect(() => {
    GetDashboard();
    GetSubsAccess();
    GetData();
  }, []);

  return (
    <PageContainer title="Dashboard">
      <div className="str flxwrp">
        <DashCard
          title="Verifications"
          number={cardData !== undefined ? cardData[0]?.totalUsers : "0"}
          Icon={<VERIFYICON />}
          setcolor={handleColor}
          color={color}
        />
        <DashCard
          title="Team Members"
          number={
            cardData !== undefined ? cardData[0]?.totalActiveTeamMember : "0"
          }
          Icon={<TEAMICON />}
          setcolor={handleColor}
          color={color}
        />
        <DashCard
          title="Limit"
          number={cardData !== undefined ? cardData[0]?.limit : "0"}
          Icon={<LIMITICONS />}
          setcolor={handleColor}
          color={color}
        />
      </div>
      <LineGraph GetData={GetData} Xdata={Xdata} Ydata={Ydata} />
    </PageContainer>
  );
};

export default Dashboard;
