import React, { useState } from "react";
import "./Plan.css";
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
      <SpinnerLoader state={showloader} />
      <div className="cardCont">
        <Elements stripe={stripePromise}>
          <Checkout setshowloader={setshowloader} data={data} />
        </Elements>
      </div>
    </div>
  );
}
export default Payment;

export function Checkout({ setshowloader, data }) {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [subscription, setSubscription] = useState("onetime");
  const stripe = useStripe();
  const [dis, setdis] = useState(false);
  const url = "http://34.225.77.194:3001/uStripe/reactTest";
  const navigate = useNavigate();
  const [check, setcheck] = useState(false);
  const location = useLocation();
  const elements = useElements();
  const [address, setaddress] = useState({});
  let ID = location.state;
  const PayToken = sessionStorage.getItem("AT");

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
  // const handledis = (e) => {
  //   setdis(true);
  //   handleSubmit(e)
  //     .then(() => setdis(false))
  //     .catch(() => setdis(false));
  // };
  const handleSubmit = async (e) => {
    let finalToken = PayToken?.replace(/['"]+/g, "");
    // alert(JSON.stringify(finalToken));
    // PayToken.trim("")
    setdis(true);
    setshowloader(true);
    if (
      address.line1 !== undefined &&
      address.city !== undefined &&
      address.state !== undefined &&
      address.postal_code !== undefined &&
      address.country !== undefined
    ) {
      try {
        e.preventDefault();
        if (!elements || !stripe) return;
        const cardElement = elements.getElement(CardElement);
        // const { error, paymentMethod } = await stripe.createPaymentMethod({
        //   type: "card",
        //   card: cardElement,
        // });
        // const cardElement = elements.getElement(CardElement);

        let token = await stripe.createToken(cardElement, {
          name: "Org",
          address_line1: address.line1,
          address_line2: address.line2 == null ? "" : address.line2,
          address_city: address.city,
          address_state: address.state,
          address_zip: address.postal_code,
          address_country: address.country,
        });
        // setToken(token);

        if (token.error || token?.err?.type == "StripeInvalidRequestError") {
          // Swal.fire({
          //   icon: "error",
          //   title: "",
          //   text: "Something went wrong",
          //   // footer: '<a href="">Why do I have this issue?</a>'
          // });
          // alert("token error");
          setshowloader(false);

          ERROR("Somthing went wrong1");
          // setdis(false);
        } else {
          fetch(baseUrl + "create-checkout-session", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${data.StrTok}`,
            },
            body: JSON.stringify({
              saveCard: check,
              token: token.token.id,
              priceId: data.id,
              cardId: "",
            }),
          })
            .then((response) => response.json())
            .then(async (res) => {
              if (res.status == false) {
                // Swal.fire({
                //   icon: "error",
                //   title: "",
                //   text: "Payment failed!",
                //   // footer: '<a href="">Why do I have this issue?</a>'
                // });
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

                  TDsecure(res.userData.email, res.userData.token, res.id);
                  let path = `/login`;
                  navigate(path);
                }

                navigate(path);
              } else if (res.status == true) {
                // Simple HTTP Payment was successful
                // alert(`Payment successful, payment ID `);
                if (res.status == true) {
                  SUCCESS("Paid successfully");

                  setdis(false);

                  sessionStorage.setItem("Token", JSON.stringify(data.StrTok));

                  let path = `/login`;
                  navigate(path);
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
    // await new Promise((resolve) => setTimeout(resolve, 3000));
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
            style={{ marginLeft: "3px", fontSize: "14px", fontWeight: "400" }}
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
    </form>
  );
}
