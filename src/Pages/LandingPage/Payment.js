import React, { useEffect, useRef, useState } from "react";
import "./Pricing.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { baseUrl } from "../../Global/Const";
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { countries } from "./Country";
import MuiPhoneNumber from "material-ui-phone-number";
import {
  CardElement,
  useElements,
  useStripe,
  CardExpiryElement,
  AddressElement,
} from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router";
import { SpinnerLoader, UPLOADICON } from "../../Global/Icons";
import { ERROR, SUCCESS } from "../../CustomComponent/Msg";
import { regex } from "../../Global/Regex";
// const stripePromise = loadStripe("(publishable key here)");
const stripePromise = loadStripe(
  "pk_test_51Ml7x9LaUodqSvFkrSWaOA72DU5OWV9KVS2m7fH1Tb6598ztUg6oL2VmtC4q1coLaqjoLblPegNChcnNs1UwyYRg00QVvAKGzu"
);
// const stripePromise = loadStripe(
//   "pk_test_51M1PdZSC3fkS61187Tw2bEu2umObGgUjcF5CgDEpYodMBjtDQVBFrAACChPR4ndgTPCTErbWKO8sg06wAGexgE8100NTPEnTIT"
// );
function Payment() {
  let location = useLocation();
  let data = location.state;

  const [showloader, setshowloader] = useState(false);
  return (
    <div className="FWH">
      {/* <SpinnerLoader state={showloader} /> */}
      {/* <div className="cardCont"> */}
      <Elements stripe={stripePromise}>
        <Checkout setshowloader={setshowloader} data={data} />
      </Elements>
      {/* </div> */}
    </div>
  );
}
export default Payment;

