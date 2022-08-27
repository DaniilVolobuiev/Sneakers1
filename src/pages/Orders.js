import React from "react";
import Card from "../Components/Card";

import axios from "axios";

function Orders() {
  const [orders, setOrders] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(false);
  React.useEffect(() => {
    setIsLoading(true);
    (async () => {
      const { data } = await axios.get(
        "https://62dd8c43ccdf9f7ec2c9e07f.mockapi.io/orders"
      );
      setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
      setIsLoading(false);
    })();
  }, []);
  return (
    <div>
      <div className="titleSearch">
        <h1>My Orders</h1>
      </div>
      <section className="cards">
        {(isLoading ? [...Array(10)] : orders).map((obj, index) => (
          <Card key={index} {...obj} loading={isLoading} />
        ))}
      </section>
    </div>
  );
}
export default Orders;
