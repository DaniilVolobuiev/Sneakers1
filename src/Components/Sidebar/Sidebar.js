import ConfirmOrder from "./ConfirmOrder";
import { Info } from "./Info";

import React from "react";
import { AppContext } from "../../App";
import axios from "axios";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const Sidebar = ({
  closeCart,
  onRemove,
  items = [],
  opened,
  setBurgerOpened,
}) => {
  let [isCompleted, setIsCompleted] = React.useState(false);
  const { setCartItems, cartItems } = React.useContext(AppContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const onClickOrder = async () => {
    setIsLoading(true);
    const { data } = await axios.post(
      "https://62dd8c43ccdf9f7ec2c9e07f.mockapi.io/orders",
      { items: cartItems }
    );
    setIsCompleted(true);
    setCartItems([]);
    for (let i = 0; i < cartItems.length; i++) {
      const item = cartItems[i];
      await axios.delete(
        "https://62dd8c43ccdf9f7ec2c9e07f.mockapi.io/CartItems/" + item.id
      );
      await delay(1000);
    }
    setIsLoading(false);
  };
  const closeCartMod = () => {
    closeCart();
    setBurgerOpened(true);
  };
  return (
    <div className={opened ? "sidebar" : "sidebarHidden"}>
      <div onClick={closeCartMod} className="overlay"></div>
      <div className="cart">
        <h1>
          Shoping Cart
          <svg
            onClick={closeCartMod}
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.5"
              y="0.5"
              width="31"
              height="31"
              rx="7.5"
              fill="white"
              stroke="#DBDBDB"
            />
            <path
              d="M20.0799 18.6155L17.6311 16.1667L20.0798 13.718C21.0241 12.7738 19.5596 11.3093 18.6154 12.2536L16.1667 14.7023L13.7179 12.2535C12.7738 11.3095 11.3095 12.7738 12.2535 13.7179L14.7023 16.1667L12.2536 18.6154C11.3093 19.5596 12.7738 21.0241 13.718 20.0798L16.1667 17.6311L18.6155 20.0799C19.5597 21.0241 21.0241 19.5597 20.0799 18.6155Z"
              fill="#B5B5B5"
            />
          </svg>
        </h1>

        {items.length !== 0 ? (
          [
            items.map((obj) => (
              <div key={obj.id} className="element">
                <img src={obj.imgUrl} alt="image"></img>
                <div className="cartDescription">
                  <p>Men's Sneakers</p>
                  <p>{obj.name}</p>
                  <p className="cartPrice">{obj.price}</p>
                </div>
                <svg
                  onClick={() => onRemove(obj.id)}
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="31"
                    height="31"
                    rx="7.5"
                    fill="white"
                    stroke="#DBDBDB"
                  />
                  <path
                    d="M20.0799 18.6155L17.6311 16.1667L20.0798 13.718C21.0241 12.7738 19.5596 11.3093 18.6154 12.2536L16.1667 14.7023L13.7179 12.2535C12.7738 11.3095 11.3095 12.7738 12.2535 13.7179L14.7023 16.1667L12.2536 18.6154C11.3093 19.5596 12.7738 21.0241 13.718 20.0798L16.1667 17.6311L18.6155 20.0799C19.5597 21.0241 21.0241 19.5597 20.0799 18.6155Z"
                    fill="#B5B5B5"
                  />
                </svg>
              </div>
            )),
            <ConfirmOrder
              onClickOrder={onClickOrder}
              setIsCompleted={setIsCompleted}
              isLoading={isLoading}
            />,
          ]
        ) : (
          <Info closeCartEmpty={closeCart} isCompleted={isCompleted} />
        )}
      </div>
    </div>
  );
};
export default Sidebar;
