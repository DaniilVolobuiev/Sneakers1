import React from "react";
import buttonPlus from "../Images/buttonPlus.png";
import buttonPlusAdded from "../Images/buttonPlusAdded.png";
import favourite from "../Images/favourite.png";
import noFavourite from "../Images/noFavourite.png";

import Skeleton from "../Skeleton/skeleton";

import { AppContext } from "../App";

function Card({
  id,

  name,
  imgUrl,
  price,
  onPlus,
  onFavourite,
  favourited = false,

  loading = false,
}) {
  const { isItemAdded, isItemFavourited } = React.useContext(AppContext);

  const [isFavourite, setIsFavourite] = React.useState(favourited);
  const obj = { id, parentId: id, name, imgUrl, price };
  const addItem = () => {
    onPlus(obj);
  };
  const clickFavourite = () => {
    onFavourite(obj);
    // setIsFavourite(!isFavourite);
  };
  return (
    <div className="card">
      {loading ? (
        <Skeleton />
      ) : (
        <>
          {onFavourite && (
            <div className="favourite" onClick={clickFavourite}>
              <img src={isItemFavourited(id) ? favourite : noFavourite}></img>
            </div>
          )}
          <img src={imgUrl} width={130} height={130}></img>
          <div className="name">
            <span>
              Man's Sneakers
              <br />
              {name}
            </span>
          </div>
          <div className="priceButton">
            <div className="price">
              Price:
              <p>{price}</p>
            </div>

            {onPlus && (
              <img
                className="addButton"
                src={isItemAdded(id) ? buttonPlusAdded : buttonPlus}
                onClick={addItem}
              ></img>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
