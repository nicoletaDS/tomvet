import React from "react";
import { Link } from "react-router-dom";

import "./CheckoutSteps.css";

function CheckoutSteps({ step1, step2, step3 }) {
  return (
    <div className="checkout-nav-body">
      {step1 ? <Link to="/login">Conectare -</Link> : <span>Conectare -</span>}

      {step2 ? (
        <Link to="/shipping">Transport -</Link>
      ) : (
        <span>Transport -</span>
      )}

      {step3 ? (
        <Link to="/placeorder">Finalizare</Link>
      ) : (
        <span>Finalizare</span>
      )}
    </div>
  );
}

export default CheckoutSteps;
