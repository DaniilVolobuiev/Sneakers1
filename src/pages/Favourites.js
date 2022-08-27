import React from "react";
import Card from "../Components/Card";
import { AppContext } from "../App";
function Favourites() {
  const { favourites, onAddToFavourite, onAddToCart } =
    React.useContext(AppContext);
  return (
    <div>
      <div className="titleSearch">
        <h1>My favourites</h1>
      </div>
      <section className="cards">
        {favourites.map((obj, index) => (
          <Card
            key={index}
            favourited={true}
            onFavourite={(item) => onAddToFavourite(item)}
            onPlus={(item) => onAddToCart(item)}
            {...obj}
          />
        ))}
      </section>
    </div>
  );
}
export default Favourites;
