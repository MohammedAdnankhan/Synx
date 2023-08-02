import React, { useEffect, useState } from "react";
import "../Plan&Payment/Plan.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { baseUrl } from "../../Global/Const";
import Swal from "sweetalert2";
import {
  CardElement,
  useElements,
  useStripe,
  CardExpiryElement,
  AddressElement,
} from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router";
import { SpinnerLoader } from "../../Global/Icons";
import { ERROR, SUCCESS } from "../../CustomComponent/Msg";
import { GiveSubs } from "../../layouts/full-layout/sidebar/Menuitems";
import { useSelector } from "react-redux";
const stripePromise = loadStripe(
  "pk_test_51Ml7x9LaUodqSvFkrSWaOA72DU5OWV9KVS2m7fH1Tb6598ztUg6oL2VmtC4q1coLaqjoLblPegNChcnNs1UwyYRg00QVvAKGzu"
);

function SubPlan() {
  const [showloader, setshowloader] = useState(false);
  const permission = useSelector((state) => state.CustomizerReducer.Access);
  const [viewAccess, setViewAccess] = React.useState(false);
  const [editAccess, setEditAccess] = React.useState(false);
  const [deleteAccess, setDeleteAccess] = React.useState(false);
  let navigate = useNavigate();
  function GetSubsAccess() {
    let arr = GiveSubs(permission, "Subscription", "subs");
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
  return (
    <div className="FWH vh100">
      <div className="cardCont">
        <Elements stripe={stripePromise}>
          <Checkout setshowloader={setshowloader} />
        </Elements>
      </div>
    </div>
  );
}
export default SubPlan;

export function Checkout({ setshowloader }) {
  const stripe = useStripe();

  const [isAddressValid, setIsAddressValid] = useState(false);
  const [dis, setdis] = useState(false);
  const navigate = useNavigate();
  const [check, setcheck] = useState(false);
  const location = useLocation();
  const elements = useElements();
  const [address, setaddress] = useState({});
  // let ID = location?.state?.id;

  let PriceId = location?.state?.PI;
  const PayToken = JSON.parse(sessionStorage.getItem("Token"));
  const CARD_OPTIONS = {
    iconStyle: "solid",
    // locale: true,
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
  const handleSubmit = async (e) => {
    setdis(true);
    e.preventDefault();

    setshowloader(true);

    if (
      address.line1 !== undefined &&
      address.city !== undefined &&
      address.state !== undefined &&
      address.postal_code !== undefined &&
      address.postal_code !== "" &&
      address.country !== undefined &&
      isAddressValid
    ) {
      try {
        e.preventDefault();
        if (!elements || !stripe) return;
        const cardElement = elements.getElement(CardElement);

        let token = await stripe.createToken(cardElement, {
          name: "Shaktimaan",
          address_line1: address.line1,
          address_line2: address.line2 == null ? "" : address.line2,
          address_city: address.city,
          address_state: address.state,
          address_zip: address.postal_code,
          address_country: address.country,
        });
        // setToken(token)
        setshowloader(false);

        if (token.error || token?.err?.type == "StripeInvalidRequestError") {
          // Swal.fire({
          //   icon: "error",
          //   title: "",
          //   text: "Something went wrong",
          //   // footer: '<a href="">Why do I have this issue?</a>'
          // });
          // alert("token error");
          ERROR("Somthing went wrong");
          setdis(false);
        } else {
          fetch(baseUrl + "create-checkout-session", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${PayToken}`,
            },
            body: JSON.stringify({
              saveCard: check,
              token: token.token.id,
              priceId: PriceId,
              cardId: "",
            }),
          })
            .then((response) => response.json())
            .then(async (res) => {
              if (res.message == "User already exist") {
                // Swal.fire({
                //   icon: "error",
                //   title: "",
                //   text: "User already exist",
                //   // footer: '<a href="">Why do I have this issue?</a>'
                // });
                alert("user exist");
                setdis(false);
              } else {
                if (res.message == "Payment failed!") {
                  // Swal.fire({
                  //   icon: "error",
                  //   title: "",
                  //   text: "Payment failed!",
                  //   // footer: '<a href="">Why do I have this issue?</a>'
                  // });
                  alert("Paymnt failed");

                  setdis(false);
                }
                if (
                  res.message == "Registration Failed due to payment error" ||
                  res.message == "Registration Failed due to payment error..3"
                ) {
                  // Swal.fire({
                  //   icon: "error",
                  //   title: "",
                  //   text: "Registration Failed due to payment error",
                  //   // footer: '<a href="">Why do I have this issue?</a>'
                  // });
                  alert("Payment Failed");

                  setdis(false);
                } else {
                  if (res.actionRequired) {
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
                      setdis(false);
                    }
                    if (paymentIntent.status === "succeeded") {
                      // alert(`Payment successful, payment ID `);
                      // const res2 = await axios.get(`http://localhost:5000/check/${res.id}`);
                      // alert("Payment successful, payment ID", res.data.id);
                      Swal.fire("Payment successfull.", "", "success");

                      setdis(false);

                      TDsecure(res.userData.email, res.userData.token, res.id);
                      let path = `/dashboard`;
                      navigate(path);
                    }

                    navigate(path);
                  } else {
                    SUCCESS("Payment successfull.");

                    let path = `/dashboard`;
                    navigate(path);
                    setdis(false);
                  }
                }
              }
            })
            .catch((error) => {
              setdis(false);
            });
        }
      } catch (error) {
        setshowloader(false);
        setdis(false);

        alert("Payment failed!");
      }
    } else {
      setshowloader(false);
      setdis(false);

      ERROR("Please fill the detail");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
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
          options={{ mode: "billing", blockPoBox: false }}
          onChange={(event) => {
            if (event.complete) {
              const address = event.value.address;
              setaddress(address);
              setIsAddressValid(true);
            } else {
              setIsAddressValid(false);
            }
          }}
        />
      </fieldset>
      <fieldset
        style={{
          border: "none",
          padding: "15px 0px",
        }}
      ></fieldset>
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
          style={{ marginLeft: "3px", fontSize: "14px", fontWeight: "400" }}
        >
          Save card for later payment
        </span>
      </div>
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
    </form>
  );
}
