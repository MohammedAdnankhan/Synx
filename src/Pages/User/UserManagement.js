import "./UserMange.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { regex } from "../../Global/Regex";
import Title from "../../CustomComponent/Title";
import React, { useEffect, useState, useRef } from "react";
import CofirmModal from "../../CustomComponent/CofirmModal";
import { UpdateProfileApi } from "../../Api/UpdateProfile";
import PageContainer from "../../components/container/PageContainer";
import MuiPhoneNumber from "material-ui-phone-number";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { GETADMINAMEEMAIL, RESETPASSWORD, getToken } from "../../Api/GetData";
import {
  ACTIVATE2FA,
  DeActivate2FA,
  GENERATEQR,
  GETKEY,
} from "../../Api/Getkey";
import { useDispatch, useSelector } from "react-redux";
import { ToggleState } from "../../redux/customizer/Action";
import { GiveSubs } from "../../layouts/full-layout/sidebar/Menuitems";
import { useNavigate } from "react-router";
const UserManagement = () => {
  const [adminData, setAdminDataLogo] = useState("");
  const [Passcode, setPassCode] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState("");
  const [nameEr, setNameEr] = useState("");
  const [email, setEmail] = useState("");
  const [emailEr, setEmailEr] = useState("");
  const [adminName, setAdminName] = useState("");
  const [adminNameEr, setAdminNameEr] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneEr, setPhoneEr] = useState("");
  const [website, setWebsite] = useState("");
  const [websiteEr, setWebsiteEr] = useState("");
  const [category, setCategory] = useState("");
  const [categoryEr, setCategoryEr] = useState("");
  const [address, setAddress] = useState("");
  const [addressEr, setAddressEr] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [zipCodeEr, setZipCodeEr] = useState("");
  const [Country, setCountry] = useState("");
  const [CountryEr, setCountryEr] = useState("");
  const [dis, setdis] = useState(true);
  const [disPas, setdisPas] = useState(true);
  const [selectedFile, setSelectedFile] = useState("");
  const [imageEr, setorImageEr] = useState("");
  const [logo, setlogo] = useState("");
  const [keyandQr, setkeyandQr] = useState("");
  const [QRCODE, SetQrCode] = useState("");
  const [PrivateKey, SetPrivateKey] = useState("");
  const [TwoFaStatus, SetTwoFaStatus] = useState("");
  const [PasscodeEr, setPassEr] = useState("");
  const [Password, SetPassword] = useState("");
  const [PasswordEr, SetPasswordEr] = useState("");
  const [TeamMemName, setTeamMemName] = useState("");
  const [TeamMemEmail, SetTeamMemEmail] = useState("");
  const [disable, setDisable] = useState(false);
  const [TeamMemNameEr, setTeamMemNameEr] = useState("");
  const [TeamExist, setTeamExist] = useState("");
  const [TeamMemEmailEr, SetTeamMemEmailEr] = useState("");
  const [ConfirmPassword, SetConfirmPassword] = useState("");
  const [ConfirmPasswordEr, SetConfirmPasswordEr] = useState("");
  const [OldPassword, SetOldPassword] = useState("");
  const [OldPasswordEr, SetOldPasswordEr] = useState("");
  const dispatch = useDispatch();
  const permission = useSelector((state) => state.CustomizerReducer.Access);
  const [viewAccess, setViewAccess] = React.useState(false);
  const [editAccess, setEditAccess] = React.useState(false);
  const [deleteAccess, setDeleteAccess] = React.useState(false);
  const [phoneCode, setPhoneCode] = React.useState("");
  const [showPassword, setShowPassword] = React.useState({
    oldpass: true,
    confirmPass: true,
    newPassword: true,
  });
  let navigate = useNavigate();
  function GetSubsAccess() {
    let arr = GiveSubs(permission, "Organization", "subs");
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
  const showPasswords = (key, val) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [key]: val,
    }));
  };

  const handleClick = () => {
    dispatch(ToggleState());
  };
  const bodyFormData = new FormData();
  const token = getToken();
  bodyFormData.append("logo", selectedFile);
  bodyFormData.append("name", name);
  bodyFormData.append("email", email);
  bodyFormData.append("address", address);
  bodyFormData.append("zipCode", zipCode);
  bodyFormData.append("website", website);
  bodyFormData.append("countryName", Country);
  bodyFormData.append("contactNo", phone);
  bodyFormData.append("contactNoCC", phoneCode);
  bodyFormData.append("category", category);

  function Key() {
    GETKEY(SetQrCode, SetPrivateKey, SetTwoFaStatus, token);
  }

  function handlePasswordUpdate() {
    setdisPas(false);
    if (!disPas) {
      if (Password.length < 8) {
        SetPasswordEr("Password must be at least 8 characters long");
      } else {
        SetPasswordEr("");
        if (Password !== ConfirmPassword) {
          SetConfirmPasswordEr("Password mismatch");
        } else {
          SetConfirmPasswordEr("");
        }
      }

      if (OldPassword.length < 8) {
        SetOldPasswordEr("Password must be at least 8 characters long");
      } else {
        SetOldPasswordEr("");
      }

      if (
        Password == ConfirmPassword &&
        Password.length > 7 &&
        OldPassword.length > 7
      ) {
        setdisPas(true);
        RESETPASSWORD(token, {
          oldPassword: OldPassword,
          newPassword: Password,
          confirmPassword: ConfirmPassword,
        });
        SetPassword("");
        SetConfirmPassword("");
        SetOldPassword("");
      }
    }
  }

  function GetAdminData() {
    GETADMINAMEEMAIL(
      "retrive/profile",

      token
    )
      .then((response) => {
        SetTeamMemEmail(response?.data?.data?.team?.email);
        setTeamMemName(response?.data?.data?.team?.name);
        setTeamExist(response?.data?.data?.team?.name);
        setEmail(response?.data?.data?.admin.bussinessEmail);
        setName(response?.data?.data?.admin.organizationName);
        setAdminDataLogo(response?.data?.data?.admin.logo);
        setAdminName(response?.data?.data?.admin?.adminName);
        setWebsite(response?.data?.data?.admin?.website);
        setPhone(response?.data?.data?.admin?.contactNo);
        setCategory(response?.data?.data?.admin?.category);
        setAddress(response?.data?.data?.admin?.address?.address);
        setZipCode(response?.data?.data?.admin?.address?.zipCode);
        setCountry(response?.data?.data?.admin?.address?.countryName);

        if (response?.data?.data?.team?.logo) {
          setAdminDataLogo(response?.data?.data?.team?.logo);
        }
      })
      .catch((err) => "");
  }
  async function handleUpdate() {
    if (dis) {
      setdis(false);
    } else {
      // setdis(!dis);

      let validEmail = regex(email);
      if (!validEmail) {
        setEmailEr("Invalid email");
      } else {
        setEmailEr("");
      }
      if (name == "") {
        setNameEr("Invalid name");
      } else {
        setNameEr("");
      }
      if (adminName == "") {
        setAdminNameEr("Invalid Admin name");
      } else {
        setAdminNameEr("");
      }
      if (phone.length < 12) {
        setPhoneEr("Minimum 8 digit required");
      } else {
        setPhoneEr("");
      }
      if (website == "") {
        setWebsiteEr("Invalid website");
      } else {
        setWebsiteEr("");
      }
      if (category == "") {
        setCategoryEr("Invalid category");
      } else {
        setCategoryEr("");
      }
      if (address == "") {
        setAddressEr("Invalid address");
      } else {
        setAddressEr("");
      }
      if (zipCode.length < 4 || zipCode.length > 8) {
        setZipCodeEr("Invalid zip code");
      } else {
        setZipCodeEr("");
      }
      if (Country == "") {
        setCountryEr("Invalid address");
      } else {
        setCountryEr("");
      }

      if (
        name !== "" &&
        validEmail &&
        !dis &&
        website !== "" &&
        address !== "" &&
        Country !== "" &&
        zipCode.length < 8 &&
        zipCode.length > 3 &&
        adminName !== "" &&
        category !== "" &&
        phone.length > 12
      ) {
        setdis(true);
        setDisable(true);
        await UpdateProfileApi(
          bodyFormData,
          "Profile updated",
          token,
          GetAdminData,
          setdis,
          setDisable
        );
        // setdis(true);
      }
    }
  }

  function handleTeamMemberUpdate() {
    let updateTeamData = new FormData();
    updateTeamData.append("logo", selectedFile);
    updateTeamData.append("name", TeamMemName);
    updateTeamData.append("email", TeamMemEmail);

    if (dis) {
      setdis(false);
    } else {
      // setdis(!dis);
      setDisable(true);
      let validEmail = regex(TeamMemEmail);
      if (!validEmail) {
        SetTeamMemEmailEr("Invalid email");
      } else {
        SetTeamMemEmailEr("");
      }
      if (TeamMemName == "") {
        setTeamMemNameEr("Invalid name");
      } else {
        setTeamMemNameEr("");
      }

      if (validEmail !== "" && TeamMemName !== "") {
        UpdateProfileApi(
          updateTeamData,
          "Profile updated",
          token,
          GetAdminData,
          setdis,
          setDisable
        );
        // GetAdminData();
      }
    }
  }
  const inputRef = useRef();
  const handleImageupload = () => {
    inputRef.current.click();
  };

  function handleConfirm() {
    setOpen(false);
    setPassCode("");

    DeActivate2FA(token, Key);
  }

  async function handle2FA() {
    if (Passcode.length > 5) {
      await ACTIVATE2FA(Passcode, token);
      Key();
    } else {
      setPassEr("Invalid passcode");
    }
  }
  function handleGenerateNewPrivateKey() {
    GENERATEQR(SetQrCode, SetPrivateKey, token);
  }

  function handleContact(value, country) {
    setPhone(value);
    if (value.length > 12) {
      setPhoneEr("");
    }
    setPhoneCode(country.dialCode);
  }

  useEffect(() => {
    GetAdminData();
    Key();
  }, []);

  useEffect(() => {
    GetSubsAccess();
  }, [permission]);
  return (
    <PageContainer title="Profile">
      {/* {viewAccess || editAccess ? ( */}
      <div className="mainContainer">
        <Title title={"Profile"} />
        {!TeamExist ? (
          <>
            <div className="updateContainer ">
              <div className="flxEnd">
                <div className="btnContainer FlxEnd">
                  {editAccess && (
                    <button
                      className="UBTN FWid"
                      onClick={handleUpdate}
                      disabled={disable ? true : false}
                      style={{ background: disable ? "grey" : "#6b5eff" }}
                    >
                      {dis ? "Edit" : "Update"}
                    </button>
                  )}
                </div>
              </div>
              <div className="flexspcbtw">
                <div className="WDFIF">
                  <div className="m20 fljtsp ">
                    <span className="Hd1">Organization Name</span>
                  </div>
                  <div className="oppos line wi50">
                    <div className="inputContainer">
                      <input
                        className="internalInput"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={dis}
                      />
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        width: "100%",
                      }}
                    >
                      <span className="ERR">{nameEr ? nameEr : null}</span>
                    </div>
                  </div>
                </div>

                <div className="WDFIF">
                  <div className="m20">
                    <span className="Hd1">Business Email</span>
                  </div>
                  <div className="oppos line wi50">
                    <div className="inputContainer">
                      <input
                        className="internalInput"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={dis}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        width: "100%",
                      }}
                    >
                      <span className="ERR">{emailEr ? emailEr : null}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flexspcbtw">
                <div className="WDFIF">
                  <div className="m20">
                    <span className="Hd1">Admin Name</span>
                  </div>
                  <div className="oppos line wi50">
                    <div className="inputContainer">
                      <input
                        className="internalInput"
                        value={adminName}
                        onChange={(e) => setAdminName(e.target.value)}
                        disabled={dis ? true : false}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        width: "100%",
                      }}
                    >
                      <span className="ERR">
                        {adminNameEr ? adminNameEr : null}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="WDFIF">
                  <div className="m20">
                    <span className="Hd1">Organization No</span>
                  </div>
                  <div className="oppos line wi50">
                    <div className="inputContainer flStr">
                      {/* <input
                      className="internalInput"
                      value={phone}
                      disabled={dis}
                      onChange={(e) => {
                        const newValue = e.target.value.replace(/[^0-9]/g, "");
                        setPhone(newValue);
                      }}
                      onKeyPress={(e) => {
                        if (!/[0-9]/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    /> */}
                      <MuiPhoneNumber
                        defaultCountry={"in"}
                        style={{ padding: "15px" }}
                        onChange={handleContact}
                        className="PhonePicker"
                        value={phone}
                        disabled={dis}
                        disableDropdown={dis}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        width: "100%",
                      }}
                    >
                      <span className="ERR">{phoneEr ? phoneEr : null}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flexspcbtw">
                <div className="WDFIF">
                  <div className="m20">
                    <span className="Hd1">Organization Website</span>
                  </div>
                  <div className="oppos line wi50">
                    <div className="inputContainer">
                      <input
                        className="internalInput"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        disabled={dis}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        width: "100%",
                      }}
                    >
                      <span className="ERR">
                        {websiteEr ? websiteEr : null}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="WDFIF">
                  <div className="m20">
                    <span className="Hd1">Category</span>
                  </div>
                  <div className="oppos line wi50">
                    <div className="inputContainer">
                      <input
                        className="internalInput"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        disabled={dis}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        width: "100%",
                      }}
                    >
                      <span className="ERR">
                        {categoryEr ? categoryEr : null}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flexspcbtw">
                <div className="WDFIF">
                  <div className="m20">
                    <span className="Hd1">Address</span>
                  </div>
                  <div className="oppos line wi50">
                    <div className="inputContainer">
                      <input
                        className="internalInput"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        disabled={dis}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        width: "100%",
                      }}
                    >
                      <span className="ERR">
                        {addressEr ? addressEr : null}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="WDFIF">
                  <div className="m20">
                    <span className="Hd1">ZipCode</span>
                  </div>
                  <div className="oppos line wi50">
                    <div className="inputContainer">
                      <input
                        className="internalInput"
                        value={zipCode}
                        type={"text"}
                        // onChange={(e) => setZipCode(e.target.value)}
                        disabled={dis}
                        onChange={(e) => {
                          const newValue = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                          setZipCode(newValue);
                        }}
                        onKeyPress={(e) => {
                          if (!/[0-9]/.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        width: "100%",
                      }}
                    >
                      <span className="ERR">
                        {zipCodeEr ? zipCodeEr : null}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flexspcbtw">
                <div className="WDFIF">
                  <div className="m20">
                    <span className="Hd1">Country</span>
                  </div>
                  <div className="oppos line wi50">
                    <div className="inputContainer">
                      <input
                        className="internalInput"
                        value={Country}
                        onChange={(e) => setCountry(e.target.value)}
                        disabled={dis}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        width: "100%",
                      }}
                    >
                      <span className="ERR">
                        {CountryEr ? CountryEr : null}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="updateContainer ">
              <div className="flxEnd">
                <div className="btnContainer FlxEnd">
                  {/* {editAccess && ( */}
                  <button
                    className="UBTN FWid"
                    onClick={handleTeamMemberUpdate}
                    disabled={disable ? true : false}
                    style={{ background: disable ? "grey" : "#6b5eff" }}
                  >
                    {dis ? "Edit" : "Update"}
                  </button>
                  {/* )} */}
                </div>
              </div>
              <div className="flexspcbtw">
                <div className="WDFIF">
                  <div className="m20">
                    <span className="Hd1">Name</span>
                  </div>
                  <div className="oppos line wi50">
                    <div className="inputContainer">
                      <input
                        className="internalInput"
                        value={TeamMemName}
                        onChange={(e) => setTeamMemName(e.target.value)}
                        disabled={dis}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        width: "100%",
                      }}
                    >
                      <span className="ERR">
                        {TeamMemNameEr ? TeamMemNameEr : null}
                      </span>
                    </div>
                  </div>
                </div>
                {/* <div className="flexspcbtw"> */}
                <div className="WDFIF">
                  <div className="m20">
                    <span className="Hd1">Email</span>
                  </div>
                  <div className="oppos line wi50">
                    <div className="inputContainer">
                      <input
                        className="internalInput"
                        value={TeamMemEmail}
                        onChange={(e) => SetTeamMemEmail(e.target.value)}
                        disabled={dis ? true : false}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        width: "100%",
                      }}
                    >
                      <span className="ERR">
                        {TeamMemEmailEr ? TeamMemEmailEr : null}
                      </span>
                    </div>
                  </div>
                </div>
                {/* </div> */}
              </div>

              <div className="WDFIF">
                <div className="m20 fljtsp ">
                  <span className="Hd1">Organization Name</span>
                </div>
                <div className="oppos line wi50">
                  <div className="inputContainer">
                    <input
                      className="internalInput"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      width: "100%",
                    }}
                  >
                    <span className="ERR">{nameEr ? nameEr : null}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        <div className="updateContainer">
          <div className="m20">
            <span className="Hd1">Logo</span>
          </div>
          <div className="boxContainer">
            <div className="mid" onClick={handleImageupload}>
              <input
                type="file"
                ref={inputRef}
                accept="image/*"
                style={{ display: "none" }}
                disabled={dis}
                onChange={(e) => {
                  const selectedFile = inputRef.current.files[0];
                  setSelectedFile(selectedFile);
                  setAdminDataLogo(URL.createObjectURL(selectedFile));
                  setlogo(selectedFile);
                  setorImageEr("");
                }}
              />

              <img
                src={adminData}
                style={{
                  height: "80px",
                  width: "80px",
                  objectFit: "contain",
                }}
              />
            </div>
            <span className="ERR">{imageEr ? imageEr : null}</span>
          </div>
        </div>
        <div className="updateContainer">
          <form onSubmit={handlePasswordUpdate}>
            <div className="flexspcbtw">
              <div className="m20">
                <span className="Hd1">Reset Password</span>
              </div>
              <div>
                {name && (
                  <button className="UBTN FWid" type="submit">
                    {disPas ? "Reset" : "Update"}
                  </button>
                )}
              </div>
            </div>
            <div className="flexspcbtw">
              <div className="WDFIF">
                <div className="m20">
                  <span className="Hd1">Old Password</span>
                </div>
                <div className="oppos line wi50">
                  <div className="inputContainer P0">
                    <input
                      className="internalInput"
                      value={OldPassword}
                      autoComplete="false"
                      type={showPassword.oldpass ? "password" : "text"}
                      onChange={(e) => SetOldPassword(e.target.value)}
                      disabled={disPas ? true : false}
                      placeholder="Old Password"
                    />
                    {showPassword.oldpass ? (
                      <VisibilityOffIcon
                        style={{
                          cursor: "pointer",
                          color: "grey",
                        }}
                        onClick={() => showPasswords("oldpass", false)}
                      />
                    ) : (
                      <RemoveRedEyeIcon
                        style={{
                          cursor: "pointer",
                          color: "#6b5eff",
                        }}
                        onClick={() => showPasswords("oldpass", true)}
                      />
                    )}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      width: "100%",
                    }}
                  >
                    <span className="ERR">
                      {OldPasswordEr ? OldPasswordEr : null}
                    </span>
                  </div>
                </div>
              </div>
              <div className="WDFIF">
                <div className="m20">
                  <span className="Hd1">New Password</span>
                </div>
                <div className="oppos line wi50">
                  <div className="inputContainer P0">
                    <input
                      className="internalInput"
                      value={Password}
                      autoComplete="false"
                      type={showPassword.newPassword ? "password" : "text"}
                      onChange={(e) => SetPassword(e.target.value)}
                      disabled={disPas ? true : false}
                      placeholder="Enter Password"
                    />
                    {showPassword.newPassword ? (
                      <VisibilityOffIcon
                        style={{
                          cursor: "pointer",
                          color: "grey",
                        }}
                        onClick={() => showPasswords("newPassword", false)}
                      />
                    ) : (
                      <RemoveRedEyeIcon
                        style={{
                          cursor: "pointer",
                          color: "#6b5eff",
                        }}
                        onClick={() => showPasswords("newPassword", true)}
                      />
                    )}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      width: "100%",
                    }}
                  >
                    <span className="ERR">
                      {PasswordEr ? PasswordEr : null}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flexspcbtw">
              <div className="WDFIF">
                <div className="m20">
                  <span className="Hd1">Confirm Password</span>
                </div>
                <div className="oppos line wi50 ">
                  <div className="inputContainer P0">
                    <input
                      className="internalInput "
                      value={ConfirmPassword}
                      autoComplete="false"
                      placeholder="Enter Confirm Password"
                      type={showPassword.confirmPass ? "password" : "text"}
                      onChange={(e) => SetConfirmPassword(e.target.value)}
                      disabled={disPas ? true : false}
                    />
                    {showPassword.confirmPass ? (
                      <VisibilityOffIcon
                        style={{
                          cursor: "pointer",
                          color: "grey",
                        }}
                        onClick={() => showPasswords("confirmPass", false)}
                      />
                    ) : (
                      <RemoveRedEyeIcon
                        style={{
                          cursor: "pointer",
                          color: "#6b5eff",
                        }}
                        onClick={() => showPasswords("confirmPass", true)}
                      />
                    )}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      width: "100%",
                    }}
                  >
                    <span className="ERR">
                      {ConfirmPasswordEr ? ConfirmPasswordEr : null}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        {editAccess && (
          <>
            {" "}
            {!TwoFaStatus == true ? (
              <div className="exGp updateContainer">
                <div>
                  <h3>Two Factor Authenticaion</h3>
                </div>
                <div>
                  <span className="ternaryFont">
                    To activate 2FA, you'll need to have a 2FA auth app
                    installed on your phone (Google Authentication,Duo Mobile or
                    Authy)
                  </span>
                </div>
                <div>
                  <span className="ternaryFont">
                    Most apps will let you get setup by scaning the following QR
                    code
                  </span>
                </div>
                <div className="midcent mqcl">
                  <div>
                    <img
                      src={QRCODE}
                      style={{ objectFit: "contain", height: "20vh" }}
                    />
                  </div>
                  <div>
                    <div className="wid10 mqcl">
                      <div className="mrt10">
                        <span className="fontSize">Private Key</span>
                      </div>
                      <div className="flexspbt start  flxstrt">
                        <input
                          className="urlInput"
                          value={PrivateKey ? PrivateKey : ""}
                          disabled
                        />
                        <button
                          className="BtnDT"
                          onClick={handleGenerateNewPrivateKey}
                        >
                          Generate
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mrt10">
                  <span className="ternaryFont">
                    Get a code from your newley-activated 2FA app to confirm
                    that you are all setup properly
                  </span>
                </div>
                <div className="wid10 ">
                  <div className="mrt10">
                    <span className="fontSize">Passcode</span>
                  </div>
                  <div className="flexspbt start mqcl  flxstrt">
                    <input
                      className="urlInput"
                      value={Passcode}
                      type="number"
                      onChange={(e) => setPassCode(e.target.value)}
                    />
                    <button className="BtnDT W45" onClick={handle2FA}>
                      Activate
                    </button>
                  </div>
                  <div>
                    <span className="Err">{PasscodeEr ? PasscodeEr : ""}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="exGp updateContainer">
                <div>
                  <h3>Two Factor Authenticaion</h3>
                </div>
                <div>
                  <span>
                    Two Factor Authentication is active for your account.
                  </span>
                </div>
                <div>
                  <button
                    className="BtnDT"
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    Deactivate
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      {/* ) : null} */}
      <ConfirmModal
        open={open}
        handleClose={handleClose}
        setOpen={setOpen}
        handleTableData={handleConfirm}
      />
    </PageContainer>
  );
};

export default UserManagement;

export function ConfirmModal({ open, handleClose, setOpen, handleTableData }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="confirmBox">
        <CofirmModal
          setOpen={setOpen}
          handleTableData={handleTableData}
          handleClose={handleClose}
        />
      </Box>
    </Modal>
  );
}
