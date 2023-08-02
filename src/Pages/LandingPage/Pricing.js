import React from "react";
import "./Pricing.css";
import { useNavigate } from "react-router";
const Pricing = () => {
  const navigate = useNavigate();
  return (
    <div className="ContBox">
      <button className="btn" onClick={() => navigate("/pricing")}>
        Pricing
      </button>
    </div>
  );
};

export default Pricing;
