import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Confirmation.css";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import moment from "moment/moment";

import BorderColorIcon from "@mui/icons-material/BorderColor";
import { CROSSICON } from "../../Global/Icons";
import { CREATE_FUI_ADMIN, Update_Pass, getToken } from "../../Api/GetData";

// import { AiFillEdit } from "react-icons/ai";
// import { UPDATEPASSPORTDETAIL } from "../../Api/FaceVrify";
const Confirmation = ({ setOpen, viewData, handleTableData, UserId }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [nameEr, setNameEr] = useState("");
  const [surName, setSurname] = useState("");
  const [surNameEr, setSurnameEr] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [countryEr, setCountryEr] = useState("");
  const [dob, setDob] = useState("01/01/2001");
  const [exp, setExp] = useState("01/01/2001");
  const [number, setNumber] = useState("");
  const [numberEr, setNumberEr] = useState("");
  const [disable, setDisable] = useState(false);
  const [editedData, setEditedData] = useState({});
  // const [userId, setUSerId] = useState("");
  const [selectdob, setselectDob] = useState(null);
  const [selectExp, setselectExp] = useState("");
  const [errorValidatoin, seterrorValidatoin] = useState({
    name: false,
    surName: false,
    gender: false,
    country: false,
    dob: false,
    exp: false,
    // number: false,
    All: false,
  });
  let token = getToken();
  function knowGender(abc) {
    if (abc !== "<") {
      return "Male";
    } else {
      return "Female";
    }
  }

  const handleDateChange = (date, setData, show) => {
    show(date);
    const formattedDate = moment(date).format("YYYY-MM-DD");
    const ft = moment(date).format("YYYYMMDD");

    setData(formattedDate);
  };

  function handleEditedData() {
    let data = {
      ...editedData, // Spread the existing object
      names: name,
      surname: surName,
      country: country,
      date_of_birth: dob,
      expiration_date: exp,
      sex: gender,
      number: number,

      // Update the value of key2
    };
    if (name == "") {
      setNameEr("Invalid Name");
    } else {
      setNameEr("");
    }
    if (surName == "") {
      setSurnameEr("Invalid Surname");
    } else {
      setSurnameEr("");
    }
    if (country == "") {
      setCountryEr("Invalid Country");
    } else {
      setCountryEr("");
    }
    if (number == "") {
      setNumberEr("Invalid Number");
    } else {
      setNumberEr("");
    }

    if (name !== "" && country !== "" && surName !== "" && number !== "") {
      setDisable(true);
      // console.log(data, "123432123");
      // UPDATEPASSPORTDETAIL(navigate, { userId: userId, data: data });

      // CREATE_FUI_ADMIN(
      //   token,
      //   `user/update/${UserId}`,
      //   { data: data },
      //   "Details Updated",
      //   handleTableData
      // );
      Update_Pass(token, `user/update/${UserId}`, { data: data })
        .then((res) => {
          handleTableData();
          setOpen(false);
          setDisable(false);
          res("Details Updated");
        })
        .catch((err) => {
          // err;
          setOpen(false);
          setDisable(false);
        });
    }
  }

  const EnableEdit = () => {
    seterrorValidatoin((prevState) => ({
      ...prevState,
      All: !errorValidatoin.All,
    }));
  };

  useEffect(() => {
    // console.log(viewData, "viewData");

    setName(viewData?.passportData?.names);
    setSurname(viewData?.passportData?.surname);
    setCountry(viewData?.passportData?.nationality);
    setGender(viewData?.passportData?.sex);
    setExp(viewData?.passportData?.expiration_date);
    setDob(viewData?.passportData?.date_of_birth);
    setEditedData(viewData?.passportData);
    setNumber(viewData?.passportData?.number);
  }, []);
  return (
    <div className="houseContainer VT100 Pr100 ">
      <div className="verificationCard W70H80 Marg H70 ">
        <div className="IconCont Flex">
          <span className="ViewT">Verification Update</span>
          {/* <BorderColorIcon
            style={{
              color: errorValidatoin.All ? "#6b5eff" : "grey",
         
              padding: "5px",
              height: "30px",
              width: "30px",
            }}
            className="IconEdit"
            onClick={EnableEdit}
          /> */}
          <div onClick={() => setOpen(false)}>
            <CROSSICON />
          </div>
        </div>
        {/* <div className="CENT MT15P HD">
          <img
            src={location?.state?.userImg}
            className="PImg"
            style={{ transform: "scale(1.6) scaleX(-1)" }}
          />
        </div> */}

        <div className="Flx WD100">
          <div className="  COL">
            <div className="Box">
              <div className="inpuContainaer">
                <div>
                  <span className="T1">Name</span>
                </div>
                <input
                  className={nameEr ? "inputStyle Err" : "inputStyle"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={errorValidatoin.All}
                />
                {/* {nameEr && <span className="Err">{nameEr}</span>} */}
              </div>

              <div className="inpuContainaer">
                <div>
                  <span className="T1">Surname</span>
                </div>
                <input
                  className={surNameEr ? "inputStyle Err" : "inputStyle"}
                  value={surName}
                  disabled={errorValidatoin.All}
                  onChange={(e) => setSurname(e.target.value)}
                />
                {/* {surNameEr && <span className="Err">{surNameEr}</span>} */}
              </div>
            </div>
            <div className="Box colit">
              <div className="inpuContainaer">
                <div>
                  <span className="T1">Document No</span>
                </div>
                <input
                  className={numberEr ? "inputStyle Err" : "inputStyle"}
                  value={number}
                  onChange={(e) => {
                    setNumber(e.target.value);
                  }}
                  disabled={errorValidatoin.All}
                />
                {/* {countryEr && <span className="Err">{countryEr}</span>} */}
              </div>
              <div className="inpuContainaer">
                <div>
                  <span className="T1">Nationality</span>
                </div>
                <input
                  className={countryEr ? "inputStyle Err" : "inputStyle"}
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                  }}
                  disabled={errorValidatoin.All}
                />
                {/* {countryEr && <span className="Err">{countryEr}</span>} */}
              </div>

              <div className="inpuContainaer">
                <div>
                  <span className="T1">Gender</span>
                </div>

                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={gender}
                    disabled={errorValidatoin.All}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="Box">
              <div className="inpuContainaer">
                <div>
                  <span className="T1">D.O.B</span>
                </div>

                <DatePicker
                  id="dob-input"
                  selected={selectdob}
                  value={dob}
                  onChange={(e) => {
                    handleDateChange(e, setDob, setselectDob);
                  }}
                  disabled={errorValidatoin.All}
                  dateFormat="yyyy MM dd"
                  className="inputStyle Wid100"
                />
              </div>

              <div className="inpuContainaer">
                <div>
                  <span className="T1">Expiration Date</span>
                </div>

                <DatePicker
                  id="dob-input"
                  selected={selectExp}
                  value={exp}
                  disabled={errorValidatoin.All}
                  onChange={(e) => handleDateChange(e, setExp, setselectExp)}
                  dateFormat="yyyy MM dd"
                  className="inputStyle Wid100"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="FLX100 MT20 Flip">
          {/* <div className="STR">
            <button className="fillBtn  Cust " onClick={() => setOpen(false)}>
              Back
            </button>
          </div> */}
          <button
            // className="fillBtn  Cust "
            className="IniviteBtn"
            // onClick={() => navigate("/select-document")}
            disabled={disable ? true : false}
            style={{ background: disable ? "grey" : "#6b5eff" }}
            onClick={handleEditedData}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
