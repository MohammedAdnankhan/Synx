import React, { useEffect, useState } from "react";
import PageContainer from "../../components/container/PageContainer";
import "./Verify.css";
import {
  DOWNLOADDETAILS,
  GET_TIMELINE_DATA,
  GetUserViewData,
} from "../../Api/GetData";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { getToken } from "../../Api/GetData";
import { useLocation } from "react-router";
import { NOTACAMERA, NOTAIMAGE } from "../../Global/Icons";
import moment from "moment";
import ModalWraper from "../../CustomComponent/ModalWraper";
import Confirmation from "../Confirmation/Confirmation";

const Verification = () => {
  const [on, setOn] = useState("Summary");
  const [viewData, setViewData] = useState({});
  const [TimelineData, setTimlineData] = useState({});
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  let locate = useLocation();
  let tok = getToken();

  useEffect(() => {
    GetUserViewData(`user/detail/${locate.state.ID}`, setViewData, tok);
    GET_TIMELINE_DATA(
      `user/detail/timeline/${locate.state.ID}`,
      setTimlineData,
      tok
    );
    window.scrollTo(0, 0);
  }, []);
  function GetDetails() {
    GetUserViewData(`user/detail/${locate.state.ID}`, setViewData, tok);
  }

  return (
    <PageContainer title={"User-Detail"}>
      <div className="container M2p">
        <Header
          val={on}
          set={setOn}
          Name={viewData?.name}
          tok={tok}
          UI={locate.state.ID}
        />
        {on === "Summary" ? (
          <SUMMARY
            Name={viewData?.name}
            PassData={viewData?.passportData}
            PasImg={viewData?.passportImage}
            Selfie={viewData?.selfieImage}
            platform={viewData?.platform}
            IP={viewData?.ipAddress}
            ID={viewData?._id}
            Date={TimelineData?.date}
            Status={TimelineData?.timlineData}
            FinalStatus={TimelineData?.finalStatus}
            UserId={locate.state.ID}
            countryName={viewData?.countryName}
            continent={viewData?.continent}
            region={viewData?.region}
            EOD={viewData?.region}
            setOpen={setOpen}
            viewData={viewData}
            open={open}
            GetDetails={GetDetails}
            handleClose={handleClose}
          />
        ) : (
          <Timeline
            Date={TimelineData?.date}
            Status={TimelineData?.timlineData}
            FinalStatus={TimelineData?.finalStatus}
            PasImg={viewData?.passportImage}
            Selfie={viewData?.selfieImage}
          />
        )}
      </div>
    </PageContainer>
  );
};

export default Verification;

export function getStatus(status) {
  if (status == "passed") {
    return "Pss";
  } else if (status == "failed") {
    return "Fld";
  } else {
    return "Pnd";
  }
}

