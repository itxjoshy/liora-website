import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import logo from "../logo.png";
function OrderApproved() {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  setTimeout(() => {
    navigate("/");
    window.location.reload();
  }, 4000);
  return (
    <div
      style={{
        height: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 10,
      }}
    >
      <div
        className="container"
        style={{
          background: "rgba(255, 161, 206, 1)",
          width: 800,
          height: 400,
          borderRadius: 30,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Black Han Sans, sans-serif",
          fontSize: "2rem",
          color: "white",
          textAlign: "center",
        }}
      >
        <img src={logo} alt="" style={{ width: "30%" }} />
        Order Approved <br /> Time to let your light shine
        <span
          style={{
            fontSize: ".9rem",
            alignSelf: "center",
          }}
        >
          Order No: {id}
        </span>
        <p
          style={{
            fontSize: ".9rem",
            marginTop: 10,
          }}
        >
          Redirecting to home page
        </p>
      </div>
    </div>
  );
}

export default OrderApproved;
