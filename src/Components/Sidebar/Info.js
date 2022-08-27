import emptyCart from "./emptyCart.png";
import orderComplete from "./orderComplete.png";
import arrow from "./arrow_back.png";
export function Info(props) {
  return (
    <div className="emptyCart">
      <img src={props.isCompleted ? orderComplete : emptyCart}></img>
      <h2>{props.isCompleted ? "Order is completed!" : "Cart is empty"}</h2>
      <p className="addAtLeast">
        {props.isCompleted
          ? `Your order #${Math.round(
              Math.random() * 100
            )} soon will be delivered`
          : "Add at least one item"}
      </p>
      <button onClick={props.closeCartEmpty} className="backButton">
        <p>Go Back</p>
        <img src={arrow}></img>
      </button>
    </div>
  );
}