export function CONVER_TIME(time) {
  const date = moment(Number(time));
  const localTime = date.format("hh:mm:ss");
  return localTime;
}
export function Header({ val, set, Name, tok, UI }) {
  return (
    <div className="just clit">
      <div>
        <span className="TitleH">{Name}</span>
      </div>
      <div className="just">
        <button
          className={val === "Summary" ? "act btn" : "dact btn"}
          onClick={() => set("Summary")}
        >
          Summary
        </button>
        <button
          className={val === "Timeline" ? "act btn" : "dact btn"}
          onClick={() => set("Timeline")}
        >
          Timeline
        </button>
        <button className="btn Fil" onClick={() => DOWNLOADDETAILS(tok, UI)}>
          Export PDF
        </button>
      </div>
    </div>
  );
}
export function SUMMARY({
  Name,
  PassData,
  PasImg,
  Selfie,
  setOpen,
  Date,
  open,
  Status,
  FinalStatus,
  UserId,
  platform,
  IP,
  handleClose,
  region,
  countryName,
  continent,
  GetDetails,
  viewData,
}) {
  var livliness = "";
  var Document = "";
  var FaceMatch = "";
  if (Status !== undefined && Status.length > 0) {
    // FaceMatch = Status[0][0]?.selfieStatus;
    // Document = Status[1][0]?.passportStatus;
    // livliness = Status[2][0]?.livelinessStatus;

    Status?.forEach((item) => {
      if ("selfieStatus" in item[0]) {
        return (FaceMatch = item[0].selfieStatus);
      } else if ("passportStatus" in item[0]) {
        return (Document = item[0].passportStatus);
      } else if ("livelinessStatus" in item[0]) {
        livliness = item[0].livelinessStatus;
      }
    });
  }
  return (
    <div className="flx MT3">
      <ModalWraper
        open={open}
        handleClose={handleClose}
        setOpen={setOpen}
        handleTableData={GetDetails}
        Id={"updateId"}
        GetData={"GetData"}
        Component={Confirmation}
        viewData={viewData}
        UserId={UserId}
      />
      <div className="w_50 P_40">
        <div>
          <div className="Heaer_contaner">
            <span className="Heaar_title">Overview</span>
          </div>
          <div className="A_1">
            <span className="T_1">Verification ID</span>
            <span className="T_1">{UserId}</span>
          </div>
          <div className="A_1">
            <span className="T_1">Final Status</span>
            <span className="T_1">{FinalStatus}</span>
          </div>
          <div className="A_1">
            <span className="T_1">Date</span>
            <span className="T_1">{Date}</span>
          </div>
        </div>

        <div>
          <div className="Heaer_contaner">
            <span className="Heaar_title">Verification Steps</span>
          </div>
          <div className="A_1">
            <span className="T_1">Liveness</span>
            <span className={getStatus(livliness)}>{livliness}</span>
          </div>
          <div className="A_1">
            <span className="T_1">Document</span>
            <span className={getStatus(Document)}>{Document}</span>
          </div>
          <div className="A_1">
            <span className="T_1">Face Match</span>
            <span className={getStatus(FaceMatch)}>{FaceMatch}</span>
          </div>
        </div>
        <div>
          <div className="Heaer_contaner">
            <span className="Heaar_title">Metadata</span>
          </div>
          <div className="A_1">
            <span className="T_1">IP</span>
            <span className="T_1 ">{IP}</span>
          </div>
          <div className="A_1">
            <span className="T_1">Platform</span>
            <span className="T_1 ">{platform}</span>
          </div>

          <div className="A_1">
            <span className="T_1">Country</span>
            <span className="T_1 ">{countryName}</span>
          </div>
          <div className="A_1">
            <span className="T_1">Region</span>
            <span className="T_1 ">{region}</span>
          </div>
          <div className="A_1">
            <span className="T_1">Continent</span>
            <span className="T_1 ">{continent}</span>
          </div>
        </div>
      </div>
      <div className="w_50 BRD">
        <div className="Center_IT ">
          <div className="Heaer_contaner">
            <span className="Heaar_title">Passport</span>
          </div>
          <div>
            <img src={PasImg} className="PasImg" />
          </div>

          <div>
            <div className="Heaer_contaner Flexit">
              <span className="Heaar_title ">Extracted Data</span>

              <div onClick={() => (Name ? setOpen(true) : "")}>
                <BorderColorIcon
                  style={{
                    color: Name ? "#8D79F6" : "grey",
                    // borderRadius: "100px",
                    padding: "5px",
                    // background: "#efeef9",
                    height: "30px",
                    width: "30px",
                  }}
                />
              </div>
            </div>
            <div className="A_1">
              <span className="T_1">Document Number</span>
              <span className="T_1 ">{PassData?.number}</span>
            </div>
            <div className="A_1">
              <span className="T_1">Given Name(s)</span>
              <span className="T_1 ">{Name}</span>
            </div>

            <div className="A_1">
              <span className="T_1">Surname</span>
              <span className="T_1 ">{PassData?.surname}</span>
            </div>
            <div className="A_1">
              <span className="T_1">D.O.B</span>
              <span className="T_1 ">{PassData?.date_of_birth}</span>
            </div>
            <div className="A_1">
              <span className="T_1">Expiration</span>
              <span className="T_1 ">{PassData?.expiration_date}</span>
            </div>
            <div className="A_1">
              <span className="T_1">Document Type</span>
              <span className="T_1 ">Passport</span>
            </div>
            <div className="A_1">
              <span className="T_1">Country</span>
              <span className="T_1 ">{PassData?.country}</span>
            </div>
          </div>
          <div className="Center_IT Hidden">
            <img src={Selfie} className="PasImg Selfi" />
          </div>
        </div>
      </div>
    </div>
  );
}
export function Timeline({ Date, Status, FinalStatus, PasImg, Selfie }) {
  var livliness = "";
  var Document = "";
  var FaceMatch = "";
  var livlinessTime = "";
  var DocumentTime = "";
  var FaceMatchTime = "";
  var VideoSrc = "";

  if (Status !== undefined && Status.length > 0) {
    Status?.forEach((item) => {
      if ("selfieStatus" in item[0]) {
        FaceMatch = item[0].selfieStatus;
        FaceMatchTime = CONVER_TIME(item[2].time);
      } else if ("passportStatus" in item[0]) {
        Document = item[0].passportStatus;
        DocumentTime = CONVER_TIME(item[2].time);
      } else if ("livelinessStatus" in item[0]) {
        livliness = item[0].livelinessStatus;
        VideoSrc = item[0].livelinessVideo;
        livlinessTime = CONVER_TIME(item[2].time);
      }
    });
  }

  return (
    <div className="flx MT3">
      <div className="w_60 P_40">
        <div className="G10">
          <div className="Heaer_contaner">
            <span className="Heaar_title">{Date}</span>
          </div>
          <div>
            <div className="Rw">
              <div className="FLXJTFY">
                <div className="Circle">
                  <span>1</span>
                </div>
                <span>{livlinessTime}</span>
              </div>
              <div className="Card Shd">
                <div>
                  <span className="TH1">Liveness Check</span>
                </div>
                <div>
                  {/* <span className="Pss">{livliness}</span> */}
                  <span className={getStatus(livliness)}>{livliness}</span>
                </div>
                <div>
                  {VideoSrc ? (
                    <video
                      src={VideoSrc}
                      controls={true}
                      className="Vid"
                    ></video>
                  ) : (
                    <div className="VidCont">
                      <NOTACAMERA />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className="Rw">
              <div className="FLXJTFY">
                <div className="Circle Pd8">
                  <span>2</span>
                </div>
                <span>{DocumentTime}</span>
              </div>
              <div className="Card">
                <div>
                  <span className="TH1">Document Scan</span>
                </div>
                <div>
                  {/* <span className="Pss">{Document}</span> */}
                  <span className={getStatus(Document)}>{Document}</span>
                </div>
                <div>
                  {PasImg ? (
                    <img src={PasImg} className="PasImg" />
                  ) : (
                    <div className="VidCont">
                      <NOTAIMAGE />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div></div>
        <div>
          <div>
            <div className="Rw">
              <div className="FLXJTFY">
                <div className="Circle Pd8">
                  <span>3</span>
                </div>
                <span>{FaceMatchTime}</span>
              </div>
              <div className="Card">
                <div>
                  <span className="TH1">Face Match</span>
                </div>
                <div>
                  {/* <span className="Pss">{FaceMatch}</span> */}
                  <span className={getStatus(FaceMatch)}>{FaceMatch}</span>
                </div>
                <div>
                  {/* <img
                    src="https://ringside24.com/media/post/Khabib-Nurmagomedov-a-lUFC-990313.jpg"
                    className="PasImg"
                  /> */}
                  <div className="Center_IT Hidden m0">
                    {Selfie ? (
                      <img src={Selfie} className="PasImg Selfi" />
                    ) : (
                      <div className="VidCont">
                        <NOTAIMAGE />
                      </div>
                    )}{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="Rw">
            <div className="FLXJTFY">
              <div className="Circle Pd8">
                <span>4</span>
              </div>
              {/* <span>11/11/11</span> */}
              <span>{FaceMatchTime}</span>
            </div>
            {/* <div className="Card">
              <div className="gp10">
                <span className="TH1">Final Status:</span>
                <span className="Pss">Passed</span>
              </div>
    
            </div> */}
            <div className="Card">
              <div>
                <span className="TH1">Final Status</span>
              </div>
              <div>
                <span className={getStatus(FinalStatus)}>{FinalStatus}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