export function Checkout({ setshowloader, data }) {
  //   const [email, setEmail] = useState("");
  //   const [amount, setAmount] = useState("");
  //   const [subscription, setSubscription] = useState("onetime");
  // const url = "http://34.225.77.194:3001/uStripe/reactTest";
  const location = useLocation();
  const elements = useElements();
  const stripe = useStripe();
  const navigate = useNavigate();
  const [dis, setdis] = useState(false);
  const [check, setcheck] = useState(false);
  const [adminData, setAdminDataLogo] = useState("");
  const [admin, setAdmin] = useState("");
  const [adminEr, setAdminEr] = useState("");
  const [org, setOrg] = useState("");
  const [orgEr, setOrgEr] = useState("");
  const [email, setEmail] = useState("");
  const [emailEr, setEmailEr] = useState("");
  const [pass, setPass] = useState("");
  const [passEr, setPassEr] = useState("");
  const [conPass, setConPass] = useState("");
  const [conPassEr, setConPassEr] = useState("");
  const [contact, setContact] = useState("");
  const [contactEr, setContactEr] = useState("");
  const [countryCode, setCntCode] = useState("");
  const [zip, setZip] = useState("");
  const [add, setAdd] = useState("");
  const [country, setCountry] = useState("");
  const [web, setWeb] = useState("");

  const [selectedFile, setSelectedFile] = useState("");
  const inputRef = useRef();

  const handleImageupload = () => {
    inputRef.current.click();
  };
  const [address, setaddress] = useState("");
  let ID = location?.state?.id;

  const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
      base: {
        iconColor: "#38cab3",
        color: "black",
        fontWeight: 500,
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",

        ":-webkit-autofill": { color: "#fce883" },
        "::placeholder": { color: "grey" },
      },
      invalid: {
        iconColor: "#ffc7ee",
        color: "#ffc7ee",
      },
    },
    hidePostalCode: true,
  };
  const handlecheck = () => {
    setcheck(!check);
  };
  let ValidState = [admin, org, email, contact, pass, conPass];
  let SetState = [
    setAdminEr,
    setOrgEr,
    setEmailEr,
    setContactEr,
    setPassEr,
    setConPassEr,
  ];
  let Warning = [
    "Please enter a valid User Name",
    "Please enter a valid Organization Name",
    "Please enter a valid Email Address",
    "Please enter a valid Contact No",
    "Please enter a valid Password",
    "Please enter a valid Confrim Password",
  ];

  function handlethis() {
    window.location.href = "https://dev.glorep.com/admin/#/auth/login";
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    let validEmail = regex(email);
    setdis(true);
    setshowloader(true);

    ValidState.map((e, i) => {
      if (e == "") {
        SetState[i](Warning[i]);
      } else {
        SetState[i]("");

        if (i > 2 && e.length < 8) {
          SetState[i]("Minimum 8 character required");
        }
      }
    });
    if (!validEmail) {
      setEmailEr("Please enter a valid email");
    } else {
      setEmailEr("");
    }
    if (pass !== conPass) {
      setConPassEr("Password mismatch");
    } else {
      setConPassEr("");
    }

    if (
      address.line1 !== undefined &&
      address.city !== undefined &&
      address.state !== undefined &&
      address.postal_code !== undefined &&
      address.country !== undefined &&
      admin !== "" &&
      org !== "" &&
      contact !== "" &&
      email !== "" &&
      pass !== "" &&
      pass == conPass
    ) {
      try {
        e.preventDefault();
        if (!elements || !stripe) return;
        const cardElement = elements.getElement(CardElement);

        let token = await stripe.createToken(cardElement, {
          name: "Org",
          address_line1: address.line1,
          address_line2: address.line2 == null ? "" : address.line2,
          address_city: address.city,
          address_state: address.state,
          address_zip: address.postal_code,
          address_country: address.country,
        });

        if (token.error || token?.err?.type == "StripeInvalidRequestError") {
          setshowloader(false);

          ERROR("Somthing went wrong1");
          // setdis(false);
        } else {
          fetch(baseUrl + "signUp", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              //   Authorization: `Bearer ${data.StrTok}`,
            },
            body: JSON.stringify({
              saveCard: check,
              //   token: token.token.id, your not login so token is not available
              //   priceId: data.id,
              //   cardId: "",

              //  gorave body

              name: org,
              email: email,
              password: pass,
              adminName: admin,
              token: token.token.id,
              contactNo: contact,
              subscriptionId: ID,
              //   website: "",
              //   address: "",
              //   zipCode: "",
              //   countryName: "",
              //   countryCode: "",
              contactNoCC: countryCode,
              //   category: "",
              //   logo: "",
            }),
          })
            .then((response) => response.json())
            .then(async (res) => {
              if (res.status == false) {
                ERROR("Paymnt failed");

                setdis(false);
                setshowloader(false);
              } else if (
                res.message == "Registration Failed due to payment error" ||
                res.message == "Registration Failed due to payment error..3"
              ) {
                Swal.fire({
                  icon: "error",
                  title: "",
                  text: "Registration Failed due to payment error",
                  // footer: '<a href="">Why do I have this issue?</a>'
                });
                // alert("Payment Failed");
                let path = `/auth/plans`;
                navigate(path);

                setdis(false);
              } else if (res.actionRequired) {
                setdis(false);

                // We perform 3D Secure authentication
                const { paymentIntent, error } =
                  await stripe.confirmCardPayment(res.clientSecret);
                if (error) {
                  return Swal.fire({
                    icon: "error",
                    title: "",
                    text: "Error in payment, please try again later",
                    // footer: '<a href="">Why do I have this issue?</a>'
                  });
                }
                if (paymentIntent.status === "succeeded") {
                  Swal.fire("Register and Paid successfully.", "", "success");

                  setdis(false);
                }

                navigate(path);
              } else if (res.status == true) {
                if (res.status == true) {
                  SUCCESS("Paid successfully");

                  setdis(false);

                  sessionStorage.setItem(
                    "Token",
                    JSON.stringify(res.data.loginToken)
                  );
                } else {
                  ERROR("Payment failed.");
                  setdis(false);
                }
              }
            })
            .catch((error) => {
              ERROR("Somthing went wrong");
              setdis(false);
            });
        }
      } catch (error) {
        setshowloader(false);
        setdis(false);

        ERROR("Payment failed!");
      }
    } else {
      setshowloader(false);
      setdis(false);

      ERROR("Please fill the detail");
    }
  };

  function handleContact(value, country) {
    setContact(value);
    setContactEr("");
    setCntCode(country.dialCode);
  }
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.onbeforeunload = handleBeforeUnload;

    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  return (
    <form onSubmit={handleSubmit} className="Forms">
      <div className="registeredInputContainer WD40P">
        <div className="inputConatinerStyle">
          <label className="Label">User Name</label>
          <input
            type="text"
            className="inputStyle"
            onChange={(e) => {
              setAdmin(e.target.value);
              setAdminEr("");
            }}
            value={admin}
          />
          {adminEr && <span className="ERRMSG"> {adminEr}</span>}
        </div>
        <div className="inputConatinerStyle">
          <label className="Label">Organization Name</label>
          <input
            type="text"
            className="inputStyle"
            onChange={(e) => {
              setOrg(e.target.value);
              setOrgEr("");
            }}
            value={org}
          />
          {orgEr && <span className="ERRMSG"> {orgEr}</span>}
        </div>
        <div className="inputConatinerStyle">
          <label className="Label">Email</label>
          <input
            type="text"
            className="inputStyle"
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailEr("");
            }}
            value={email}
          />
          {emailEr && <span className="ERRMSG"> {emailEr}</span>}
        </div>
        <div className="inputConatinerStyle">
          <label className="Label">Organization's Contact No</label>
          {/* <input
            type="text"
            className="inputStyle"
            onChange={(e) => {
              const newValue = e.target.value.replace(/[^0-9]/g, "");
              setContact(newValue);
              setContactEr("");
            }}
            value={contact}
            onKeyPress={(e) => {
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
              }
            }}
          /> */}
          <MuiPhoneNumber
            defaultCountry={"in"}
            // value={contact}
            onChange={handleContact}
            className="PhonePicker"
          />
          {contactEr && <span className="ERRMSG"> {contactEr}</span>}
        </div>
        <div className="inputConatinerStyle">
          <label className="Label">Password</label>
          <input
            type="text"
            className="inputStyle"
            onChange={(e) => {
              setPass(e.target.value);
              setPassEr("");
            }}
            value={pass}
          />
          {passEr && <span className="ERRMSG"> {passEr}</span>}
        </div>
        <div className="inputConatinerStyle">
          <label className="Label">Confirm Password</label>
          <input
            type="text"
            className="inputStyle"
            onChange={(e) => {
              setConPass(e.target.value);
              setConPassEr("");
            }}
            value={conPass}
          />
          {conPassEr && <span className="ERRMSG"> {conPassEr}</span>}
        </div>

        {/* <div className="inputConatinerStyle">
          <label className="Label">Website</label>
          <input
            type="text"
            className="inputStyle"
            onChange={(e) => setWeb(e.target.value)}
            value={web}
          />
        </div>
        <div className="inputConatinerStyle">
          <label className="Label">Address</label>
          <input
            type="text"
            className="inputStyle"
            onChange={(e) => setaddress(e.target.value)}
            value={address}
          />
        </div>
        <div className="ColStr">
          <Autocomplete
            id="country-select-demo"
            sx={{ width: 300 }}
            options={countries}
            autoHighlight
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
                {option.label} ({option.code}) +{option.phone}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose a country"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
          <input
            type="text"
            className="inputStyle"
            placeholder="Zip"
            // onChange={(e) => setZip(e.target.value)}
            value={zip}
            onChange={(e) => {
              const newValue = e.target.value.replace(/[^0-9]/g, "");
              setZip(newValue);
            }}
            onKeyPress={(e) => {
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
              }
            }}
          />
        </div>
        <div className="inputConatinerStyle">
          <label className="Label">Profile</label>
          <input
            type="file"
            ref={inputRef}
            style={{ display: "none" }}
            disabled={dis}
            accept="image/*"
            onChange={(e) => {
              const selectedFile = inputRef.current.files[0];
              setSelectedFile(selectedFile);
              setAdminDataLogo(URL.createObjectURL(selectedFile));
            }}
          />
          {adminData ? (
            <img
              src={adminData}
              onClick={handleImageupload}
              style={{
                height: "80px",
                width: "80px",
                objectFit: "contain",
              }}
            />
          ) : (
            <div onClick={handleImageupload}>
              <UPLOADICON />
            </div>
          )}
        </div> */}
      </div>
      <div className="Line"></div>
      <div className="WD40P">
        <fieldset
          className="FormGroup"
          style={{
            border: "0.5px solid grey",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "3%",
          }}
        >
          <div className="FormRow">
            <CardElement options={CARD_OPTIONS} />
          </div>
        </fieldset>
        <fieldset
          className="FormGroup"
          style={{
            border: "0.5px solid grey",
            padding: "15px",
            borderRadius: "10px",
          }}
        >
          <AddressElement
            options={{ mode: "billing" }}
            onChange={(event) => {
              if (event.complete) {
                // Extract potentially complete address
                const address = event.value.address;
                setaddress(address);
              }
            }}
          />
        </fieldset>
        <fieldset
          style={{
            border: "none",
            padding: "15px 0px",
            // borderRadius: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              border: "none",
            }}
          >
            <input type="checkbox" onClick={handlecheck} />
            <span
              style={{
                marginLeft: "3px",
                fontSize: "14px",
                fontWeight: "400",
              }}
            >
              Save card for later payment
            </span>
          </div>
        </fieldset>
        <button
          disabled={dis}
          style={{
            background: dis ? "grey" : "#6b5eff",
            padding: "20px",
            color: "white",
            fontSize: "16px",
            fontWeight: "600",
            width: "100%",
            borderRadius: "5px",
            border: "none",
            marginTop: "4%",
            cursor: "pointer",
          }}
        >
          Pay
        </button>
      </div>
    </form>
  );
}
