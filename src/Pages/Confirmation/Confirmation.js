import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Confirmation.css";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import moment from "moment/moment";
import { AiFillEdit } from "react-icons/ai";
import { UPDATEPASSPORTDETAIL } from "../../Api/FaceVrify";
const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [nameEr, setNameEr] = useState("");
  const [surName, setSurname] = useState("");
  const [surNameEr, setSurnameEr] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [countryEr, setCountryEr] = useState("");
  const [dob, setDob] = useState("");
  const [exp, setExp] = useState("");
  const [number, setNumber] = useState("");
  const [editedData, setEditedData] = useState({});
  const [userId, setUSerId] = useState("");
  let validation = [
    {
      name: "name",
      val: name,
    },
    { name: "surName", val: surName },
    { val: gender, name: "gender" },
    { val: country, name: "country" },
    { val: dob, name: "dob" },
    { val: exp, name: "exp" },
  ];

  const [errorValidatoin, seterrorValidatoin] = useState({
    name: false,
    surName: false,
    gender: false,
    country: false,
    dob: false,
    exp: false,
    // number: false,
    All: true,
  });
  function knowGender(abc) {
    if (abc !== "<") {
      return "Male";
    } else {
      return "Female";
    }
  }
  const formatDate = (dateString) => {
    let year = parseInt(dateString.slice(0, 2));
    if (year >= 45) {
      year += 1900; // Convert 19YY to YYYY format
    } else {
      year += 2000; // Convert 20YY to YYYY format
    }
    const month = parseInt(dateString.slice(2, 4)) - 1; // Subtract 1 to match JavaScript month (0-indexed)
    const day = parseInt(dateString.slice(4, 6));
    return new Date(year, month, day);
  };

  // const ValidatedEdit = () => {
  //   validation.map((data, i) => {
  //     console.log("name", data.val);
  //     let nm = data.name;
  //     if (data.val.length < 1) {
  //       seterrorValidatoin((prevState) => ({
  //         ...prevState,
  //         [nm]: true,
  //       }));
  //     } else {
  //       seterrorValidatoin((prevState) => ({
  //         ...prevState,
  //         [nm]: false,
  //       }));
  //     }
  //   });
  // };
  // console.log(errorValidatoin);
  const handleDateChange = (date, setData) => {
    const formattedDate = moment(date).format("YYYY MM DD");
    // console.log(formattedDate);
    setData(formattedDate);
  };
  useEffect(() => {
    setName(location?.state.userDetail?.names);
    setSurname(location?.state.userDetail?.surname);
    setGender(knowGender(location?.state.userDetail?.sex));
    setCountry(location?.state.userDetail?.nationality);
    setDob(formatDate(location?.state.userDetail?.date_of_birth));
    setExp(formatDate(location?.state.userDetail?.expiration_date));
    setEditedData(location?.state.userDetail);
    setNumber();
    setUSerId(sessionStorage.getItem("UID"));
  }, []);
  function handleEditedData() {
    const data = {
      ...editedData, // Spread the existing object
      names: name,
      surname: surName,
      country: country,
      date_of_birth: dob,
      expiration_date: exp,
      sex: gender,

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

    if (name !== "" && country !== "" && surName !== "") {
      UPDATEPASSPORTDETAIL(navigate, { userId: userId, data: data });
    }
  }

  const EnableEdit = () => {
    seterrorValidatoin((prevState) => ({
      ...prevState,
      All: !errorValidatoin.All,
    }));
  };
  return (
    <div className="houseContainer VT100 ">
      <div className="verificationCard W70H80 M2 H70 ">
        <div className="IconCont">
          <AiFillEdit
            className="IconEdit"
            style={{ color: errorValidatoin.All ? "grey" : "#6b5eff" }}
            onClick={EnableEdit}
          />
        </div>
        <div className="CENT MT15P HD">
          <img
            src={location?.state?.userImg}
            className="PImg"
            style={{ transform: "scale(1.6) scaleX(-1)" }}
          />
        </div>

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
                  selected={formatDate(
                    location?.state.userDetail?.date_of_birth
                  )}
                  value={dob}
                  onChange={(e) => {
                    handleDateChange(e, setDob);
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
                {/* <input
                className="inputStyle"
                value={exp}
                onChange={(e) => setExp(e.target.value)}
              /> */}

                <DatePicker
                  id="dob-input"
                  selected={formatDate(
                    location?.state.userDetail?.expiration_date
                  )}
                  value={exp}
                  // onChange={(e) => setExp(e.target.value)}
                  disabled={errorValidatoin.All}
                  onChange={(e) => handleDateChange(e, setExp)}
                  dateFormat="yyyy MM dd"
                  className="inputStyle Wid100"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="FLX100 MT20 Flip">
          <div className="STR">
            <button
              className="fillBtn  Cust "
              onClick={() => navigate("/face-verification")}
            >
              Back
            </button>
          </div>
          <button
            className="fillBtn  Cust "
            // onClick={() => navigate("/select-document")}
            onClick={handleEditedData}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
