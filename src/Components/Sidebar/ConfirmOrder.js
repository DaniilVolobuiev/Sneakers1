import { AppContext } from "../../App";
import React from "react";

function ConfirmOrder({ onClickOrder, isLoading }) {
  const { cartItems } = React.useContext(AppContext);

  return (
    <div className="confirmOrder">
      <div className="total">
        <p>Total:</p>
        <div className="dash"></div>
        <p style={{ fontWeight: "600", fontSize: "16px", lineHeight: "19px" }}>
          {typeof cartItems.reduce((prev, obj) => prev + obj.price, 0) ===
          "string"
            ? "You can't buy a kitten!"
            : cartItems.reduce((prev, obj) => prev + obj.price, 0)}{" "}
          $
        </p>
      </div>
      <div className="taxes">
        <p>Taxes 5%:</p>
        <div className="dash"></div>
        <p style={{ fontWeight: "600", fontSize: "16px", lineHeight: "19px" }}>
          {typeof cartItems.reduce((prev, obj) => prev + obj.price, 0) ===
          "string"
            ? "No!"
            : Math.round(
                cartItems.reduce((prev, obj) => prev + obj.price, 0) * 0.05
              )}{" "}
          $
        </p>
      </div>
      <button
        onClick={() => onClickOrder()}
        disabled={
          isLoading ||
          typeof cartItems.reduce((prev, obj) => prev + obj.price, 0) ===
            "string"
        }
        className="confirmButton"
      >
        <p>Confirm Order</p>
        <svg
          className="arrow"
          width="16"
          height="14"
          viewBox="0 0 16 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 7H14.7143"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.71436 1L14.7144 7L8.71436 13"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
export default ConfirmOrder;
