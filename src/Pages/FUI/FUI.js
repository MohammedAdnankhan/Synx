import React, { useEffect, useState } from "react";
import Title from "../../CustomComponent/Title";
import DeleteIcon from "@mui/icons-material/Delete";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import Modal from "@mui/material/Modal";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { countries, style } from "../../CustomComponent/Msg";
import "./FUI.css";
import { CREATE_FUI_ADMIN, GET_FUI_DATA, getToken } from "../../Api/GetData";
import { CustomDeleteModal } from "../../CustomComponent/OrganizationTable";
import UpdateFuiModal from "../../CustomComponent/UpdateFUIModal";
import { DELETEIT } from "../../Api/Delete";
import { FUIHeader } from "../../Global/TableHeaders";

const FUI = () => {
  const [country, setCountry] = useState("");
  const [limitedCountry, setLimitedCountry] = useState([]);
  const [countryEr, setCountryEr] = useState("");
  const [link, setLink] = useState("");
  const [linkEr, setLinkEr] = useState("");
  const [id, setId] = useState("");
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [key, setKey] = useState("");
  const [userIdEr, setUserIdEr] = useState("");
  const [passwordEr, setPasswordEr] = useState("");
  const [keyEr, setKeyEr] = useState("");
  const [dis, setDis] = useState(true);
  const [showcountry, setshowCountry] = useState(null);
  const [showPas, showPasswords] = useState(true);
  const [showPas1, showPasswords1] = useState(true);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [openDelteModal, setopenDelteModal] = React.useState(false);
  const handleCloseDeleteModal = () => setopenDelteModal(false);
  const [delId, setIdDel] = React.useState("");
  const [updateId, setupdateId] = React.useState("");
  const [tableData, setTableData] = React.useState([]);

  let token = getToken();
  function handleCreateFUI() {
    if (userId == "") {
      setUserIdEr("Please enter a valid UserId");
    } else {
      setUserIdEr("");
    }
    if (password == "") {
      setPasswordEr("Please enter a valid Password");
    } else {
      setPasswordEr("");
    }
    if (key == "") {
      setKeyEr("Please enter a valid Key");
    } else {
      setKeyEr("");
    }
    if (key && userId && password) {
      setKey("");
      setUserId("");
      setPassword("");
      setLink("");
      setshowCountry(null);
      setDis(true);
      // console.log(id, key, userId, password, country, link, "k ,us,p,c,l");
      CREATE_FUI_ADMIN(
        token,
        `fui/add/${id}`,
        {
          password: password,
          username: userId,
          apiKey: key,
        },

        "FIU Added Successfully",
        GETFUIDATA
      );
    }
  }

  // func for given link from FUI created country data
  function findCountryByName(name, want) {
    const matchedCountry = data?.find(
      (country) => country.countryName === name
    );
    return matchedCountry ? matchedCountry[want] : null;
  }
  function GETFUIDATA() {
    // get Data for country

    GET_FUI_DATA(token, "fui/all")
      .then((res) => {
        let a = findMatchedCountries(countries, res?.data?.data);
        setLimitedCountry(a);
        setData(res?.data?.data);
      })
      .catch((err) => console.log(err));

    // Table data

    // GET_FUI_DATA(token, "added/fui/all")
    //   .then((res) => {
    //     setTableData(res?.data?.data[0]?.FUIs);
    //   })
    //   .catch((err) => console.log(err));
    GetTableData();
  }

  const handleCountrySelect = (event, value) => {
    setDis(false);

    let val = findCountryByName(value.label, "link");
    let id = findCountryByName(value.label, "_id");
    setId(id);
    setLink(val);

    setshowCountry(value);

    if (value) {
      setCountry(value.label);
    }
  };
  //  Open delete Modal and delete it with ID and aslo Edit
  const handleOpenDeleteModal = (id) => {
    setopenDelteModal(true);
    setIdDel(id);
  };
  const handleUpdateModal = (id) => {
    setOpen(true);
    setupdateId(id);
  };

  // Delete FUI list  Item

  function handleDelete() {
    // console.log("hit it ");
    handleCloseDeleteModal();

    DELETEIT(`fui/remove/${delId}`, "FIU Deleted", token, GETFUIDATA);
  }
  // func for filter the country from the whole country array with the created FUI country
  function findMatchedCountries(firstArray, secondArray) {
    const matchedCountries = [];

    secondArray?.forEach((item) => {
      const countryName = item.countryName;
      const matchedCountry = firstArray.find(
        (country) => country.label === countryName
      );

      if (matchedCountry) {
        matchedCountries.push(matchedCountry);
      }
    });

    return matchedCountries;
  }

  function GetTableData() {
    GET_FUI_DATA(token, "added/fui/all")
      .then((res) => {
        setTableData(res?.data?.data[0]?.FUIs);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    GETFUIDATA(); // func for Getting country dropdown data
  }, []);
  return (
    <div id="myElement">
      <CustomDeleteModal
        open={openDelteModal}
        handleClose={handleCloseDeleteModal}
        setOpen={setopenDelteModal}
        handleDelte={handleDelete}
      />
      <InviteModal
        open={open}
        handleClose={handleClose}
        setOpen={setOpen}
        handleTableData={GetTableData}
        Id={"updateId"}
        GetData={GETFUIDATA}
        updateId={updateId}
      />
      <div>
        <Title title="FIU" />
      </div>
      <div className="Flx Rsp Alup">
        <div className="F50 Gap20 Shadow HAuto">
          <div>
            <span className="Hd">Country</span>
          </div>
          {/* <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Country</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={country}
              label="Country"
            >
              {data?.map((info, index) => (
                <MenuItem
                  value={info?.countryName}
                  key={index}
                  onClick={(event) =>
                    handleChange(info?.countryName, info?.link)
                  }
                >
                  {info?.countryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
          <Autocomplete
            id="country-select-demo"
            // sx={{ width: 300 }}
            options={limitedCountry}
            autoHighlight
            value={showcountry}
            onChange={handleCountrySelect}
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                <img
                  loading="lazy"
                  width="20"
                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                  alt=""
                />
                {option.label} ({option.code}){/* +{option.phone} */}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                // label="Choose a country"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
          {/* {country && ( */}
          <div className="fildContainer">
            <div className="MB20">
              {" "}
              <span className="Heading">URL</span>
            </div>
            <div className="externalInput">
              <input
                className="internalInput"
                onChange={(e) => setLink(e.target.value)}
                placeholder="URL"
                value={link}
                disabled
              />
            </div>
          </div>
          {/* )} */}
        </div>

        <div className="F50 Gap20 Shadow HAuto">
          <div className="">
            <div className="">
              <span className="Hd">Credentials</span>
            </div>
            <div className="fildContainer">
              <div className="MB20">
                {" "}
                <span className="Heading">User Id</span>
              </div>
              <div className="externalInput ">
                <input
                  className="internalInput"
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="User Id"
                  value={userId}
                  disabled={dis}
                />
              </div>
              {userIdEr && <span className="ER">{userIdEr}</span>}
            </div>
            <div className="fildContainer">
              <div className="MB20">
                {" "}
                <span className="Heading">Password</span>
              </div>
              <div className="externalInput FlxInput">
                <input
                  className="internalInput"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  value={password}
                  disabled={dis}
                  type={showPas ? "password" : "text"}
                />
                {showPas ? (
                  <VisibilityOffIcon
                    style={{
                      cursor: "pointer",
                      color: "grey",
                    }}
                    onClick={() => showPasswords(false)}
                  />
                ) : (
                  <RemoveRedEyeIcon
                    style={{
                      cursor: "pointer",
                      color: "grey",
                    }}
                    onClick={() => showPasswords(true)}
                  />
                )}
              </div>
              {passwordEr && <span className="ER">{passwordEr}</span>}
            </div>
            <div className="fildContainer">
              <div className="MB20">
                {" "}
                <span className="Heading">Key</span>
              </div>
              <div className="externalInput FlxInput Pd8">
                <VpnKeyIcon className="Gry" />
                <input
                  className="internalInput"
                  onChange={(e) => setKey(e.target.value)}
                  placeholder="Key"
                  value={key}
                  type={showPas1 ? "password" : "text"}
                  disabled={dis}
                />

                {showPas1 ? (
                  <VisibilityOffIcon
                    style={{
                      cursor: "pointer",
                      color: "grey",
                    }}
                    onClick={() => showPasswords1(false)}
                  />
                ) : (
                  <RemoveRedEyeIcon
                    style={{
                      cursor: "pointer",
                      color: "grey",
                    }}
                    onClick={() => showPasswords1(true)}
                  />
                )}
              </div>
              {keyEr && <span className="ER">{keyEr}</span>}
            </div>
            <div className="End">
              <button
                className="btnSub"
                onClick={handleCreateFUI}
                disabled={dis}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "2%" }}>
        <TableContainer sx={{}}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {FUIHeader.map((column, index) => (
                  <TableCell
                    key={index}
                    className="HeaderCenter"
                    style={{
                      background: "#efeef9",
                      padding: "30px",
                      textAlign: "center",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData?.map((row, index) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={index}
                    style={{
                      background: index % 2 !== 0 ? "#efeef9" : "",
                    }}
                  >
                    <TableCell className="centerCell TCent" align="center">
                      {row?.username}
                    </TableCell>

                    <TableCell className="centerCell TCent">
                      {row?.countryName}
                    </TableCell>
                    <TableCell className="centerCell TCent">
                      {row?.link}
                    </TableCell>

                    <TableCell
                      className="centerCell TCent"
                      style={{ minWidth: "170px" }}
                    >
                      <Tooltip
                        title="Edit"
                        onClick={() => handleUpdateModal(row)}
                      >
                        <IconButton>
                          <BorderColorIcon
                            style={{
                              color: "#8D79F6",
                              borderRadius: "100px",
                              padding: "5px",
                              background: "#efeef9",
                              height: "30px",
                              width: "30px",
                            }}
                          />
                        </IconButton>
                      </Tooltip>
                      <Tooltip
                        title="Delete"
                        onClick={() => handleOpenDeleteModal(row?.fuiId)}
                      >
                        <IconButton>
                          <DeleteIcon
                            style={{
                              color: "#8D79F6",
                              borderRadius: "100px",
                              padding: "5px",
                              background: "#efeef9",
                              height: "30px",
                              width: "30px",
                            }}
                          />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
              {/* {data?.map((row, index) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={index}
                    style={{
                      background: index % 2 !== 0 ? "#efeef9" : "",
                    }}
                  >
                    <TableCell className="centerCell TCent" align="center">
                      {index + 1}
                    </TableCell>

                    <TableCell className="centerCell TCent">
                      {row?.countryName}
                    </TableCell>
                    <TableCell className="centerCell TCent">
                      {row?.link}
                    </TableCell>

                    <TableCell
                      className="centerCell TCent"
                      style={{ minWidth: "170px" }}
                    >
                      <Tooltip
                        title="Edit"
                        onClick={() => handleUpdateModal(row?._id)}
                      >
                        <IconButton>
                          <BorderColorIcon
                            style={{
                              color: "#8D79F6",
                              borderRadius: "100px",
                              padding: "5px",
                              background: "#efeef9",
                              height: "30px",
                              width: "30px",
                            }}
                          />
                        </IconButton>
                      </Tooltip>
                      <Tooltip
                        title="Delete"
                        onClick={() => handleOpenDeleteModal(row?._id)}
                      >
                        <IconButton>
                          <DeleteIcon
                            style={{
                              color: "#8D79F6",
                              borderRadius: "100px",
                              padding: "5px",
                              background: "#efeef9",
                              height: "30px",
                              width: "30px",
                            }}
                          />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })} */}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default FUI;

function InviteModal({
  open,
  handleClose,
  setOpen,
  handleTableData,
  updateId,
  GETFUIDATA,
}) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <UpdateFuiModal
          setOpen={setOpen}
          handleTableData={handleTableData}
          updateId={updateId}
          GETFUIDATA={GETFUIDATA}
        />
      </Box>
    </Modal>
  );
}
